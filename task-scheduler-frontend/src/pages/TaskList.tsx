import { useEffect, useState } from "react";
import { getTasks, deleteTask, toggleTaskStatus } from "../lib/api";
import { Badge } from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import type { Task } from "../types";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Pause, Play, Clock, List } from "lucide-react";
import Dropdown from "../components/ui/Dropdown";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Task | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      const normalized = Array.isArray(data)
        ? data
        : Array.isArray((data as any)?.tasks)
        ? (data as any).tasks
        : Array.isArray((data as any)?.data)
        ? (data as any).data
        : [];
      setTasks(normalized);
    } catch (err) {
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteClick = (task: Task) => {
    setPendingDelete(task);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteTask(pendingDelete.id);
      setPendingDelete(null);
      fetchTasks();
      // trigger dashboard stats refresh
      window.dispatchEvent(new Event("refresh-stats"));
    } catch (err) {
      alert("Failed to delete task.");
    } finally {
      setDeleting(false);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleTaskStatus(id);
      fetchTasks(); // Refetch tasks after toggle
      // trigger dashboard stats refresh
      window.dispatchEvent(new Event("refresh-stats"));
    } catch (err) {
      alert("Failed to toggle task status.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Tasks</h2>
      {tasks.length === 0 ? (
        <div className="min-h-[200px] flex items-center justify-center text-sm text-gray-600">Belum ada task.</div>
      ) : (
        <ul className="space-y-3">
          {tasks.map((t) => (
            <li key={t.id} className="rounded-xl p-4 bg-indigo-100 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link to={`/tasks/${t.id}/logs`} className="font-medium text-gray-800 hover:underline">
                    {t.name}
                  </Link>
                  <div className="mt-1 text-xs text-gray-700 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Schedule: {t.schedule}</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-700">Status: <Badge variant={t.status}>{t.status}</Badge></div>
                </div>
                <div className="flex items-center gap-2">
                  <Dropdown
                    items={[
                      { label: "Edit", icon: <Pencil className="w-4 h-4" />, to: `/tasks/edit/${t.id}` },
                      { label: "Logs", icon: <List className="w-4 h-4" />, to: `/tasks/${t.id}/logs` },
                      { label: "Delete", icon: <Trash2 className="w-4 h-4" />, onClick: () => handleDeleteClick(t) },
                      { label: t.status === 'ACTIVE' ? 'Deactivate' : 'Activate', icon: t.status === 'ACTIVE' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />, onClick: () => handleToggle(t.id) },
                    ]}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Bottom create button removed per request; use header + button */}
      <Modal
        open={!!pendingDelete}
        title="Konfirmasi Hapus"
        description={
          <div className="text-sm">
            Anda yakin ingin menghapus task
            {pendingDelete ? (
              <span className="font-semibold"> "{pendingDelete.name}"</span>
            ) : null}?
            <br />Tindakan ini bersifat permanen.
          </div>
        }
        confirmText="Hapus"
        cancelText="Batal"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => (deleting ? null : setPendingDelete(null))}
      />
    </div>
  );
};

export default TaskList;

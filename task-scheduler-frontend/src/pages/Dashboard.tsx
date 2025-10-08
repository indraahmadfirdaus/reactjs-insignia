import { useEffect, useState } from "react";
import { getTasks } from "../lib/api";
import { Badge } from "../components/ui/Badge";
import type { Task } from "../types";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Today’s Tasks</h2>
      <div>
        
          {tasks.length === 0 ? (
            <div className="min-h-[200px] flex items-center justify-center text-sm text-gray-600">Belum ada task.</div>
          ) : (
            <ul className="space-y-3">
              {tasks.map((t) => (
                <li key={t.id} className="rounded-xl p-4 bg-indigo-100 shadow-sm">
                  <div className="font-medium text-gray-800">{t.name}</div>
                  <div className="mt-1 text-xs text-gray-700">Status: <Badge variant={t.status}>{t.status}</Badge></div>
                </li>
              ))}
            </ul>
          )}

      </div>
    </div>
  );
};

export default Dashboard;
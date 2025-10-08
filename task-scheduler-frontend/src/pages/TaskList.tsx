import { useEffect, useState } from "react";
import { getTasks, deleteTask, toggleTaskStatus } from "../lib/api";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import type { Task } from "../types";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        fetchTasks(); // Refetch tasks after deletion
      } catch (err) {
        alert("Failed to delete task.");
      }
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleTaskStatus(id);
      fetchTasks(); // Refetch tasks after toggle
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Task List</h1>
        <Link to="/tasks/create">
          <Button variant="primary">Create New Task</Button>
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap">{task.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{task.schedule}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={task.status}>{task.status}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/tasks/${task.id}`} className="text-green-600 hover:text-green-900 mr-4">
                    View
                  </Link>
                  <Link to={`/tasks/edit/${task.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(task.id)} className="text-red-600 hover:text-red-900 mr-4">
                    Delete
                  </button>
                  <button onClick={() => handleToggle(task.id)} className="text-blue-600 hover:text-blue-900">
                    {task.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskById, getLogsForTask } from "../lib/api";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import type { Task, TaskLog } from "../types";

const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [logs, setLogs] = useState<TaskLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTaskDetails = async () => {
      try {
        const [taskData, logsData] = await Promise.all([
          getTaskById(id),
          getLogsForTask(id),
        ]);
        setTask(taskData);
        setLogs(logsData);
      } catch (err) {
        setError("Failed to fetch task details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!task) {
    return <div>Task not found.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{task.name}</h1>
      <Card className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>ID:</strong> {task.id}</p>
            <p><strong>Schedule:</strong> {task.schedule}</p>
            <p><strong>Channel ID:</strong> {(task as any).channelId}</p>
          </div>
          <div>
            <p><strong>Max Retry:</strong> {task.maxRetry}</p>
            <p><strong>Status:</strong> <Badge variant={task.status}>{task.status}</Badge></p>
          </div>
        </div>
        {/* Payload removed per API revision */}
      </Card>

      <h2 className="text-2xl font-bold mb-4">Execution Logs</h2>
      <Card>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(log.executionTime).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={log.status}>{log.status}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default TaskDetail;
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { getTaskById, getTaskLogs } from "../lib/api";
import type { Task, TaskLog, TaskLogsResponse, LogStatus } from "../types";
import { ChevronDown } from "lucide-react";

const statusOptions: LogStatus[] = ["SUCCESS", "FAILED", "RETRYING"];

const TaskLogs = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [task, setTask] = useState<Task | null>(null);
  const [logs, setLogs] = useState<TaskLog[]>([]);
  const [meta, setMeta] = useState<TaskLogsResponse["meta"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const page = useMemo(() => Number(searchParams.get("page") ?? 1), [searchParams]);
  const limit = useMemo(() => Number(searchParams.get("limit") ?? 20), [searchParams]);
  const status = useMemo<LogStatus | undefined>(() => {
    const s = searchParams.get("status");
    return s && statusOptions.includes(s as LogStatus) ? (s as LogStatus) : undefined;
  }, [searchParams]);

  const monthYear = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const [taskData, logsResp] = await Promise.all([
          getTaskById(id),
          getTaskLogs(id, { page, limit, status }),
        ]);
        setTask(taskData);
        setLogs(logsResp.data);
        setMeta(logsResp.meta);
      } catch {
        setError("Failed to fetch task logs.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, page, limit, status]);

  const updateParam = (key: string, value?: string) => {
    const sp = new URLSearchParams(searchParams);
    if (!value) {
      sp.delete(key);
    } else {
      sp.set(key, value);
    }
    // reset page when filters change
    if (key !== "page") sp.set("page", "1");
    setSearchParams(sp);
  };

  return (
    <div>
      <div className="mb-3"><Button variant="secondary" onClick={() => navigate('/')} className="rounded-full">Back</Button></div>
      <h2 className="text-lg font-semibold mb-2">Task Logs</h2>
      <div className="mb-3 bg-indigo-700 rounded-xl text-white p-3">
        <div className="flex items-center justify-between">
          <div className="text-xs opacity-80">{monthYear}</div>
          {task && (
            <div className="text-xs opacity-90 rounded-full bg-white/10 px-3 py-1">{task.name}</div>
          )}
        </div>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <Card className="mb-3">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-[11px] text-gray-600 mb-1">Status</label>
            <div className="relative">
              <select
                value={status ?? ""}
                onChange={(e) => updateParam("status", e.target.value || undefined)}
                className="rounded-full bg-gray-50 px-3 py-2 pr-8 text-sm w-full appearance-none"
              >
                <option value="">All</option>
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-[11px] text-gray-600 mb-1">Limit</label>
            <input
              type="number"
              min={1}
              value={limit}
              onChange={(e) => updateParam("limit", String(Math.max(1, Number(e.target.value))))}
              className="rounded-full bg-gray-50 px-3 py-2 text-sm w-24"
            />
          </div>
        </div>
      </Card>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Card>
          {logs.length === 0 ? (
            <div className="min-h-[120px] flex items-center justify-center text-sm text-gray-600">No logs found.</div>
          ) : (
            <div className="max-h-[50vh] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td className="px-4 py-2 whitespace-nowrap">{new Date(log.executionTime).toLocaleString()}</td>
                      <td className="px-4 py-2 whitespace-nowrap"><Badge variant={log.status}>{log.status}</Badge></td>
                      <td className="px-4 py-2 text-sm text-gray-700 align-top">
                        <span className="block break-words">{log.message}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {meta ? `Page ${meta.page} of ${meta.totalPages} • Total ${meta.total}` : null}
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={!meta || meta.page <= 1}
                onClick={() => updateParam("page", String(Math.max(1, (meta?.page ?? 1) - 1)))}
                className="rounded-full"
              >
                Prev
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={!meta || (meta.page >= meta.totalPages)}
                onClick={() => updateParam("page", String(Math.min((meta?.totalPages ?? 1), (meta?.page ?? 1) + 1)))}
                className="rounded-full"
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TaskLogs;
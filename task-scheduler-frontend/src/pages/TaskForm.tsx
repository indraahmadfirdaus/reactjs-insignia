import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, getTaskById, updateTask } from "../lib/api";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import CronInput from "../components/ui/CronInput";
import { normalizeCron, isValidCron } from "../lib/cron";

import type { Task } from "../types";

const TaskForm = () => {
  const monthYear = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const [name, setName] = useState("");
  const [schedule, setSchedule] = useState("* * * * *");
  const [startTime, setStartTime] = useState("16:00");
  const [endTime, setEndTime] = useState("17:00");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [maxRetry, setMaxRetry] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // cron description now handled inside CronInput component

  useEffect(() => {
    const loadForEdit = async () => {
      if (!isEdit || !id) return;
      try {
        const task = await getTaskById(id);
        setName(task.name ?? "");
        setSchedule(task.schedule ?? "* * * * *");
        setWebhookUrl((task as any).webhookUrl ?? (task as any).channelId ?? "");
        setMaxRetry(task.maxRetry ?? 0);
      } catch {
        setError("Failed to load task for edit.");
      }
    };
    loadForEdit();
  }, [isEdit, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !schedule || !webhookUrl) {
      setError("Please fill in all required fields.");
      return;
    }

    // Validate cron strictly and normalize before submit
    const normalizedCron = normalizeCron(schedule);
    if (!isValidCron(normalizedCron)) {
      setError("Cron tidak valid. Gunakan format 5 field (min hour dom month dow).");
      return;
    }

    // payload removed per API revision

    setSubmitting(true);

    const taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
      name,
      schedule: normalizedCron,
      channelId: webhookUrl,
      maxRetry,
      status: 'ACTIVE',
    };

    try {
      if (isEdit && id) {
        await updateTask(id, taskData);
      } else {
        await createTask(taskData);
      }
      // trigger dashboard stats refresh
      window.dispatchEvent(new Event("refresh-stats"));
      navigate("/");
    } catch (err) {
      setError(isEdit ? "Failed to update task." : "Failed to create task.");
    } finally {
      setSubmitting(false);
    }
  };

  // Payload support removed in API revision

  return (
    <div>
      <div className="mb-3"><Button variant="secondary" onClick={() => navigate(-1)} className="rounded-full">Back</Button></div>
      <h2 className="text-lg font-semibold mb-2">{isEdit ? "Edit Task" : "Add Task"}</h2>
      <div className="mb-3 bg-indigo-700 rounded-xl text-white p-3">
        <div className="text-xs opacity-80">{monthYear}</div>
      </div>
      <Card>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Task Name</label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="rounded-full bg-gray-50" />
          </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
          <Input id="startTime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="rounded-full bg-gray-50" />
        </div>
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
          <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="rounded-full bg-gray-50" />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">Schedule (Cron)</label>
        <CronInput id="schedule" value={schedule} onChange={setSchedule} />
      </div>
      <div className="mb-4">
        <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700">Webhook URL</label>
        <Input id="webhookUrl" type="url" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} required className="rounded-full bg-gray-50" />
      </div>
      <div className="mb-4">
        <label htmlFor="maxRetry" className="block text-sm font-medium text-gray-700">Max Retry</label>
        <Input id="maxRetry" type="number" value={maxRetry} onChange={(e) => setMaxRetry(Number(e.target.value))} className="rounded-full bg-gray-50" />
      </div>
          <Button type="submit" variant="primary" disabled={submitting} className="w-full rounded-full">
            {submitting ? (isEdit ? "Saving..." : "Creating...") : (isEdit ? "Save" : "Add")}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default TaskForm;
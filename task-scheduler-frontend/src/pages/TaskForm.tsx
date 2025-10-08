import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../lib/api";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import type { Task } from "../types";

const TaskForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [maxRetry, setMaxRetry] = useState(0);
  const [payload, setPayload] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !schedule || !webhookUrl) {
      setError("Please fill in all required fields.");
      return;
    }

    let parsedPayload;
    try {
      parsedPayload = payload ? JSON.parse(payload) : {};
    } catch (err) {
      setError("Invalid JSON payload.");
      return;
    }

    setSubmitting(true);

    const taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status'> = {
      name,
      schedule,
      webhookUrl,
      maxRetry,
      payload: parsedPayload,
    };

    try {
      await createTask(taskData);
      navigate("/tasks");
    } catch (err) {
      setError("Failed to create task.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Create Task</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">Schedule (Cron)</label>
          <Input id="schedule" value={schedule} onChange={(e) => setSchedule(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700">Webhook URL</label>
          <Input id="webhookUrl" type="url" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="maxRetry" className="block text-sm font-medium text-gray-700">Max Retry</label>
          <Input id="maxRetry" type="number" value={maxRetry} onChange={(e) => setMaxRetry(Number(e.target.value))} />
        </div>
        <div className="mb-4">
          <label htmlFor="payload" className="block text-sm font-medium text-gray-700">Payload (JSON)</label>
          <textarea
            id="payload"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
          />
        </div>
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? "Creating..." : "Create Task"}
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;

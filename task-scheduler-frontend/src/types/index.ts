export interface Task {
  id: string;
  name: string;
  schedule: string; // format cron
  webhookUrl: string;
  payload: Record<string, any>; // JSON
  maxRetry: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}

export interface TaskLog {
  id: string;
  taskId: string;
  executionTime: string; // ISO Date String
  status: 'SUCCESS' | 'FAILED' | 'RETRYING';
  retryCount: number;
  message?: string;
  createdAt: string; // ISO Date String
}

export interface DashboardStats {
  totalTasks: number;
  activeTasks: number;
  failedTasks: number;
}

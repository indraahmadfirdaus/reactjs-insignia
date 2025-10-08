export interface Task {
  id: string;
  name: string;
  schedule: string; // format cron
  channelId: string; // Discord channel ID
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

export type LogStatus = 'SUCCESS' | 'FAILED' | 'RETRYING';

export interface PaginatedMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TaskLogsResponse {
  data: TaskLog[];
  meta: PaginatedMeta;
}

export interface DashboardStats {
  total: number;
  active: number;
  inactive: number;
  failed: number;
}

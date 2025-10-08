import axios from 'axios';
import type { Task, TaskLog, DashboardStats } from '../types';

const apiClient = axios.create({
  baseURL: 'http://localhost:3005/api',
});

export const setApiKey = (apiKey: string) => {
  apiClient.defaults.headers.common['X-API-KEY'] = apiKey;
};

// Automatically set the API key from .env file if it exists
const apiKey = import.meta.env.VITE_API_KEY;
if (apiKey) {
  setApiKey(apiKey as string);
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await apiClient.get('/tasks/dashboard/stats');
  return response.data;
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get('/tasks');
  return response.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await apiClient.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
  const response = await apiClient.post('/tasks', data);
  return response.data;
};

export const updateTask = async (id: string, data: Partial<Task>): Promise<Task> => {
  const response = await apiClient.patch(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};

export const toggleTaskStatus = async (id: string): Promise<Task> => {
  const response = await apiClient.post(`/tasks/${id}/toggle`);
  return response.data;
};

export const getLogsForTask = async (taskId: string): Promise<TaskLog[]> => {
  const response = await apiClient.get(`/tasks/${taskId}/logs`);
  return response.data;
};

export default apiClient;

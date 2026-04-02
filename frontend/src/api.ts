import axios from 'axios';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}

const api = axios.create({
  baseURL: '/api/tasks',
});

export const getTasks = () => api.get<Task[]>('/');
export const getTaskStats = () => api.get<TaskStats>('/stats');
export const createTask = (data: { title: string; description: string }) => api.post<Task>('/', data);
export const updateTask = (id: string, data: { title: string; description: string }) => api.put<Task>(`/${id}`, data);
export const completeTask = (id: string) => api.patch<Task>(`/${id}/complete`, {});
export const deleteTask = (id: string) => api.delete(`/${id}`);

export default api;

import { ITaskRepository, Task } from '../domain/Task';

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}

export class TaskService {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async createTask(id: string, title: string, description: string): Promise<Task> {
    const task = new Task(id, title, description);
    await this.taskRepository.create(task);
    return task;
  }

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async getTask(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found.`);
    }
    return task;
  }

  async updateTask(id: string, title: string, description: string): Promise<Task> {
    const task = await this.getTask(id);
    task.updateDetails(title, description);
    await this.taskRepository.update(task);
    return task;
  }

  async completeTask(id: string): Promise<Task> {
    const task = await this.getTask(id);
    task.markAsCompleted();
    await this.taskRepository.update(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async getStats(): Promise<TaskStats> {
    const tasks = await this.taskRepository.findAll();
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    return { total, completed, pending };
  }
}

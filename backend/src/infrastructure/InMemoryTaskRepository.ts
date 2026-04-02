import { Task, ITaskRepository } from '../domain/Task';

export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: Task[] = [];

  async create(task: Task): Promise<void> {
    this.tasks.push(task);
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.tasks.find(t => t.id === id);
    return task || null;
  }

  async findAll(): Promise<Task[]> {
    return [...this.tasks];
  }

  async update(task: Task): Promise<void> {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    } else {
      throw new Error('Task not found');
    }
  }

  async delete(id: string): Promise<void> {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);
    if (this.tasks.length === initialLength) {
      throw new Error('Task not found');
    }
  }
}

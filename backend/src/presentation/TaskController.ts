import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../application/TaskService';

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title, description } = req.body;
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
      const task = await this.taskService.createTask(id, title, description);
      res.status(201).json(task.toJSON());
    } catch (error) {
      next(error);
    }
  };

  getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tasks = await this.taskService.getTasks();
      res.status(200).json(tasks.map(t => t.toJSON()));
    } catch (error) {
      next(error);
    }
  };

  updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const task = await this.taskService.updateTask(id, title, description);
      res.status(200).json(task.toJSON());
    } catch (error) {
      next(error);
    }
  };

  completeTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const task = await this.taskService.completeTask(id);
      res.status(200).json(task.toJSON());
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.taskService.deleteTask(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stats = await this.taskService.getStats();
      res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  };
}

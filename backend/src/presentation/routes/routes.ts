import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { validateRequest } from "../middlewares/validateRequest";
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
} from "../validations";
import { TaskService } from "../../application/TaskService";

export const defineRoutes = (taskService: TaskService): Router => {
  const router = Router();
  const taskController = new TaskController(taskService);

  router.post(
    "/",
    validateRequest(createTaskSchema),
    taskController.createTask,
  );
  router.get("/", taskController.getTasks);
  router.get("/stats", taskController.getStats);
  router.put(
    "/:id",
    validateRequest(updateTaskSchema),
    taskController.updateTask,
  );
  router.patch(
    "/:id/complete",
    validateRequest(taskIdSchema),
    taskController.completeTask,
  );
  router.delete(
    "/:id",
    validateRequest(taskIdSchema),
    taskController.deleteTask,
  );

  return router;
};

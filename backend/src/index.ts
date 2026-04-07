import express from "express";
import cors from "cors";
import { InMemoryTaskRepository } from "./infrastructure/database/in_memory/InMemoryTaskRepository";
import { TaskService } from "./application/TaskService";
import { defineRoutes } from "./presentation/routes";
import { errorHandler } from "./presentation/middlewares/errorHandler";
import { runSeeder } from "./seeder";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const taskRepository = new InMemoryTaskRepository();
const taskService = new TaskService(taskRepository);

app.use("/tasks", defineRoutes(taskService));

app.use(errorHandler);

const bootstrap = async () => {
  await runSeeder(taskService);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

bootstrap().catch(console.error);

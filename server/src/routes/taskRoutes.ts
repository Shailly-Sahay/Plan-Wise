import { Router } from "express";
import { taskController } from "../controllers";

const taskRouter = Router();

taskRouter.get("/", taskController.getTasks);
taskRouter.post("/", taskController.createTask);
taskRouter.patch("/:taskId/status", taskController.updateTaskStatus);
taskRouter.get("/user/:userId", taskController.getUserTasks);

export default taskRouter;

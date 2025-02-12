import { Router } from "express";
import { taskController } from "../controllers";

const taskRouter = Router();

taskRouter.get("/", taskController.getTasks);
taskRouter.post("/", taskController.createTask);
taskRouter.patch("/:taskId/status", taskController.updateTaskStatus);

export default taskRouter;

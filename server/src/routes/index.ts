import express from "express";
import projectRouter from "./projectRoutes";
import taskRouter from "./taskRoutes";

const router = express.Router();

router.use("/projects", projectRouter);
router.use("/tasks", taskRouter);

export default router;

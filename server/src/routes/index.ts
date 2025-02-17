import express from "express";
import projectRouter from "./projectRoutes";
import taskRouter from "./taskRoutes";
import searchRouter from "./searchRoutes";

const router = express.Router();

router.use("/projects", projectRouter);
router.use("/tasks", taskRouter);
router.use("/search", searchRouter);

export default router;

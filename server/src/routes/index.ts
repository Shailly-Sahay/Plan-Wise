import express from "express";
import projectRouter from "./projectRoutes";
import taskRouter from "./taskRoutes";
import searchRouter from "./searchRoutes";
import userRouter from "./userRoutes";
import teamRouter from "./teamRoutes";

const router = express.Router();

router.use("/projects", projectRouter);
router.use("/tasks", taskRouter);
router.use("/search", searchRouter);
router.use("/users", userRouter);
router.use("/teams", teamRouter);

export default router;

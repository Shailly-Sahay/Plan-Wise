import express from "express";
import projectRouter from "./projectRoutes";

const router = express.Router();

router.use("/projects", projectRouter);

export default router;

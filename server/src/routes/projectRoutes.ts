import { Router } from "express";
import { projectController } from "../controllers";

const projectRouter = Router();

projectRouter.get("/", projectController.getProjects);
projectRouter.post("/", projectController.createProject);

export default projectRouter;

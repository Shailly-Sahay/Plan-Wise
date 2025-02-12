import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const taskController = {
  // To fetch tasks for a project
  getTasks: async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.query;

    try {
      const tasks = await prisma.task.findMany({
        where: {
          projectId: Number(projectId),
        },
        include: {
          author: true,
          assignee: true,
          comments: true,
          attachments: true,
        },
      });
      res.json(tasks);
    } catch (error: any) {
      res.status(500).json({
        message: `Error retrieving tasks: ${error.message}`,
        error,
      });
    }
  },

  // To create a task
  createTask: async (req: Request, res: Response): Promise<void> => {
    const {
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      points,
      projectId,
      authorUserId,
      assignedUserId,
    } = req.body;

    try {
      const newTask = await prisma.task.create({
        data: {
          title,
          description,
          status,
          priority,
          tags,
          startDate,
          dueDate,
          points,
          projectId,
          authorUserId,
          assignedUserId,
        },
      });
      res.json(newTask);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: `Error creating task: ${error.message}` });
    }
  },

  // To update task status
  updateTaskStatus: async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const { status } = req.body;

    try {
      const updatedTask = await prisma.task.update({
        where: {
          id: Number(taskId),
        },
        data: {
          status: status,
        },
      });
      res.json(updatedTask);
    } catch (error: any) {
      res.status(500).json({
        message: `Error updating task: ${error.message}`,
        error,
      });
    }
  },
};

export default taskController;

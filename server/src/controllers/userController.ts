import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userController = {
  // To fetch tasks for a project
  getUsers: async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.query;

    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({
        message: `Error retrieving tasks: ${error.message}`,
        error,
      });
    }
  },
};

export default userController;

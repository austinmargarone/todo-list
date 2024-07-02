import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      return getTodos(req, res);
    }
    case "POST": {
      return postTodo(req, res);
    }
    default:
      res.status(405).end();
      break;
  }
}

async function getTodos(req: NextApiRequest, res: NextApiResponse) {
  try {
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function postTodo(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title } = req.body;
    const todo = await prisma.todo.create({
      data: {
        title,
      },
    });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

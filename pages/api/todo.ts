import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Todo } from ".prisma/client";

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
    case "PATCH": {
      return updateTodo(req, res);
    }
    case "DELETE": {
      return deleteTodo(req, res);
    }
    default:
      res.status(405).end();
      break;
  }
}

async function getTodos(
  req: NextApiRequest,
  res: NextApiResponse<Todo[] | { error: string }>
) {
  try {
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function postTodo(
  req: NextApiRequest,
  res: NextApiResponse<Todo | { error: string }>
) {
  try {
    const { title, description, completed } = req.body;
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        completed,
      },
    });
    res.status(200).json(todo as Todo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateTodo(
  req: NextApiRequest,
  res: NextApiResponse<Todo | { error: string }>
) {
  try {
    const { id, title, description, completed } = req.body;
    const todo = await prisma.todo.update({
      where: { id },
      data: { title, description, completed },
    });
    res.status(200).json(todo as Todo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteTodo(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | { error: string }>
) {
  try {
    const { id } = req.body;
    await prisma.todo.delete({
      where: { id },
    });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

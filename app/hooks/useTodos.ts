import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "@prisma/client";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      const res = await axios.get("/api/todo");
      const sortedTodos = res.data.sort(
        (a: Todo, b: Todo) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setTodos(sortedTodos.filter((todo: Todo) => !todo.completed));
      setCompletedTodos(sortedTodos.filter((todo: Todo) => todo.completed));
    }
    fetchTodos();
  }, []);

  async function handlePostTodo(
    title: string,
    description: string
  ): Promise<void> {
    try {
      const res = await axios.post("/api/todo", {
        title,
        description,
        completed: false,
      });
      const newTodo = res.data;
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    } catch (error) {
      console.error("Error posting todo", error);
    }
  }

  async function handleToggleCompleted(id: number, completed: boolean) {
    try {
      const res = await axios.patch("/api/todo", { id, completed: !completed });
      const updatedTodo = res.data;
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setCompletedTodos((prevCompletedTodos) =>
        prevCompletedTodos.filter((todo) => todo.id !== id)
      );

      if (updatedTodo.completed) {
        setCompletedTodos((prevCompletedTodos) => [
          updatedTodo,
          ...prevCompletedTodos,
        ]);
      } else {
        setTodos((prevTodos) => [updatedTodo, ...prevTodos]);
      }
    } catch (error) {
      console.error("Error updating todo", error);
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      await axios.delete("/api/todo", { data: { id } });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setCompletedTodos((prevCompletedTodos) =>
        prevCompletedTodos.filter((todo) => todo.id !== id)
      );
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  }

  async function handleEditTodo(
    id: number,
    title: string,
    description: string
  ) {
    try {
      const res = await axios.patch("/api/todo", { id, title, description });
      const updatedTodo = res.data;
      if (updatedTodo.completed) {
        setCompletedTodos((prevCompletedTodos) =>
          prevCompletedTodos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          )
        );
      } else {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          )
        );
      }
    } catch (error) {
      console.error("Error editing todo", error);
    }
  }

  return {
    todos,
    completedTodos,
    handlePostTodo,
    handleToggleCompleted,
    handleDeleteTodo,
    handleEditTodo,
  };
}

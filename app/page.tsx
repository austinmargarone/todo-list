"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Todo } from "@prisma/client";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      const res = await axios.get("/api/todo");
      const sortedTodos = res.data.sort(
        (a: Todo, b: Todo) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setTodos(sortedTodos);
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
      setTodos([newTodo, ...todos]);
    } catch (error) {
      console.error("Error posting todo", error);
    }
  }

  async function handleToggleCompleted(id: number, completed: boolean) {
    try {
      const res = await axios.patch("/api/todo", { id, completed: !completed });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo", error);
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      await axios.delete("/api/todo", { data: { id } });
      setTodos(todos.filter((todo) => todo.id !== id));
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
      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Error editing todo", error);
    }
  }

  return (
    <main className="py-[2.5rem] flex flex-col items-center gap-[2.5rem] justify-center">
      <TodoForm onCreateTodo={handlePostTodo} />
      <ul className="gap-[2rem] flex flex-col border-t w-[280px] sm:w-[325px] md:w-[350px] lg:w-[380px]">
        <h2 className="flex justify-center mt-[2.5rem]">My Tasks</h2>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleCompleted={handleToggleCompleted}
            onDeleteTodo={handleDeleteTodo}
            onEditTodo={handleEditTodo}
          />
        ))}
      </ul>
    </main>
  );
}

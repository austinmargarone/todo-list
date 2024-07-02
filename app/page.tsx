"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Todo } from "@prisma/client";

export default function Home() {
  const [todoValue, setTodoValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      const res = await axios.get("/api/todo");
      setTodos(res.data);
    }
    fetchTodos();
  }, []);

  async function handlePostTodo() {
    try {
      const res = await axios.post("/api/todo", {
        title: todoValue,
        description: descriptionValue,
        completed: false, // Default completed to false
      });
      setTodos([...todos, res.data]);
      setTodoValue("");
      setDescriptionValue("");
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

  return (
    <main className="py-[2.5rem] flex min-h-screen flex-col items-center gap-[2.5rem] justify-center">
      <div>Tasks</div>
      <input
        onChange={(e) => setTodoValue(e.target.value)}
        value={todoValue}
        className="rounded-md shadow-md p-2 text-black"
        placeholder="Add todo title..."
      />
      <input
        onChange={(e) => setDescriptionValue(e.target.value)}
        value={descriptionValue}
        className="rounded-md shadow-md p-2 text-black"
        placeholder="Add todo description..."
      />
      <button
        onClick={handlePostTodo}
        className="bg-blue-500 cursor-pointer shadow-md px-5 py-2 text-white rounded"
      >
        Add Task
      </button>
      <ul className="gap-[2rem] flex flex-col">
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong>
            <p>{todo.description}</p>
            <p>{`Created At: ${new Date(todo.createdAt).toLocaleString()}`}</p>
            <p>{`Updated At: ${new Date(todo.updatedAt).toLocaleString()}`}</p>
            <button
              onClick={() => handleToggleCompleted(todo.id, todo.completed)}
              className={`cursor-pointer shadow-md p-2 rounded ${
                todo.completed ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

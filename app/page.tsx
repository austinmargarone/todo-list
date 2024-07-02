"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Todo } from "@prisma/client";

export default function Home() {
  console.log("Test Frontend");
  const [todoValue, setTodoValue] = useState<string>("");
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
      const res = await axios.post("/api/todo", { title: todoValue });
      setTodos([...todos, res.data]);
      setTodoValue("");
    } catch (error) {
      console.error("Error posting todo", error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-[2.5rem] justify-center">
      <div>To Do App</div>
      <input
        onChange={(e) => setTodoValue(e.target.value)}
        value={todoValue}
        className="rounded-md shadow-md p-2 text-black"
        placeholder="Add to do..."
      />
      <button
        onClick={handlePostTodo}
        className="bg-blue-500 cursor-pointer shadow-md p-5 text-white rounded"
      >
        Add
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </main>
  );
}

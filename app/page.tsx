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
      const sortedTodos = res.data.sort(
        (a: Todo, b: Todo) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setTodos(sortedTodos);
    }
    fetchTodos();
  }, []);

  async function handlePostTodo() {
    try {
      const res = await axios.post("/api/todo", {
        title: todoValue,
        description: descriptionValue,
        completed: false,
      });
      const newTodo = res.data;
      setTodos([newTodo, ...todos]);
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

  async function handleDeleteTodo(id: number) {
    try {
      await axios.delete("/api/todo", { data: { id } });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  }

  return (
    <main className="py-[2.5rem] flex flex-col items-center gap-[2.5rem] justify-center">
      <section className="items-center w-[280px] sm:w-[325px] md:w-[350px] lg:w-[380px] flex flex-col gap-[2rem]">
        <div>New Task</div>
        <input
          onChange={(e) => setTodoValue(e.target.value)}
          value={todoValue}
          className="rounded-md shadow-md p-2 text-black"
          placeholder="Task"
        />
        <input
          onChange={(e) => setDescriptionValue(e.target.value)}
          value={descriptionValue}
          className="rounded-md shadow-md p-2 text-black"
          placeholder="Description"
        />
        <button
          onClick={handlePostTodo}
          className="bg-blue-500 cursor-pointer shadow-md px-5 py-2 text-white rounded"
        >
          Create Task
        </button>
      </section>
      <ul className="gap-[2rem] flex flex-col border-t w-[280px] sm:w-[325px] md:w-[350px] lg:w-[380px]">
        <h2 className="flex justify-center mt-[2.5rem]">My Tasks</h2>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="shadow-lg border p-5 flex flex-col gap-[.5rem] rounded-sm"
          >
            <strong>{todo.title}</strong>
            <p className="mb-[.5rem]">{todo.description}</p>
            <button
              onClick={() => handleToggleCompleted(todo.id, todo.completed)}
              className={`cursor-pointer shadow-md p-2 rounded ${
                todo.completed ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="bg-gray-500 cursor-pointer shadow-md p-2 text-white rounded mt-2"
            >
              Delete
            </button>
            <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center">
              <p className="text-[8px] italic">{`Created At: ${new Date(
                todo.createdAt
              ).toLocaleString()}`}</p>
              <p className="text-[8px] italic">{`Updated At: ${new Date(
                todo.updatedAt
              ).toLocaleString()}`}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

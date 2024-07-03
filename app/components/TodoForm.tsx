"use client";
import { useState } from "react";

interface TodoFormProps {
  onCreateTodo: (title: string, description: string) => Promise<void>;
}

const TodoForm: React.FC<TodoFormProps> = ({ onCreateTodo }) => {
  const [todoValue, setTodoValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");

  const handleCreateTodo = async () => {
    await onCreateTodo(todoValue, descriptionValue);
    setTodoValue("");
    setDescriptionValue("");
  };

  return (
    <section className="flex items-center justify-center h-[22.5rem] max-w-md mx-auto px-4">
      <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">New Task</h1>
        <div className="space-y-4">
          <input
            onChange={(e) => setTodoValue(e.target.value)}
            value={todoValue}
            className="w-full rounded-md shadow-md p-3 text-black dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task"
          />
          <input
            onChange={(e) => setDescriptionValue(e.target.value)}
            value={descriptionValue}
            className="w-full rounded-md shadow-md p-3 text-black dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
          />
          <button
            onClick={handleCreateTodo}
            className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 cursor-pointer shadow-md px-5 py-3 text-white rounded-md focus:outline-none"
          >
            Create Task
          </button>
        </div>
      </div>
    </section>
  );
};

export default TodoForm;

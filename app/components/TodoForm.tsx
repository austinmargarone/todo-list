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
    <section className="items-center w-[280px] sm:w-[325px] md:w-[350px] lg:w-[380px] flex flex-col gap-[2rem]">
      <h1>New Task</h1>
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
        onClick={handleCreateTodo}
        className="bg-blue-500 cursor-pointer shadow-md px-5 py-2 text-white rounded"
      >
        Create Task
      </button>
    </section>
  );
};

export default TodoForm;

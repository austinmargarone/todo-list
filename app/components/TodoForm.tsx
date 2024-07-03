"use client";
import { useTodoForm } from "../hooks/useTodoForm";

interface TodoFormProps {
  onCreateTodo: (title: string, description: string) => Promise<void>;
}

const TodoForm: React.FC<TodoFormProps> = ({ onCreateTodo }) => {
  const {
    todoValue,
    setTodoValue,
    descriptionValue,
    setDescriptionValue,
    validationErrors,
    handleCreateTodo,
  } = useTodoForm({ onCreateTodo });

  return (
    <section className="flex items-center justify-center h-[22.5rem] max-w-md mx-auto px-4">
      <div className="w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">New Task</h1>
        <div className="space-y-4">
          <input
            onChange={(e) => setTodoValue(e.target.value)}
            value={todoValue}
            className={`w-full min-w-[200px] rounded-md shadow-md p-3 text-black border ${
              validationErrors.title ? "border-red-500" : "border-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Task"
          />
          {validationErrors.title && (
            <p className="text-red-500 text-sm">{validationErrors.title}</p>
          )}
          <input
            onChange={(e) => setDescriptionValue(e.target.value)}
            value={descriptionValue}
            className={`w-full min-w-[200px] rounded-md shadow-md p-3 text-black border ${
              validationErrors.description
                ? "border-red-500"
                : "border-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Description"
          />
          {validationErrors.description && (
            <p className="text-red-500 text-sm">
              {validationErrors.description}
            </p>
          )}
          <button
            onClick={handleCreateTodo}
            className="w-full min-w-[200px] bg-blue-500 hover:bg-blue-600 active:bg-blue-700 cursor-pointer shadow-md px-5 py-3 text-white rounded-md focus:outline-none"
          >
            Create Task
          </button>
        </div>
      </div>
    </section>
  );
};

export default TodoForm;

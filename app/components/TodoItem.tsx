import { Todo } from "@prisma/client";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  onToggleCompleted: (id: number, completed: boolean) => Promise<void>;
  onDeleteTodo: (id: number) => Promise<void>;
  onEditTodo: (id: number, title: string, description: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleCompleted,
  onDeleteTodo,
  onEditTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(todo.title);
  const [editingDescription, setEditingDescription] = useState(
    todo.description || ""
  );

  const handleSaveEdit = () => {
    onEditTodo(todo.id, editingTitle, editingDescription);
    setIsEditing(false);
  };

  return (
    <li className="shadow-lg border p-5 flex flex-col gap-[.5rem] rounded-sm">
      {isEditing ? (
        <>
          <input
            onChange={(e) => setEditingTitle(e.target.value)}
            value={editingTitle}
            className="rounded-md shadow-md p-2 text-black"
            placeholder="Title"
          />
          <input
            onChange={(e) => setEditingDescription(e.target.value)}
            value={editingDescription}
            className="rounded-md shadow-md p-2 text-black"
            placeholder="Description"
          />
          <button
            onClick={handleSaveEdit}
            className="bg-green-500 cursor-pointer shadow-md px-5 py-2 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 cursor-pointer shadow-md px-5 py-2 text-white rounded mt-2"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <strong>{todo.title}</strong>
          <p className="mb-[.5rem]">{todo.description}</p>
          <button
            onClick={() => onToggleCompleted(todo.id, todo.completed)}
            className={`cursor-pointer shadow-md p-2 rounded ${
              todo.completed ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
          </button>
          <button
            onClick={() => onDeleteTodo(todo.id)}
            className="bg-gray-500 cursor-pointer shadow-md p-2 text-white rounded mt-2"
          >
            Delete
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 cursor-pointer shadow-md p-2 text-white rounded mt-2"
          >
            Edit
          </button>
          <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center">
            <p className="text-[8px] italic">{`Created At: ${new Date(
              todo.createdAt
            ).toLocaleString()}`}</p>
            <p className="text-[8px] italic">{`Updated At: ${new Date(
              todo.updatedAt
            ).toLocaleString()}`}</p>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;

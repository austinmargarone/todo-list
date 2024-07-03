import { Todo } from "@prisma/client";
import { useTodoItem } from "../hooks/useTodoItem";

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
  const {
    isEditing,
    setIsEditing,
    editingTitle,
    setEditingTitle,
    editingDescription,
    setEditingDescription,
    handleSaveEdit,
  } = useTodoItem({ todo, onEditTodo });

  return (
    <li className="shadow-lg border p-5 flex flex-col gap-2 rounded-md bg-gray-800 max-w-md mx-auto px-4 w-full lg:min-w-[25rem]">
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
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 hover:bg-green-600 active:bg-green-700 cursor-pointer shadow-md px-5 py-2 text-white rounded w-full"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 cursor-pointer shadow-md px-5 py-2 text-white rounded w-full"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <strong className="text-lg">{todo.title}</strong>
          <p className="mb-2">{todo.description}</p>
          <div className="flex flex-col lg:flex-row gap-2 mt-2">
            <button
              onClick={() => onToggleCompleted(todo.id, todo.completed)}
              className={`cursor-pointer shadow-md p-2 rounded text-white ${
                todo.completed
                  ? "bg-green-500 hover:bg-green-600 active:bg-green-700"
                  : "bg-red-500 hover:bg-red-600 active:bg-red-700"
              } lg:w-1/2`}
            >
              {todo.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <div className="flex gap-2 lg:w-1/2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 cursor-pointer shadow-md p-2 text-white rounded w-full"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 cursor-pointer shadow-md p-2 text-white rounded w-full"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center mt-2 text-gray-500">
            <p className="text-[8px] italic">{`Created At: ${new Date(
              todo.createdAt
            ).toLocaleString()}`}</p>
            {new Date(todo.createdAt).getTime() !==
              new Date(todo.updatedAt).getTime() && (
              <p className="text-[8px] italic">{`Updated At: ${new Date(
                todo.updatedAt
              ).toLocaleString()}`}</p>
            )}
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;

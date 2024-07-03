import { useState } from "react";
import { Todo } from "@prisma/client";

interface UseTodoItemProps {
  todo: Todo;
  onEditTodo: (id: number, title: string, description: string) => void;
}

export function useTodoItem({ todo, onEditTodo }: UseTodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(todo.title);
  const [editingDescription, setEditingDescription] = useState(
    todo.description || ""
  );

  const handleSaveEdit = () => {
    onEditTodo(todo.id, editingTitle, editingDescription);
    setIsEditing(false);
  };

  return {
    isEditing,
    setIsEditing,
    editingTitle,
    setEditingTitle,
    editingDescription,
    setEditingDescription,
    handleSaveEdit,
  };
}

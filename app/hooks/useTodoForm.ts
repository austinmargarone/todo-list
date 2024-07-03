import { useState } from "react";
import { z } from "zod";

const todoSchema = z.object({
  title: z.string().min(1, "Title must not be empty"),
  description: z.string().min(1, "Description must not be empty"),
});

interface UseTodoFormProps {
  onCreateTodo: (title: string, description: string) => Promise<void>;
}

export function useTodoForm({ onCreateTodo }: UseTodoFormProps) {
  const [todoValue, setTodoValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string | undefined;
  }>({});

  const handleCreateTodo = async () => {
    try {
      const validatedData = todoSchema.parse({
        title: todoValue,
        description: descriptionValue,
      });
      console.log("Validated Data:", validatedData);
      await onCreateTodo(validatedData.title, validatedData.description);
      setTodoValue("");
      setDescriptionValue("");
      setValidationErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation Error:", error.errors);
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setValidationErrors(fieldErrors);
      } else {
        console.error("Validation failed with unknown error", error);
      }
    }
  };

  return {
    todoValue,
    setTodoValue,
    descriptionValue,
    setDescriptionValue,
    validationErrors,
    handleCreateTodo,
  };
}

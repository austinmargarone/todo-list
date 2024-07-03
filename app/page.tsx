"use client";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { useTodos } from "./hooks/useTodos";

export default function Home() {
  const {
    todos,
    completedTodos,
    handlePostTodo,
    handleToggleCompleted,
    handleDeleteTodo,
    handleEditTodo,
  } = useTodos();

  return (
    <main className="py-[2.5rem] flex flex-col items-center gap-[2.5rem] justify-center">
      <TodoForm onCreateTodo={handlePostTodo} />
      <div className="flex flex-col lg:flex-row gap-[3.5rem] w-full max-w-md mx-auto px-4 lg:px-0 lg:max-w-fit">
        <section className="gap-[2rem] flex flex-col border-t">
          <h2 className="flex justify-center mt-[2.5rem] min-w-[15rem]">
            My Tasks
          </h2>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleCompleted={handleToggleCompleted}
              onDeleteTodo={handleDeleteTodo}
              onEditTodo={handleEditTodo}
            />
          ))}
        </section>
        <section className="gap-[2rem] flex flex-col border-t ">
          <h2 className="flex justify-center mt-[2.5rem] min-w-[15rem]">
            Completed Tasks
          </h2>
          {completedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleCompleted={handleToggleCompleted}
              onDeleteTodo={handleDeleteTodo}
              onEditTodo={handleEditTodo}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

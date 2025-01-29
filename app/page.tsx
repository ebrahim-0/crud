import { getTodos } from "@/lib/serverAction/todo";
import TodoForm from "./components/Todo/TodoForm";
import TodoList from "./components/Todo/TodoList";

export const dynamic = "force-dynamic";

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className="container mx-auto p-6 max-w-3xl shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-white text-center mb-4">
        Todo List
      </h2>

      <TodoForm />

      <ul className="mt-4 space-y-3">
        <TodoList todos={todos} />
      </ul>
    </div>
  );
}

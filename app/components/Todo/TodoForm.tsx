import { addTodo } from "@/lib/serverAction/todo";
import TodoFormState from "./TodoFormState";

const TodoForm = async () => {
  const addTodoFn = async (_: unknown, formData: FormData) => {
    "use server";
    return await addTodo(formData.get("title") as string);
  };

  return (
    <div className="w-full">
      <TodoFormState addTodoFn={addTodoFn} />
    </div>
  );
};

export default TodoForm;

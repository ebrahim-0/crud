import { deleteTodo, updateTodo } from "@/lib/serverAction/todo";
import DeleteTodo from "./DeleteTodo";
import UpdateCheck from "./UpdateCheck";
import UpdateTodo from "./UpdateTodo";

const TodoList = ({ todos }: { todos: { data: Todo[] } }) => {
  const deleteTodoFn = async (_: unknown, formData: FormData) => {
    "use server";
    return await deleteTodo(formData.get("id") as string);
  };

  const updateTodoFn = async (_: unknown, formData: FormData) => {
    "use server";

    const done = formData.get("done") === "true";
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    return await updateTodo(id, done, title);
  };

  return (
    <>
      {todos.data.map((todo: Todo) => (
        <li
          key={todo._id}
          className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
        >
          <UpdateCheck todo={todo} />

          <div className="flex gap-4 items-center">
            <UpdateTodo updateTodoFn={updateTodoFn} id={todo._id} todo={todo} />

            <DeleteTodo deleteTodoFn={deleteTodoFn} id={todo._id} />
          </div>
        </li>
      ))}
    </>
  );
};

export default TodoList;

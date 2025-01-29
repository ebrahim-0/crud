"use client";

import { updateTodo } from "@/lib/serverAction/todo";

const UpdateCheck = ({ todo }: { todo: Todo }) => {
  return (
    <label htmlFor="check" className="flex items-center">
      <input
        id="check"
        readOnly={false}
        type="checkbox"
        checked={todo.done}
        onChange={async (e) => {
          await updateTodo(todo._id, e.target.checked, todo.title);
        }}
        className="mr-3 w-5 h-5 text-blue-500 rounded focus:ring-blue-400"
      />
      <span
        className={`text-lg ${
          todo.done ? "line-through text-gray-500" : "text-gray-800"
        }`}
      >
        {todo.title}
      </span>
    </label>
  );
};

export default UpdateCheck;

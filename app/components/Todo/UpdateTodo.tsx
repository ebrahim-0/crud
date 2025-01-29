"use client";

import { useActionState, useState } from "react";

const UpdateTodo = ({
  id,
  todo,
  updateTodoFn,
}: {
  id: string;
  todo: Todo;
  updateTodoFn: (
    _: unknown,
    formData: FormData
  ) => Promise<{ success: boolean; message: string }>;
}) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const [state, formAction, isPending] = useActionState(updateTodoFn, {
    success: false,
    message: "",
  });

  return (
    <div>
      {isUpdate ? (
        <form
          action={async (formdata) => {
            formdata.append("id", String(id));
            formdata.append("done", String(todo.done));
            formAction(formdata);
            setIsUpdate(false);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            defaultValue={todo.title}
            name="title"
            className="p-1 rounded-lg border border-gray-300 text-gray-800"
          />

          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 p-1 px-2 rounded-lg"
          >
            Update {isPending && "ing..."}
          </button>
          {state?.message && (
            <span className="text-red-500 text-sm ml-2">{state?.message}</span>
          )}
        </form>
      ) : (
        <button
          onClick={() => setIsUpdate(true)}
          className="bg-blue-500 p-1 px-2 rounded-lg"
        >
          Update
        </button>
      )}
    </div>
  );
};

export default UpdateTodo;

"use client";

import { useActionState } from "react";

const DeleteTodo = ({
  id,
  deleteTodoFn,
}: {
  id: string;
  deleteTodoFn: (
    _: unknown,
    formData: FormData
  ) => Promise<{ success: boolean; message: string }>;
}) => {
  const [state, formAction, isPending] = useActionState(deleteTodoFn, {
    success: false,
    message: "",
  });

  return (
    <form
      action={async (formdata) => {
        formdata.append("id", String(id));
        formAction(formdata);
      }}
      className="bg-red-500 p-1 px-2 rounded-lg"
    >
      <button type="submit" disabled={isPending}>
        Delete {isPending && "ing..."}
      </button>
      {state?.message && (
        <span className="text-red-500 text-sm ml-2">{state?.message}</span>
      )}
    </form>
  );
};

export default DeleteTodo;

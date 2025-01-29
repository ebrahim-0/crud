"use client";

import { useActionState } from "react";

const TodoFormState = ({
  addTodoFn,
}: {
  addTodoFn: (
    _: unknown,
    formData: FormData
  ) => Promise<{ success: boolean; message: string }>;
}) => {
  const [state, formAction, isPending] = useActionState(addTodoFn, {
    success: false,
    message: "",
  });

  return (
    <>
      <form className="flex items-center" action={formAction}>
        <input
          type="text"
          name="title"
          className="border border-gray-400 p-2 rounded-lg text-lg text-gray-800 flex-1"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 px-4 rounded-lg ml-2"
          disabled={isPending}
        >
          Add {isPending && "ing..."}
        </button>
      </form>
      {state?.message && (
        <span className="text-red-500 text-sm ml-2">{state?.message}</span>
      )}
    </>
  );
};

export default TodoFormState;

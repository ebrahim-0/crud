/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";

export const getTodos = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/todo`);
  const data = await res.json();
  return data;
};

export const addTodo = async (title: string) => {
  if (!title) return { success: false, message: "Title is required" };

  try {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    revalidatePath("/");
    return { success: true, message: "" };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/todo/${id}`, {
      method: "DELETE",
    });

    revalidatePath("/");
    return { success: true, message: "" };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};

export const updateTodo = async (id: string, done: boolean, title: string) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, done }),
    });

    revalidatePath("/");
    return { success: true, message: "" };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};

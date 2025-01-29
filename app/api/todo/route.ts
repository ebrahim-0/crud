import { connectDB } from "@/lib/db";
import { Todo } from "@/lib/models/todoModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();

  const todos = await Todo.find();

  return NextResponse.json({ data: todos }, { status: 200 });
};

export const POST = async (request: Request) => {
  const res = await request.json();
  const title = res.title;

  if (!title) {
    return NextResponse.json(
      { data: { message: "Title is required" } },
      { status: 400 }
    );
  }
  await connectDB();

  const newTodo = new Todo({
    title,
    done: false,
  });

  await newTodo.save();

  return NextResponse.json({ data: newTodo }, { status: 200 });
};

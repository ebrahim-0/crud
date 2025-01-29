import { connectDB } from "@/lib/db";
import { Todo } from "@/lib/models/todoModel";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  await connectDB();

  const todo = await Todo.findById(id);

  if (!todo) {
    return NextResponse.json(
      { data: { message: "Not found" } },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: todo }, { status: 200 });
};

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const res = await request.json();
  const { title, done } = res;

  await connectDB();

  const todo = await Todo.findById(id);

  if (!todo) {
    return NextResponse.json(
      { data: { message: "Not found" } },
      { status: 404 }
    );
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { title, done },
    { new: true }
  );

  return NextResponse.json({ data: updatedTodo }, { status: 200 });
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  console.log("🚀 ~ id:", id);

  await connectDB();

  const todo = await Todo.findById(id);
  if (!todo) {
    return NextResponse.json(
      { data: { message: "Not found" } },
      { status: 404 }
    );
  }

  await Todo.findByIdAndDelete(id);

  return NextResponse.json(
    { data: { message: "todo deleted" } },
    { status: 200 }
  );
};

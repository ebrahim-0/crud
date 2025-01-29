import { model, models, Schema } from "mongoose";

const todoSchema: Schema<Todo> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Todo = models.Todo || model<Todo>("Todo", todoSchema);

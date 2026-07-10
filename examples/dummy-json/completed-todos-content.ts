import { Iterator } from "@/lib/iterator.js";
import type { TodosResponse } from "./types.js";

export async function getCompletedTodosTexts() {
  const response = await fetch("https://dummyjson.com/todos");
  if (!response.ok) {
    console.error("Dummy JSON couldn't return todos");
    process.exit(1);
  }

  const { todos } = await response.json() as TodosResponse;

  return Iterator
    .filter(todo => todo.completed, todos)
    .map(todo => `[x] Todo '${todo.id}': ${todo.todo}`);
}

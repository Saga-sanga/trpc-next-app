"use client";
import { trpc } from "../_trpc/client";
import { useState } from "react";

export default function TodoList() {
  const utils = trpc.useContext();
  const getTodos = trpc.getTodos.useQuery();
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => utils.getTodos.invalidate(),
  });
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (content.length) {
      addTodo.mutate(content);
      setContent("");
    }
  }

  return (
    <div>
      <div>{JSON.stringify(getTodos.data)}</div>
      <div>
        <label htmlFor="content">Content</label>
        <input
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" ? handleSubmit() : null}
          className="text-black"
          type="text"
        />
        <button
          onClick={handleSubmit}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}

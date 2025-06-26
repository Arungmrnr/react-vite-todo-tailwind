import React, { useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), done: false }
    ]);
    setInput("");
  }

  function toggleTodo(id: number) {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function deleteTodo(id: number) {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
        <form onSubmit={addTodo} className="flex mb-6 gap-2">
          <input
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add a new todo"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </form>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
            >
              <span
                className={`flex-1 cursor-pointer ${todo.done ? "line-through text-gray-400" : ""}`}
                onClick={() => toggleTodo(todo.id)}
                title="Toggle complete"
              >
                {todo.text}
              </span>
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => deleteTodo(todo.id)}
                title="Delete"
              >
                &#10005;
              </button>
            </li>
          ))}
          {todos.length === 0 && (
            <li className="text-gray-400 text-center">No todos yet!</li>
          )}
        </ul>
      </div>
    </div>
  );
}
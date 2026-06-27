import { useState } from "react";
import TodoInput from "../../components/Todo/TodoInput/TodoInput";
import TodoItem from "../../components/Todo/TodoItem/TodoItem";

function Todo() {
  const [todos, setTodos] = useState([]);

  function addTask(task) {
    if (!task.trim()) return;

    const taskObj = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTodos((prev) => [...prev, taskObj]);
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function editTodo(id, newText) {
    if (!newText.trim()) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText }
          : todo
      )
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-5xl font-bold text-center text-[#0b57d0] mb-10">
        Todo List
      </h1>

      <TodoInput addTask={addTask} />

      <div className="mt-8 flex flex-col gap-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            onEdit={editTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default Todo;
import { useEffect, useState } from "react";
import TodoInput from "../../components/Todo/TodoInput/TodoInput";
import TodoItem from "../../components/Todo/TodoItem/TodoItem";

function Todo() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState("all")

  let filteredTodos = todos;

  if (filter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  }

  if (filter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

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

  function clearCompleted() {
    setTodos((prev) =>
      prev.filter((todo) => !todo.completed));
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const remainingCount = todos.length - completedCount;

  const quotes = [
    '"Doing what you love is the cornerstone of having abundance in your life." – Wayne Dyer',
    '"The secret of getting ahead is getting started." – Mark Twain',
    '"It always seems impossible until it\'s done." – Nelson Mandela',
    '"Focus on being productive instead of busy." – Tim Ferriss',
    '"You don\'t have to be great to start, but you have to start to be great." – Zig Ziglar',
  ];
  const quote = quotes[todos.length % quotes.length];

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto px-6 py-12 md:py-20">

      {/* Header */}
      <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">
        Your To Do
      </h1>

      {/* Input */}
      <TodoInput addTask={addTask} />

      {/* Filter tabs — minimal text links */}
      {todos.length > 0 && (
        <div className="flex gap-5 mt-6 mb-2">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm font-semibold capitalize pb-0.5 transition-all duration-150 cursor-pointer ${
                filter === f
                  ? "text-[#0b57d0] border-b-2 border-[#0b57d0]"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}

          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="text-sm font-semibold text-red-400 hover:text-red-600 transition-colors duration-150 cursor-pointer ml-auto"
            >
              Clear done
            </button>
          )}
        </div>
      )}

      {/* Task list */}
      <div className="mt-4 flex flex-col gap-3">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
              onEdit={editTodo}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm mt-8 font-medium">
            {filter === "all" ? "No tasks yet — add one above!" : `No ${filter} tasks.`}
          </p>
        )}
      </div>

      {/* Footer */}
      {todos.length > 0 && (
        <div className="mt-10 space-y-3">
          <p className="text-sm font-bold text-gray-700">
            Your remaining todos :{" "}
            <span className="text-[#0b57d0]">{remainingCount}</span>
          </p>
          <p className="text-sm text-gray-400 italic leading-relaxed">
            {quote}
          </p>
        </div>
      )}
    </div>
  );
}

export default Todo;
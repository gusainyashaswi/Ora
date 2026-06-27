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
    filteredTodos = todos.filter((todo) => !todo.completed);}

    if (filter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);}

    useEffect(()=>{
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
    prev.filter((todo) => !todo.completed));}

    const completedCount = todos.filter(todo => todo.completed).length;
    const remainingCount = todos.length - completedCount;

    return (
        <div className="max-w-3xl mx-auto py-10 px-6">

            <div className="flex gap-4 my-6">
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("active")}>Active</button>
                <button onClick={() => setFilter("completed")}>Completed</button>
            </div>

            <h1 className="text-5xl font-bold text-center text-[#0b57d0] mb-10">
                Todo List
            </h1>

            <div className="flex justify-between text-gray-500 text-lg mb-6">
                <p>Total: {todos.length}</p>
                <p>Completed: {completedCount}</p>
                <p>Remaining: {remainingCount}</p>
            </div>

            <TodoInput addTask={addTask} />

            {completedCount > 0 && (
            <button onClick={clearCompleted} className="rounded-lg border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition-all ml-80">Clear Completed</button>)}

            <div className="mt-8 flex flex-col gap-4">
                {filteredTodos.map((todo) => (
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
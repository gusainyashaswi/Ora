import { useState } from "react";

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  function saveHandler() {
    onEdit(todo.id, editedText);
    setIsEditing(false);
  }

  return (
    <div
      className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl border transition-all duration-200 group ${
        todo.completed
          ? "bg-gray-50 border-gray-200"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
          todo.completed
            ? "bg-gray-600 border-none"
            : "border-gray-400 hover:border-3"
        }`}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveHandler();
              if (e.key === "Escape") {
                setEditedText(todo.text);
                setIsEditing(false);
              }
            }}
            onBlur={saveHandler}
            autoFocus
            className="w-full bg-transparent border-b-2 border-gray-600 outline-none text-sm font-medium text-gray-800 py-0.5"
          />
        ) : (
          <p
            onDoubleClick={() => setIsEditing(true)}
            className={`text-sm font-medium truncate transition-all duration-200 cursor-default ${
              todo.completed
                ? "line-through text-gray-400"
                : "text-gray-800"
            }`}
            title="Double-click to edit"
          >
            {todo.text}
          </p>
        )}
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 text-gray-400 hover:text-gray-700 transition-colors duration-150 cursor-pointer text-lg leading-none font-medium opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Delete task"
      >
        ×
      </button>
    </div>
  );
}

export default TodoItem;
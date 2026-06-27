import { useState } from "react";

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  function saveHandler() {
    onEdit(todo.id, editedText);
    setIsEditing(false);
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 px-5 py-4 shadow-sm hover:shadow-md transition-all duration-200">

      <div className="flex items-center gap-4 flex-1">

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5 accent-[#0b57d0]"
        />

        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="border rounded-lg px-3 py-1 flex-1 outline-none"
          />
        ) : (
          <p
            className={`text-xl ${
              todo.completed
                ? "line-through text-gray-400"
                : "text-gray-900"
            }`}
          >
            {todo.text}
          </p>
        )}

      </div>

      <div className="flex gap-3">

        {isEditing ? (
          <button
            onClick={saveHandler}
            className="rounded-lg border border-green-600 px-4 py-2 text-green-600 hover:bg-green-600 hover:text-white transition-all"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(todo.id)}
          className="rounded-lg border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition-all"
        >
          Delete
        </button>

      </div>
    </div>
  );
}

export default TodoItem;
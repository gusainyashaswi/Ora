import { useState } from 'react'

function TodoInput({ addTask }) {
  const [input, setInput] = useState("")

  function clickHandler() {
    if (!input.trim()) return;
    addTask(input)
    setInput("")
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        value={input}
        placeholder="Add new task"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") clickHandler();
        }}
        className="flex-1 border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-gray-700 placeholder-gray-400 text-base font-medium outline-none focus:border-[#0b57d0] transition-colors duration-200"
      />

      <button
        onClick={clickHandler}
        className="w-12 h-12 rounded-2xl bg-gray-800 hover:bg-green-600 hover:text-black text-white text-2xl font-light flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md flex-shrink-0"
        aria-label="Add task"
      >
        +
      </button>
    </div>
  )
}

export default TodoInput
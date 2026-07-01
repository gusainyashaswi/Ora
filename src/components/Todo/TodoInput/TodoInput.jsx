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
        className="flex-1 border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-gray-700 placeholder-gray-400 text-base font-medium outline-none focus:border-gray-600 transition-colors duration-200"
      />

      <button
        onClick={clickHandler}
        className="w-12 h-12 rounded-2xl bg-white hover:bg-gray-600 hover:text-white text-gray-400 text-2xl font-light flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md flex-shrink-0"
        aria-label="Add task"
      >
        <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
      </button>
    </div>
  )
}

export default TodoInput
import { useState } from 'react'

function TodoInput({addTask}) {

    const [input, setInput] = useState("")

    function clickHandler(){
        if(!input.trim()) return;
        addTask(input)
        setInput("")
    }

  return (
    <>
        <input type="text" value={input} placeholder="Enter Task" onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter") {clickHandler();}}}/>
            
        <button onClick={clickHandler}>Add Task</button>
    </>
  )
}

export default TodoInput
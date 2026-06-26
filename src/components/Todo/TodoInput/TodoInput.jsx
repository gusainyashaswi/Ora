import React from 'react'
import { useState } from 'react'

function TodoInput({addTask}) {

    const [input, setInput] = useState("")

    function clickHandler(){
        addTask(input)
        setInput("")
    }

  return (
    <>
        <input type="text" placeholder='Enter Task' onChange={(e)=>setInput(e.target.value)}/>
        <button onClick={clickHandler}>Add Task</button>
    </>
  )
}

export default TodoInput
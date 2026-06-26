import React, { useState } from 'react'
import TodoInput from "../../components/Todo/TodoInput"
import TodoItem from '../../components/Todo/TodoItem/TodoItem'
function Todo() {

    const [Todos, setTodos] = useState([])

    function addTask(task){
        const taskObj = {
            id : Date.now(),
            text : task,
            completed : false
        }

        setTodos((prev)=>[...prev, taskObj])
    }

  return (
    <>
        <TodoInput addTask={addTask}/>
        {Todos.map((todos)=>
            <TodoItem key={todos.id} text={todos.text}/>
        )}
        


    </>
  )
}

export default Todo
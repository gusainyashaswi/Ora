import React, { useEffect, useState } from 'react'

function StopWatch() {


  let [seconds, setseconds] = useState(0)
  const [isrunning, setIsRunning] = useState(false)

  const hours = String(Math.floor(seconds / 3600)).padStart(2,"0");
  const remainingSeconds = seconds % 3600;
  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2,"0");
  const secs = String(remainingSeconds % 60).padStart(2,"0");


  useEffect(()=>{
    if(!isrunning) return;
    const period = setInterval(() => {
      setseconds((prev)=>prev+1)
    }, 1000);
    return()=>{
      clearInterval(period)
  }

  }, [isrunning])

  function resetHandler(){
    setIsRunning(false)
    setseconds(0)
  }

  const btnStyle = "px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"

  return (
    <>
      <div className="flex flex-col items-center text-[#0b57d0]">
        <h1 className="text-[320px] font-bold leading-none">
          {hours}:{minutes}:{secs}
        </h1>
      </div>
      <div className='flex justify-center flex-row gap-10 text-xl'>

        {isrunning? <button className={`${btnStyle}`} onClick={()=>setIsRunning(false)}>Stop</button> 
        :<button className={`${btnStyle}`} onClick={()=>setIsRunning(true)}>Start</button>}

        <button className={btnStyle} onClick={resetHandler}>Reset</button>
        
      </div>
    </>
  )
}

export default StopWatch
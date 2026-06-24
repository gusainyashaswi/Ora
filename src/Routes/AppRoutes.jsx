import { Route, Routes } from "react-router-dom";
import React from 'react'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import StopWatch from '../Pages/StopWatch/StopWatch'
import Timer from '../Pages/Timer/Timer'
import WorldClock from '../Pages/WorldClock/WorldClock'


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/stopwatch" element={<StopWatch/>}/>
      <Route path="/timer" element={<Timer/>}/>
      <Route path="/worldclock" element={<WorldClock/>}/>
    </Routes>
  )
}

export default AppRoutes
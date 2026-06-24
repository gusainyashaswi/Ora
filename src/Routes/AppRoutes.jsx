import { Route, Routes } from "react-router-dom";
import React from 'react'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import StopWatch from '../Pages/StopWatch/StopWatch'
import Timer from '../Pages/Timer/Timer'
import WorldClock from '../Pages/WorldClock/WorldClock'
import MainLayout from "../layouts/MainLayout";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <MainLayout>
          <Home/>
        </MainLayout>
      }/>

      <Route path="/stopwatch" element={
        <MainLayout>
          <StopWatch/>
        </MainLayout>
      }/>

      <Route path="/timer" element={
        <MainLayout>
          <Timer/>
        </MainLayout>
      }/>

      <Route path="/worldclock" element={
        <MainLayout>
          <WorldClock/>
        </MainLayout>
      }/>

      <Route path="/login" element={<Login/>}/>
      
    </Routes>
  )
}

export default AppRoutes
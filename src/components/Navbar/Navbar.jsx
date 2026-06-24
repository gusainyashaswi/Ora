import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>

        <div>
         <NavLink to="/" className='text-4xl'>ORA</NavLink>
        </div>

        <div>
          
          <NavLink to="/" className={({ isActive }) =>
          isActive ? "font-black" : ""
          }>Home</NavLink>{" "}

          <NavLink to="/timer" className={({ isActive }) =>
          isActive ? "font-black" : ""
          }>Timer</NavLink>{" "}

          <NavLink to="/stopwatch" className={({ isActive }) =>
          isActive ? "font-black" : ""
          }>Stopwatch</NavLink>{" "}

          <NavLink to="/worldclock" className={({ isActive }) =>
          isActive ? "font-black" : ""
          }>World Clock</NavLink>{" "}

        </div>

        <div>
          <NavLink to="/login">Login</NavLink>
        </div>

    </nav>
  )
}

export default Navbar
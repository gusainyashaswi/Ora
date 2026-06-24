import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {

    const navLinkStyle = ({ isActive }) =>
    isActive
      ? "font-bold text-blue-600"
      : "text-gray-700 hover:text-blue-600 transition-colors duration-200";

  return (
    <nav className="flex items-center justify-between px-10 py-5 border-b border-gray-200 bg-white">

        <div>
         <NavLink to="/" className="text-4xl font-extrabold text-blue-600">ORA</NavLink>
        </div>

        <div className="flex items-center gap-10 text-lg">
          
          <NavLink to="/" className={navLinkStyle}>Home</NavLink>{" "}

          <NavLink to="/timer" className={navLinkStyle}>Timer</NavLink>{" "}

          <NavLink to="/stopwatch" className={navLinkStyle}>Stopwatch</NavLink>{" "}

          <NavLink to="/worldclock" className={navLinkStyle}>World Clock</NavLink>{" "}

        </div>

        <div>
          <NavLink to="/login" className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200">Login</NavLink>
        </div>

    </nav>
  )
}

export default Navbar
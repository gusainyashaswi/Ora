import React, { use } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

function Navbar() {

    const navigate = useNavigate()
    const {logout} = useAuth()

    const navLinkStyle = ({ isActive }) =>
    isActive
      ? "font-bold text-blue-600"
      : "text-gray-700 hover:text-blue-600 transition-colors duration-200";


    function logoutHandler(){
      logout();
      navigate("/login");
    }

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

          <NavLink to="/todo" className={navLinkStyle}>Todos</NavLink>{" "}

        </div>

        <div>
          <NavLink to="/login" className="rounded-lg border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition-all" onClick={logoutHandler}>Logout</NavLink>
        </div>

    </nav>
  )
}

export default Navbar
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
        <h1>
            Ora
        </h1>
        
        <Link to="/">Home</Link>
        <Link to="/timer">Timer</Link>
        <Link to="/stopwatch">Stopwatch</Link>
        <Link to="/worldclock">World Clock</Link>
        <Link to="/login">Login</Link>

    </nav>
  )
}

export default Navbar
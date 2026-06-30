import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-[11px] font-black text-black uppercase tracking-[0.15em] relative py-1.5 transition-all duration-200 after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-black after:rounded-full"
      : "text-[11px] font-bold text-gray-400 hover:text-gray-650 uppercase tracking-[0.15em] py-1.5 transition-all duration-200";

  function logoutHandler() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl flex items-center justify-between px-8 py-3 rounded-[1.8rem] bg-white/80 backdrop-blur-md border border-white/30 shadow-lg shadow-black/[0.02] backdrop-saturate-150 transition-all duration-300">
      
      <div>
        <NavLink 
          to="/" 
          className="text-lg font-black tracking-[0.35em] text-slate-800 hover:text-black transition-all font-sans select-none pl-[0.35em]"
        >
          ORA
        </NavLink>
      </div>

      <div className="flex items-center gap-8 md:gap-10">
        <NavLink to="/" className={navLinkStyle}>Home</NavLink>
        <NavLink to="/timer" className={navLinkStyle}>Timer</NavLink>
        <NavLink to="/stopwatch" className={navLinkStyle}>Stopwatch</NavLink>
        <NavLink to="/worldclock" className={navLinkStyle}>World Clock</NavLink>
        <NavLink to="/todo" className={navLinkStyle}>Todos</NavLink>
      </div>

      <div>
        <button 
          onClick={logoutHandler}
          className="rounded-full border border-red-200 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 cursor-pointer"
        >
          Logout
        </button>
      </div>

    </nav>
  );
}

export default Navbar;
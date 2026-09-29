import Navbar from '../components/Navbar/Navbar'
import { Component as CursorFollower } from '../components/ui/cursor-follower'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className="app-shell bg-[#ebebeb] min-h-screen">
      <Navbar />
      <main className="pt-28 pb-12">
        <Outlet />
      </main>
      <CursorFollower />
    </div>
  );
}

export default MainLayout;
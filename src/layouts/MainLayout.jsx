import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className="bg-[#ebebeb] min-h-screen">
      <Navbar />
      <main className="pt-28 pb-12">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
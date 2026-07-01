import { Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import { Outlet } from 'react-router-dom';

function ProtectedRoute({children}) {

    const { user, loading } = useAuth();

    if (loading) {
        return (
        <div className='flex justify-center items-center h-screen'>
            <h1 className='font-bold text-6xl italic'>Just a moment...</h1>;
        </div>
    )
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }   
    return children;
}

export default ProtectedRoute
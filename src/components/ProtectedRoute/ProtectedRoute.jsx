import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

function ProtectedRoute({children}) {

    const {isLoggedIn} = useAuth()

    if(!isLoggedIn) return <Navigate to="/Login" replace />;

    return children;
}

export default ProtectedRoute
import { Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

function PublicRoute({children}) {

    const { user, loading } = useAuth();
  if (loading) {
    return <h1>Just a moment...</h1>;
  }
  if (user) {
    return <Navigate to="/" replace />;
  }

return children;
}

export default PublicRoute
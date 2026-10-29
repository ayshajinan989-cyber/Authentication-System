
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

function ProtectedRoute() {
    const { isLoading, isAuthenticated } = useContext(AuthContext);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;

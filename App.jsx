import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Navigate
} from 'react-router-dom';

import { useContext } from 'react';
import AuthProvider, { AuthContext } from './contexts/AuthContext.jsx';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function HomeRedirect() {
    const { isLoading, isAuthenticated } = useContext(AuthContext);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <Navigate
            to={isAuthenticated() ? '/dashboard' : '/login'}
            replace
        />
    );
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </>
    )
);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;

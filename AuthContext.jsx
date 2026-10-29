
import { createContext, useState, useEffect } from 'react';
import api from '../services/authApi.jsx';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Restore user after refresh
    async function fetchCurrentUser() {
        const userID = localStorage.getItem('userID');

        if (!userID) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.get(`/users/${userID}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            localStorage.removeItem('userID');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    function isAuthenticated() {
        return !!user;
    }

    // Login
    async function login(credentials) {
        const response = await api.get(
            `/users?email=${encodeURIComponent(credentials.email)}`
        );

        if (response.data.length === 0) {
            throw new Error('User not found!');
        }

        const foundUser = response.data[0];

        if (foundUser.password !== credentials.password) {
            throw new Error('Incorrect password!');
        }

        localStorage.setItem('userID', String(foundUser.id));
        setUser(foundUser);

        return foundUser;
    }

    // Check username availability
    async function checkUsername(username) {
        const response = await api.get(
            `/users?username=${encodeURIComponent(username)}`
        );

        return response.data.length === 0;
    }

    // Register
    async function register(userData) {
        const usernameAvailable = await checkUsername(userData.username);

        if (!usernameAvailable) {
            throw new Error('Username is already taken!');
        }

        const response = await api.post('/users', {
            ...userData,
            avatar: userData.avatar || '',
            createdAt: new Date().toISOString()
        });

        const newUser = response.data;

        localStorage.setItem('userID', String(newUser.id));
        setUser(newUser);

        return newUser;
    }

    // Logout
    function logout() {
        localStorage.removeItem('userID');
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                register,
                logout,
                isAuthenticated,
                fetchCurrentUser,
                checkUsername
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

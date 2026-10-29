
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { validateLogin } from '../utils/validation.jsx';

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setValues(previous => ({
            ...previous,
            [name]: value
        }));

        setErrors(previous => ({
            ...previous,
            [name]: ''
        }));

        setMessage('');
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validateLogin(values);
        setErrors(validationErrors);
        setMessage('');

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            setIsSubmitting(true);

            await login(values);
            navigate('/dashboard', { replace: true });
        } catch (error) {
            setMessage(error.message || 'Login failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#F4F6FA]">
            <div className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold text-[#172033]">
                        Welcome back!
                    </h2>
                    <p className="mt-2 text-gray-500">
                        Please sign in to your account 😊
                    </p>
                </div>

                <div className="p-8 bg-white rounded-[20px] shadow-lg">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <label htmlFor="email" className="font-medium text-[#172033]">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            autoComplete="email"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#8DA7F0] transition-colors"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600">{errors.email}</p>
                        )}

                        <label htmlFor="password" className="font-medium text-[#172033]">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#8DA7F0] transition-colors"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-600">{errors.password}</p>
                        )}

                        {message && (
                            <p role="alert" className="text-sm text-red-600">
                                {message}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#8DA7F0] text-white cursor-pointer rounded-full p-3 mt-4 font-semibold transition-colors hover:bg-[#7990D1] disabled:opacity-60"
                        >
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <p className="mt-5 text-center text-sm text-gray-600">
                        Don't have an account yet?{' '}
                        <NavLink
                            className="text-blue-500 font-semibold hover:underline"
                            to="/register"
                        >
                            Create one!
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;

import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { validateRegister } from '../utils/validation.jsx';

function Register() {
    const { register, checkUsername } = useContext(AuthContext);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);

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

    async function handleUsernameBlur() {
        const username = values.username.trim();

        if (!username || username.length < 3 || username.length > 20) {
            return;
        }

        setIsCheckingUsername(true);

        try {
            const available = await checkUsername(username);

            setErrors(previous => ({
                ...previous,
                username: available ? '' : 'Username is already taken!'
            }));
        } catch {
            setErrors(previous => ({
                ...previous,
                username: 'Could not check username. Try again.'
            }));
        } finally {
            setIsCheckingUsername(false);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validateRegister(values);
        setErrors(validationErrors);
        setMessage('');

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            setIsSubmitting(true);

            const available = await checkUsername(values.username.trim());

            if (!available) {
                setErrors(previous => ({
                    ...previous,
                    username: 'Username is already taken!'
                }));
                return;
            }

            await register({
                fullName: values.fullName.trim(),
                username: values.username.trim(),
                email: values.email.trim(),
                password: values.password,
                avatar: ''
            });

            navigate('/dashboard', { replace: true });
        } catch (error) {
            setMessage(error.message || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#F4F6FA]">
            <div className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold text-[#172033]">
                        Create an account
                    </h2>
                    <p className="mt-2 text-gray-500">
                        Please enter the following details 👇
                    </p>
                </div>

                <div className="p-8 bg-white rounded-[20px] shadow-lg">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <label htmlFor="fullName" className="font-medium text-[#172033]">
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            value={values.fullName}
                            onChange={handleChange}
                            type="text"
                            autoComplete="name"
                            placeholder="Enter your full name"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#8DA7F0] transition-colors"
                        />
                        {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}

                        <label htmlFor="username" className="font-medium text-[#172033]">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleUsernameBlur}
                            type="text"
                            autoComplete="username"
                            placeholder="Choose a username"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#8DA7F0] transition-colors"
                        />
                        {isCheckingUsername && (
                            <p className="text-sm text-gray-500">Checking username...</p>
                        )}
                        {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}

                        <label htmlFor="email" className="font-medium text-[#172033]">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            type="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#8DA7F0] transition-colors"
                        />
                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}

                        <label htmlFor="password" className="font-medium text-[#172033]">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            type="password"
                            autoComplete="new-password"
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#8DA7F0] transition-colors"
                        />
                        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}

                        <label htmlFor="confirmPassword" className="font-medium text-[#172033]">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            type="password"
                            autoComplete="new-password"
                            placeholder="Enter the same password"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#8DA7F0] transition-colors"
                        />
                        {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}

                        {message && (
                            <p role="alert" className="text-sm text-red-600">
                                {message}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting || isCheckingUsername}
                            className="bg-[#8DA7F0] text-white cursor-pointer rounded-full p-3 mt-4 font-semibold transition-colors hover:bg-[#7990D1] disabled:opacity-60"
                        >
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                    </form>

                    <p className="mt-5 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <NavLink
                            to="/login"
                            className="text-blue-500 font-semibold hover:underline"
                        >
                            Login
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;

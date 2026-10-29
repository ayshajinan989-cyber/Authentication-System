
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

function DashboardNavbar() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login', { replace: true });
    }

    return (
        <nav className="flex items-center justify-between bg-[#172033] px-6 py-4 text-white">
            <h2 className="rounded-tl-[30px] rounded-tr-[30px] rounded-br-[10px] rounded-bl-[10px] bg-[#BFF2EA] p-3 text-xl font-bold text-[#172033] hover:text-[#5672C4] transition-colors">
                Authentica
            </h2>

            <div className="flex items-center gap-5">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-red-500 font-bold'
                            : 'text-white hover:text-red-400'
                    }
                >
                    User Profile
                </NavLink>

                <button
                    onClick={handleLogout}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-700 cursor-pointer transition-colors"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default DashboardNavbar;

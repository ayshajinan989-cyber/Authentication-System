
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import DashboardNavbar from '../components/Navbar.jsx';

function Dashboard() {
    const { user } = useContext(AuthContext);

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#F4F6FA]">
            <DashboardNavbar />

            <main className="mx-auto max-w-3xl p-6">
                <div className="rounded-[20px] bg-white p-8 shadow-lg">
                    <h1 className="mb-2 text-3xl font-bold text-[#172033]">
                        Welcome, {user.fullName}!
                    </h1>

                    <p className="mb-6 text-gray-500">
                        Your account profile
                    </p>

                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-semibold text-[#172033]">
                                {user.fullName}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Username</p>
                            <p className="font-semibold text-[#172033]">
                                @{user.username}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-semibold text-[#172033]">
                                {user.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Member Since</p>
                            <p className="font-semibold text-[#172033]">
                                {user.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString()
                                    : 'Not available'}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;

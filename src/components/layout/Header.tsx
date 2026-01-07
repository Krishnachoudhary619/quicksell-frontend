
'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href="/dashboard" className="text-2xl font-bold text-gray-800">
                            Dashboard
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <span className="text-gray-800">Welcome, {user?.name}</span>
                            <button
                                onClick={logout}
                                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

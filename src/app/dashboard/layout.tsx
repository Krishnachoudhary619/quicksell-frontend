
'use client';

import withAuth from '@/components/withAuth';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BottomNav from '@/components/layout/BottomNav';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
            <BottomNav />
        </div>
    );
};

export default withAuth(DashboardLayout);

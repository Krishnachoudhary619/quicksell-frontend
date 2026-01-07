
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated, router]);

    if (isLoading) {
        return <div>Loading...</div>; // Or a proper loading spinner
    }

    return <>{children}</>;
};

export default AuthGuard;


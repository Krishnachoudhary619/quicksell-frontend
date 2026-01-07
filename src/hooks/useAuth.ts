
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import
import { api } from '@/api/api-service';
import { TUser } from '@/types/api.response';

export const useAuth = () => {
    const [user, setUser] = useState<TUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Replace with your actual auth check
                const response = await api.auth.getProfile();
                if (response.success && response.data) {
                    setUser(response.data);
                } else {
                    router.push('/login');
                }
            } catch (error) {
                router.push('/login');
            }
            setLoading(false);
        };

        fetchUser();
    }, [router]);

    const login = async (credentials: any) => {
        try {
            const response = await api.auth.login(credentials);
            if (response.success && response.data) {
                setUser(response.data);
                router.push('/');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = () => {
        setUser(null);
        router.push('/login');
    };

    return { user, login, logout, loading };
};


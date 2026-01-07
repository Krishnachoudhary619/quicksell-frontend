
'use client';

import { useAuth } from '@/hooks/useAuth';

// For now, we'll simulate roles. In a real app, this would come from the user object.
type TUserRole = 'ADMIN' | 'STAFF';

export const useRole = () => {
    const { user } = useAuth();

    // Simulate role based on user data. This can be replaced with a real role from the API.
    const role: TUserRole = user?.email?.includes('admin') ? 'ADMIN' : 'STAFF';

    return { role };
};

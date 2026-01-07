
import { create } from 'zustand';
import { TUser } from '@/types/api.response';

interface AuthState {
    user: TUser | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    login: (user: TUser, accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    login: (user, accessToken, refreshToken) => {
        set({ user, accessToken, refreshToken, isAuthenticated: true });
    },
    logout: () => {
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
    },
}));

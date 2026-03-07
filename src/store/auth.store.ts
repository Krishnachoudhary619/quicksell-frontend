import { create } from "zustand";
import { persist } from "zustand/middleware";
import { VerifyOtpResponse } from "@/types/auth.types";

interface AuthState {
    user: VerifyOtpResponse["user"] | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    setAuth: (data: VerifyOtpResponse) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            setAuth: (data: VerifyOtpResponse) => {
                set({
                    user: data.user,
                    accessToken: data.access_token,
                    refreshToken: data.refresh_token,
                    isAuthenticated: true,
                });
            },

            logout: () => {
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                });
            },
        }),
        {
            name: "quickshare-auth",
        }
    )
);

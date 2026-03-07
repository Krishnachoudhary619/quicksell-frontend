"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export const useAuthGuard = () => {
    const { accessToken, isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        // 1. Check if accessToken exists in Zustand store
        if (!accessToken) {
            // 2. If not found, check localStorage for the persisted state
            const persistedAuth = localStorage.getItem("quickshare-auth");

            if (persistedAuth) {
                try {
                    const parsed = JSON.parse(persistedAuth);
                    // If even the persisted state has no token, redirect
                    if (!parsed.state?.accessToken) {
                        router.push("/login");
                    }
                } catch (error) {
                    router.push("/login");
                }
            } else {
                // 3. If no token exists at all, redirect to /login
                router.push("/login");
            }
        }
    }, [accessToken, router]);

    return { isAuthenticated, accessToken };
};

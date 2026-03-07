import axios from "axios";
import { API_CONFIG } from "@/config/constants";
import { ENDPOINTS } from "./endpoints";
import { useAuthStore } from "@/store/auth.store";

export const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach token automatically from Zustand store
api.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

// Response interceptor for handling 401 and token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { refreshToken, setAuth, logout } = useAuthStore.getState();

                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                // Call the refresh token API
                const response = await axios.post(
                    `${API_CONFIG.BASE_URL}${ENDPOINTS.AUTH.REFRESH_TOKEN}`,
                    {
                        refresh_token: refreshToken,
                    }
                );

                const { access_token } = response.data.data;

                // Update the store with the new access token
                // Note: We might need to keep the user and refresh token, 
                // but since setAuth expects VerifyOtpResponse, we'll need to handle it carefully.
                // Assuming the store has a way to just update the token or we re-fetch user.
                // For simplicity, let's assume we update the state directly if needed or use setAuth.

                const currentState = useAuthStore.getState();
                if (currentState.user) {
                    setAuth({
                        access_token,
                        refresh_token: refreshToken, // keep existing refresh token
                        user: currentState.user
                    });
                }

                // Update authorization header and retry original request
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Clear store and redirect to login if refresh fails
                useAuthStore.getState().logout();

                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

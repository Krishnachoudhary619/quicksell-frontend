import axios from "axios";
import { API_CONFIG, STORAGE_KEYS } from "@/config/constants";
import { ENDPOINTS } from "./endpoints";

export const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach token automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
                const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                // Call the refresh token API directly using the base URL and endpoint
                const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.AUTH.REFRESH_TOKEN}`, {
                    refresh_token: refreshToken,
                });

                const { access_token } = response.data.data;

                // Save new access token
                localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);

                // Update authorization header and retry original request
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Clear tokens and redirect to login if refresh fails
                localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
                localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
                localStorage.removeItem(STORAGE_KEYS.USER);

                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

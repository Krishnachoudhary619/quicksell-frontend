import { useState } from "react";
import { sendOtp as sendOtpService, verifyOtp as verifyOtpService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const setAuth = useAuthStore((state) => state.setAuth);

    const sendOtp = async (phone: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await sendOtpService(phone);
            if (!response.success) {
                throw new Error(response.message || "Failed to send OTP");
            }
            return response;
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Something went wrong";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async (phone: string, otp: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await verifyOtpService(phone, otp);
            if (response.success && response.data) {
                setAuth(response.data);
            } else {
                throw new Error(response.message || "Invalid OTP");
            }
            return response;
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Verification failed";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        sendOtp,
        verifyOtp,
        loading,
        error,
    };
};

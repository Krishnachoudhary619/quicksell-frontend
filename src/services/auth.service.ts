import { api } from "@/services/api";
import { ENDPOINTS } from "@/services/endpoints";
import { ApiResponse } from "@/types/api.types";
import { VerifyOtpResponse } from "@/types/auth.types";

export const sendOtp = async (phone: string): Promise<ApiResponse<any>> => {
    const res = await api.post(ENDPOINTS.AUTH.SEND_OTP, { phone });
    return res.data;
};

export const verifyOtp = async (
    phone: string,
    otp: string
): Promise<ApiResponse<VerifyOtpResponse>> => {
    const res = await api.post(ENDPOINTS.AUTH.VERIFY_OTP, {
        phone,
        otp,
    });

    return res.data;
};

export const refreshToken = async (
    token: string
): Promise<ApiResponse<{ access_token: string }>> => {
    const res = await api.post(ENDPOINTS.AUTH.REFRESH_TOKEN, {
        refresh_token: token,
    });
    return res.data;
};

export const logout = async (refreshToken: string): Promise<ApiResponse<any>> => {
    const res = await api.post(ENDPOINTS.AUTH.LOGOUT, {
        refresh_token: refreshToken,
    });
    return res.data;
};

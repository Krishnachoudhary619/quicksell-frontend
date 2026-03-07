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

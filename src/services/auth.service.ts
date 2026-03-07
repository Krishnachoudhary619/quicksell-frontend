import { api } from "./api";
import { ENDPOINTS } from "./endpoints";

export const sendOtp = async (phone: string) => {
    const res = await api.post(ENDPOINTS.AUTH.SEND_OTP, { phone });
    return res.data;
};

export const verifyOtp = async (phone: string, otp: string) => {
    const res = await api.post(ENDPOINTS.AUTH.VERIFY_OTP, {
        phone,
        otp,
    });

    return res.data;
};

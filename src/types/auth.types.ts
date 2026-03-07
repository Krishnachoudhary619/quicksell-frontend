export interface VerifyOtpResponse {
    access_token: string;
    refresh_token: string;
    user: {
        id: string;
        role: "ADMIN" | "STAFF";
        shop_id: string;
    };
}

export interface SendOtpRequest {
    phone: string;
}

export interface VerifyOtpRequest {
    phone: string;
    otp: string;
}

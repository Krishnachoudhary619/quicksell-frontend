export interface UserProfile {
    id: string;
    name: string;
    phone: string;
    role: "ADMIN" | "STAFF";
    shop_id: string;
}

export interface UpdateMyProfileRequest {
    name: string;
}

export interface ShopDetails {
    id: string;
    shop_name?: string;
    shop_phone?: string;
    shop_email?: string;
    shop_address?: string;
    shop_logo_url?: string;
    is_active?: boolean;
}

export interface UpdateShopRequest {
    shop_name?: string;
    shop_phone?: string;
    shop_email?: string;
    shop_address?: string;
    shop_logo_url?: string;
    shop_images?: string[];
}

export interface StaffUser {
    id: string;
    name: string;
    phone: string;
    is_active?: boolean;
}

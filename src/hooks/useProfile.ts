import { useState, useCallback } from "react";
import {
    getMyProfile,
    updateMyProfile,
    updateShopDetails,
} from "@/services/user.service";
import { UserProfile, UpdateShopRequest, ShopDetails } from "@/types/user.types";

export const useProfile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [shop, setShop] = useState<ShopDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getProfile = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getMyProfile();
            if (response.success && response.data) {
                setProfile(response.data);
                const data = response.data as any;
                // Capture shop info from nested or flattened structure
                const shopInfo = data.shop || data.shop_details || (data.shop_name ? data : null);
                if (shopInfo) {
                    setShop({
                        id: shopInfo.id || data.shop_id,
                        shop_name: shopInfo.shop_name || shopInfo.name,
                        shop_phone: shopInfo.shop_phone || shopInfo.phone,
                        shop_email: shopInfo.shop_email || shopInfo.email,
                        shop_address: shopInfo.shop_address || shopInfo.address,
                        shop_logo_url: shopInfo.shop_logo_url || shopInfo.logo_url,
                        shop_images: shopInfo.shop_images || shopInfo.images,
                        is_active: shopInfo.is_active,
                    });
                }
            } else {
                throw new Error(response.message || "Failed to fetch profile");
            }
            return response.data;
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Something went wrong";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateProfile = async (name: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateMyProfile({ name });
            if (response.success && response.data) {
                setProfile(response.data);
            } else {
                throw new Error(response.message || "Failed to update profile");
            }
            return response.data;
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Update failed";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateShop = async (data: UpdateShopRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateShopDetails(data);
            if (response.success && response.data) {
                // Per OpenAPI, the data contains shop properties like shop_name directly
                setShop(response.data);
            } else if (!response.success) {
                throw new Error(response.message || "Failed to update shop");
            }
            return response.data;
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Shop update failed";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        profile,
        shop,
        loading,
        error,
        getProfile,
        updateProfile,
        updateShop,
    };
};

import { useState, useCallback } from "react";
import {
    getMyProfile,
    updateMyProfile,
    updateShopDetails
} from "@/services/user.service";
import { UserProfile, UpdateShopRequest } from "@/types/user.types";

export const useProfile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getProfile = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getMyProfile();
            if (response.success && response.data) {
                setProfile(response.data);
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
            if (!response.success) {
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
        loading,
        error,
        getProfile,
        updateProfile,
        updateShop,
    };
};

import { useState, useCallback } from "react";
import {
    getStaffList as getStaffListService,
    createStaff as createStaffService,
    updateStaffStatus as updateStaffStatusService
} from "@/services/user.service";
import { StaffUser } from "@/types/user.types";

export const useStaff = () => {
    const [staffList, setStaffList] = useState<StaffUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getStaffList = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getStaffListService();
            if (response.success && response.data) {
                setStaffList(response.data);
            } else {
                throw new Error(response.message || "Failed to fetch staff list");
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

    const createStaff = async (name: string, phone: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createStaffService({ name, phone });
            if (response.success && response.data) {
                // Optimistically update list or just refetch
                setStaffList((prev) => [...prev, response.data]);
            } else {
                throw new Error(response.message || "Failed to create staff");
            }
            return response.data;
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Creation failed";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateStaffStatus = async (id: string, is_active: boolean) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateStaffStatusService(id, is_active);
            if (response.success) {
                // Update local state
                setStaffList((prev) =>
                    prev.map((staff) =>
                        staff.id === id ? { ...staff, is_active } : staff
                    )
                );
            } else {
                throw new Error(response.message || "Failed to update staff status");
            }
            return response.data;
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Status update failed";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        staffList,
        loading,
        error,
        getStaffList,
        createStaff,
        updateStaffStatus,
    };
};

import { api } from "@/services/api";
import { ENDPOINTS } from "@/services/endpoints";
import { ApiResponse } from "@/types/api.types";
import {
    UserProfile,
    UpdateMyProfileRequest,
    UpdateShopRequest,
    StaffUser
} from "@/types/user.types";

export const getMyProfile = async (): Promise<ApiResponse<UserProfile>> => {
    const res = await api.get(ENDPOINTS.USERS.PROFILE);
    return res.data;
};

export const updateMyProfile = async (
    data: UpdateMyProfileRequest
): Promise<ApiResponse<UserProfile>> => {
    const res = await api.patch(ENDPOINTS.USERS.UPDATE_PROFILE, data);
    return res.data;
};

export const updateShopDetails = async (
    data: UpdateShopRequest
): Promise<ApiResponse<any>> => {
    const res = await api.patch(ENDPOINTS.USERS.UPDATE_SHOP, data);
    return res.data;
};

export const getStaffList = async (): Promise<ApiResponse<StaffUser[]>> => {
    const res = await api.get(ENDPOINTS.USERS.STAFF_LIST);
    return res.data;
};

export const createStaff = async (data: {
    name: string;
    phone: string;
}): Promise<ApiResponse<StaffUser>> => {
    const res = await api.post(ENDPOINTS.USERS.CREATE_STAFF, data);
    return res.data;
};

export const updateStaffStatus = async (
    id: string,
    is_active: boolean
): Promise<ApiResponse<any>> => {
    const res = await api.patch(ENDPOINTS.USERS.UPDATE_STAFF_STATUS(id), {
        is_active,
    });
    return res.data;
};

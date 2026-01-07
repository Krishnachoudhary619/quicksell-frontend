
import apiClient from './client';

export const listOrders = async (params: any) => {
    const response = await apiClient.get('/orders', { params });
    return response;
};

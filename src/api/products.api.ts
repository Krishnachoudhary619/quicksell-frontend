
import apiClient from './client';

export const createProduct = async (data: any) => {
    const response = await apiClient.post('/products', data);
    return response;
};

export const updateProduct = async (id: string, data: any) => {
    const response = await apiClient.put(`/products/${id}`, data);
    return response;
};

export const deleteProduct = async (id: string) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response;
};

export const listProducts = async (params: any) => {
    const response = await apiClient.get('/products', { params });
    return response;
};

export const updateStock = async (id: string, quantity: number) => {
    const response = await apiClient.patch(`/products/${id}/stock`, { quantity });
    return response;
};

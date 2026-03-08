import { api } from "@/services/api";
import { ENDPOINTS } from "@/services/endpoints";
import { ApiResponse } from "@/types/api.types";
import {
    Product,
    CreateProductRequest,
    UpdateProductRequest,
} from "../types/product.types";

export const getProducts = async (params?: {
    category?: string;
    active?: boolean;
}): Promise<ApiResponse<Product[]>> => {
    const res = await api.get(ENDPOINTS.PRODUCTS.LIST, { params });
    return res.data;
};

export const getProductById = async (id: string): Promise<ApiResponse<Product>> => {
    const res = await api.get(ENDPOINTS.PRODUCTS.DETAILS(id));
    return res.data;
};

export const createProduct = async (
    data: CreateProductRequest
): Promise<ApiResponse<Product>> => {
    const res = await api.post(ENDPOINTS.PRODUCTS.CREATE, data);
    return res.data;
};

export const updateProduct = async (
    id: string,
    data: UpdateProductRequest
): Promise<ApiResponse<Product>> => {
    const res = await api.put(ENDPOINTS.PRODUCTS.UPDATE(id), data);
    return res.data;
};

export const deleteProduct = async (id: string): Promise<ApiResponse<any>> => {
    const res = await api.delete(ENDPOINTS.PRODUCTS.DELETE(id));
    return res.data;
};

export const updateStock = async (
    id: string,
    stock_quantity: number
): Promise<ApiResponse<Product>> => {
    const res = await api.patch(ENDPOINTS.PRODUCTS.UPDATE_STOCK(id), {
        stock_quantity,
    });
    return res.data;
};

export const searchProducts = async (params: {
    q: string;
}): Promise<ApiResponse<Product[]>> => {
    const res = await api.get(ENDPOINTS.PRODUCTS.SEARCH, { params });
    return res.data;
};

import { api } from "@/services/api";
import { ENDPOINTS } from "@/services/endpoints";
import { ApiResponse } from "@/types/api.types";
import {
    CatalogSummary,
    CatalogProductsResponse,
    CreateCatalogRequest,
    UpdateCatalogRequest,
    AddProductsToCatalogRequest,
    PublicCatalogResponse,
} from "../types/catalog.types";

export const getCatalogs = async (): Promise<ApiResponse<CatalogSummary[]>> => {
    const res = await api.get(ENDPOINTS.CATALOGS.LIST);
    return res.data;
};

export const createCatalog = async (
    data: CreateCatalogRequest
): Promise<ApiResponse<{ id: string; catalog_slug: string }>> => {
    const res = await api.post(ENDPOINTS.CATALOGS.CREATE, data);
    return res.data;
};

export const updateCatalog = async (
    id: string,
    data: UpdateCatalogRequest
): Promise<ApiResponse<any>> => {
    const res = await api.put(ENDPOINTS.CATALOGS.UPDATE(id), data);
    return res.data;
};

export const deleteCatalog = async (id: string): Promise<ApiResponse<any>> => {
    const res = await api.delete(ENDPOINTS.CATALOGS.DELETE(id));
    return res.data;
};

export const addProductsToCatalog = async (
    id: string,
    data: AddProductsToCatalogRequest
): Promise<ApiResponse<any>> => {
    const res = await api.post(ENDPOINTS.CATALOGS.PRODUCTS(id), data);
    return res.data;
};

export const getCatalogProducts = async (
    id: string
): Promise<ApiResponse<CatalogProductsResponse>> => {
    const res = await api.get(ENDPOINTS.CATALOGS.PRODUCTS(id));
    return res.data;
};

export const removeProductFromCatalog = async (
    id: string,
    productId: string
): Promise<ApiResponse<any>> => {
    const res = await api.delete(ENDPOINTS.CATALOGS.REMOVE_PRODUCT(id, productId));
    return res.data;
};

export const getPublicCatalog = async (
    slug: string
): Promise<ApiResponse<PublicCatalogResponse>> => {
    const res = await api.get(ENDPOINTS.PUBLIC.CATALOG(slug));
    return res.data;
};

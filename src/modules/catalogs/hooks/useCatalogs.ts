import { useState, useCallback } from "react";
import * as catalogService from "../services/catalog.service";
import {
    CatalogSummary,
    CatalogProductsResponse,
    CreateCatalogRequest,
    UpdateCatalogRequest,
    AddProductsToCatalogRequest,
    PublicCatalogResponse,
} from "../types/catalog.types";

export const useCatalogs = () => {
    const [catalogs, setCatalogs] = useState<CatalogSummary[]>([]);
    const [catalogProducts, setCatalogProducts] = useState<CatalogProductsResponse | null>(null);
    const [publicCatalog, setPublicCatalog] = useState<PublicCatalogResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getCatalogs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await catalogService.getCatalogs();
            if (response.success && response.data) {
                setCatalogs(response.data);
            } else {
                throw new Error(response.message || "Failed to fetch catalogs");
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

    const createCatalog = async (data: CreateCatalogRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await catalogService.createCatalog(data);
            if (response.success && response.data) {
                await getCatalogs(); // Refresh the list
            } else {
                throw new Error(response.message || "Failed to create catalog");
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

    const updateCatalog = async (id: string, data: UpdateCatalogRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await catalogService.updateCatalog(id, data);
            if (response.success) {
                await getCatalogs(); // Refresh the list
            } else {
                throw new Error(response.message || "Failed to update catalog");
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

    const deleteCatalog = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await catalogService.deleteCatalog(id);
            if (response.success) {
                setCatalogs((prev) => prev.filter((c) => c.id !== id));
            } else {
                throw new Error(response.message || "Failed to delete catalog");
            }
            return response;
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Deletion failed";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getCatalogProducts = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await catalogService.getCatalogProducts(id);
            if (response.success && response.data) {
                setCatalogProducts(response.data);
            } else {
                throw new Error(response.message || "Failed to fetch catalog products");
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

    const addProducts = async (id: string, data: AddProductsToCatalogRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await catalogService.addProductsToCatalog(id, data);
            if (response.success) {
                await getCatalogProducts(id); // Refresh catalog products
                await getCatalogs(); // Sync product count in the main list
            } else {
                throw new Error(response.message || "Failed to add products");
            }
            return response.data;
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Addition failed";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const removeProduct = async (id: string, productId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await catalogService.removeProductFromCatalog(id, productId);
            if (response.success) {
                setCatalogProducts((prev) => {
                    if (!prev) return null;
                    return {
                        ...prev,
                        products: prev.products.filter((p) => p.id !== productId),
                    };
                });
                await getCatalogs(); // Sync product count in the main list
            } else {
                throw new Error(response.message || "Failed to remove product");
            }
            return response;
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Removal failed";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getPublicCatalog = useCallback(async (slug: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await catalogService.getPublicCatalog(slug);
            if (response.success && response.data) {
                setPublicCatalog(response.data);
            } else {
                throw new Error(response.message || "Failed to fetch public catalog");
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

    return {
        catalogs,
        catalogProducts,
        publicCatalog,
        loading,
        error,
        getCatalogs,
        createCatalog,
        updateCatalog,
        deleteCatalog,
        getCatalogProducts,
        addProducts,
        removeProduct,
        getPublicCatalog,
    };
};

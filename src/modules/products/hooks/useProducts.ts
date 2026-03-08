import { useState, useCallback } from "react";
import * as productService from "../services/product.service";
import {
    Product,
    CreateProductRequest,
    UpdateProductRequest,
} from "../types/product.types";

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getProducts = useCallback(
        async (params?: { category?: string; active?: boolean }) => {
            setLoading(true);
            setError(null);
            try {
                const response = await productService.getProducts(params);
                if (response.success && response.data) {
                    setProducts(response.data);
                } else {
                    throw new Error(response.message || "Failed to fetch products");
                }
                return response.data;
            } catch (err: any) {
                const msg =
                    err.response?.data?.message || err.message || "Something went wrong";
                setError(msg);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const getProduct = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await productService.getProductById(id);
            if (response.success && response.data) {
                setProduct(response.data);
            } else {
                throw new Error(response.message || "Product not found");
            }
            return response.data;
        } catch (err: any) {
            const msg =
                err.response?.data?.message || err.message || "Error fetching product";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const createProduct = async (data: CreateProductRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await productService.createProduct(data);
            if (response.success && response.data) {
                setProducts((prev) => [...prev, response.data!]);
            } else {
                throw new Error(response.message || "Failed to create product");
            }
            return response.data;
        } catch (err: any) {
            const msg =
                err.response?.data?.message || err.message || "Creation failed";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id: string, data: UpdateProductRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await productService.updateProduct(id, data);
            if (response.success && response.data) {
                setProducts((prev) =>
                    prev.map((p) => (p.id === id ? { ...p, ...response.data! } : p))
                );
                if (product?.id === id) setProduct((prev) => (prev ? { ...prev, ...response.data! } : response.data!));
            } else {
                throw new Error(response.message || "Failed to update product");
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

    const deleteProduct = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await productService.deleteProduct(id);
            if (response.success) {
                setProducts((prev) => prev.filter((p) => p.id !== id));
                if (product?.id === id) setProduct(null);
            } else {
                throw new Error(response.message || "Failed to delete product");
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

    const updateStock = async (id: string, stock_quantity: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await productService.updateStock(id, stock_quantity);
            if (response.success && response.data) {
                setProducts((prev) =>
                    prev.map((p) => (p.id === id ? { ...p, ...response.data! } : p))
                );
                if (product?.id === id) setProduct((prev) => (prev ? { ...prev, ...response.data! } : response.data!));
            } else {
                throw new Error(response.message || "Failed to update stock");
            }
            return response.data;
        } catch (err: any) {
            const msg =
                err.response?.data?.message || err.message || "Stock update failed";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const searchProducts = async (q: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await productService.searchProducts({ q });
            if (response.success && response.data) {
                setProducts(response.data);
            } else {
                throw new Error(response.message || "Search failed");
            }
            return response.data;
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Search error";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        products,
        product,
        loading,
        error,
        getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        searchProducts,
    };
};

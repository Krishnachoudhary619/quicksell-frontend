export interface Product {
    id: string;
    product_name: string;
    price: number;
    stock_quantity: number;
    is_active: boolean;
    sku_code?: string;
    description?: string;
    currency?: string;
    thumbnail_url?: string;
    image_urls?: string[];
    category?: string;
}

export interface CreateProductRequest {
    product_name: string;
    price: number;
    sku_code?: string;
    description?: string;
    currency?: string;
    stock_quantity?: number;
    is_active?: boolean;
    thumbnail_url?: string;
    image_urls?: string[];
    category?: string;
}

export interface UpdateProductRequest {
    sku_code?: string;
    product_name?: string;
    description?: string;
    price?: number;
    currency?: string;
    is_active?: boolean;
    thumbnail_url?: string;
    image_urls?: string[];
    category?: string;
}

export interface UpdateStockRequest {
    stock_quantity: number;
}

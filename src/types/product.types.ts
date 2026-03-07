export interface Product {
    id: string;
    product_name: string;
    description?: string;
    price: number;
    currency?: string;
    stock_quantity: number;
    is_active: boolean;
    thumbnail_url?: string;
    image_urls?: string[];
    category?: string;
}

export interface CreateProductRequest {
    product_name: string;
    price: number;
    description?: string;
    currency?: string;
    stock_quantity?: number;
    thumbnail_url?: string;
    image_urls?: string[];
    category?: string;
}

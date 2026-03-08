export interface CatalogSummary {
    id: string;
    catalog_name: string;
    catalog_slug: string;
    is_active: boolean;
    product_count: number;
}

export interface CreateCatalogRequest {
    catalog_name: string;
}

export interface UpdateCatalogRequest {
    catalog_name?: string;
    is_active?: boolean;
}

export interface AddProductsToCatalogRequest {
    product_ids: string[];
}

export interface CatalogProduct {
    id: string;
    product_name: string;
    price: number;
    thumbnail_url?: string | null;
    is_active?: boolean;
    stock_quantity?: number;
}

export interface CatalogProductsResponse {
    catalog_name: string;
    products: CatalogProduct[];
}

export interface PublicCatalogResponse {
    catalog_name: string;
    products: {
        id: string;
        product_name: string;
        price: number;
        thumbnail_url?: string | null;
    }[];
}

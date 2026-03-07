export interface CatalogSummary {
    id: string;
    catalog_name: string;
    catalog_slug: string;
    is_active: boolean;
    product_count: number;
}

export interface PublicCatalogProduct {
    id: string;
    product_name: string;
    price: number;
    thumbnail_url?: string;
}

export interface PublicCatalog {
    catalog_name: string;
    products: PublicCatalogProduct[];
}

export interface OrderSummary {
    id: string;
    total_items: number;
    created_at: string;
}
export interface OrderItem {
    product_id: string;
    product_name: string;
    price: number;
    quantity: number;
}
export interface OrderDetail {
    id: string;
    total_items: number;
    created_at: string;
    order_items: OrderItem[];
}

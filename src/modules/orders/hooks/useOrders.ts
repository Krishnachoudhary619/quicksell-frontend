import { useState, useCallback } from "react";
import * as orderService from "../services/order.service";
import {
    CreateOrderRequest,
    OrderSummary,
    OrderDetail,
} from "../types/order.types";

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderSummary[]>([]);
    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await orderService.getOrders();
            if (response.success && response.data) {
                setOrders(response.data);
            } else {
                throw new Error(response.message || "Failed to fetch orders");
            }
            return response.data;
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Error fetching orders";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const getOrder = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await orderService.getOrderById(id);
            if (response.success && response.data) {
                setOrder(response.data);
            } else {
                throw new Error(response.message || "Order not found");
            }
            return response.data;
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Error fetching order details";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const placeOrder = async (data: CreateOrderRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await orderService.placeOrder(data);
            if (response.success && response.data) {
                // If it's a public order placement, we might not need to update the local list
                // but we return the data (like whatsapp_url)
                return response.data;
            } else {
                throw new Error(response.message || "Failed to place order");
            }
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Order placement failed";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        orders,
        order,
        loading,
        error,
        getOrders,
        getOrder,
        placeOrder,
    };
};

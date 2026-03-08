import { api } from "@/services/api";
import { ENDPOINTS } from "@/services/endpoints";
import { ApiResponse } from "@/types/api.types";
import {
    CreateOrderRequest,
    OrderSummary,
    OrderDetail,
    PlaceOrderResponse,
} from "../types/order.types";

export const placeOrder = async (
    data: CreateOrderRequest
): Promise<ApiResponse<PlaceOrderResponse>> => {
    const res = await api.post(ENDPOINTS.ORDERS.CREATE, data);
    return res.data;
};

export const getOrders = async (): Promise<ApiResponse<OrderSummary[]>> => {
    const res = await api.get(ENDPOINTS.ORDERS.LIST);
    return res.data;
};

export const getOrderById = async (id: string): Promise<ApiResponse<OrderDetail>> => {
    const res = await api.get(ENDPOINTS.ORDERS.DETAILS(id));
    return res.data;
};

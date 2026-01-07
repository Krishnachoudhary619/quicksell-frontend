
export type TUser = {
    id: string;
    name: string;
    email: string;
};

export type TProduct = {
    id: string;
    name: string;
    price: number;
    image: string;
};

export type TOrder = {
    id: string;
    productName: string;
    orderDate: string;
    status: string;
};

export interface IApiResponse<T> {
    success: boolean;
    data: T | null;
    message?: string;
}

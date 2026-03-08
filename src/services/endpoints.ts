export const ENDPOINTS = {

    AUTH: {
        SEND_OTP: "/auth/send-otp",
        VERIFY_OTP: "/auth/verify-otp",
        REFRESH_TOKEN: "/auth/refresh-token",
        LOGOUT: "/auth/logout",
    },

    PRODUCTS: {
        LIST: "/products",
        CREATE: "/products",
        SEARCH: "/products/search",
        DETAILS: (id: string) => `/products/${id}`,
        DELETE: (id: string) => `/products/${id}`,
        UPDATE: (id: string) => `/products/${id}`,
        UPDATE_STOCK: (id: string) => `/products/${id}/stock`,
    },

    CATALOGS: {
        LIST: "/catalogs",
        CREATE: "/catalogs",
        UPDATE: (id: string) => `/catalogs/${id}`,
        DELETE: (id: string) => `/catalogs/${id}`,
        PRODUCTS: (id: string) => `/catalogs/${id}/products`,
        REMOVE_PRODUCT: (id: string, productId: string) =>
            `/catalogs/${id}/products/${productId}`,
    },

    PUBLIC: {
        CATALOG: (slug: string) => `/catalog/${slug}`,
    },

    ORDERS: {
        CREATE: "/orders",
        LIST: "/orders",
        DETAILS: (id: string) => `/orders/${id}`,
    },

    USERS: {
        PROFILE: "/users/me",
        UPDATE_PROFILE: "/users/me",
        UPDATE_SHOP: "/users/shop",
        STAFF_LIST: "/users/staff",
        CREATE_STAFF: "/users/staff",
        UPDATE_STAFF_STATUS: (id: string) => `/users/staff/${id}/status`,
    },

    UPLOADS: {
        PRESIGNED_URLS: "/uploads/presigned-urls",
    },
};

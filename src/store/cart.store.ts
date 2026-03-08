import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: string;
    product_name: string;
    price: number;
    quantity: number;
    thumbnail_url?: string;
}

interface CartStore {
    cart: CartItem[];
    addToCart: (product: any) => void;
    increaseQty: (id: string) => void;
    decreaseQty: (id: string) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    totalAmount: number;
    totalItems: number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            totalAmount: 0,
            totalItems: 0,

            addToCart: (product) => {
                const { cart } = get();
                const existing = cart.find((p) => p.id === product.id);

                let newCart;
                if (existing) {
                    newCart = cart.map((p) =>
                        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                    );
                } else {
                    newCart = [
                        ...cart,
                        {
                            id: product.id,
                            product_name: product.product_name,
                            price: product.price,
                            thumbnail_url: product.thumbnail_url,
                            quantity: 1,
                        },
                    ];
                }

                const totalItems = newCart.reduce((sum, item) => sum + item.quantity, 0);
                const totalAmount = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

                set({ cart: newCart, totalItems, totalAmount });
            },

            increaseQty: (id) => {
                const { cart } = get();
                const newCart = cart.map((p) =>
                    p.id === id ? { ...p, quantity: p.quantity + 1 } : p
                );
                const totalItems = newCart.reduce((sum, item) => sum + item.quantity, 0);
                const totalAmount = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                set({ cart: newCart, totalItems, totalAmount });
            },

            decreaseQty: (id) => {
                const { cart } = get();
                const newCart = cart
                    .map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
                    .filter((p) => p.quantity > 0);

                const totalItems = newCart.reduce((sum, item) => sum + item.quantity, 0);
                const totalAmount = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                set({ cart: newCart, totalItems, totalAmount });
            },

            removeFromCart: (id) => {
                const { cart } = get();
                const newCart = cart.filter((p) => p.id !== id);
                const totalItems = newCart.reduce((sum, item) => sum + item.quantity, 0);
                const totalAmount = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                set({ cart: newCart, totalItems, totalAmount });
            },

            clearCart: () => set({ cart: [], totalItems: 0, totalAmount: 0 }),
        }),
        {
            name: "quickshare-cart",
        }
    )
);

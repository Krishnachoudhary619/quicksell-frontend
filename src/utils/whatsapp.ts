"use client";

import { CartItem } from "@/store/cart.store";

export function generateWhatsappLink(cart: CartItem[], catalogName: string) {
    // Default phone for now as per user instruction. 
    // In production this would likely come from the shop or catalog owner data.
    const phone = "917506627003";

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const messageHeader = `*New Order from QuickSell Catalog: ${catalogName}*\n\n`;

    const itemsList = cart
        .map((p, index) => `${index + 1}. *${p.product_name}* x${p.quantity} - ₹${(p.price * p.quantity).toLocaleString()}`)
        .join("\n");

    const messageFooter = `\n\n------------------\n*Grand Total: ₹${total.toLocaleString()}*\n\nHello, I would like to place an order for the items listed above. Please let me know the next steps for payment and delivery!`;

    const fullMessage = messageHeader + itemsList + messageFooter;
    const encodedMessage = encodeURIComponent(fullMessage);

    return `https://wa.me/${phone}?text=${encodedMessage}`;
}

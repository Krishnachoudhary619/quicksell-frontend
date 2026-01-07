
import { NextResponse } from 'next/server';

// NOTE: In a real application, this data would be in a database.
// Having it in-memory here, and in another file, means the data can get out of sync.
let products = [
    { id: '1', name: 'Wireless Mouse', price: 25.99, stock: 150, category: 'Electronics', isActive: true, imageUrls: ['https://example.com/mouse.jpg'] },
    { id: '2', name: 'Mechanical Keyboard', price: 89.99, stock: 75, category: 'Electronics', isActive: true, imageUrls: ['https://example.com/keyboard.jpg'] },
    { id: '3', name: 'USB-C Hub', price: 45.50, stock: 200, category: 'Accessories', isActive: false, imageUrls: ['https://example.com/hub.jpg'] },
    { id: '4', name: 'Laptop Stand', price: 30.00, stock: 120, category: 'Accessories', isActive: true, imageUrls: ['https://example.com/stand.jpg'] },
    { id: '5', name: 'Webcam', price: 65.00, stock: 90, category: 'Electronics', isActive: true, imageUrls: ['https://example.com/webcam.jpg'] }
];

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const data = await request.json();
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...data, id };
        return NextResponse.json({ success: true, data: products[productIndex] });
    } else {
        return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        return NextResponse.json({ success: true, message: 'Product deleted' });
    } else {
        return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }
}

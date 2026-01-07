
import { NextResponse } from 'next/server';

const orders = [
    {
        id: '1',
        customerName: 'John Doe',
        orderDate: '2023-10-26',
        status: 'Shipped',
        total: 115.98,
        products: [
            { id: '1', name: 'Wireless Mouse', quantity: 1, price: 25.99 },
            { id: '2', name: 'Mechanical Keyboard', quantity: 1, price: 89.99 }
        ]
    },
    {
        id: '2',
        customerName: 'Jane Smith',
        orderDate: '2023-10-25',
        status: 'Processing',
        total: 45.50,
        products: [
            { id: '3', name: 'USB-C Hub', quantity: 1, price: 45.50 }
        ]
    },
    {
        id: '3',
        customerName: 'Peter Jones',
        orderDate: '2023-10-24',
        status: 'Delivered',
        total: 95.00,
        products: [
            { id: '4', name: 'Laptop Stand', quantity: 1, price: 30.00 },
            { id: '5', name: 'Webcam', quantity: 1, price: 65.00 }
        ]
    }
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        const order = orders.find(o => o.id === id);
        return order 
            ? NextResponse.json({ success: true, data: [order] })
            : NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: orders });
}

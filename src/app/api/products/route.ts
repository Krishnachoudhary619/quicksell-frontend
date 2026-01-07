
import { NextResponse } from 'next/server';

let products = [
    { id: '1', name: 'Wireless Mouse', price: 25.99, stock: 150, category: 'Electronics', isActive: true, imageUrls: ['https://example.com/mouse.jpg'] },
    { id: '2', name: 'Mechanical Keyboard', price: 89.99, stock: 75, category: 'Electronics', isActive: true, imageUrls: ['https://example.com/keyboard.jpg'] },
    { id: '3', name: 'USB-C Hub', price: 45.50, stock: 200, category: 'Accessories', isActive: false, imageUrls: ['https://example.com/hub.jpg'] },
    { id: '4', name: 'Laptop Stand', price: 30.00, stock: 120, category: 'Accessories', isActive: true, imageUrls: ['https://example.com/stand.jpg'] },
    { id: '5', name: 'Webcam', price: 65.00, stock: 90, category: 'Electronics', isActive: true, imageUrls: ['https://example.com/webcam.jpg'] }
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const sortBy = searchParams.get('sortBy');
    const category = searchParams.get('category');

    if (id) {
        const product = products.find(p => p.id === id);
        return product 
            ? NextResponse.json({ success: true, data: [product] })
            : NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    let filteredProducts = [...products];

    if (name) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (sortBy) {
        const [field, order] = sortBy.split(':');
        if (field === 'price') {
            filteredProducts.sort((a, b) => {
                return order === 'asc' ? a.price - b.price : b.price - a.price;
            });
        }
    }
    
    return NextResponse.json({ success: true, data: filteredProducts });
}

export async function POST(request: Request) {
    const data = await request.json();
    const newProduct = { ...data, id: String(products.length + 1), isActive: true };
    products.push(newProduct);
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
}

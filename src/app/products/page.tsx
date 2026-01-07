
'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api-service';
import { TProduct } from '@/types/api.response';

const ProductsPage = () => {
    const [products, setProducts] = useState<TProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.products.getProducts();
                if (response.success && response.data) {
                    setProducts(response.data);
                } else {
                    setError(response.message || 'An unexpected error occurred.');
                }
            } catch (err) {
                setError('Failed to fetch products.');
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <p className="text-gray-600 mt-2">${product.price}</p>
                                <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;


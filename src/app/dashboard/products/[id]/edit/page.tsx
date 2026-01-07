
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '@/components/products/ProductForm';
import { updateProduct, deleteProduct, listProducts } from '@/api/products.api';

const EditProductPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const { id } = params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await listProducts({ id });
                if (response.success && response.data.length > 0) {
                    setProduct(response.data[0]);
                } else {
                    setError(response.message || 'Product not found');
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleSubmit = async (data: any) => {
        if (!id) return;
        const response = await updateProduct(id, data);
        if (response.success) {
            router.push('/dashboard/products');
        } else {
            throw new Error(response.message || 'Failed to update product');
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        const response = await deleteProduct(id);
        if (response.success) {
            router.push('/dashboard/products');
        } else {
            throw new Error(response.message || 'Failed to delete product');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
            <p className="mb-6 text-lg text-gray-600">Update the details of your product below.</p>
            <ProductForm product={product} onSubmit={handleSubmit} onDelete={handleDelete} />
        </div>
    );
};

export default EditProductPage;


'use client';

import { useRouter } from 'next/navigation';
import ProductForm from '@/components/products/ProductForm';
import { createProduct } from '@/api/products.api';

const NewProductPage = () => {
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        const response = await createProduct(data);
        if (response.success) {
            router.push('/dashboard/products');
        } else {
            throw new Error(response.message || 'Failed to create product');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Add a New Product</h1>
            <p className="mb-6 text-lg text-gray-600">
                Fill out the form below to add a new product to your inventory. 
            </p>
            <ProductForm onSubmit={handleSubmit} />
        </div>
    );
};

export default NewProductPage;

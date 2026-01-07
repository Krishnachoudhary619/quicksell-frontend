
import Link from 'next/link';
import ProductList from '@/components/products/ProductList';

export default function ProductsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Your Products</h1>
                <Link href="/dashboard/products/new">
                    <div className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                        Add New Product
                    </div>
                </Link>
            </div>
            <p className="mb-8 text-lg text-gray-600">
                Here you can view, add, edit, and manage all of your products. Click on a product to edit it or add a new one to get started.
            </p>
            <ProductList />
        </div>
    );
}

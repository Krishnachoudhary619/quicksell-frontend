
'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { listProducts } from '@/api/products.api';
import ProductCard from './ProductCard';

// A simple debounce function
function debounce<F extends (...args: any[]) => void>(func: F, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const ProductList = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState(''); // 'price:asc', 'price:desc'
    const [category, setCategory] = useState('');

    const categories = useMemo(() => {
        const allCategories = products.map(p => p.category);
        return [...new Set(allCategories)]; // Get unique categories
    }, [products]);

    const fetchProducts = useCallback(async (search: string, sort: string, cat: string) => {
        setLoading(true);
        try {
            const params: any = {};
            if (search) params.name = search;
            if (sort) params.sortBy = sort;
            if (cat) params.category = cat;

            const response = await listProducts(params);
            if (response.success) {
                setProducts(response.data);
            } else {
                setError(response.message);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const debouncedFetchProducts = useCallback(debounce(fetchProducts, 300), [fetchProducts]);

    useEffect(() => {
        debouncedFetchProducts(searchQuery, sortOrder, category);
    }, [searchQuery, sortOrder, category, debouncedFetchProducts]);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="md:col-span-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="md:col-span-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Sort by</option>
                    <option value="price:asc">Price: Low to High</option>
                    <option value="price:desc">Price: High to Low</option>
                </select>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="md:col-span-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {loading && <p>Loading products...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && products.length === 0 && (
                <p>No products found that match your criteria.</p>
            )}
            
            {!loading && !error && products.length > 0 && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;

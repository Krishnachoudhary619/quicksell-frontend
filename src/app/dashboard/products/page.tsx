"use client";

import { useEffect, useState } from "react";
import { useProducts } from "@/modules/products/hooks/useProducts";
import ProductTable from "@/components/products/ProductTable";
import ProductForm from "@/components/products/ProductForm";
import {
	Product,
	CreateProductRequest,
	UpdateProductRequest,
} from "@/modules/products/types/product.types";

export default function ProductsPage() {
	const {
		products,
		loading,
		error,
		getProducts,
		createProduct,
		updateProduct,
		deleteProduct,
		updateStock,
	} = useProducts();

	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		getProducts();
	}, [getProducts]);

	const handleCreateOrUpdate = async (data: CreateProductRequest | UpdateProductRequest) => {
		try {
			if (editingProduct) {
				await updateProduct(editingProduct.id, data as UpdateProductRequest);
			} else {
				await createProduct(data as CreateProductRequest);
			}
			setIsFormOpen(false);
			setEditingProduct(null);
		} catch (err) {
			console.error("Operation failed:", err);
		}
	};

	const handleEdit = (product: Product) => {
		setEditingProduct(product);
		setIsFormOpen(true);
	};

	const handleDelete = async (id: string) => {
		if (confirm("Are you sure you want to delete this product?")) {
			await deleteProduct(id);
		}
	};

	const filteredProducts = products.filter(
		(p) =>
			(p.product_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
			(p.sku_code || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
			(p.category || "").toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className='p-8 max-w-7xl mx-auto space-y-8'>
			{/* Header Section */}
			<div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
				<div>
					<h1 className='text-3xl font-black text-gray-900 tracking-tight'>
						Products Catalog
					</h1>
					<p className='text-gray-500 font-medium'>
						Manage your inventory and product listings
					</p>
				</div>
				<button
					onClick={() => {
						setEditingProduct(null);
						setIsFormOpen(true);
					}}
					className='flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2.5'
						strokeLinecap='round'
						strokeLinejoin='round'>
						<line x1='12' y1='5' x2='12' y2='19'></line>
						<line x1='5' y1='12' x2='19' y2='12'></line>
					</svg>
					Add New Product
				</button>
			</div>

			{/* Stats Quick View (Placeholder for premium look) */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				{[
					{
						label: "Total Products",
						val: products.length,
						color: "text-indigo-600",
						bg: "bg-indigo-50",
					},
					{
						label: "Active Items",
						val: products.filter((p) => p.is_active).length,
						color: "text-green-600",
						bg: "bg-green-50",
					},
					{
						label: "Low Stock",
						val: products.filter(
							(p) => (p.stock_quantity || 0) <= 10 && (p.stock_quantity || 0) > 0,
						).length,
						color: "text-orange-600",
						bg: "bg-orange-50",
					},
					{
						label: "Out of Stock",
						val: products.filter((p) => (p.stock_quantity || 0) === 0).length,
						color: "text-red-600",
						bg: "bg-red-50",
					},
				].map((stat, i) => (
					<div
						key={i}
						className='p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between'>
						<div>
							<p className='text-xs font-bold text-gray-400 uppercase tracking-widest'>
								{stat.label}
							</p>
							<p className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.val}</p>
						</div>
						<div
							className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
							{/* Icon placeholder based on stat label */}
							<div
								className={`w-6 h-6 rounded-md opacity-20 ${stat.bg.replace("bg-", "bg-")}`}></div>
						</div>
					</div>
				))}
			</div>

			{/* Search & Filters */}
			<div className='flex flex-col md:flex-row gap-4'>
				<div className='relative flex-1'>
					<svg
						className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'>
						<circle cx='11' cy='11' r='8'></circle>
						<line x1='21' y1='21' x2='16.65' y2='16.65'></line>
					</svg>
					<input
						type='text'
						placeholder='Search products by name, SKU or category...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-gray-700 placeholder:text-gray-400'
					/>
				</div>
			</div>

			{/* Main Table */}
			{error && (
				<div className='p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 font-medium'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'>
						<circle cx='12' cy='12' r='10'></circle>
						<line x1='12' y1='8' x2='12' y2='12'></line>
						<line x1='12' y1='16' x2='12.01' y2='16'></line>
					</svg>
					{error}
				</div>
			)}

			<ProductTable
				products={filteredProducts}
				onEdit={handleEdit}
				onDelete={handleDelete}
				onUpdateStock={updateStock}
				loading={loading}
			/>

			{/* Overlays */}
			{isFormOpen && (
				<div className='fixed inset-0 bg-gray-900/20 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
					<ProductForm
						initialData={editingProduct}
						onSubmit={handleCreateOrUpdate}
						onCancel={() => {
							setIsFormOpen(false);
							setEditingProduct(null);
						}}
						loading={loading}
					/>
				</div>
			)}
		</div>
	);
}

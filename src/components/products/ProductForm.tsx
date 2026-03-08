"use client";

import React, { useState, useEffect } from "react";
import {
	CreateProductRequest,
	UpdateProductRequest,
	Product,
} from "@/modules/products/types/product.types";

interface ProductFormProps {
	initialData?: Product | null;
	onSubmit: (data: CreateProductRequest | UpdateProductRequest) => void;
	onCancel: () => void;
	loading: boolean;
}

export default function ProductForm({
	initialData,
	onSubmit,
	onCancel,
	loading,
}: ProductFormProps) {
	const [formData, setFormData] = useState<Partial<CreateProductRequest>>({
		product_name: "",
		price: 0,
		sku_code: "",
		description: "",
		stock_quantity: 0,
		category: "",
		is_active: true,
		currency: "INR",
	});

	useEffect(() => {
		if (initialData) {
			setFormData({
				product_name: initialData.product_name,
				price: initialData.price,
				sku_code: initialData.sku_code || "",
				description: initialData.description || "",
				stock_quantity: initialData.stock_quantity,
				category: initialData.category || "",
				is_active: initialData.is_active,
				currency: initialData.currency || "INR",
			});
		}
	}, [initialData]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const { name, value, type } = e.target;
		const isCheckbox = (e.target as HTMLInputElement).type === "checkbox";
		const val = isCheckbox ? (e.target as HTMLInputElement).checked : value;

		setFormData((prev) => ({
			...prev,
			[name]: type === "number" ? (value === "" ? "" : parseFloat(value)) : val,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const finalData: any = {
			...formData,
			price: Number(formData.price) || 0,
		};

		if (initialData) {
			// Remove stock_quantity during update to follow strict API separation
			delete finalData.stock_quantity;
			onSubmit(finalData as UpdateProductRequest);
		} else {
			finalData.stock_quantity = Number(formData.stock_quantity) || 0;
			onSubmit(finalData as CreateProductRequest);
		}
	};

	return (
		<div className='bg-white p-8 rounded-3xl shadow-xl max-w-2xl w-full mx-auto border border-gray-100 animate-in fade-in zoom-in duration-300'>
			<div className='flex justify-between items-center mb-8'>
				<h2 className='text-2xl font-bold text-gray-900'>
					{initialData ? "Edit Product" : "Add New Product"}
				</h2>
				<button
					onClick={onCancel}
					className='text-gray-400 hover:text-gray-600 transition-colors'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'>
						<line x1='18' y1='6' x2='6' y2='18'></line>
						<line x1='6' y1='6' x2='18' y2='18'></line>
					</svg>
				</button>
			</div>

			<form onSubmit={handleSubmit} className='space-y-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='space-y-2'>
						<label className='text-sm font-semibold text-gray-700 ml-1'>
							Product Name
						</label>
						<input
							required
							name='product_name'
							value={formData.product_name}
							onChange={handleChange}
							placeholder='e.g. Wireless Headphones'
							className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder:text-gray-400'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-semibold text-gray-700 ml-1'>SKU Code</label>
						<input
							name='sku_code'
							value={formData.sku_code}
							onChange={handleChange}
							placeholder='e.g. WH-1000XM4'
							className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder:text-gray-400'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-semibold text-gray-700 ml-1'>Price</label>
						<div className='relative'>
							<span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium tracking-tight'>
								₹
							</span>
							<input
								required
								type='number'
								name='price'
								value={formData.price ?? ""}
								onChange={handleChange}
								placeholder='0.00'
								className='w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder:text-gray-400'
							/>
						</div>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-semibold text-gray-700 ml-1'>
							Stock Quantity
						</label>
						<input
							required
							type='number'
							name='stock_quantity'
							disabled={!!initialData}
							value={formData.stock_quantity ?? ""}
							onChange={handleChange}
							placeholder='0'
							className={`w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder:text-gray-400 ${
								initialData ? "opacity-50 cursor-not-allowed" : ""
							}`}
						/>
						{initialData && (
							<p className='text-[10px] text-gray-400 mt-1 ml-1 font-medium italic'>
								* Use "Update Stock" in the table to manage inventory.
							</p>
						)}
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-semibold text-gray-700 ml-1'>Category</label>
						<input
							name='category'
							value={formData.category}
							onChange={handleChange}
							placeholder='e.g. Electronics'
							className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder:text-gray-400'
						/>
					</div>

					<div className='flex items-center gap-3 pt-8 pl-1'>
						<label className='relative inline-flex items-center cursor-pointer'>
							<input
								type='checkbox'
								name='is_active'
								checked={formData.is_active}
								onChange={handleChange}
								className='sr-only peer'
							/>
							<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
							<span className='ml-3 text-sm font-semibold text-gray-700 tracking-tight'>
								Set as Active
							</span>
						</label>
					</div>
				</div>

				<div className='space-y-2'>
					<label className='text-sm font-semibold text-gray-700 ml-1'>Description</label>
					<textarea
						name='description'
						value={formData.description}
						onChange={handleChange}
						placeholder='Tell us more about this product...'
						rows={4}
						className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder:text-gray-400 resize-none'
					/>
				</div>

				<div className='flex gap-4 pt-4'>
					<button
						type='button'
						onClick={onCancel}
						className='flex-1 px-6 py-3.5 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all text-sm tracking-tight'>
						Cancel
					</button>
					<button
						type='submit'
						disabled={loading}
						className='flex-2 px-6 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 transition-all text-sm tracking-tight disabled:opacity-50 disabled:cursor-not-allowed'>
						{loading ? (
							<div className='flex items-center justify-center gap-2'>
								<span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
								Processing...
							</div>
						) : initialData ? (
							"Save Changes"
						) : (
							"Create Product"
						)}
					</button>
				</div>
			</form>
		</div>
	);
}

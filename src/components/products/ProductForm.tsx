"use client";

import React, { useState, useEffect } from "react";
import {
	CreateProductRequest,
	UpdateProductRequest,
	Product,
} from "@/modules/products/types/product.types";
import { useUpload } from "@/modules/uploads/hooks/useUpload";
import Image from "next/image";

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
		thumbnail_url: "",
	});

	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string>("");
	const { uploadSingleFile, uploading: s3Uploading } = useUpload();
	const [isUploadingImage, setIsUploadingImage] = useState(false);

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
				thumbnail_url: initialData.thumbnail_url || "",
			});
			if (initialData.thumbnail_url) {
				setPreviewUrl(initialData.thumbnail_url);
			}
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

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const removeImage = () => {
		setSelectedFile(null);
		setPreviewUrl("");
		setFormData((prev) => ({ ...prev, thumbnail_url: "" }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsUploadingImage(true);

		try {
			let thumbnailUrl = formData.thumbnail_url;

			// If a new file was selected, upload it first
			if (selectedFile) {
				thumbnailUrl = await uploadSingleFile(selectedFile);
			}

			const finalData: any = {
				...formData,
				price: Number(formData.price) || 0,
				thumbnail_url: thumbnailUrl,
			};

			if (initialData) {
				delete finalData.stock_quantity;
				onSubmit(finalData as UpdateProductRequest);
			} else {
				finalData.stock_quantity = Number(formData.stock_quantity) || 0;
				onSubmit(finalData as CreateProductRequest);
			}
		} catch (error) {
			console.error("Submission failed:", error);
			alert("Failed to upload image. Please try again.");
		} finally {
			setIsUploadingImage(false);
		}
	};

	return (
		<div className='bg-white rounded-3xl shadow-2xl flex flex-col max-w-2xl w-full mx-auto border border-gray-100 animate-in fade-in zoom-in duration-300 max-h-[92vh] sm:max-h-[90vh] overflow-hidden'>
			{/* Sticky Header */}
			<div className='flex justify-between items-center p-6 sm:p-8 border-b border-gray-50 bg-white/50 backdrop-blur-md z-10'>
				<div>
					<h2 className='text-xl sm:text-2xl font-black text-gray-900 tracking-tight'>
						{initialData ? "Edit Product" : "Add New Product"}
					</h2>
					<p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1'>
						Product inventory specification
					</p>
				</div>
				<button
					onClick={onCancel}
					className='w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-95 group'>
					<svg
						className='group-hover:rotate-90 transition-transform duration-300'
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='3'
						strokeLinecap='round'
						strokeLinejoin='round'>
						<line x1='18' y1='6' x2='6' y2='18'></line>
						<line x1='6' y1='6' x2='18' y2='18'></line>
					</svg>
				</button>
			</div>

			<form onSubmit={handleSubmit} className='flex-1 flex flex-col overflow-hidden'>
				{/* Scrollable Content */}
				<div className='flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar'>
					{/* Image Upload Area */}
					<div className='space-y-4'>
						<label className='text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1'>
							Product Representation
						</label>

						<div
							className={`relative w-full aspect-[4/3] md:aspect-video rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden group
								${previewUrl ? "border-transparent" : "border-gray-200 bg-gray-50/50 hover:bg-indigo-50/30 hover:border-indigo-200"}
							`}>
							{previewUrl ? (
								<>
									<Image
										src={previewUrl}
										alt='Preview'
										fill
										className='object-cover'
									/>
									<div className='absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm'>
										<button
											type='button'
											onClick={() =>
												document
													.getElementById("product-image-input")
													?.click()
											}
											className='p-4 bg-white text-gray-900 rounded-2xl font-black shadow-xl hover:scale-110 active:scale-95 transition-all text-xs uppercase tracking-widest'>
											Replace
										</button>
										<button
											type='button'
											onClick={removeImage}
											className='p-4 bg-rose-500 text-white rounded-2xl font-black shadow-xl hover:scale-110 active:scale-95 transition-all text-xs uppercase tracking-widest'>
											Remove
										</button>
									</div>
								</>
							) : (
								<button
									type='button'
									onClick={() =>
										document.getElementById("product-image-input")?.click()
									}
									className='flex flex-col items-center gap-4 text-gray-400 hover:text-indigo-600 transition-colors'>
									<div className='w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100/50'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='24'
											height='24'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2.5'
											strokeLinecap='round'
											strokeLinejoin='round'>
											<rect
												x='3'
												y='3'
												width='18'
												height='18'
												rx='2'
												ry='2'></rect>
											<circle cx='8.5' cy='8.5' r='1.5'></circle>
											<polyline points='21 15 16 10 5 21'></polyline>
										</svg>
									</div>
									<div className='text-center uppercase tracking-widest'>
										<p className='font-black text-[10px]'>
											Tap to Upload Image
										</p>
										<p className='text-[8px] font-bold opacity-60 mt-1 italic'>
											JPG, PNG (Max 5MB)
										</p>
									</div>
								</button>
							)}

							<input
								id='product-image-input'
								type='file'
								accept='image/*'
								onChange={handleFileChange}
								className='hidden'
							/>
						</div>
					</div>

					{/* Form Fields Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6'>
						<div className='space-y-2'>
							<label className='text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1'>
								Product Identity
							</label>
							<input
								required
								name='product_name'
								value={formData.product_name}
								onChange={handleChange}
								placeholder='e.g. Wireless Headphones'
								className='w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-gray-400 font-bold text-sm'
							/>
						</div>

						<div className='space-y-2'>
							<label className='text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1'>
								SKU Reference
							</label>
							<input
								name='sku_code'
								value={formData.sku_code}
								onChange={handleChange}
								placeholder='e.g. WH-1000XM4'
								className='w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-gray-400 font-bold text-sm'
							/>
						</div>

						<div className='space-y-2'>
							<label className='text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1'>
								Sale Price (INR)
							</label>
							<div className='relative'>
								<span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black tracking-tight text-sm'>
									₹
								</span>
								<input
									required
									type='number'
									name='price'
									value={formData.price ?? ""}
									onChange={handleChange}
									placeholder='0.00'
									className='w-full pl-8 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-gray-400 font-bold text-sm'
								/>
							</div>
						</div>

						<div className='space-y-2'>
							<label className='text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1'>
								Inventory Level
							</label>
							<input
								required
								type='number'
								name='stock_quantity'
								disabled={!!initialData}
								value={formData.stock_quantity ?? ""}
								onChange={handleChange}
								placeholder='0'
								className={`w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-gray-400 font-bold text-sm ${
									initialData ? "opacity-50 cursor-not-allowed" : ""
								}`}
							/>
						</div>

						<div className='space-y-2'>
							<label className='text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1'>
								Classification
							</label>
							<input
								name='category'
								value={formData.category}
								onChange={handleChange}
								placeholder='e.g. Electronics'
								className='w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-gray-400 font-bold text-sm'
							/>
						</div>

						<div className='flex items-center gap-3 pt-6 md:pt-8 pl-1'>
							<label className='relative inline-flex items-center cursor-pointer'>
								<input
									type='checkbox'
									name='is_active'
									checked={formData.is_active}
									onChange={handleChange}
									className='sr-only peer'
								/>
								<div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-900"></div>
								<span className='ml-3 text-[10px] font-black text-gray-700 uppercase tracking-widest'>
									Live Status
								</span>
							</label>
						</div>
					</div>

					<div className='space-y-2 pb-4'>
						<label className='text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1'>
							Detailed Overview
						</label>
						<textarea
							name='description'
							value={formData.description}
							onChange={handleChange}
							placeholder='Tell us more about this product...'
							rows={3}
							className='w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-gray-400 resize-none font-bold text-sm'
						/>
					</div>
				</div>

				{/* Sticky Footer */}
				<div className='sticky bottom-0 bg-white p-6 sm:p-8 pt-4 border-t border-gray-50 flex gap-4 z-10'>
					<button
						type='button'
						onClick={onCancel}
						className='flex-1 px-6 py-4 border border-gray-100 text-gray-400 font-bold rounded-2xl hover:bg-gray-50 hover:text-gray-600 transition-all text-[10px] uppercase tracking-widest active:scale-95 whitespace-nowrap'>
						Cancel
					</button>
					<button
						type='submit'
						disabled={loading || isUploadingImage || s3Uploading}
						className='flex-[2] px-6 py-4 bg-gray-900 text-white font-black rounded-2xl shadow-xl shadow-gray-200 hover:bg-gray-800 transition-all text-[10px] uppercase tracking-[0.15em] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap'>
						{loading || isUploadingImage || s3Uploading ? (
							<div className='flex items-center justify-center gap-2'>
								<span className='w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
								<span>Saving...</span>
							</div>
						) : initialData ? (
							"Update Details"
						) : (
							"Register Product"
						)}
					</button>
				</div>
			</form>
		</div>
	);
}

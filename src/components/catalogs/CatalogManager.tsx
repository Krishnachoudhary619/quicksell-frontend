"use client";

import React, { useState } from "react";
import { CatalogProductsResponse, CatalogProduct } from "@/modules/catalogs/types/catalog.types";
import { Product } from "@/modules/products/types/product.types";

interface CatalogManagerProps {
	catalogData: CatalogProductsResponse | null;
	allProducts: Product[];
	onAddProducts: (productIds: string[]) => void;
	onRemoveProduct: (productId: string) => void;
	onClose: () => void;
	loading: boolean;
}

export default function CatalogManager({
	catalogData,
	allProducts,
	onAddProducts,
	onRemoveProduct,
	onClose,
	loading,
}: CatalogManagerProps) {
	const [isSelecting, setIsSelecting] = useState(false);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);

	// Safe access to products
	const currentProducts = catalogData?.products || [];
	const currentProductIds = new Set(currentProducts.map((p) => p.id));

	// Filter out products already in the catalog for the selector
	const availableProducts = allProducts.filter((p) => !currentProductIds.has(p.id));

	const toggleSelection = (id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
		);
	};

	const handleAddSelected = () => {
		onAddProducts(selectedIds);
		setSelectedIds([]);
		setIsSelecting(false);
	};

	return (
		<div className='bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500'>
			{/* Header */}
			<div className='p-8 border-b border-gray-50 flex items-center justify-between shrink-0 bg-white z-10'>
				<div>
					<div className='flex items-center gap-2 mb-1'>
						<span className='px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-black uppercase tracking-wider'>
							Catalog Manager
						</span>
					</div>
					<h2 className='text-3xl font-black text-gray-900 tracking-tight'>
						{catalogData?.catalog_name || "Catalog Details"}
					</h2>
					<p className='text-gray-400 font-medium'>
						{isSelecting
							? "Select products to add"
							: `Managing ${currentProducts.length} items`}
					</p>
				</div>
				<button
					onClick={onClose}
					className='p-3 hover:bg-gray-100 rounded-2xl transition-all text-gray-400'>
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
						<line x1='18' y1='6' x2='6' y2='18'></line>
						<line x1='6' y1='6' x2='18' y2='18'></line>
					</svg>
				</button>
			</div>

			<div className='flex-1 overflow-y-auto p-8 pt-4 custom-scrollbar'>
				{!isSelecting ? (
					// List of Current Products
					<div className='space-y-4'>
						<div className='flex justify-between items-center mb-6'>
							<h3 className='font-bold text-gray-900 flex items-center gap-2'>
								Mapped Products
								<span className='text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-xs'>
									{currentProducts.length}
								</span>
							</h3>
							<button
								onClick={() => setIsSelecting(true)}
								className='flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-all shadow-lg active:scale-95'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='3'
									strokeLinecap='round'
									strokeLinejoin='round'>
									<line x1='12' y1='5' x2='12' y2='19'></line>
									<line x1='5' y1='12' x2='19' y2='12'></line>
								</svg>
								Add Products
							</button>
						</div>

						{currentProducts.length === 0 ? (
							<div className='py-20 text-center border-2 border-dashed border-gray-100 rounded-[2rem]'>
								<p className='text-gray-400 font-medium'>No products mapped yet</p>
							</div>
						) : (
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								{currentProducts.map((p) => (
									<div
										key={p.id}
										className='group flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-white transition-all shadow-sm'>
										<div className='flex items-center gap-4'>
											<div className='w-14 h-14 bg-white rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden'>
												{p.thumbnail_url ? (
													<img
														src={p.thumbnail_url}
														alt=''
														className='w-full h-full object-cover'
													/>
												) : (
													<svg
														className='text-gray-200'
														xmlns='http://www.w3.org/2000/svg'
														width='24'
														height='24'
														viewBox='0 0 24 24'
														fill='none'
														stroke='currentColor'
														strokeWidth='2'
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
												)}
											</div>
											<div>
												<p className='font-bold text-gray-900 line-clamp-1'>
													{p.product_name}
												</p>
												<p className='text-sm text-indigo-600 font-black'>
													₹{p.price}
												</p>
											</div>
										</div>
										<button
											onClick={() => onRemoveProduct(p.id)}
											className='p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='18'
												height='18'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												strokeWidth='2.5'
												strokeLinecap='round'
												strokeLinejoin='round'>
												<line x1='18' y1='6' x2='6' y2='18'></line>
												<line x1='6' y1='6' x2='18' y2='18'></line>
											</svg>
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				) : (
					// Product Selection View
					<div className='space-y-4'>
						<div className='flex justify-between items-center mb-6 sticky top-0 bg-white py-2 z-10'>
							<button
								onClick={() => setIsSelecting(false)}
								className='text-sm font-bold text-gray-400 hover:text-gray-900 flex items-center gap-1 transition-all'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='3'
									strokeLinecap='round'
									strokeLinejoin='round'>
									<polyline points='15 18 9 12 15 6'></polyline>
								</svg>
								Back to management
							</button>
							<p className='text-xs font-black text-indigo-600 uppercase tracking-widest'>
								Select products below
							</p>
						</div>

						{availableProducts.length === 0 ? (
							<div className='py-20 text-center'>
								<p className='text-gray-400 font-bold'>
									No more products available to add
								</p>
							</div>
						) : (
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pb-24'>
								{availableProducts.map((p) => (
									<div
										key={p.id}
										onClick={() => toggleSelection(p.id)}
										className={`cursor-pointer flex items-center gap-4 p-4 rounded-2xl border-2 transition-all group ${
											selectedIds.includes(p.id)
												? "border-indigo-600 bg-indigo-50/30"
												: "border-gray-50 bg-white hover:border-gray-200"
										}`}>
										<div
											className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
												selectedIds.includes(p.id)
													? "bg-indigo-600 border-indigo-600 text-white"
													: "border-gray-200 group-hover:border-indigo-300"
											}`}>
											{selectedIds.includes(p.id) && (
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='14'
													height='14'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
													strokeWidth='4'
													strokeLinecap='round'
													strokeLinejoin='round'>
													<polyline points='20 6 9 17 4 12'></polyline>
												</svg>
											)}
										</div>
										<div className='flex-1 flex items-center justify-between'>
											<div>
												<p className='font-bold text-gray-900 text-sm'>
													{p.product_name}
												</p>
												<p className='text-xs text-gray-400 font-bold uppercase tracking-tight'>
													{p.category || "Uncategorized"}
												</p>
											</div>
											<p className='font-black text-indigo-600 text-sm'>
												₹{p.price}
											</p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>

			{/* Footer Action Bar (only show when selecting) */}
			{isSelecting && selectedIds.length > 0 && (
				<div className='p-6 bg-white border-t border-gray-50 flex items-center justify-between animate-in slide-in-from-bottom-full duration-300 shadow-[0_-10px_40px_rgba(0,0,0,0.04)]'>
					<p className='font-bold text-gray-900'>
						<span className='px-2 py-0.5 bg-indigo-600 text-white rounded text-sm mr-2'>
							{selectedIds.length}
						</span>
						Products selected
					</p>
					<button
						onClick={handleAddSelected}
						disabled={loading}
						className='px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95'>
						{loading ? "Processing..." : "Map to Catalog"}
					</button>
				</div>
			)}
		</div>
	);
}

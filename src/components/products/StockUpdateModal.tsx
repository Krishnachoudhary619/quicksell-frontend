"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/modules/products/types/product.types";

interface StockUpdateModalProps {
	product: Product;
	onClose: () => void;
	onSubmit: (id: string, newStock: number) => Promise<void>;
	loading: boolean;
}

export default function StockUpdateModal({
	product,
	onClose,
	onSubmit,
	loading,
}: StockUpdateModalProps) {
	const [quantity, setQuantity] = useState<number>(product.stock_quantity ?? 0);

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await onSubmit(product.id, quantity);
		onClose();
	};

	// Prevent background scroll
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	return (
		<div className='fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-200'>
			<div
				className='bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300'
				onClick={(e) => e.stopPropagation()}>
				<div className='p-8'>
					<div className='flex items-center justify-between mb-8'>
						<div>
							<h3 className='text-2xl font-black text-gray-900 tracking-tight'>
								Update Stock
							</h3>
							<p className='text-gray-500 text-sm font-medium mt-1'>
								{product.product_name}
							</p>
						</div>
						<button
							onClick={onClose}
							className='p-2 hover:bg-gray-100 rounded-2xl transition-colors text-gray-400'>
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

					<form onSubmit={handleFormSubmit} className='space-y-8'>
						<div>
							<label className='block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1'>
								New Stock Quantity
							</label>
							<div className='relative group'>
								<input
									autoFocus
									type='number'
									inputMode='numeric'
									pattern='[0-9]*'
									value={quantity}
									onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
									className='w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-indigo-600 outline-none transition-all text-2xl font-black text-gray-900'
									placeholder='0'
									min='0'
								/>
								<div className='absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold'>
									Units
								</div>
							</div>
						</div>

						<div className='flex gap-4 pt-2'>
							<button
								type='button'
								onClick={onClose}
								className='flex-1 px-6 py-4 border-2 border-gray-100 text-gray-400 font-bold rounded-2xl hover:bg-gray-50 transition-all'>
								Cancel
							</button>
							<button
								type='submit'
								disabled={loading}
								className='flex-1 px-6 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all flex items-center justify-center gap-2'>
								{loading ? (
									<>
										<div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
										<span>Updating...</span>
									</>
								) : (
									"Save Update"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

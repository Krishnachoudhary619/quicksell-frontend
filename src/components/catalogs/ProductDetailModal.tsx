"use client";

import { useCartStore } from "@/store/cart.store";
import Image from "next/image";

interface ProductDetailModalProps {
	product: {
		id: string;
		product_name: string;
		price: number;
		thumbnail_url?: string | null;
		description?: string;
	} | null;
	onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
	const { cart, addToCart, increaseQty, decreaseQty } = useCartStore();

	if (!product) return null;

	const qty = cart.find((item) => item.id === product.id)?.quantity || 0;

	return (
		<div className='fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300' onClick={onClose}>
			<div
				className='bg-white w-full md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-[2.5rem] md:rounded-[3rem] shadow-2xl animate-in slide-in-from-bottom duration-500'
				onClick={(e) => e.stopPropagation()}>
				<div className='relative'>
					{/* Close Button */}
					<button
						onClick={onClose}
						className='absolute right-6 top-6 p-3 bg-white/80 backdrop-blur-md hover:bg-white rounded-2xl transition-all text-gray-400 hover:text-gray-900 z-10 shadow-sm border border-white/50'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
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

					<div className='flex flex-col md:flex-row'>
						{/* Image Section */}
						<div className='w-full md:w-1/2 p-6 md:p-10 bg-gray-50 flex items-center justify-center'>
							{product.thumbnail_url ? (
								<Image
									src={product.thumbnail_url}
									alt={product.product_name}
									width={600}
									height={600}
									className='w-full h-auto max-h-[250px] md:max-h-[400px] object-contain drop-shadow-2xl'
								/>
							) : (
								<div className='w-full aspect-square bg-white rounded-3xl flex items-center justify-center text-gray-200 border border-gray-100'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='80'
										height='80'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='1'
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
							)}
						</div>

						{/* Content Section */}
						<div className='w-full md:w-1/2 p-10 flex flex-col'>
							<div className='mb-6'>
								<span className='px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full'>
									Product Detail
								</span>
								<h2 className='text-xl md:text-3xl font-black text-gray-900 mt-3 leading-tight'>
									{product.product_name}
								</h2>
								<p className='text-xl md:text-3xl font-black text-indigo-600 mt-4 tracking-tighter'>
									₹{(product.price || 0).toLocaleString()}
								</p>
							</div>

							<div className='flex-1'>
								<h4 className='text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3'>
									Description
								</h4>
								<div className='text-gray-500 font-medium leading-relaxed max-h-[150px] overflow-y-auto pr-2 custom-scrollbar'>
									{product.description ||
										"Our products are curated for quality and excellence, ensuring you receive only the best items directly from our shop."}
								</div>
							</div>

							<div className='mt-10 flex flex-col gap-4'>
								{qty === 0 ? (
									<button
										onClick={() => {
											addToCart(product);
										}}
										className='w-full py-5 bg-gray-900 text-white font-black rounded-3xl shadow-xl shadow-gray-200 hover:bg-indigo-600 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 group'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='20'
											height='20'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2.5'
											strokeLinecap='round'
											strokeLinejoin='round'
											className='group-hover:rotate-12 transition-transform'>
											<path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'></path>
											<path d='M3 6h18'></path>
											<path d='M16 10a4 4 0 0 1-8 0'></path>
										</svg>
										Add to Cart
									</button>
								) : (
									<div className='flex items-center gap-4 p-2 bg-gray-50 rounded-[2rem] border border-gray-100'>
										<button
											onClick={() => decreaseQty(product.id)}
											className='w-14 h-14 bg-white shadow-sm flex items-center justify-center rounded-2xl text-gray-900 font-extrabold text-xl hover:text-rose-500 transition-colors'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='24'
												height='24'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												strokeWidth='3'
												strokeLinecap='round'
												strokeLinejoin='round'>
												<line x1='5' y1='12' x2='19' y2='12'></line>
											</svg>
										</button>
										<div className='flex-1 flex flex-col items-center justify-center'>
											<span className='text-2xl font-black text-gray-900'>
												{qty}
											</span>
											<span className='text-[10px] uppercase font-black text-gray-400'>
												In Cart
											</span>
										</div>
										<button
											onClick={() => increaseQty(product.id)}
											className='w-14 h-14 bg-white shadow-sm flex items-center justify-center rounded-2xl text-gray-900 font-extrabold text-xl hover:text-indigo-600 transition-colors'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='24'
												height='24'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												strokeWidth='3'
												strokeLinecap='round'
												strokeLinejoin='round'>
												<line x1='12' y1='5' x2='12' y2='19'></line>
												<line x1='5' y1='12' x2='19' y2='12'></line>
											</svg>
										</button>
									</div>
								)}
								<button
									onClick={onClose}
									className='w-full py-4 text-gray-400 font-bold hover:text-gray-900 transition-colors'>
									Dismiss
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

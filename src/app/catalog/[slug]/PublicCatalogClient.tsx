"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useCatalogs } from "@/modules/catalogs/hooks/useCatalogs";
import { useCartStore } from "@/store/cart.store";
import ProductDetailModal from "@/components/catalogs/ProductDetailModal";
import CartDrawer from "@/components/catalogs/CartDrawer";
import { PublicCatalogResponse } from "@/modules/catalogs/types/catalog.types";

interface PublicCatalogClientProps {
	initialCatalog: PublicCatalogResponse;
	slug: string;
}

export default function PublicCatalogClient({ initialCatalog, slug }: PublicCatalogClientProps) {
	const { publicCatalog, loading, error, getPublicCatalog } = useCatalogs(initialCatalog);
	const { cart, addToCart, increaseQty, decreaseQty, totalItems, totalAmount } = useCartStore();
	const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [isCartOpen, setIsCartOpen] = useState(false);

	const filteredProducts = useMemo(() => {
		if (!publicCatalog) return [];
		if (!searchQuery) return publicCatalog.products;
		return publicCatalog.products.filter((p) =>
			p.product_name.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [publicCatalog, searchQuery]);

	const getProductQty = (id: string) => {
		return cart.find((item) => item.id === id)?.quantity || 0;
	};

    // Only fetch if we don't have data from either server or previous client fetch
	useEffect(() => {
		if (slug && !publicCatalog && !initialCatalog) {
			getPublicCatalog(slug).catch(() => {});
		}
	}, [slug, getPublicCatalog, publicCatalog, initialCatalog]);

	if (error && !publicCatalog) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
				<div className='bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 text-center max-w-lg w-full'>
					<div className='w-24 h-24 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='48'
							height='48'
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
					</div>
					<h1 className='text-3xl font-black text-gray-900 mb-2'>Oops!</h1>
					<p className='text-gray-500 font-medium mb-8'>{error}</p>
					<button
						onClick={() => window.location.reload()}
						className='px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-1 active:scale-95'>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	if (!publicCatalog || loading) {
        return (
			<div className='min-h-screen bg-[#FAFAFB]'>
				<header className='bg-white border-b border-gray-100 h-24 flex items-center shadow-sm'>
					<div className='max-w-7xl mx-auto px-6 w-full flex items-center justify-between'>
						<div className='flex items-center gap-4'>
							<div className='w-12 h-12 bg-gray-100 rounded-2xl animate-pulse'></div>
							<div className='flex flex-col gap-2'>
								<div className='w-32 h-6 bg-gray-100 rounded animate-pulse'></div>
								<div className='w-24 h-3 bg-gray-50 rounded animate-pulse'></div>
							</div>
						</div>
					</div>
				</header>
				<main className='max-w-7xl mx-auto px-6 py-12'>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
						{[...Array(8)].map((_, i) => (
							<div key={i} className='bg-white rounded-[2rem] border border-gray-100 p-8 flex flex-col gap-6 shadow-sm'>
								<div className='aspect-square bg-gray-50 rounded-2xl animate-pulse flex items-center justify-center'>
									<svg className="w-12 h-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
								</div>
								<div className='space-y-3'>
									<div className='h-6 bg-gray-100 rounded-full animate-pulse w-3/4'></div>
									<div className='h-4 bg-gray-50 rounded-full animate-pulse w-1/2'></div>
								</div>
								<div className='mt-auto h-12 bg-gray-100 rounded-2xl animate-pulse'></div>
							</div>
						))}
					</div>
				</main>
			</div>
		);
    }

	return (
		<div className='min-h-screen bg-[#FAFAFB]'>
			{/* Consumer-facing Header */}
			<header className='bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm'>
				<div className='max-w-7xl mx-auto px-6 h-24 flex items-center justify-between'>
					<div className='flex items-center gap-4'>
						<div className='w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='white'
								strokeWidth='2.5'
								strokeLinecap='round'
								strokeLinejoin='round'>
								<path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'></path>
								<path d='M3 6h18'></path>
								<path d='M16 10a4 4 0 0 1-8 0'></path>
							</svg>
						</div>
						<div>
							<h1 className='text-2xl font-black text-gray-900 leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] sm:max-w-none'>
								{publicCatalog.catalog_name}
							</h1>
							<p className='text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em]'>
								QUICK SELL CATALOG
							</p>
						</div>
					</div>

					<div className='flex items-center gap-4'>
						<button
							onClick={() => setIsCartOpen(true)}
							className='relative p-3 bg-gray-50 hover:bg-indigo-50 text-gray-900 hover:text-indigo-600 rounded-2xl transition-all group'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2.5'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='group-hover:scale-110 transition-transform'>
								<path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'></path>
								<path d='M3 6h18'></path>
								<path d='M16 10a4 4 0 0 1-8 0'></path>
							</svg>
							{totalItems > 0 && (
								<span className='absolute -top-1 -right-1 w-6 h-6 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in-50 duration-300'>
									{totalItems}
								</span>
							)}
						</button>
					</div>
				</div>
			</header>

			<main className='max-w-7xl mx-auto px-6 py-8 md:py-12'>
				{/* Search & Actions Bar */}
				<div className='mb-12 flex flex-col md:flex-row gap-6 items-center justify-between'>
					<div className='relative w-full md:max-w-md'>
						<div className='absolute inset-y-0 left-6 flex items-center pointer-events-none'>
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
								className='text-gray-400'>
								<circle cx='11' cy='11' r='8'></circle>
								<line x1='21' y1='21' x2='16.65' y2='16.65'></line>
							</svg>
						</div>
						<input
							type='text'
							placeholder='Search products...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full pl-16 pr-8 py-5 bg-white rounded-[2rem] border border-gray-100 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all font-bold placeholder:text-gray-300'
						/>
					</div>

					{totalItems > 0 && (
						<div className='hidden md:flex items-center gap-4 bg-indigo-50 text-indigo-600 px-6 py-3 rounded-2xl'>
							<div className='flex flex-col'>
								<span className='text-[10px] font-black uppercase tracking-widest leading-none'>
									Subtotal
								</span>
								<span className='text-xl font-black'>
									₹{totalAmount.toLocaleString()}
								</span>
							</div>
							<div className='w-px h-8 bg-indigo-200'></div>
							<button
								onClick={() => setIsCartOpen(true)}
								className='font-black text-sm uppercase tracking-wider hover:underline'>
								View Cart ({totalItems})
							</button>
						</div>
					)}
				</div>

				{/* Products Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
					{filteredProducts.map((product, index) => {
						const qty = getProductQty(product.id);
						return (
							<div
								key={product.id}
								onClick={() => setSelectedProduct(product)}
								className='group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col cursor-pointer'>
								{/* Image Container */}
								<div className='relative aspect-square bg-[#F8F9FD] p-6 overflow-hidden'>
									<div className='absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors duration-500'></div>
									<div className='w-full h-full flex items-center justify-center relative z-10'>
										{product.thumbnail_url ? (
											<Image
												src={product.thumbnail_url}
												alt={product.product_name}
												width={400}
												height={400}
												className='w-full h-full object-contain group-hover:scale-110 transition-transform duration-700'
												loading={index < 4 ? undefined : 'lazy'}
                                                priority={index < 4}
											/>
										) : (
											<svg
												className='text-gray-200 group-hover:text-indigo-100 transition-colors'
												xmlns='http://www.w3.org/2000/svg'
												width='80'
												height='80'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												strokeWidth='1.5'
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
									{/* Price Badge */}
									<div className='absolute top-4 right-4 px-4 py-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 z-20'>
										<p className='text-lg font-black text-gray-900'>
											₹{(product.price || 0).toLocaleString()}
										</p>
									</div>

									{/* Quick Action Button - Mobile focus */}
									{qty === 0 ? (
										<button
											onClick={(e) => {
												e.stopPropagation();
												addToCart(product);
											}}
											className='md:hidden absolute bottom-4 right-4 p-4 bg-gray-900 text-white rounded-2xl shadow-xl'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='20'
												height='20'
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
									) : (
										<div className='md:hidden absolute bottom-4 right-4 flex items-center bg-gray-900 text-white rounded-2xl p-1 shadow-xl'>
											<button
												onClick={(e) => {
													e.stopPropagation();
													decreaseQty(product.id);
												}}
												className='p-3'>
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
													<line x1='5' y1='12' x2='19' y2='12'></line>
												</svg>
											</button>
											<span className='w-6 text-center font-black'>
												{qty}
											</span>
											<button
												onClick={(e) => {
													e.stopPropagation();
													increaseQty(product.id);
												}}
												className='p-3'>
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
											</button>
										</div>
									)}
								</div>

								{/* Content */}
								<div className='p-8 flex-1 flex flex-col'>
									<h3 className='text-xl font-bold text-gray-900 mb-6 line-clamp-2 min-h-[3.5rem] leading-snug group-hover:text-indigo-600 transition-colors'>
										{product.product_name}
									</h3>

									{qty === 0 ? (
										<button
											onClick={(e) => {
												e.stopPropagation();
												addToCart(product);
											}}
											className='w-full py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-indigo-600 shadow-lg active:scale-95 transition-all mt-auto flex items-center justify-center gap-2 group/btn'>
											Add to Cart
											<svg
												className='group-hover/btn:rotate-12 transition-transform'
												xmlns='http://www.w3.org/2000/svg'
												width='18'
												height='18'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												strokeWidth='2.5'
												strokeLinecap='round'
												strokeLinejoin='round'>
												<path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'></path>
												<path d='M3 6h18'></path>
												<path d='M16 10a4 4 0 0 1-8 0'></path>
											</svg>
										</button>
									) : (
										<div className='flex items-center gap-2 mt-auto p-1 bg-gray-50 rounded-2xl border border-gray-100'>
											<button
												onClick={(e) => {
													e.stopPropagation();
													decreaseQty(product.id);
												}}
												className='flex-1 py-3 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-rose-500 transition-colors'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='20'
													height='20'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
													strokeWidth='3'
													strokeLinecap='round'
													strokeLinejoin='round'>
													<line x1='5' y1='12' x2='19' y2='12'></line>
												</svg>
											</button>
											<span className='w-12 text-center font-black text-lg'>
												{qty}
											</span>
											<button
												onClick={(e) => {
													e.stopPropagation();
													increaseQty(product.id);
												}}
												className='flex-1 py-3 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-indigo-600 transition-colors'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='20'
													height='20'
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
								</div>
							</div>
						);
					})}
				</div>

				{/* Empty State */}
				{publicCatalog.products.length === 0 && (
					<div className='py-32 text-center bg-white rounded-[3.5rem] border-2 border-dashed border-gray-100'>
						<div className='w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='40'
								height='40'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'>
								<path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'></path>
								<path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'></path>
							</svg>
						</div>
						<h3 className='text-2xl font-black text-gray-900 mb-2'>
							Collection is Empty
						</h3>
						<p className='text-gray-400 font-medium max-w-xs mx-auto'>
							This catalog doesn&apos;t have any products listed yet.
						</p>
					</div>
				)}
			</main>

			{/* Floating Footer for Mobile Context */}
			<footer className='bg-white border-t border-gray-100 py-12 pb-32 mt-20'>
				<div className='max-w-7xl mx-auto px-6 flex flex-col items-center'>
					<p className='text-gray-400 font-medium mb-4'>Powered by</p>
					<div className='flex items-center gap-3 grayscale opacity-50'>
						<div className='w-8 h-8 bg-black rounded-lg'></div>
						<span className='font-black text-xl tracking-tighter'>QUICK SELL</span>
					</div>
				</div>
			</footer>

			{/* Floating Cart Button Bar */}
			{totalItems > 0 && (
				<div className='fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg z-50 animate-in slide-in-from-bottom-10 fade-in duration-500'>
					<div
						onClick={() => setIsCartOpen(true)}
						className='bg-gray-900 text-white p-4 rounded-[2.5rem] shadow-2xl shadow-indigo-200 border border-white/10 flex items-center justify-between cursor-pointer group'>
						<div className='flex items-center gap-4 pl-4'>
							<div className='relative'>
								<div className='w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform'>
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
										<path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'></path>
										<path d='M3 6h18'></path>
										<path d='M16 10a4 4 0 0 1-8 0'></path>
									</svg>
								</div>
								<span className='absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-gray-900'>
									{totalItems}
								</span>
							</div>
							<div>
								<p className='text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1'>
									Cart Total
								</p>
								<p className='text-xl font-black tracking-tight leading-none'>
									₹{(totalAmount || 0).toLocaleString()}
								</p>
							</div>
						</div>
						<div className='px-8 py-4 bg-indigo-600 group-hover:bg-indigo-500 text-white font-black rounded-[1.5rem] transition-all active:scale-95 flex items-center gap-2'>
							View Cart
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
								className='group-hover:translate-x-1 transition-transform'>
								<line x1='5' y1='12' x2='19' y2='12'></line>
								<polyline points='12 5 19 12 12 19'></polyline>
							</svg>
						</div>
					</div>
				</div>
			)}

			<ProductDetailModal
				product={selectedProduct}
				onClose={() => setSelectedProduct(null)}
			/>

			<CartDrawer
				isOpen={isCartOpen}
				onClose={() => setIsCartOpen(false)}
				catalogName={publicCatalog.catalog_name}
			/>
		</div>
	);
}

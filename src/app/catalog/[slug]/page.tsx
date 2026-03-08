"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useCatalogs } from "@/modules/catalogs/hooks/useCatalogs";

export default function PublicCatalogPage() {
	const params = useParams();
	const slug = params.slug as string;
	const { publicCatalog, loading, error, getPublicCatalog } = useCatalogs();

	useEffect(() => {
		if (slug) {
			getPublicCatalog(slug);
		}
	}, [slug, getPublicCatalog]);

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gray-50'>
				<div className='flex flex-col items-center gap-4'>
					<div className='w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin'></div>
					<p className='text-gray-500 font-bold animate-pulse text-lg uppercase tracking-widest'>
						Loading Catalog...
					</p>
				</div>
			</div>
		);
	}

	if (error) {
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

	if (!publicCatalog) return null;

	return (
		<div className='min-h-screen bg-[#FAFAFB]'>
			{/* Consumer-facing Header */}
			<header className='bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm'>
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
							<h1 className='text-2xl font-black text-gray-900 leading-tight'>
								Quick Sell
							</h1>
							<p className='text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em]'>
								Premium Collection
							</p>
						</div>
					</div>
					<div className='hidden md:flex bg-gray-50 rounded-full px-6 py-2 border border-gray-100 items-center gap-3'>
						<div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
						<span className='text-sm font-bold text-gray-600 uppercase tracking-wider'>
							Live Catalog
						</span>
					</div>
				</div>
			</header>

			<main className='max-w-7xl mx-auto px-6 py-12'>
				{/* Catalog Title Section */}
				<div className='mb-16 text-center md:text-left'>
					<h2 className='text-5xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4'>
						{publicCatalog.catalog_name}
					</h2>
					<div className='h-2 w-24 bg-indigo-600 rounded-full mx-auto md:mx-0 mb-6'></div>
					<p className='text-gray-400 font-medium text-lg max-w-2xl'>
						Explore our handpicked selection of premium products curated just for you.
						Directly order from this digital catalog.
					</p>
				</div>

				{/* Products Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
					{publicCatalog.products.map((product) => (
						<div
							key={product.id}
							className='group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col'>
							{/* Image Container */}
							<div className='relative aspect-square bg-[#F8F9FD] p-6 overflow-hidden'>
								<div className='absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors duration-500'></div>
								<div className='w-full h-full flex items-center justify-center relative z-10'>
									{product.thumbnail_url ? (
										<img
											src={product.thumbnail_url}
											alt={product.product_name}
											className='w-full h-full object-contain group-hover:scale-110 transition-transform duration-700'
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
										₹{product.price}
									</p>
								</div>
							</div>

							{/* Content */}
							<div className='p-8 flex-1 flex flex-col'>
								<h3 className='text-xl font-bold text-gray-900 mb-6 line-clamp-2 min-h-[3.5rem] leading-snug group-hover:text-indigo-600 transition-colors'>
									{product.product_name}
								</h3>

								<button className='w-full py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-indigo-600 shadow-lg active:scale-95 transition-all mt-auto flex items-center justify-center gap-2 group/btn'>
									Buy Now
									<svg
										className='group-hover/btn:translate-x-1 transition-transform'
										xmlns='http://www.w3.org/2000/svg'
										width='18'
										height='18'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<line x1='5' y1='12' x2='19' y2='12'></line>
										<polyline points='12 5 19 12 12 19'></polyline>
									</svg>
								</button>
							</div>
						</div>
					))}
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
			<footer className='bg-white border-t border-gray-100 py-12 mt-20'>
				<div className='max-w-7xl mx-auto px-6 flex flex-col items-center'>
					<p className='text-gray-400 font-medium mb-4'>Powered by</p>
					<div className='flex items-center gap-3 grayscale opacity-50'>
						<div className='w-8 h-8 bg-black rounded-lg'></div>
						<span className='font-black text-xl tracking-tighter'>QUICK SELL</span>
					</div>
				</div>
			</footer>
		</div>
	);
}

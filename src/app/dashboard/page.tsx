"use client";

import { useEffect } from "react";
import { useProducts } from "@/modules/products/hooks/useProducts";
import { useOrders } from "@/modules/orders/hooks/useOrders";
import { useCatalogs } from "@/modules/catalogs/hooks/useCatalogs";
import Link from "next/link";
import { format } from "date-fns";

export default function DashboardPage() {
	const { products, getProducts } = useProducts();
	const { orders, getOrders } = useOrders();
	const { catalogs, getCatalogs } = useCatalogs();

	useEffect(() => {
		getProducts();
		getOrders();
		getCatalogs();
	}, [getProducts, getOrders, getCatalogs]);

	const stats = [
		{
			label: "Total Products",
			value: products.length,
			icon: (
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
					<path d='m7.5 4.27 9 5.15'></path>
					<path d='M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z'></path>
					<path d='m3.3 7 8.7 5 8.7-5'></path>
					<path d='M12 22V12'></path>
				</svg>
			),
			color: "bg-indigo-50 text-indigo-600 border-indigo-100",
		},
		{
			label: "Live Catalogs",
			value: catalogs.length,
			icon: (
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
					<path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'></path>
					<path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'></path>
				</svg>
			),
			color: "bg-emerald-50 text-emerald-600 border-emerald-100",
		},
		{
			label: "Total Orders",
			value: orders.length,
			icon: (
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
					<path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'></path>
					<path d='M3 6h18'></path>
					<path d='M16 10a4 4 0 0 1-8 0'></path>
				</svg>
			),
			color: "bg-rose-50 text-rose-600 border-rose-100",
		},
	];

	return (
		<div className='space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700'>
			{/* Store Overview Section */}
			<section className='text-center lg:text-left'>
				<div className='lg:flex lg:items-center lg:justify-between'>
					<div>
						<h1 className='text-2xl lg:text-3xl font-black text-gray-900 tracking-tight'>
							Store Overview
						</h1>
						<p className='mt-1 text-sm lg:text-base text-gray-500 font-medium'>
							Manage your products, catalogs, and orders from one place.
						</p>
					</div>
					<div className='mt-5 lg:mt-0 flex justify-center lg:justify-end'>
						<Link
							href='/dashboard/catalogs'
							className='w-full max-w-[300px] lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='18'
								height='18'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='3'
								strokeLinecap='round'
								strokeLinejoin='round'>
								<line x1='12' y1='5' x2='12' y2='19'></line>
								<line x1='5' y1='12' x2='19' y2='12'></line>
							</svg>
							Create Catalog
						</Link>
					</div>
				</div>
			</section>

			{/* Stats Grid */}
			<section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6'>
				{stats.map((stat) => (
					<div
						key={stat.label}
						className='bg-white p-5 lg:p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group'>
						<div
							className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110 duration-300 ${stat.color}`}>
							{stat.icon}
						</div>
						<div>
							<p className='text-xs lg:text-sm font-bold text-gray-500 uppercase tracking-wider'>
								{stat.label}
							</p>
							<p className='text-2xl lg:text-3xl font-black text-gray-900 leading-none mt-1'>
								{stat.value}
							</p>
						</div>
					</div>
				))}
			</section>

			{/* Main Content Sections */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start'>
				{/* Recent Orders - Occupies 2 columns on Desktop */}
				<div className='lg:col-span-2 space-y-4 lg:space-y-6'>
					<div className='bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden'>
						<div className='px-4 lg:px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50'>
							<h2 className='text-base lg:text-lg font-black text-gray-900'>
								Recent Orders
							</h2>
							<Link
								href='/dashboard/orders'
								className='text-xs lg:text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors'>
								View All
							</Link>
						</div>

						<div className='divide-y divide-gray-100'>
							{orders && orders.length > 0 ? (
								orders.slice(0, 5).map((order) => (
									<div
										key={order.id}
										className='px-4 lg:px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group'>
										<div className='flex items-center gap-4'>
											<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors'>
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
													<path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'></path>
												</svg>
											</div>
											<div>
												<p className='text-sm font-black text-gray-900'>
													#{order.id.slice(-6).toUpperCase()}
												</p>
												<p className='text-xs text-gray-400 font-bold'>
													{order.created_at
														? format(
																new Date(order.created_at),
																"MMM d, h:mm a",
															)
														: "N/A"}
												</p>
											</div>
										</div>
										<div className='text-right'>
											<p className='text-sm font-black text-gray-900'>
												{order.total_items}{" "}
												{order.total_items === 1 ? "item" : "items"}
											</p>
											<span className='inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter mt-1 bg-amber-100 text-amber-700'>
												PENDING
											</span>
										</div>
									</div>
								))
							) : (
								<div className='py-12 lg:py-16 px-4 text-center'>
									<div className='w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300'>
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
											<path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'></path>
											<path d='M3 6h18'></path>
											<path d='M16 10a4 4 0 0 1-8 0'></path>
										</svg>
									</div>
									<h3 className='text-sm lg:text-base font-black text-gray-900'>
										No orders yet
									</h3>
									<p className='text-sm text-gray-500 font-medium mt-1'>
										When customers buy from your catalogs, they&apos;ll appear
										here.
									</p>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Quick Actions / Management Tools - Stacks Below on Mobile */}
				<div className='space-y-6'>
					<div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-5 lg:p-6'>
						<h2 className='text-base lg:text-lg font-black text-gray-900 mb-5 tracking-tight'>
							Shop Management
						</h2>
						<div className='space-y-3'>
							<Link
								href='/dashboard/products'
								className='w-full flex items-center gap-4 p-3.5 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all group'>
								<div className='w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0 border border-indigo-100 group-hover:scale-110 transition-transform'>
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
										<path d='m16 6 4 14H4L8 6Z'></path>
										<path d='M12 2v22'></path>
									</svg>
								</div>
								<div className='text-left'>
									<p className='text-sm font-black text-gray-900'>Add Products</p>
									<p className='text-xs text-gray-500 font-medium'>
										Grow your inventory
									</p>
								</div>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='3'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='ml-auto text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all'>
									<path d='m9 18 6-12'></path>
								</svg>
							</Link>

							<Link
								href='/dashboard/staff'
								className='w-full flex items-center gap-4 p-3.5 rounded-xl border border-gray-100 hover:border-violet-200 hover:bg-violet-50 transition-all group'>
								<div className='w-10 h-10 bg-violet-50 text-violet-600 rounded-lg flex items-center justify-center shrink-0 border border-violet-100 group-hover:scale-110 transition-transform'>
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
										<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'></path>
										<circle cx='9' cy='7' r='4'></circle>
										<path d='M22 21v-2a4 4 0 0 0-3-3.87'></path>
										<path d='M16 3.13a4 4 0 0 1 0 7.75'></path>
									</svg>
								</div>
								<div className='text-left'>
									<p className='text-sm font-black text-gray-900'>Manage Staff</p>
									<p className='text-xs text-gray-500 font-medium'>
										Collaborate with your team
									</p>
								</div>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='3'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='ml-auto text-gray-300 group-hover:text-violet-400 group-hover:translate-x-1 transition-all'>
									<path d='m9 18 6-12'></path>
								</svg>
							</Link>

							<Link
								href='/dashboard/profile'
								className='w-full flex items-center gap-4 p-3.5 rounded-xl border border-gray-100 hover:border-amber-200 hover:bg-amber-50 transition-all group'>
								<div className='w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center shrink-0 border border-amber-100 group-hover:scale-110 transition-transform'>
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
										<path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
										<circle cx='12' cy='7' r='4'></circle>
									</svg>
								</div>
								<div className='text-left'>
									<p className='text-sm font-black text-gray-900'>
										Store Settings
									</p>
									<p className='text-xs text-gray-500 font-medium'>
										Customize your experience
									</p>
								</div>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='3'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='ml-auto text-gray-300 group-hover:text-amber-400 group-hover:translate-x-1 transition-all'>
									<path d='m9 18 6-12'></path>
								</svg>
							</Link>
						</div>
					</div>

					{/* Notification/Banner Card */}
					<div className='bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200'>
						<h3 className='font-black text-lg leading-tight mb-2'>
							Unlock Premium Features
						</h3>
						<p className='text-indigo-100 text-sm font-medium mb-4'>
							Upgrade your plan to unlock detailed analytics, custom domains, and
							more.
						</p>
						<button className='w-full py-2.5 bg-white text-indigo-600 font-black text-sm rounded-xl hover:bg-indigo-50 transition-colors'>
							Upgrade Now
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

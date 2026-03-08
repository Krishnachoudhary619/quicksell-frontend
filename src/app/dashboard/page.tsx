"use client";

import { useAuthStore } from "@/store/auth.store";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/modules/products/hooks/useProducts";
import { useOrders } from "@/modules/orders/hooks/useOrders";
import { useCatalogs } from "@/modules/catalogs/hooks/useCatalogs";
import { useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";

export default function DashboardPage() {
	const { user, isAuthenticated } = useAuthStore();
	const { logout } = useAuth();

	const { products, getProducts } = useProducts();
	const { orders, getOrders } = useOrders();
	const { catalogs, getCatalogs } = useCatalogs();

	useEffect(() => {
		if (isAuthenticated) {
			getProducts();
			getOrders();
			getCatalogs();
		}
	}, [isAuthenticated, getProducts, getOrders, getCatalogs]);

	if (!isAuthenticated) return null;

	const stats = [
		{
			label: "Live Catalogs",
			value: catalogs.length,
			icon: (
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
					<path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'></path>
					<path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'></path>
				</svg>
			),
			color: "bg-blue-50 text-blue-600",
			href: "/dashboard/catalogs",
		},
		{
			label: "Total Products",
			value: products.length,
			icon: (
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
					<path d='m7.5 4.27 9 5.15'></path>
					<path d='M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z'></path>
					<path d='m3.3 7 8.7 5 8.7-5'></path>
					<path d='M12 22V12'></path>
				</svg>
			),
			color: "bg-indigo-50 text-indigo-600",
			href: "/dashboard/products",
		},
		{
			label: "Recent Orders",
			value: orders.length,
			icon: (
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
			),
			color: "bg-emerald-50 text-emerald-600",
			href: "/dashboard/orders",
		},
	];

	return (
		<div className='max-w-7xl mx-auto'>
			{/* Upper Section: Welcome & Actions */}
			<div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6'>
				<div>
					<h1 className='text-4xl font-black text-gray-900 tracking-tight'>
						Store Overview
					</h1>
					<p className='text-gray-500 font-medium mt-1 uppercase text-xs tracking-widest'>
						Manage your wholesale business efficiently
					</p>
				</div>
				<div className='flex gap-3'>
					<Link
						href='/dashboard/catalogs'
						className='px-6 py-3 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-2'>
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
						Create Catalog
					</Link>
				</div>
			</div>

			{/* Stats Grid */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
				{stats.map((stat, i) => (
					<Link
						key={i}
						href={stat.href}
						className='p-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-indigo-50 transition-all group'>
						<div className='flex items-center gap-6'>
							<div
								className={`w-16 h-16 ${stat.color} rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 shadow-sm opacity-80`}>
								{stat.icon}
							</div>
							<div>
								<p className='text-xs font-black text-gray-400 uppercase tracking-widest mb-1'>
									{stat.label}
								</p>
								<p className='text-4xl font-black text-gray-900 tracking-tighter'>
									{stat.value}
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				{/* Recent Orders Section */}
				<div className='lg:col-span-2 p-6 md:p-8 bg-white rounded-[2rem] md:rounded-[3rem] shadow-sm border border-gray-100'>
					<div className='flex justify-between items-center mb-8'>
						<h2 className='text-xl md:text-2xl font-black text-gray-900 tracking-tight'>
							Recent Orders
						</h2>
						<Link
							href='/dashboard/orders'
							className='text-[10px] md:text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline'>
							View All
						</Link>
					</div>

					{orders.length === 0 ? (
						<div className='py-12 md:py-20 text-center'>
							<div className='w-12 h-12 md:w-16 md:h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300'>
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
									<circle cx='12' cy='12' r='10'></circle>
									<line x1='12' y1='8' x2='12' y2='12'></line>
									<line x1='12' y1='16' x2='12.01' y2='16'></line>
								</svg>
							</div>
							<p className='text-gray-400 font-medium text-sm md:text-base'>
								No orders received yet.
							</p>
						</div>
					) : (
						<div className='space-y-3 md:space-y-4'>
							{orders.slice(0, 5).map((order) => (
								<div
									key={order.id}
									className='flex items-center justify-between p-4 md:p-5 bg-gray-50 rounded-2xl md:rounded-[2rem] hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group'>
									<div className='flex items-center gap-3 md:gap-4'>
										<div className='w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm font-black text-sm md:text-lg'>
											#{order.id.slice(-3).toUpperCase()}
										</div>
										<div>
											<p className='font-black text-gray-900 leading-none mb-1 text-sm md:text-base'>
												{order.total_items} Items
											</p>
											<p className='text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest'>
												{format(
													new Date(order.created_at),
													"MMM dd, hh:mm a",
												)}
											</p>
										</div>
									</div>
									<div className='text-right'>
										<span className='px-2 md:px-3 py-1 bg-white text-emerald-600 text-[9px] md:text-[10px] font-black rounded-full border border-emerald-100 uppercase tracking-widest leading-none'>
											New
										</span>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Quick Setup & Tools */}
				<div className='flex flex-col gap-8'>
					<div className='p-6 md:p-8 bg-white rounded-[2rem] md:rounded-[3rem] border border-dashed border-gray-200'>
						<h2 className='text-base md:text-lg font-black text-gray-400 uppercase tracking-widest mb-6'>
							Management Tools
						</h2>
						<div className='space-y-3 md:space-y-4'>
							<Link
								href='/dashboard/products'
								className='flex items-center justify-between p-5 bg-gray-50 hover:bg-indigo-50 rounded-2xl transition-all group border border-transparent hover:border-indigo-100'>
								<div className='flex items-center gap-4'>
									<div className='w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm transition-transform group-hover:scale-110'>
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
											<path d='m7.5 4.27 9 5.15'></path>
											<path d='M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z'></path>
											<path d='m3.3 7 8.7 5 8.7-5'></path>
											<path d='M12 22V12'></path>
										</svg>
									</div>
									<span className='font-black text-gray-700 tracking-tight'>
										Inventory
									</span>
								</div>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='18'
									height='18'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='3'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='text-gray-300 group-hover:translate-x-1 transition-transform'>
									<polyline points='9 18 15 12 9 6'></polyline>
								</svg>
							</Link>
							<Link
								href='/dashboard/profile'
								className='flex items-center justify-between p-5 bg-gray-50 hover:bg-indigo-50 rounded-2xl transition-all group border border-transparent hover:border-indigo-100'>
								<div className='flex items-center gap-4'>
									<div className='w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm transition-transform group-hover:scale-110'>
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
											<circle cx='12' cy='12' r='3'></circle>
											<path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'></path>
										</svg>
									</div>
									<span className='font-black text-gray-700 tracking-tight'>
										Shop Profile
									</span>
								</div>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='18'
									height='18'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='3'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='text-gray-300 group-hover:translate-x-1 transition-transform'>
									<polyline points='9 18 15 12 9 6'></polyline>
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

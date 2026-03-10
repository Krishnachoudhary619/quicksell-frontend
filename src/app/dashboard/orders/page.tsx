"use client";

import React, { useEffect, useState } from "react";
import { useOrders } from "@/modules/orders/hooks/useOrders";
import OrderTable from "@/components/orders/OrderTable";
import OrderDetailModal from "@/components/orders/OrderDetailModal";

export default function OrdersPage() {
	const { orders, order, loading, error, getOrders, getOrder } = useOrders();
	const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

	useEffect(() => {
		getOrders();
	}, [getOrders]);

	const handleViewDetails = async (id: string) => {
		setSelectedOrderId(id);
		try {
			await getOrder(id);
		} catch (err) {
			console.error("Failed to fetch order details", err);
		}
	};

	return (
		<div className='space-y-10'>
			{/* Header */}
			<div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
				<div>
					<h1 className='text-4xl font-black text-gray-900 tracking-tight'>
						Shop Orders
					</h1>
					<p className='text-gray-500 font-medium mt-1'>
						Manage and track all customer orders from your catalogs
					</p>
				</div>
				<div className='flex items-center gap-4'>
					<div className='p-1 bg-gray-50 rounded-2xl flex border border-gray-100'>
						<button className='px-6 py-2.5 bg-white text-gray-900 font-bold rounded-xl shadow-sm text-sm'>
							Recent
						</button>
						<button className='px-6 py-2.5 text-gray-400 font-bold rounded-xl text-sm hover:text-gray-600 transition-colors'>
							Export
						</button>
					</div>
				</div>
			</div>

			{/* Stats Overview */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				{[
					{
						label: "Total Orders",
						value: orders.length,
						iconColor: "text-indigo-600",
						bgColor: "bg-indigo-50",
					},
					{
						label: "Items Sold",
						value: orders.reduce((sum, o) => sum + (o.total_items || 0), 0),
						iconColor: "text-green-600",
						bgColor: "bg-green-50",
					},
					{
						label: "Avg. Items/Order",
						value:
							orders.length > 0
								? (
										orders.reduce((sum, o) => sum + (o.total_items || 0), 0) /
										orders.length
									).toFixed(1)
								: 0,
						iconColor: "text-orange-600",
						bgColor: "bg-orange-50",
					},
				].map((stat, i) => (
					<div
						key={i}
						className='bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-300 group'>
						<div>
							<p className='text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2'>
								{stat.label}
							</p>
							<p className='text-4xl font-black text-gray-900 tracking-tight group-hover:scale-105 transition-transform origin-left'>
								{stat.value}
							</p>
						</div>
						<div
							className={`w-14 h-14 ${stat.bgColor} rounded-2xl flex items-center justify-center ${stat.iconColor}`}>
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
								<rect width='18' height='18' x='3' y='3' rx='2' />
								<path d='M3 9h18' />
								<path d='M9 21V9' />
							</svg>
						</div>
					</div>
				))}
			</div>

			{/* Error State */}
			{error && (
				<div className='p-5 bg-red-50 border border-red-100 text-red-600 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2'>
					<div className='w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0'>
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
							<circle cx='12' cy='12' r='10' />
							<line x1='12' y1='8' x2='12' y2='12' />
							<line x1='12' y1='16' x2='12.01' y2='16' />
						</svg>
					</div>
					<div>
						<p className='font-black text-sm uppercase tracking-tight'>
							Action Required
						</p>
						<p className='text-sm opacity-80 font-medium'>{error}</p>
					</div>
				</div>
			)}

			{/* Main Content */}
			<div className='relative'>
				{loading && !selectedOrderId && (
					<div className='absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-3xl'>
						<div className='flex flex-col items-center gap-4'>
							<div className='w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin'></div>
							<p className='text-indigo-600 font-black text-xs uppercase tracking-widest'>
								Syncing data
							</p>
						</div>
					</div>
				)}
				<OrderTable orders={orders} onViewDetails={handleViewDetails} loading={loading} />
			</div>

			{/* Detail Modal Overlay */}
			{selectedOrderId && order && (
				<OrderDetailModal
					order={order}
					onClose={() => setSelectedOrderId(null)}
					loading={loading && selectedOrderId === order.id}
				/>
			)}
		</div>
	);
}

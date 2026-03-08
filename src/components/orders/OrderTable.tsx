"use client";

import React from "react";
import { OrderSummary } from "@/modules/orders/types/order.types";
import { format } from "date-fns";

interface OrderTableProps {
	orders: OrderSummary[];
	onViewDetails: (id: string) => void;
	loading: boolean;
}

export default function OrderTable({ orders, onViewDetails, loading }: OrderTableProps) {
	if (orders.length === 0 && !loading) {
		return (
			<div className='text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200'>
				<div className='w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='text-gray-400'>
						<path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z' />
						<path d='M3 6h18' />
						<path d='M16 10a4 4 0 0 1-8 0' />
					</svg>
				</div>
				<p className='text-gray-500 font-bold'>No orders found yet</p>
				<p className='text-gray-400 text-sm mt-1'>
					Share your catalog to start receiving orders!
				</p>
			</div>
		);
	}

	return (
		<div className='bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden'>
			<div className='overflow-x-auto'>
				<table className='w-full text-left border-collapse'>
					<thead>
						<tr className='bg-gray-50/50 border-b border-gray-100'>
							<th className='px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest'>
								Order ID
							</th>
							<th className='px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest'>
								Date
							</th>
							<th className='px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center'>
								Items
							</th>
							<th className='px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-50'>
						{orders.map((order) => (
							<tr
								key={order.id}
								className='hover:bg-gray-50/50 transition-colors group'>
								<td className='px-8 py-5'>
									<span className='font-mono text-sm font-bold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg'>
										#{order.id.slice(0, 8).toUpperCase()}
									</span>
								</td>
								<td className='px-8 py-5'>
									<div className='text-sm font-semibold text-gray-700'>
										{format(new Date(order.created_at), "MMM d, yyyy")}
									</div>
									<div className='text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5'>
										{format(new Date(order.created_at), "hh:mm aa")}
									</div>
								</td>
								<td className='px-8 py-5 text-center'>
									<span className='px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-black rounded-full'>
										{order.total_items} Items
									</span>
								</td>
								<td className='px-8 py-5 text-right'>
									<button
										onClick={() => onViewDetails(order.id)}
										className='inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95'>
										View Details
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='14'
											height='14'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2.5'
											strokeLinecap='round'
											strokeLinejoin='round'>
											<path d='m9 18 6-6-6-6' />
										</svg>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

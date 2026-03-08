"use client";

import React from "react";
import { OrderDetail } from "@/modules/orders/types/order.types";
import { format } from "date-fns";

interface OrderDetailModalProps {
	order: OrderDetail;
	onClose: () => void;
	loading: boolean;
}

export default function OrderDetailModal({ order, onClose, loading }: OrderDetailModalProps) {
	const totalPrice = order.order_items.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className='fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-200'>
			<div
				className='bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-6 duration-300'
				onClick={(e) => e.stopPropagation()}>
				<div className='p-10'>
					<div className='flex items-center justify-between mb-10'>
						<div>
							<div className='flex items-center gap-3 mb-2'>
								<h2 className='text-3xl font-black text-gray-900 tracking-tight'>
									Order Details
								</h2>
								<span className='px-4 py-1.5 bg-indigo-50 text-indigo-600 font-mono text-sm font-black rounded-xl'>
									#{order.id.slice(0, 8).toUpperCase()}
								</span>
							</div>
							<p className='text-gray-400 font-bold text-xs uppercase tracking-widest'>
								Placed on{" "}
								{format(new Date(order.created_at), "MMM d, yyyy 'at' hh:mm aa")}
							</p>
						</div>
						<button
							onClick={onClose}
							className='p-3 hover:bg-gray-100 rounded-2xl transition-all text-gray-400 hover:text-gray-900'>
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
					</div>

					<div className='bg-gray-50/50 rounded-3xl border border-gray-100 p-2 overflow-hidden mb-10'>
						<div className='overflow-x-auto'>
							<table className='w-full text-left'>
								<thead>
									<tr className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>
										<th className='px-6 py-4'>Product</th>
										<th className='px-6 py-4 text-center'>Quantity</th>
										<th className='px-6 py-4 text-right'>Price</th>
										<th className='px-6 py-4 text-right'>Total</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-gray-100/50'>
									{order.order_items.map((item, idx) => (
										<tr key={idx} className='text-sm font-bold text-gray-700'>
											<td className='px-6 py-5'>{item.product_name}</td>
											<td className='px-6 py-5 text-center'>
												<span className='px-3 py-1 bg-white border border-gray-100 rounded-lg shadow-sm'>
													{item.quantity}
												</span>
											</td>
											<td className='px-6 py-5 text-right font-medium text-gray-400'>
												₹{item.price.toLocaleString()}
											</td>
											<td className='px-6 py-5 text-right font-black text-gray-900'>
												₹{(item.price * item.quantity).toLocaleString()}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					<div className='flex flex-col md:flex-row items-center justify-between gap-8 pt-2 border-t border-gray-100'>
						<div className='text-center md:text-left'>
							<p className='text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1'>
								Total Items
							</p>
							<p className='text-2xl font-black text-gray-900'>
								{order.total_items} Products
							</p>
						</div>
						<div className='flex items-center gap-10'>
							<div className='text-right'>
								<p className='text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1'>
									Grand Total
								</p>
								<p className='text-3xl font-black text-indigo-600 tracking-tight'>
									₹{totalPrice.toLocaleString()}
								</p>
							</div>
							<button
								onClick={onClose}
								className='px-10 py-5 bg-gray-900 text-white font-black rounded-3xl hover:bg-gray-800 hover:-translate-y-1 active:scale-95 transition-all shadow-xl shadow-gray-200'>
								Back to Orders
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

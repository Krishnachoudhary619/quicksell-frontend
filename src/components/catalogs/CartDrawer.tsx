"use client";

import { useCartStore } from "@/store/cart.store";
import { generateWhatsappLink } from "@/utils/whatsapp";

interface CartDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	catalogName: string;
}

export default function CartDrawer({ isOpen, onClose, catalogName }: CartDrawerProps) {
	const { cart, increaseQty, decreaseQty, removeFromCart, totalAmount, totalItems } =
		useCartStore();

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-[100] flex justify-end'>
			{/* Backdrop */}
			<div
				className='absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300'
				onClick={onClose}></div>

			{/* Sidebar */}
			<div className='relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col'>
				<div className='p-6 flex items-center justify-between border-b border-gray-100'>
					<div>
						<h2 className='text-2xl font-black text-gray-900'>My Cart</h2>
						<p className='text-sm text-gray-500 font-medium'>
							{totalItems} items selected
						</p>
					</div>
					<button
						onClick={onClose}
						className='p-3 hover:bg-gray-100 rounded-2xl transition-colors'>
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

				<div className='flex-1 overflow-y-auto p-6 custom-scrollbar'>
					{cart.length === 0 ? (
						<div className='h-full flex flex-col items-center justify-center text-center'>
							<div className='w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='32'
									height='32'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='text-gray-300'>
									<path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'></path>
									<path d='M3 6h18'></path>
									<path d='M16 10a4 4 0 0 1-8 0'></path>
								</svg>
							</div>
							<h3 className='text-xl font-bold text-gray-900'>Your cart is empty</h3>
							<p className='text-gray-500 mt-2'>Add some products to get started!</p>
							<button
								onClick={onClose}
								className='mt-6 px-6 py-3 bg-indigo-600 text-white font-black rounded-2xl'>
								Continue Shopping
							</button>
						</div>
					) : (
						<div className='flex flex-col gap-6'>
							{cart.map((item) => (
								<div key={item.id} className='flex gap-4 group'>
									<div className='w-24 h-24 bg-gray-50 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100'>
										{item.thumbnail_url ? (
											<img
												src={item.thumbnail_url}
												alt={item.product_name}
												className='w-full h-full object-contain'
											/>
										) : (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='32'
												height='32'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												strokeWidth='1'
												strokeLinecap='round'
												strokeLinejoin='round'
												className='text-gray-200'>
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
									<div className='flex-1 flex flex-col justify-between py-1'>
										<div>
											<div className='flex justify-between items-start'>
												<h4 className='font-bold text-gray-900 line-clamp-1'>
													{item.product_name}
												</h4>
												<button
													onClick={() => removeFromCart(item.id)}
													className='text-gray-300 hover:text-rose-500 transition-colors'>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														width='18'
														height='18'
														viewBox='0 0 24 24'
														fill='none'
														stroke='currentColor'
														strokeWidth='2'
														strokeLinecap='round'
														strokeLinejoin='round'>
														<path d='M3 6h18'></path>
														<path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
														<path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
														<line
															x1='10'
															y1='11'
															x2='10'
															y2='17'></line>
														<line
															x1='14'
															y1='11'
															x2='14'
															y2='17'></line>
													</svg>
												</button>
											</div>
											<p className='text-indigo-600 font-extrabold mt-1'>
												₹{item.price.toLocaleString()}
											</p>
										</div>

										<div className='flex items-center gap-3'>
											<div className='flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100'>
												<button
													onClick={() => decreaseQty(item.id)}
													className='w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-600'>
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
												<span className='w-8 text-center font-black text-gray-900'>
													{item.quantity}
												</span>
												<button
													onClick={() => increaseQty(item.id)}
													className='w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-600'>
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
											<span className='text-sm font-bold text-gray-400'>
												Total: ₹
												{(item.price * item.quantity).toLocaleString()}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{cart.length > 0 && (
					<div className='p-6 border-t border-gray-100 bg-gray-50/50'>
						<div className='flex items-center justify-between mb-6'>
							<span className='text-gray-500 font-bold'>Subtotal</span>
							<span className='text-3xl font-black text-gray-900'>
								₹{totalAmount.toLocaleString()}
							</span>
						</div>
						<button
							onClick={() => {
								const link = generateWhatsappLink(cart, catalogName);
								window.open(link, "_blank");
							}}
							className='w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-3xl shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-3'>
							Place Order via WhatsApp
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
								className=''>
								<line x1='5' y1='12' x2='19' y2='12'></line>
								<polyline points='12 5 19 12 12 19'></polyline>
							</svg>
						</button>
						<p className='text-center text-[10px] text-gray-400 uppercase font-black tracking-widest mt-4'>
							Free Delivery on all orders
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

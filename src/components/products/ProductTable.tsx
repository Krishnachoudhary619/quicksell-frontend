import React, { useState } from "react";
import { Product } from "@/modules/products/types/product.types";
import StockUpdateModal from "./StockUpdateModal";

interface ProductTableProps {
	products: Product[];
	onEdit: (product: Product) => void;
	onDelete: (id: string) => void;
	onUpdateStock: (id: string, newStock: number) => Promise<any>;
	loading: boolean;
}

export default function ProductTable({
	products,
	onEdit,
	onDelete,
	onUpdateStock,
	loading,
}: ProductTableProps) {
	const [updatingId, setUpdatingId] = useState<string | null>(null);
	const [stockUpdateProduct, setStockUpdateProduct] = useState<Product | null>(null);

	if (products.length === 0 && !loading) {
		return (
			<div className='text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200'>
				<p className='text-gray-400'>
					No products found. Add your first product to get started!
				</p>
			</div>
		);
	}

	return (
		<div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
			<div className='overflow-x-auto'>
				<table className='w-full text-left border-collapse'>
					<thead>
						<tr className='bg-gray-50/50 border-b border-gray-100'>
							<th className='px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider'>
								Product Info
							</th>
							<th className='px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider'>
								Category
							</th>
							<th className='px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider'>
								Price
							</th>
							<th className='px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider'>
								Stock
							</th>
							<th className='px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider'>
								Status
							</th>
							<th className='px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-50'>
						{products.map((product) => (
							<tr
								key={product.id}
								className='hover:bg-gray-50 transition-colors group'>
								<td className='px-6 py-4'>
									<div className='flex items-center gap-4'>
										{product.thumbnail_url ? (
											<img
												src={product.thumbnail_url}
												alt={product.product_name}
												className='w-12 h-12 rounded-xl object-cover bg-gray-100'
											/>
										) : (
											<div className='w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold'>
												{(product.product_name || "?").charAt(0)}
											</div>
										)}
										<div>
											<div className='font-semibold text-gray-900'>
												{product.product_name || "Unknown Product"}
											</div>
											<div className='text-xs text-gray-400'>
												{product.sku_code || "No SKU"}
											</div>
										</div>
									</div>
								</td>
								<td className='px-6 py-4'>
									<span className='px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md uppercase'>
										{product.category || "Uncategorized"}
									</span>
								</td>
								<td className='px-6 py-4'>
									<div className='font-medium text-gray-900'>
										{product.currency || "₹"}{" "}
										{(product.price ?? 0).toLocaleString()}
									</div>
								</td>
								<td className='px-6 py-4'>
									<div className='flex items-center gap-2'>
										<span
											className={`w-2 h-2 rounded-full ${(product.stock_quantity ?? 0) > 10 ? "bg-green-500" : (product.stock_quantity ?? 0) > 0 ? "bg-orange-500" : "bg-red-500"}`}></span>
										<span className='text-sm text-gray-600 font-medium'>
											{product.stock_quantity ?? 0}
										</span>
									</div>
								</td>
								<td className='px-6 py-4'>
									<span
										className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
											product.is_active
												? "bg-green-50 text-green-600"
												: "bg-gray-100 text-gray-400"
										}`}>
										{product.is_active ? "Active" : "Inactive"}
									</span>
								</td>
								<td className='px-6 py-4 text-right'>
									<div className='flex justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity'>
										<button
											disabled={!!updatingId}
											onClick={() => setStockUpdateProduct(product)}
											className={`p-2 rounded-lg transition-all ${
												updatingId === product.id
													? "text-indigo-600 bg-indigo-50"
													: "text-orange-600 hover:bg-orange-50"
											} disabled:opacity-50 disabled:cursor-not-allowed`}
											title='Update Stock'>
											{updatingId === product.id ? (
												<div className='w-[18px] h-[18px] border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin'></div>
											) : (
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
													<path d='M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z'></path>
													<path d='m3.3 7 8.7 5 8.7-5'></path>
													<path d='M12 22V12'></path>
												</svg>
											)}
										</button>
										<button
											disabled={!!updatingId}
											onClick={() => onEdit(product)}
											className='p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
											title='Edit Product'>
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
												<path d='M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z'></path>
											</svg>
										</button>
										<button
											disabled={!!updatingId}
											onClick={() => onDelete(product.id)}
											className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
											title='Delete Product'>
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
												<polyline points='3 6 5 6 21 6'></polyline>
												<path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
												<line x1='10' y1='11' x2='10' y2='17'></line>
												<line x1='14' y1='11' x2='14' y2='17'></line>
											</svg>
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{stockUpdateProduct && (
				<StockUpdateModal
					product={stockUpdateProduct}
					onClose={() => setStockUpdateProduct(null)}
					loading={updatingId === stockUpdateProduct.id}
					onSubmit={async (id, quantity) => {
						setUpdatingId(id);
						try {
							await onUpdateStock(id, quantity);
						} finally {
							setUpdatingId(null);
						}
					}}
				/>
			)}
		</div>
	);
}

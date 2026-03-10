"use client";

import React, { useState } from "react";
import { CatalogSummary } from "@/modules/catalogs/types/catalog.types";
import ShareCatalogModal from "./ShareCatalogModal";

interface CatalogTableProps {
	catalogs: CatalogSummary[];
	onEdit: (catalog: CatalogSummary) => void;
	onDelete: (id: string) => void;
	onManageProducts: (catalog: CatalogSummary) => void;
	onToggleStatus: (id: string, active: boolean) => void;
	loading: boolean;
}

export default function CatalogTable({
	catalogs,
	onEdit,
	onDelete,
	onManageProducts,
	onToggleStatus,
	loading,
}: CatalogTableProps) {
	const [sharingCatalog, setSharingCatalog] = useState<CatalogSummary | null>(null);

	if (loading && catalogs.length === 0) {
		return (
			<div className='flex items-center justify-center p-20'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
			</div>
		);
	}

	if (catalogs.length === 0) {
		return (
			<div className='bg-white rounded-3xl border border-dashed border-gray-200 p-20 text-center'>
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
				<h3 className='text-xl font-bold text-gray-900'>No Catalogs Found</h3>
				<p className='text-gray-500 mt-2 max-w-sm mx-auto'>
					Create your first digital catalog to start sharing your products with customers.
				</p>
			</div>
		);
	}

	return (
		<div className='space-y-4'>
			{/* Mobile Card Layout */}
			<div className='grid grid-cols-1 gap-4 md:hidden'>
				{catalogs.map((catalog) => (
					<div
						key={catalog.id}
						className='bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-sm'>
						<div>
							<h3 className='font-black text-gray-900 text-lg leading-tight'>
								{catalog.catalog_name}
							</h3>
							<p className='text-sm text-gray-400 font-bold font-mono mt-1'>
								/{catalog.catalog_slug}
							</p>
						</div>

						<div className='flex items-center justify-between py-3 border-y border-gray-50'>
							<div className='flex items-center gap-2'>
								<span className='w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs'>
									{catalog.product_count}
								</span>
								<span className='text-gray-500 font-bold text-xs uppercase tracking-wider'>
									Products
								</span>
							</div>
							<button
								onClick={() => onToggleStatus(catalog.id, !catalog.is_active)}
								className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
									catalog.is_active
										? "bg-green-50 text-green-600 border border-green-100"
										: "bg-gray-50 text-gray-400 border border-gray-100"
								}`}>
								{catalog.is_active ? "Live" : "Inactive"}
							</button>
						</div>

						<div className='grid grid-cols-2 gap-2'>
							<button
								onClick={() => setSharingCatalog(catalog)}
								className='flex items-center justify-center gap-2 h-11 bg-blue-50 text-blue-600 font-black text-xs rounded-xl hover:bg-blue-100 transition-all active:scale-[0.98]'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2.5'
									strokeLinecap='round'
									strokeLinejoin='round'>
									<path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8'></path>
									<polyline points='16 6 12 2 8 6'></polyline>
									<line x1='12' y1='2' x2='12' y2='15'></line>
								</svg>
								Share
							</button>
							<button
								onClick={() => onManageProducts(catalog)}
								className='flex items-center justify-center gap-2 h-11 bg-indigo-50 text-indigo-600 font-black text-xs rounded-xl hover:bg-indigo-100 transition-all active:scale-[0.98]'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2.5'
									strokeLinecap='round'
									strokeLinejoin='round'>
									<path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
									<path d='M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
								</svg>
								Manage
							</button>
							<button
								onClick={() => onEdit(catalog)}
								className='flex items-center justify-center gap-2 h-11 bg-gray-50 text-gray-700 font-black text-xs rounded-xl hover:bg-gray-100 transition-all active:scale-[0.98]'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2.5'
									strokeLinecap='round'
									strokeLinejoin='round'>
									<circle cx='12' cy='12' r='3'></circle>
									<path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'></path>
								</svg>
								Edit
							</button>
							<button
								onClick={() => onDelete(catalog.id)}
								className='flex items-center justify-center gap-2 h-11 bg-rose-50 text-rose-600 font-black text-xs rounded-xl hover:bg-rose-100 transition-all active:scale-[0.98]'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2.5'
									strokeLinecap='round'
									strokeLinejoin='round'>
									<polyline points='3 6 5 6 21 6'></polyline>
									<path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
									<line x1='10' y1='11' x2='10' y2='17'></line>
									<line x1='14' y1='11' x2='14' y2='17'></line>
								</svg>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Desktop Table Layout */}
			<div className='hidden md:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden'>
				<div className='overflow-x-auto'>
					<table className='w-full text-left'>
						<thead>
							<tr className='bg-gray-50/50 border-b border-gray-100'>
								<th className='px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest'>
									Catalog Details
								</th>
								<th className='px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest'>
									Product Count
								</th>
								<th className='px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest'>
									Status
								</th>
								<th className='px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-50'>
							{catalogs.map((catalog) => (
								<tr
									key={catalog.id}
									className='hover:bg-gray-50/50 transition-colors group'>
									<td className='px-6 py-5'>
										<div className='flex flex-col'>
											<span className='font-bold text-gray-900 text-lg'>
												{catalog.catalog_name}
											</span>
											<span className='text-sm text-gray-400 font-medium font-mono'>
												/{catalog.catalog_slug}
											</span>
										</div>
									</td>
									<td className='px-6 py-5'>
										<div className='flex items-center gap-2'>
											<span className='w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm'>
												{catalog.product_count}
											</span>
											<span className='text-gray-500 font-medium'>
												Products
											</span>
										</div>
									</td>
									<td className='px-6 py-5'>
										<button
											onClick={() =>
												onToggleStatus(catalog.id, !catalog.is_active)
											}
											className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
												catalog.is_active
													? "bg-green-50 text-green-600 border border-green-100"
													: "bg-gray-50 text-gray-400 border border-gray-100"
											}`}>
											{catalog.is_active ? "Live" : "Inactive"}
										</button>
									</td>
									<td className='px-6 py-5'>
										<div className='flex items-center justify-end gap-2'>
											<button
												onClick={() => setSharingCatalog(catalog)}
												className='p-2.5 text-blue-500 hover:bg-blue-50 rounded-xl transition-all'
												title='Share Public Link'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='20'
													height='20'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'>
													<path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8'></path>
													<polyline points='16 6 12 2 8 6'></polyline>
													<line x1='12' y1='2' x2='12' y2='15'></line>
												</svg>
											</button>
											<button
												onClick={() => onManageProducts(catalog)}
												className='p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all'
												title='Manage Products'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='20'
													height='20'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'>
													<path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
													<path d='M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
												</svg>
											</button>
											<button
												onClick={() => onEdit(catalog)}
												className='p-2.5 text-gray-400 hover:text-gray-900 transition-all'
												title='Settings'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='20'
													height='20'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'>
													<circle cx='12' cy='12' r='3'></circle>
													<path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'></path>
												</svg>
											</button>
											<button
												onClick={() => onDelete(catalog.id)}
												className='p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-all'
												title='Delete'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='20'
													height='20'
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
			</div>

			{sharingCatalog && (
				<ShareCatalogModal
					catalog={sharingCatalog}
					onClose={() => setSharingCatalog(null)}
				/>
			)}
		</div>
	);
}

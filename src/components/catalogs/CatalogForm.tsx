"use client";

import React, { useState, useEffect } from "react";
import {
	CreateCatalogRequest,
	UpdateCatalogRequest,
	CatalogSummary,
} from "@/modules/catalogs/types/catalog.types";

interface CatalogFormProps {
	initialData?: CatalogSummary | null;
	onSubmit: (data: CreateCatalogRequest | UpdateCatalogRequest) => void;
	onCancel: () => void;
	loading: boolean;
}

export default function CatalogForm({
	initialData,
	onSubmit,
	onCancel,
	loading,
}: CatalogFormProps) {
	const [catalogName, setCatalogName] = useState("");
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		if (initialData) {
			setCatalogName(initialData.catalog_name);
			setIsActive(initialData.is_active);
		}
	}, [initialData]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (initialData) {
			onSubmit({ catalog_name: catalogName, is_active: isActive } as UpdateCatalogRequest);
		} else {
			onSubmit({ catalog_name: catalogName } as CreateCatalogRequest);
		}
	};

	return (
		<div className='bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200'>
			<div className='p-8'>
				<div className='flex items-center justify-between mb-8'>
					<div>
						<h2 className='text-2xl font-black text-gray-900 tracking-tight'>
							{initialData ? "Catalog Settings" : "Create Catalog"}
						</h2>
						<p className='text-gray-400 font-medium text-sm'>
							{initialData
								? "Update your collection details"
								: "Start a new digital collection"}
						</p>
					</div>
					<button
						onClick={onCancel}
						className='p-2 hover:bg-gray-100 rounded-xl transition-all text-gray-400'>
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
							<line x1='18' y1='6' x2='6' y2='18'></line>
							<line x1='6' y1='6' x2='18' y2='18'></line>
						</svg>
					</button>
				</div>

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='space-y-2'>
						<label className='text-sm font-bold text-gray-700 ml-1'>Catalog Name</label>
						<input
							required
							type='text'
							value={catalogName}
							onChange={(e) => setCatalogName(e.target.value)}
							className='w-full px-4 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all font-bold text-gray-800 placeholder:text-gray-300'
							placeholder='e.g. Summer Collection 2026'
						/>
					</div>

					{initialData && (
						<div className='flex items-center justify-between p-4 bg-gray-50 rounded-2xl'>
							<div className='flex flex-col'>
								<span className='text-sm font-bold text-gray-700'>
									Set as Active
								</span>
								<span className='text-xs text-gray-400 font-medium'>
									Control public visibility
								</span>
							</div>
							<label className='relative inline-flex items-center cursor-pointer'>
								<input
									type='checkbox'
									className='sr-only peer'
									checked={isActive}
									onChange={(e) => setIsActive(e.target.checked)}
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
							</label>
						</div>
					)}

					<div className='flex gap-3 pt-4'>
						<button
							type='button'
							onClick={onCancel}
							className='flex-1 px-6 py-4 bg-gray-50 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition-all'>
							Cancel
						</button>
						<button
							type='submit'
							disabled={loading}
							className='flex-[2] px-6 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all disabled:opacity-50'>
							{loading
								? "Processing..."
								: initialData
									? "Confirm Changes"
									: "Create Catalog"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

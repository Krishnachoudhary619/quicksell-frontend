"use client";

import React, { useState } from "react";
import { CatalogSummary } from "@/modules/catalogs/types/catalog.types";
import { copyToClipboard } from "@/utils/helpers";

interface ShareCatalogModalProps {
	catalog: CatalogSummary;
	onClose: () => void;
}

export default function ShareCatalogModal({ catalog, onClose }: ShareCatalogModalProps) {
	const [copied, setCopied] = useState(false);
	const catalogUrl =
		typeof window !== "undefined"
			? `${window.location.origin}/catalog/${catalog.catalog_slug}`
			: "";

	const handleCopy = async () => {
		const success = await copyToClipboard(catalogUrl);
		if (success) {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	const handleWhatsApp = () => {
		const message = `Check out our products in our new catalog: ${catalog.catalog_name}\n\nView here: ${catalogUrl}`;
		const encodedMessage = encodeURIComponent(message);
		window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
	};

	return (
		<div className='fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-200'>
			<div
				className='bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300'
				onClick={(e) => e.stopPropagation()}>
				<div className='p-10'>
					<div className='flex items-center justify-between mb-8'>
						<h3 className='text-3xl font-black text-gray-900 tracking-tight'>
							Share Catalog
						</h3>
						<button
							onClick={onClose}
							className='p-2 hover:bg-gray-100 rounded-2xl transition-colors text-gray-400'>
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
								<line x1='18' y1='6' x2='6' y2='18'></line>
								<line x1='6' y1='6' x2='18' y2='18'></line>
							</svg>
						</button>
					</div>

					<p className='text-gray-500 font-medium mb-8'>
						Share{" "}
						<span className='text-gray-900 font-bold'>"{catalog.catalog_name}"</span>{" "}
						with your customers across different platforms.
					</p>

					<div className='space-y-4'>
						{/* Copy Link Section */}
						<div className='p-1 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-2'>
							<input
								type='text'
								readOnly
								value={catalogUrl}
								className='bg-transparent border-none outline-none flex-1 px-4 py-3 text-sm font-medium text-gray-500 truncate'
							/>
							<button
								onClick={handleCopy}
								className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${
									copied
										? "bg-green-500 text-white"
										: "bg-white text-gray-900 hover:bg-gray-100"
								}`}>
								{copied ? "Copied!" : "Copy Link"}
							</button>
						</div>

						{/* WhatsApp Button */}
						<button
							onClick={handleWhatsApp}
							className='w-full py-5 bg-[#25D366] text-white font-black rounded-3xl shadow-xl shadow-green-100 hover:bg-[#20bd5a] hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3'>
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
								<path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14.7 8.38 8.38 0 0 1 3.8.9L21 3Z' />
							</svg>
							Send via WhatsApp
						</button>

						<button
							onClick={onClose}
							className='w-full py-5 bg-white border-2 border-gray-100 text-gray-400 font-bold rounded-3xl hover:bg-gray-50 transition-all mt-4'>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

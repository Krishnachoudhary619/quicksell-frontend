"use client";

import { useEffect, useState, useCallback } from "react";
import { useCatalogs } from "@/modules/catalogs/hooks/useCatalogs";
import { useProducts } from "@/modules/products/hooks/useProducts";
import CatalogTable from "@/components/catalogs/CatalogTable";
import CatalogForm from "@/components/catalogs/CatalogForm";
import CatalogManager from "@/components/catalogs/CatalogManager";
import {
	CatalogSummary,
	CreateCatalogRequest,
	UpdateCatalogRequest,
} from "@/modules/catalogs/types/catalog.types";

export default function CatalogsPage() {
	const {
		catalogs,
		catalogProducts,
		loading: catalogsLoading,
		error: catalogsError,
		getCatalogs,
		createCatalog,
		updateCatalog,
		deleteCatalog,
		getCatalogProducts,
		addProducts,
		removeProduct,
	} = useCatalogs();

	const { products: allProducts, getProducts: getAllProducts } = useProducts();

	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isManagerOpen, setIsManagerOpen] = useState(false);
	const [activeCatalog, setActiveCatalog] = useState<CatalogSummary | null>(null);

	useEffect(() => {
		getCatalogs();
		getAllProducts();
	}, [getCatalogs, getAllProducts]);

	const handleCreateOrUpdate = async (data: CreateCatalogRequest | UpdateCatalogRequest) => {
		try {
			if (activeCatalog) {
				await updateCatalog(activeCatalog.id, data as UpdateCatalogRequest);
			} else {
				await createCatalog(data as CreateCatalogRequest);
			}
			setIsFormOpen(false);
			setActiveCatalog(null);
		} catch (err) {
			console.error("Save failed:", err);
		}
	};

	const handleEditSettings = (catalog: CatalogSummary) => {
		setActiveCatalog(catalog);
		setIsFormOpen(true);
	};

	const handleManageProducts = async (catalog: CatalogSummary) => {
		setActiveCatalog(catalog);
		setIsManagerOpen(true);
		await getCatalogProducts(catalog.id);
	};

	const handleDelete = async (id: string) => {
		if (confirm("Permanently delete this catalog? Products won't be deleted.")) {
			await deleteCatalog(id);
		}
	};

	const handleToggleStatus = async (id: string, active: boolean) => {
		await updateCatalog(id, { is_active: active });
	};

	const handleMapProducts = async (productIds: string[]) => {
		if (activeCatalog) {
			await addProducts(activeCatalog.id, { product_ids: productIds });
		}
	};

	const handleUnmapProduct = async (productId: string) => {
		if (activeCatalog) {
			await removeProduct(activeCatalog.id, productId);
		}
	};

	return (
		<div className='p-8 max-w-7xl mx-auto space-y-10'>
			{/* Header Section */}
			<div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
				<div>
					<h1 className='text-4xl font-black text-gray-900 tracking-tight'>
						Digital Catalogs
					</h1>
					<p className='text-gray-400 font-medium mt-1'>
						Curate and share your product collections
					</p>
				</div>
				<button
					onClick={() => {
						setActiveCatalog(null);
						setIsFormOpen(true);
					}}
					className='flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 transition-all'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='3'
						strokeLinecap='round'
						strokeLinejoin='round'>
						<line x1='12' y1='5' x2='12' y2='19'></line>
						<line x1='5' y1='12' x2='19' y2='12'></line>
					</svg>
					New Collection
				</button>
			</div>

			{/* Error State */}
			{catalogsError && (
				<div className='p-6 bg-rose-50 border border-rose-100 text-rose-600 rounded-3xl flex items-center gap-4 font-bold animate-in fade-in slide-in-from-top-4'>
					<div className='w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center shrink-0'>
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
							<circle cx='12' cy='12' r='10'></circle>
							<line x1='12' y1='8' x2='12' y2='12'></line>
							<line x1='12' y1='16' x2='12.01' y2='16'></line>
						</svg>
					</div>
					<p>{catalogsError}</p>
				</div>
			)}

			{/* Table View */}
			<CatalogTable
				catalogs={catalogs}
				onEdit={handleEditSettings}
				onDelete={handleDelete}
				onManageProducts={handleManageProducts}
				onToggleStatus={handleToggleStatus}
				loading={catalogsLoading}
			/>

			{/* Overlays */}
			{isFormOpen && (
				<div className='fixed inset-0 bg-gray-900/40 backdrop-blur-md flex items-center justify-center p-4 z-[60] animate-in fade-in duration-300'>
					<CatalogForm
						initialData={activeCatalog}
						onSubmit={handleCreateOrUpdate}
						onCancel={() => {
							setIsFormOpen(false);
							setActiveCatalog(null);
						}}
						loading={catalogsLoading}
					/>
				</div>
			)}

			{isManagerOpen && (
				<div className='fixed inset-0 bg-gray-900/40 backdrop-blur-md flex items-center justify-center md:p-4 z-[60] animate-in fade-in duration-300'>
					<CatalogManager
						catalogData={catalogProducts}
						allProducts={allProducts}
						onAddProducts={handleMapProducts}
						onRemoveProduct={handleUnmapProduct}
						onClose={() => {
							setIsManagerOpen(false);
							setActiveCatalog(null);
						}}
						loading={catalogsLoading}
					/>
				</div>
			)}
		</div>
	);
}

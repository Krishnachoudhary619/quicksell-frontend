"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useAuthStore } from "@/store/auth.store";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
	{
		label: "Home",
		href: "/dashboard",
		icon: (
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
				<rect x='3' y='3' width='7' height='7'></rect>
				<rect x='14' y='3' width='7' height='7'></rect>
				<rect x='14' y='14' width='7' height='7'></rect>
				<rect x='3' y='14' width='7' height='7'></rect>
			</svg>
		),
	},
	{
		label: "Catalogs",
		href: "/dashboard/catalogs",
		icon: (
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
				<path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'></path>
				<path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'></path>
			</svg>
		),
	},
	{
		label: "Products",
		href: "/dashboard/products",
		icon: (
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
				<path d='m7.5 4.27 9 5.15'></path>
				<path d='M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z'></path>
				<path d='m3.3 7 8.7 5 8.7-5'></path>
				<path d='M12 22V12'></path>
			</svg>
		),
	},
	{
		label: "Orders",
		href: "/dashboard/orders",
		icon: (
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
				<path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'></path>
				<path d='M3 6h18'></path>
				<path d='M16 10a4 4 0 0 1-8 0'></path>
			</svg>
		),
	},
	{
		label: "Settings",
		href: "/dashboard/profile",
		icon: (
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
				<circle cx='12' cy='12' r='3'></circle>
				<path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'></path>
			</svg>
		),
	},
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuthGuard();
	const { user } = useAuthStore();
	const { logout } = useAuth();
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	if (!isAuthenticated) return null;

	return (
		<div className='min-h-screen bg-[#FAFAFB] flex'>
			{/* Professional Sidebar */}
			{/* Mobile Sidebar Overlay */}
			{isMobileMenuOpen && (
				<div
					className='fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] md:hidden'
					onClick={() => setIsMobileMenuOpen(false)}
				/>
			)}

			{/* Sidebar (Desktop & Mobile) */}
			<aside
				className={`
				w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 z-[101] overflow-y-auto
				transition-transform duration-300 md:translate-x-0
				${isMobileMenuOpen ? "translate-x-0 fixed" : "-translate-x-full absolute md:relative"}
			`}>
				<div className='p-6 md:p-8 flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg'>
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
								<path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'></path>
								<path d='M3 6h18'></path>
								<path d='M16 10a4 4 0 0 1-8 0'></path>
							</svg>
						</div>
						<span className='text-lg font-black text-gray-900 tracking-tighter'>
							QuickSell
						</span>
					</div>
					<button
						onClick={() => setIsMobileMenuOpen(false)}
						className='md:hidden p-2 text-gray-400 hover:text-gray-900'>
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
							<line x1='18' y1='6' x2='6' y2='18'></line>
							<line x1='6' y1='6' x2='18' y2='18'></line>
						</svg>
					</button>
				</div>

				<nav className='flex-1 px-4 space-y-1.5'>
					{NAV_ITEMS.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => setIsMobileMenuOpen(false)}
								className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
									isActive
										? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
										: "text-gray-400 hover:bg-gray-50 hover:text-indigo-600"
								}`}>
								<span
									className={
										isActive
											? "text-white"
											: "text-gray-400 group-hover:text-indigo-600"
									}>
									{item.icon}
								</span>
								<span className='text-[13px] tracking-tight'>{item.label}</span>
							</Link>
						);
					})}
				</nav>

				<div className='p-6'>
					<button
						onClick={logout}
						className='w-full flex items-center gap-3 px-4 py-3 text-rose-500 font-bold hover:bg-rose-50 rounded-xl transition-all group'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='18'
							height='18'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2.5'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='group-hover:-translate-x-1 transition-transform'>
							<path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
							<polyline points='16 17 21 12 16 7'></polyline>
							<line x1='21' y1='12' x2='9' y2='12'></line>
						</svg>
						<span className='text-[13px] tracking-tight'>Sign Out</span>
					</button>
				</div>
			</aside>

			<div className='flex-1 flex flex-col'>
				{/* Top Header */}
				<header className='h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-gray-50 flex items-center justify-between px-6 md:px-8 sticky top-0 z-40'>
					<div className='flex items-center gap-4'>
						<button
							onClick={() => setIsMobileMenuOpen(true)}
							className='md:hidden p-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-600 active:scale-95 transition-all'>
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
								<line x1='4' y1='12' x2='20' y2='12'></line>
								<line x1='4' y1='6' x2='20' y2='6'></line>
								<line x1='4' y1='18' x2='20' y2='18'></line>
							</svg>
						</button>
						<div className='hidden md:block'>
							<p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1 opacity-70'>
								Welcome Back
							</p>
							<h2 className='text-lg font-black text-gray-900 tracking-tight leading-none italic'>
								Partner Merchant Dashboard
							</h2>
						</div>
						<div className='md:hidden'>
							<span className='text-lg font-black text-gray-900 tracking-tighter'>
								QuickSell
							</span>
						</div>
					</div>

					<div className='flex items-center gap-4 md:gap-6'>
						<div className='hidden sm:flex flex-col text-right'>
							<p className='text-[9px] font-black text-indigo-600 uppercase tracking-widest leading-none mb-1'>
								Status
							</p>
							<p className='text-[13px] font-black text-gray-900 leading-none'>
								Online & Verified
							</p>
						</div>
						<div className='w-9 h-9 md:w-10 md:h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xs md:text-sm cursor-pointer shadow-lg shadow-indigo-100'>
							{user?.role?.[0] || "U"}
						</div>
					</div>
				</header>

				<main className='flex-1 p-6 md:p-10 overflow-y-auto'>{children}</main>
			</div>
		</div>
	);
}

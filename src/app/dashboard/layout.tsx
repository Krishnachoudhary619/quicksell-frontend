"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useAuthStore } from "@/store/auth.store";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

	if (!isAuthenticated) return null;

	return (
		<div className='min-h-screen bg-[#FAFAFB] flex'>
			{/* Professional Sidebar */}
			<aside className='w-72 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 z-50 overflow-y-auto hidden md:flex'>
				<div className='p-10'>
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg'>
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
								<path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'></path>
								<path d='M3 6h18'></path>
								<path d='M16 10a4 4 0 0 1-8 0'></path>
							</svg>
						</div>
						<span className='text-xl font-black text-gray-900 tracking-tighter'>
							QuickSell
						</span>
					</div>
				</div>

				<nav className='flex-1 px-6 space-y-2'>
					{NAV_ITEMS.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.href}
								href={item.href}
								className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all ${
									isActive
										? "bg-indigo-600 text-white shadow-xl shadow-indigo-100"
										: "text-gray-400 hover:bg-indigo-50 hover:text-indigo-600"
								}`}>
								{item.icon}
								<span className='text-sm uppercase tracking-widest'>
									{item.label}
								</span>
							</Link>
						);
					})}
				</nav>

				<div className='p-8 space-y-4'>
					<div className='p-6 bg-gray-50 rounded-[2rem] border border-gray-100 text-center'>
						<div className='w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm font-black text-indigo-600'>
							{user?.role?.[0] || "U"}
						</div>
						<p className='text-xs font-black text-gray-900 truncate mb-1'>WHOLESALER</p>
						<p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
							Premium Active
						</p>
					</div>

					<button
						onClick={logout}
						className='w-full flex items-center gap-4 px-8 py-4 text-rose-500 font-bold hover:bg-rose-50 rounded-2xl transition-all group'>
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
							className='group-hover:-translate-x-1 transition-transform'>
							<path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
							<polyline points='16 17 21 12 16 7'></polyline>
							<line x1='21' y1='12' x2='9' y2='12'></line>
						</svg>
						<span className='text-sm uppercase tracking-widest'>Sign Out</span>
					</button>
				</div>
			</aside>

			<div className='flex-1 flex flex-col'>
				{/* Top Header */}
				<header className='h-24 bg-white/80 backdrop-blur-md border-b border-gray-50 flex items-center justify-between px-10 sticky top-0 z-40'>
					<div className='md:hidden flex items-center gap-4'>
						<div className='p-2 border border-gray-100 rounded-lg'>
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
								<line x1='4' y1='12' x2='20' y2='12'></line>
								<line x1='4' y1='6' x2='20' y2='6'></line>
								<line x1='4' y1='18' x2='20' y2='18'></line>
							</svg>
						</div>
					</div>

					<div className='hidden md:block'>
						<p className='text-sm font-bold text-gray-400 uppercase tracking-widest leading-none mb-1'>
							Welcome Back
						</p>
						<h2 className='text-xl font-black text-gray-900 tracking-tight leading-none italic'>
							Partner Merchant Dashboard
						</h2>
					</div>

					<div className='flex items-center gap-6'>
						<div className='hidden sm:flex flex-col text-right'>
							<p className='text-[10px] font-black text-indigo-600 uppercase tracking-widest leading-none mb-1'>
								Status
							</p>
							<p className='text-sm font-black text-gray-900 leading-none'>
								Online & Verified
							</p>
						</div>
						<div className='w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 relative group cursor-pointer transition-all hover:border-indigo-200'>
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
								className='text-gray-400 group-hover:text-indigo-600 transition-colors'>
								<path d='M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9'></path>
								<path d='M10.3 21a1.94 1.94 0 0 0 3.4 0'></path>
							</svg>
							<span className='absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white'></span>
						</div>
					</div>
				</header>

				<main className='flex-1 p-10 overflow-y-auto'>{children}</main>
			</div>
		</div>
	);
}

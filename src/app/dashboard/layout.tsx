"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useAuthStore } from "@/store/auth.store";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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

	// Close drawer on window resize if larger than 1024px
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setIsMobileMenuOpen(false);
			}
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (!isAuthenticated) return null;

	return (
		<div className='min-h-screen bg-[#F6F6F7] flex flex-col lg:flex-row overflow-hidden'>
			{/* Mobile Sidebar Overlay */}
			<div
				className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100] transition-opacity duration-300 lg:hidden ${
					isMobileMenuOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}`}
				onClick={() => setIsMobileMenuOpen(false)}
			/>

			{/* Sidebar Drawer */}
			<aside
				className={`
				fixed inset-y-0 left-0 w-60 bg-[#1A1C23] text-gray-300 flex flex-col z-[101] shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none
				${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
			`}>
				{/* Logo Section */}
				<div className='h-16 flex items-center px-6 gap-3 shrink-0'>
					<div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='18'
							height='18'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='3'
							strokeLinecap='round'
							strokeLinejoin='round'>
							<path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'></path>
							<path d='M3 6h18'></path>
							<path d='M16 10a4 4 0 0 1-8 0'></path>
						</svg>
					</div>
					<span className='text-lg font-black text-white tracking-tight italic'>
						QuickSell
					</span>
				</div>

				{/* Navigation */}
				<nav className='flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar-dark'>
					{NAV_ITEMS.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => setIsMobileMenuOpen(false)}
								className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold transition-all group ${
									isActive
										? "bg-white/10 text-white shadow-sm"
										: "hover:bg-white/5 hover:text-white"
								}`}>
								<span
									className={`${isActive ? "text-indigo-400" : "text-gray-500 group-hover:text-indigo-400"} transition-colors`}>
									{item.icon}
								</span>
								<span className='text-sm tracking-tight'>{item.label}</span>
								{isActive && (
									<div className='ml-auto w-1.5 h-1.5 bg-indigo-400 rounded-full' />
								)}
							</Link>
						);
					})}
				</nav>

				{/* Footer/Logout */}
				<div className='p-4 border-t border-white/5'>
					<button
						onClick={logout}
						className='w-full flex items-center gap-3 px-4 py-2.5 text-gray-400 font-bold hover:bg-rose-500/10 hover:text-rose-400 rounded-lg transition-all group'>
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
							<path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
							<polyline points='16 17 21 12 16 7'></polyline>
							<line x1='21' y1='12' x2='9' y2='12'></line>
						</svg>
						<span className='text-sm italic'>Sign Out</span>
					</button>
				</div>
			</aside>

			{/* Main Content Area */}
			<div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
				{/* Header */}
				<header className='h-14 lg:h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-40'>
					<div className='flex items-center gap-4'>
						<button
							onClick={() => setIsMobileMenuOpen(true)}
							className='lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='22'
								height='22'
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

						{/* Logo on Mobile */}
						<div className='lg:hidden flex items-center gap-2'>
							<span className='text-xl font-black text-gray-900 tracking-tighter italic'>
								QuickSell
							</span>
						</div>

						{/* Breadcrumb style text on Desktop */}
						<div className='hidden lg:flex items-center gap-2 text-sm text-gray-500 font-medium'>
							<span className='text-gray-400'>Store</span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='14'
								height='14'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'>
								<polyline points='9 18 15 12 9 6'></polyline>
							</svg>
							<span className='text-gray-900 font-bold capitalize'>
								{pathname.split("/").pop() || "Overview"}
							</span>
						</div>
					</div>

					{/* Right Side Icons */}
					<div className='flex items-center gap-2 lg:gap-4'>
						{/* Notification Badge placeholder */}
						<button className='p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors relative'>
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
								<path d='M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9'></path>
								<path d='M10.3 21a1.94 1.94 0 0 0 3.4 0'></path>
							</svg>
							<span className='absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white' />
						</button>

						<div className='w-8 h-8 lg:w-9 lg:h-9 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 font-black text-xs cursor-pointer hover:bg-gray-200 transition-colors border border-gray-200'>
							{user?.role?.[0] || "U"}
						</div>
					</div>
				</header>

				{/* Main Viewport */}
				<main className='flex-1 overflow-y-auto bg-[#F6F6F7] custom-scrollbar-main'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8'>
						{children}
					</div>
				</main>
			</div>

			<style jsx global>{`
				.custom-scrollbar-dark::-webkit-scrollbar {
					width: 4px;
				}
				.custom-scrollbar-dark::-webkit-scrollbar-track {
					background: transparent;
				}
				.custom-scrollbar-dark::-webkit-scrollbar-thumb {
					background: rgba(255, 255, 255, 0.1);
					border-radius: 10px;
				}
				.custom-scrollbar-main::-webkit-scrollbar {
					width: 6px;
				}
				.custom-scrollbar-main::-webkit-scrollbar-track {
					background: transparent;
				}
				.custom-scrollbar-main::-webkit-scrollbar-thumb {
					background: #e2e2e5;
					border-radius: 10px;
				}
			`}</style>
		</div>
	);
}

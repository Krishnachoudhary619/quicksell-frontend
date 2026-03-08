"use client";

import { useAuthStore } from "@/store/auth.store";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function DashboardPage() {
	const { user, isAuthenticated } = useAuthStore();
	const { logout, loading } = useAuth();

	if (!isAuthenticated) return null;

	return (
		<div className='p-8 max-w-4xl mx-auto'>
			<div className='flex justify-between items-center mb-10'>
				<div>
					<h1 className='text-3xl font-bold'>Dashboard</h1>
					<p className='text-gray-500'>Welcome, {user?.role}</p>
				</div>
				<button
					onClick={logout}
					disabled={loading}
					className='bg-red-50 to-red-100 text-red-600 px-6 py-2 rounded-full border border-red-200 hover:bg-red-500 hover:text-white transition-all font-semibold disabled:opacity-50'>
					{loading ? "Signing Out..." : "Sign Out"}
				</button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
				<div className='p-6 bg-white rounded-2xl shadow-sm border border-gray-100'>
					<h2 className='text-xl font-semibold mb-4 text-indigo-600'>User Profile</h2>
					<div className='space-y-3'>
						<p>
							<span className='text-gray-400'>ID:</span> {user?.id}
						</p>
						<p>
							<span className='text-gray-400'>Role:</span>{" "}
							<span className='px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded uppercase tracking-wider'>
								{user?.role}
							</span>
						</p>
						<p>
							<span className='text-gray-400'>Shop ID:</span> {user?.shop_id}
						</p>
					</div>
				</div>

				<div className='p-6 bg-white rounded-2xl shadow-sm border border-gray-100'>
					<h2 className='text-xl font-semibold mb-4 text-indigo-600'>Quick Actions</h2>
					<div className='grid grid-cols-2 gap-4'>
						<Link
							href='/dashboard/products'
							className='p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 border border-transparent hover:border-indigo-100 transition-all text-sm font-medium text-center'>
							Manage Products
						</Link>
						<Link
							href='/dashboard/orders'
							className='p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 border border-transparent hover:border-indigo-100 transition-all text-sm font-medium text-center'>
							View Orders
						</Link>
						<Link
							href='/dashboard/catalogs'
							className='p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 border border-transparent hover:border-indigo-100 transition-all text-sm font-medium text-center'>
							Catalogs
						</Link>
						<Link
							href='/dashboard/profile'
							className='p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 border border-transparent hover:border-indigo-100 transition-all text-sm font-medium text-center'>
							Profile
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

"use client";

import React from "react";
import { StaffUser } from "@/types/user.types";

interface StaffListProps {
	staff: StaffUser[];
	onToggleStatus: (id: string, is_active: boolean) => void;
	loading?: boolean;
}

export default function StaffList({ staff, onToggleStatus, loading }: StaffListProps) {
	if (staff.length === 0) {
		return (
			<div className='text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200'>
				<div className='w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='text-gray-300'>
						<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'></path>
						<circle cx='9' cy='7' r='4'></circle>
						<path d='M22 21v-2a4 4 0 0 0-3-3.87'></path>
						<path d='M16 3.13a4 4 0 0 1 0 7.75'></path>
					</svg>
				</div>
				<p className='text-gray-500 font-bold'>No staff members yet</p>
				<p className='text-gray-400 text-sm mt-1'>
					Add your team members to help manage orders.
				</p>
			</div>
		);
	}

	return (
		<div className='space-y-4'>
			{/* Mobile Card Layout */}
			<div className='grid grid-cols-1 gap-4 md:hidden'>
				{staff.map((member) => (
					<div
						key={member.id}
						className='bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-sm'>
						<div className='flex items-center justify-between'>
							<div>
								<h3 className='font-black text-gray-900 text-lg leading-tight'>
									{member.name}
								</h3>
								<p className='text-sm text-gray-400 font-bold font-mono mt-1'>
									{member.phone}
								</p>
							</div>
							<span
								className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
									member.is_active
										? "bg-green-50 text-green-600 border border-green-100"
										: "bg-rose-50 text-rose-600 border border-rose-100"
								}`}>
								{member.is_active ? "Active" : "Inactive"}
							</span>
						</div>

						<button
							onClick={() => onToggleStatus(member.id, !member.is_active)}
							disabled={loading}
							className={`w-full h-11 flex items-center justify-center gap-2 font-black text-xs rounded-xl transition-all active:scale-[0.98] ${
								member.is_active
									? "bg-rose-50 text-rose-600 hover:bg-rose-100"
									: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
							}`}>
							{loading ? (
								<div
									className={`w-4 h-4 border-2 rounded-full animate-spin ${member.is_active ? "border-rose-200 border-t-rose-600" : "border-indigo-200 border-t-indigo-600"}`}></div>
							) : member.is_active ? (
								"Deactivate Access"
							) : (
								"Activate Access"
							)}
						</button>
					</div>
				))}
			</div>

			{/* Desktop Table Layout */}
			<div className='hidden md:block bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden'>
				<table className='w-full text-left'>
					<thead>
						<tr className='bg-gray-50/50 border-b border-gray-100'>
							<th className='px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest'>
								Name
							</th>
							<th className='px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest'>
								Phone
							</th>
							<th className='px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest'>
								Status
							</th>
							<th className='px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-50/50'>
						{staff.map((member) => (
							<tr key={member.id} className='hover:bg-gray-50/50 transition-colors'>
								<td className='px-8 py-5 font-bold text-gray-900'>{member.name}</td>
								<td className='px-8 py-5 font-mono text-sm text-gray-500 font-medium'>
									{member.phone}
								</td>
								<td className='px-8 py-5'>
									<span
										className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
											member.is_active
												? "bg-green-50 text-green-600 border border-green-100"
												: "bg-rose-50 text-rose-600 border border-rose-100"
										}`}>
										{member.is_active ? "Active" : "Inactive"}
									</span>
								</td>
								<td className='px-8 py-5 text-right'>
									<button
										onClick={() => onToggleStatus(member.id, !member.is_active)}
										disabled={loading}
										className={`text-sm font-black transition-colors ${
											member.is_active
												? "text-rose-500 hover:text-rose-700"
												: "text-indigo-600 hover:text-indigo-800"
										}`}>
										{member.is_active ? "Deactivate" : "Activate"}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

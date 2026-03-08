"use client";

import React from "react";
import { StaffUser } from "@/types/user.types";

interface StaffListProps {
	staff: StaffUser[];
	onToggleStatus: (id: string, is_active: boolean) => void;
	loading?: boolean;
}

export default function StaffList({ staff, onToggleStatus, loading }: StaffListProps) {
	return (
		<div className='bg-white shadow rounded-lg overflow-hidden'>
			<table className='min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50'>
					<tr>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Name
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Phone
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Status
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Actions
						</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{staff.map((member) => (
						<tr key={member.id}>
							<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
								{member.name}
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
								{member.phone}
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<span
									className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
									{member.is_active ? "Active" : "Inactive"}
								</span>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
								<button
									onClick={() => onToggleStatus(member.id, !member.is_active)}
									disabled={loading}
									className='text-indigo-600 hover:text-indigo-900'>
									{member.is_active ? "Deactivate" : "Activate"}
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

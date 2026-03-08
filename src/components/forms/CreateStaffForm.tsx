"use client";

import React from "react";

interface CreateStaffFormProps {
	name: string;
	phone: string;
	onNameChange: (val: string) => void;
	onPhoneChange: (val: string) => void;
	onSubmit: (e: React.FormEvent) => void;
	loading: boolean;
}

export default function CreateStaffForm({
	name,
	phone,
	onNameChange,
	onPhoneChange,
	onSubmit,
	loading,
}: CreateStaffFormProps) {
	return (
		<form onSubmit={onSubmit} className='bg-white p-6 rounded-lg shadow space-y-4 mb-8'>
			<h3 className='text-lg font-semibold'>Add New Staff</h3>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<input
					type='text'
					placeholder='Name'
					className='border p-2 rounded w-full'
					value={name}
					onChange={(e) => onNameChange(e.target.value)}
					required
				/>
				<input
					type='tel'
					placeholder='Phone Number'
					className='border p-2 rounded w-full'
					value={phone}
					onChange={(e) => onPhoneChange(e.target.value)}
					required
				/>
			</div>
			<button
				type='submit'
				disabled={loading}
				className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50'>
				{loading ? "Adding..." : "Add Staff"}
			</button>
		</form>
	);
}

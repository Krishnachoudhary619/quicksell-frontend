"use client";

import React from "react";

interface ProfileFormProps {
	profile: any;
	onNameChange: (name: string) => void;
	onSubmit: (e: React.FormEvent) => void;
	loading: boolean;
}

export default function ProfileForm({
	profile,
	onNameChange,
	onSubmit,
	loading,
}: ProfileFormProps) {
	return (
		<div className='max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4'>
			<h2 className='text-xl font-bold'>Manage Profile</h2>
			<form onSubmit={onSubmit} className='space-y-4'>
				<div>
					<label className='block text-sm font-medium text-gray-700'>Name</label>
					<input
						type='text'
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
						value={profile?.name || ""}
						onChange={(e) => onNameChange(e.target.value)}
					/>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700'>Phone</label>
					<input
						type='text'
						disabled
						className='mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm'
						value={profile?.phone || ""}
					/>
				</div>
				<button
					type='submit'
					disabled={loading}
					className='w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'>
					{loading ? "Saving..." : "Update Profile"}
				</button>
			</form>
		</div>
	);
}

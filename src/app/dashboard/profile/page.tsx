"use client";

import { useEffect, useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import ProfileForm from "@/components/forms/ProfileForm";
import { UpdateShopRequest } from "@/types/user.types";

export default function ProfilePage() {
	const { profile, shop, getProfile, updateProfile, updateShop, loading, error } = useProfile();

	useEffect(() => {
		getProfile();
	}, [getProfile]);

	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const handleProfileSubmit = async (name: string) => {
		try {
			await updateProfile(name);
			setSuccessMessage("Personal profile updated successfully!");
			setTimeout(() => setSuccessMessage(null), 3000);
		} catch (err) {
			console.error("Profile update error:", err);
		}
	};

	const handleShopSubmit = async (data: UpdateShopRequest) => {
		try {
			await updateShop(data);
			setSuccessMessage("Shop details updated successfully!");
			setTimeout(() => setSuccessMessage(null), 3000);
		} catch (err) {
			console.error("Shop update error:", err);
		}
	};

	return (
		<div className='space-y-10'>
			<div className='max-w-4xl mx-auto mb-10'>
				<h1 className='text-3xl font-black text-gray-900 tracking-tight mb-2'>Settings</h1>
				<p className='text-gray-400 font-medium'>
					Control your personal and business presence
				</p>
			</div>

			{successMessage && (
				<div className='fixed top-4 right-1/2 translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4'>
					<div className='bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 font-bold'>
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
							<polyline points='20 6 9 17 4 12'></polyline>
						</svg>
						{successMessage}
					</div>
				</div>
			)}

			<ProfileForm
				profile={profile}
				shop={shop}
				onSubmitProfile={handleProfileSubmit}
				onSubmitShop={handleShopSubmit}
				loading={loading}
			/>

			{error && (
				<div className='max-w-4xl mx-auto mt-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 font-medium'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'>
						<circle cx='12' cy='12' r='10'></circle>
						<line x1='12' y1='8' x2='12' y2='12'></line>
						<line x1='12' y1='16' x2='12.01' y2='16'></line>
					</svg>
					{error}
				</div>
			)}
		</div>
	);
}

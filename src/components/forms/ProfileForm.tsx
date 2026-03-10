"use client";

import React, { useState, useEffect } from "react";
import { UserProfile, ShopDetails, UpdateShopRequest } from "@/types/user.types";

interface ProfileFormProps {
	profile: UserProfile | null;
	shop: ShopDetails | null;
	onSubmitProfile: (name: string) => void;
	onSubmitShop: (data: UpdateShopRequest) => void;
	loading: boolean;
}

export default function ProfileForm({
	profile,
	shop,
	onSubmitProfile,
	onSubmitShop,
	loading,
}: ProfileFormProps) {
	const [userName, setUserName] = useState("");
	const [shopData, setShopData] = useState<UpdateShopRequest>({
		shop_name: "",
		shop_phone: "",
		shop_email: "",
		shop_address: "",
		shop_logo_url: "",
		shop_images: [],
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const isAdmin = profile?.role === "ADMIN" || profile?.role === "OWNER";

	useEffect(() => {
		if (profile) {
			setUserName(profile.name);
		}
		if (shop) {
			setShopData({
				shop_name: shop.shop_name || "",
				shop_phone: shop.shop_phone || "",
				shop_email: shop.shop_email || "",
				shop_address: shop.shop_address || "",
				shop_logo_url: shop.shop_logo_url || "",
				shop_images: shop.shop_images || [],
			});
		}
	}, [profile, shop]);

	const validateProfile = () => {
		const newErrors: { [key: string]: string } = {};
		if (userName.length < 2) newErrors.userName = "Name must be at least 2 characters";
		if (userName.length > 100) newErrors.userName = "Name must be less than 100 characters";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const validateShop = () => {
		const newErrors: { [key: string]: string } = {};
		if (shopData.shop_name && shopData.shop_name.length < 2) {
			newErrors.shop_name = "Shop name must be at least 2 characters";
		}
		if (shopData.shop_phone && !/^\d{10}$/.test(shopData.shop_phone.replace(/\s/g, ""))) {
			newErrors.shop_phone = "Phone must be a valid 10-digit number";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleShopChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setShopData((prev) => ({ ...prev, [name]: value }));
		// Clear error when typing
		if (errors[name]) {
			setErrors((prev) => {
				const { [name]: _, ...rest } = prev;
				return rest;
			});
		}
	};

	return (
		<div className='max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500'>
			{/* User Profile Section */}
			<section className='bg-white p-8 rounded-3xl shadow-sm border border-gray-100'>
				<div className='flex items-center gap-4 mb-8'>
					<div className='w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100'>
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
							<path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
							<circle cx='12' cy='7' r='4'></circle>
						</svg>
					</div>
					<div>
						<h2 className='text-xl font-bold text-gray-900'>Personal Information</h2>
						<p className='text-gray-400 text-sm font-medium'>
							Update your profile details
						</p>
					</div>
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (validateProfile()) onSubmitProfile(userName);
					}}
					className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='space-y-2'>
						<label className='text-sm font-bold text-gray-700 ml-1'>Full Name</label>
						<input
							required
							value={userName}
							onChange={(e) => {
								setUserName(e.target.value);
								if (errors.userName) setErrors({});
							}}
							className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${
								errors.userName ? "border-red-500" : "border-transparent"
							} focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all font-medium text-gray-700`}
							placeholder='Your name'
						/>
						{errors.userName && (
							<p className='text-xs text-red-500 font-bold ml-1'>{errors.userName}</p>
						)}
					</div>
					<div className='space-y-2 opacity-60'>
						<label className='text-sm font-bold text-gray-700 ml-1'>
							Phone Number (Linked)
						</label>
						<input
							disabled
							value={profile?.phone || ""}
							className='w-full px-4 py-3 rounded-xl bg-gray-100 border-transparent cursor-not-allowed font-medium text-gray-500'
						/>
					</div>
					<div className='md:col-span-2 flex justify-end'>
						<button
							type='submit'
							disabled={loading}
							className='px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98] disabled:opacity-50'>
							{loading ? "Updating..." : "Save Profile"}
						</button>
					</div>
				</form>
			</section>

			{/* Shop Details Section - Restricted to ADMIN */}
			<section
				className={`bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all ${!isAdmin ? "opacity-75 grayscale-[0.5]" : ""}`}>
				<div className='flex items-center gap-4 mb-8'>
					<div
						className={`w-12 h-12 ${isAdmin ? "bg-rose-500" : "bg-gray-400"} rounded-2xl flex items-center justify-center text-white shadow-lg ${isAdmin ? "shadow-rose-100" : "shadow-gray-100"}`}>
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
							<path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
							<polyline points='9 22 9 12 15 12 15 22'></polyline>
						</svg>
					</div>
					<div>
						<h2 className='text-xl font-bold text-gray-900'>Shop Details</h2>
						<p className='text-gray-400 text-sm font-medium'>
							{isAdmin
								? "Configure your business identity and branding"
								: "Only shop administrators can update business details"}
						</p>
					</div>
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (!isAdmin) return;
						if (validateShop()) {
							// For PATCH, we only send what's actually in our inputs
							// Filtering out empty strings ensures we don't accidentally "reset" fields that aren't being touched
							const cleanedData = Object.fromEntries(
								Object.entries(shopData).filter(([_, v]) => v !== ""),
							);
							onSubmitShop(cleanedData as UpdateShopRequest);
						}
					}}
					className='space-y-6'>
					<fieldset disabled={!isAdmin || loading} className='space-y-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='space-y-2'>
								<label className='text-sm font-bold text-gray-700 ml-1'>
									Shop Name
								</label>
								<input
									name='shop_name'
									value={shopData.shop_name}
									onChange={handleShopChange}
									className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${
										errors.shop_name ? "border-red-500" : "border-transparent"
									} focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-50/50 outline-none transition-all font-medium text-gray-700`}
									placeholder='Business Name'
								/>
								{errors.shop_name && (
									<p className='text-xs text-red-500 font-bold ml-1'>
										{errors.shop_name}
									</p>
								)}
							</div>
							<div className='space-y-2'>
								<label className='text-sm font-bold text-gray-700 ml-1'>
									Business Contact
								</label>
								<input
									name='shop_phone'
									value={shopData.shop_phone}
									onChange={handleShopChange}
									className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${
										errors.shop_phone ? "border-red-500" : "border-transparent"
									} focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-50/50 outline-none transition-all font-medium text-gray-700`}
									placeholder='10-digit Phone Number'
								/>
								{errors.shop_phone && (
									<p className='text-xs text-red-500 font-bold ml-1'>
										{errors.shop_phone}
									</p>
								)}
							</div>
							<div className='space-y-2'>
								<label className='text-sm font-bold text-gray-700 ml-1'>
									Business Email
								</label>
								<input
									name='shop_email'
									type='email'
									value={shopData.shop_email}
									onChange={handleShopChange}
									className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-50/50 outline-none transition-all font-medium text-gray-700'
									placeholder='sales@business.com'
								/>
							</div>
							<div className='space-y-2'>
								<label className='text-sm font-bold text-gray-700 ml-1'>
									Logo URL
								</label>
								<input
									name='shop_logo_url'
									value={shopData.shop_logo_url}
									onChange={handleShopChange}
									className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-50/50 outline-none transition-all font-medium text-gray-700'
									placeholder='https://cdn.example.com/logo.png'
								/>
							</div>
						</div>

						<div className='space-y-2'>
							<label className='text-sm font-bold text-gray-700 ml-1'>
								Store Address
							</label>
							<textarea
								name='shop_address'
								value={shopData.shop_address}
								onChange={handleShopChange}
								rows={3}
								className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-50/50 outline-none transition-all font-medium text-gray-700 resize-none'
								placeholder='Full shop location...'
							/>
						</div>
					</fieldset>

					{isAdmin && (
						<div className='flex justify-end'>
							<button
								type='submit'
								disabled={loading}
								className='px-8 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg shadow-gray-100 active:scale-[0.98] disabled:opacity-50'>
								{loading ? "Saving Business Details..." : "Update Shop"}
							</button>
						</div>
					)}
				</form>
			</section>
		</div>
	);
}

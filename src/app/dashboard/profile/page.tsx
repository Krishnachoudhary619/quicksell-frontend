"use client";

import { useEffect, useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import ProfileForm from "@/components/forms/ProfileForm";

export default function ProfilePage() {
	const { profile, getProfile, updateProfile, loading, error } = useProfile();
	const [localName, setLocalName] = useState("");

	// Initial fetch
	useEffect(() => {
		getProfile().then((data) => {
			if (data) setLocalName(data.name);
		});
	}, [getProfile]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await updateProfile(localName);
			alert("Profile updated successfully!");
		} catch (err) {
			console.error("Update error:", err);
		}
	};

	return (
		<main className='p-8'>
			<ProfileForm
				profile={{ ...profile, name: localName }}
				onNameChange={setLocalName}
				onSubmit={handleSubmit}
				loading={loading}
			/>
			{error && <p className='mt-4 text-center text-red-600 font-medium'>{error}</p>}
		</main>
	);
}

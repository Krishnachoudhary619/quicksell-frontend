"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
	const [phone, setPhone] = useState("");
	const { sendOtp, loading, error } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await sendOtp(phone);
			if (response.success) {
				// Redirect to verification page with phone as query param
				router.push(`/verify-otp?phone=${encodeURIComponent(phone)}`);
			}
		} catch (err) {
			// Error is handled by reuseable auth hook (setError/error)
			console.error("Login Error:", err);
		}
	};

	return (
		<main>
			<LoginForm
				phone={phone}
				onPhoneChange={setPhone}
				onSubmit={handleSubmit}
				loading={loading}
			/>
			{error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
		</main>
	);
}

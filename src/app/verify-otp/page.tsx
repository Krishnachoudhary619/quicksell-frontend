"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import OtpForm from "@/components/forms/OtpForm";

function VerifyOtpContent() {
	const [otp, setOtp] = useState("");
	const { verifyOtp, loading, error } = useAuth();
	const router = useRouter();
	const searchParams = useSearchParams();
	const phone = searchParams.get("phone") || "";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!phone) return;

		try {
			const response = await verifyOtp(phone, otp);
			if (response.success) {
				router.push("/dashboard");
			}
		} catch (err) {
			console.error("Verification Error:", err);
		}
	};

	return (
		<main>
			<OtpForm otp={otp} onOtpChange={setOtp} onSubmit={handleSubmit} loading={loading} />
			{error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
		</main>
	);
}

export default function VerifyOtpPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<VerifyOtpContent />
		</Suspense>
	);
}

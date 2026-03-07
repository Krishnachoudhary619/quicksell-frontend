"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";

export default function LogoutButton() {
	const { logout, loading } = useAuth();

	return (
		<button onClick={logout} disabled={loading}>
			{loading ? "Logging out..." : "Logout"}
		</button>
	);
}

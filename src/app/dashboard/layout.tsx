"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuthGuard();

	// Only render children if the user is authenticated.
	// The hook handles the redirect to /login.
	if (!isAuthenticated) return null;

	return <>{children}</>;
}

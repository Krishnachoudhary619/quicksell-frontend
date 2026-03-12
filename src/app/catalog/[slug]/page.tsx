import { getPublicCatalog } from "@/modules/catalogs/services/catalog.service";
import PublicCatalogClient from "./PublicCatalogClient";
import { notFound } from "next/navigation";

// This is a Server Component (default in App Router)
// It provides the "Big Performance Boost" by fetching data on the server
export default async function PublicCatalogPage({ 
    params 
}: { 
    params: Promise<{ slug: string }> 
}) {
	const { slug } = await params;

    try {
        const response = await getPublicCatalog(slug);

        if (!response.success || !response.data) {
            return notFound();
        }

        return (
            <PublicCatalogClient 
                initialCatalog={response.data} 
                slug={slug} 
            />
        );
    } catch (error) {
        console.error("Failed to fetch catalog on server:", error);
        // We can still render the client component which has its own error handling
        // or redirect to a custom error page.
        // For now, let's let the client component handle the "refetch" if server fails
        // but notFound() is usually better for SEO if it's truly missing.
        return notFound();
    }
}

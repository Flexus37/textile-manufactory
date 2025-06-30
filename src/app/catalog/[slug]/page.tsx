import CatalogClient from "./CatalogClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Каталоги мануфактуры",
};

export default async function CatalogPageWrapper({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	
	return <CatalogClient slug={slug} />;
}

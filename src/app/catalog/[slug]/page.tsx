import CatalogClient from "./CatalogClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Каталоги мануфактуры",
};

export default function CatalogPageWrapper({
	params,
}: {
	params: { slug: string };
}) {
	return <CatalogClient slug={params.slug} />;
}

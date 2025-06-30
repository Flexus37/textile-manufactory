import FabricClient from "./FabricClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Полотно",
}

interface Params {
	params: { slug: string; albumId: string, fabricId: string }
}

export default function AlbumPageWrapper({ params }: Params) {
	return <FabricClient slug={params.slug} albumId={params.albumId} fabricId={params.fabricId} />
}
import FabricClient from "./FabricClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Полотно",
}

interface Params {
	params: Promise<{ slug: string; albumId: string, fabricId: string }>
}

export default async function AlbumPageWrapper({ params }: Params) {
	const {slug, albumId, fabricId} = await params;
	
	return <FabricClient slug={slug} albumId={albumId} fabricId={fabricId} />
}
import AlbumClient from "./AlbumClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Альбом",
}

interface Params {
	params: Promise<{ slug: string; albumId: string }>
}

export default async function AlbumPageWrapper({ params }: Params) {
	const {slug, albumId} = await params;
	
	return <AlbumClient slug={slug} albumId={albumId} />
}
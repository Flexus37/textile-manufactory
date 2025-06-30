import AlbumClient from "./AlbumClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Альбом",
}

interface Params {
	params: { slug: string; albumId: string }
}

export default function AlbumPageWrapper({ params }: Params) {
	return <AlbumClient slug={params.slug} albumId={params.albumId} />
}
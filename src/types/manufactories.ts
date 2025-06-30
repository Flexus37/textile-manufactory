// types/manufactories.ts

/** Изображения ткани */
export interface FabricImages {
	description: string[]
	underMicroscope: string[]
	model3d: string[]
}

/** Описание одной ткани */
export interface Fabric {
	id: number
	name: string
	sort: string
	widthCm: number
	techSpecs: string
	priceWholesale: string
	approxLength: number
	images: FabricImages
}

/** Альбом с тканями */
export interface Album {
	id: number
	title: string
	coverImages: string[]
	fabrics: Fabric[]
}

/** Основная запись мануфактуры */
export interface Manufactury {
	id: number
	name: string
	carouselImages: string[]
	description: string[] // каждый элемент = отдельный абзац
	albums: Album[]
}

/** Массив всех мануфактур */
export type ManufactoriesData = Manufactury[]

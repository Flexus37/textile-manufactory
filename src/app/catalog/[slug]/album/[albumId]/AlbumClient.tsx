"use client"

import { useState } from "react"
import Link from "next/link"
import Container from "@/components/container/Container"
import { ArrowRight } from "lucide-react"
import { CarouselImages } from "@/components/carouselImages/CarouselImages"
import manufactories from "@/data/manufactories.json"
import type { ManufactoriesData, Manufactury, Album, Fabric } from "@/types/manufactories"
import { Pagination } from "@/components/pagination/Pagination"

interface Props {
	slug: string
	albumId: string
}

export default function AlbumClient({ slug, albumId }: Props) {
	const data = manufactories as ManufactoriesData
	const m = data.find((mf) => mf.id === +slug) as Manufactury
	if (!m) {
		return (
			<Container>
				<p className="text-center mt-20 text-xl text-red-600">Мануфактура не найдена</p>
			</Container>
		)
	}
	
	const album = m.albums.find((a) => a.id === +albumId) as Album
	if (!album) {
		return (
			<Container>
				<p className="text-center mt-20 text-xl text-red-600">Альбом не найден</p>
			</Container>
		)
	}
	
	// пагинация полотен
	const itemsPerPage = 3 // по макету: показываем по одному полотну за раз
	const total = album.fabrics.length
	const totalPages = Math.ceil(total / itemsPerPage)
	const [page, setPage] = useState(0)
	
	const visible = album.fabrics.slice(
		page * itemsPerPage,
		page * itemsPerPage + itemsPerPage
	)
	
	// Получаем заголовок и обрезаем до первой точки (не включая её)
	const shortTitle = album.title.includes(".")
		? album.title.substring(0, album.title.indexOf("."))
		: album.title
	
	return (
		<Container>
			{/* Breadcrumbs */}
			<div className="mb-16 -mt-15 flex items-center gap-2 text-brand">
				<Link href="/manufactories" className="flex items-center gap-1 hover:underline">
					<ArrowRight className="rotate-180" size={20} /> Мануфактуры
				</Link>
				<ArrowRight size={16} className="rotate-180 text-brand/50" />
				<Link href={`/manufactories/${slug}`} className="flex items-center gap-1 hover:underline">
					{m.name}
				</Link>
				<ArrowRight size={16} className="rotate-180 text-brand/50" />
				<Link
					href={`/catalog/${slug}`}
					className="flex items-center gap-1 hover:underline"
				>
					Каталоги
				</Link>
				<ArrowRight size={16} className="rotate-180 text-brand/50" />
				<span className="font-semibold">{shortTitle}</span>
			</div>
			
			{/* Обложка */}
			<div className="w-full mx-auto">
				<CarouselImages images={album.coverImages} />
			</div>
			<h1 className="mt-6 text-center text-xl font-semibold text-brand">{album.title}</h1>
			
			{/* Пагинация полотен */}
			<Pagination page={page} total={totalPages} onChange={setPage} className="my-6" />
			
			{/* Полотна */}
			{visible.map((fabric: Fabric) => (
				<div key={fabric.id} className="flex flex-col md:flex-row items-start gap-8 mb-12">
					<div className="w-full md:w-1/2">
						<CarouselImages images={fabric.images.description} aspectRatio='2/1' />
					</div>
					
					{/* Справа: характеристики */}
					<div className="w-full md:w-1/2 space-y-2 text-lg">
						<p>
							<b>1. Наименование товара:</b> {fabric.name}
						</p>
						<p>
							<b>2. Сорт:</b> №{fabric.sort}
						</p>
						<p>
							<b>3. Ширина в сантиметрах:</b> {fabric.widthCm}
						</p>
						<p>
							<b>4. Технические заправы:</b> {fabric.techSpecs}
						</p>
						<p>
							<b>5. Цена оптового прейс-куранта:</b> {fabric.priceWholesale}
						</p>
						<p>
							<b>6. Ориентировочный метраж кипы:</b> {fabric.approxLength} метров
						</p>

						<div className='w-full flex justify-end'>
							<Link
								href={`${albumId}/fabrics/${fabric.id}`}
								className="inline-flex items-center text-brand underline mt-4"
							>
								Читать далее <ArrowRight size={20} />
							</Link>
						</div>
					</div>
				</div>
			))}
			
			{/* Повтор пагинации */}
			<Pagination page={page} total={totalPages} onChange={setPage} />
		</Container>
	)
}

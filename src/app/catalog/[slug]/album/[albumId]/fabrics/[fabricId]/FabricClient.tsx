// app/manufactories/[slug]/catalogs/[albumId]/[fabricId]/FabricClient.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import Container from "@/components/container/Container"
import { ArrowRight } from "lucide-react"
import { CarouselImages } from "@/components/carouselImages/CarouselImages"
import manufactories from "@/data/manufactories.json"
import type {
	ManufactoriesData,
	Manufactury,
	Album,
	Fabric,
} from "@/types/manufactories"

interface Props {
	slug: string
	albumId: string
	fabricId: string
}

export default function FabricClient({
 slug,
 albumId,
 fabricId,
}: Props) {
	const data = manufactories as ManufactoriesData
	const m = data.find((mf) => mf.id === +slug) as Manufactury
	if (!m) {
		return (
			<Container>
				<p className="text-center mt-20 text-xl text-red-600">
					Мануфактура не найдена
				</p>
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
	
	const fabric = album.fabrics.find((f) => f.id === +fabricId) as Fabric
	if (!fabric) {
		return (
			<Container>
				<p className="text-center mt-20 text-xl text-red-600">Полотно не найдено</p>
			</Container>
		)
	}
	
	// укороченное название альбома для хлебных крошек
	const shortAlbumTitle = album.title.includes(".")
		? album.title.substring(0, album.title.indexOf("."))
		: album.title
	
	return (
		<Container>
			{/* Breadcrumbs */}
			<div className="mb-16 -mt-15 flex flex-wrap items-center gap-2 text-brand">
				<Link
					href="/manufactories"
					className="flex items-center gap-1 hover:underline"
				>
					<ArrowRight className="rotate-180" size={20} /> Мануфактуры
				</Link>
				<ArrowRight size={16} className="rotate-180 text-brand/50" />
				<Link
					href={`/manufactories/${slug}`}
					className="flex items-center gap-1 hover:underline"
				>
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
				<Link
					href={`/catalog/${albumId}`}
					className="flex items-center gap-1 hover:underline"
				>
					{shortAlbumTitle}
				</Link>
				<ArrowRight size={16} className="rotate-180 text-brand/50" />
				<span className="font-semibold">{fabric.name}, сорт №{fabric.sort}</span>
			</div>
			
			<div className='w-full flex gap-8 mb-8 items-center'>
				{/* Основная карусель описания полотна */}
				<div className="w-3/4">
					<CarouselImages images={fabric.images.description} aspectRatio="2/1" />
				</div>
				
				{/* Характеристики */}
				<div className="text-lg space-y-2 w-1/4">
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
				</div>
			</div>
			
			<div className='flex w-full h-[500px]'>
				<div className='w-1/2 h-full'>
					{/* Микроскоп */}
					<h2 className="text-xl font-semibold mb-4 text-center text-brand">
						Ткань под микроскопом
					</h2>
					<div className="w-full mb-8">
						<CarouselImages
							images={fabric.images.underMicroscope}
							aspectRatio="2/1"
						/>
					</div>
				</div>
				
				<div className='w-1/2 h-full'>
					{/* 3D-модель */}
					<h2 className="text-xl font-semibold mb-4 text-center text-brand">
						3D-модель
					</h2>
					<div className="w-full mb-12">
						<CarouselImages images={fabric.images.model3d} aspectRatio="2/1" />
					</div>
				</div>
				
			</div>
			
			{/* Footer ссылка */}
			<div className="flex justify-end">
				<Link
					href={`/manufactories/${slug}/catalogs/${albumId}`}
					className="inline-flex gap-1 items-center text-brand underline"
				>
					<ArrowRight className='rotate-180' size={20} /> Назад к альбому
				</Link>
			</div>
		</Container>
	)
}

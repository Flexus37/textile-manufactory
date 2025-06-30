"use client"

import { CarouselImages } from '@/components/carouselImages/CarouselImages'
import Container from "@/components/container/Container"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
import manufactories from "@/data/manufactories.json"
import type { ManufactoriesData } from "@/types/manufactories"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const data = manufactories as ManufactoriesData

export default function ManufactoriesPage() {
	return (
		<Container>
			<h1 className="mb-8 text-center text-[102px] uppercase font-[family-name:var(--font-serpantin)]">
				Мануфактуры
			</h1>

			<div className="w-full flex flex-col gap-16 justify-center items-center">
				{data.map((m) => (
					<div key={m.id} className="flex flex-col items-start">
						{/* Карусель */}
						<CarouselImages images={m.carouselImages} />

						{/* Название */}
						<h2 className="mt-6 text-2xl font-semibold text-brand">
							<Link href={`/manufactories/${m.id}`}>{m.name}</Link>
						</h2>

						{/* Описание (только первый абзац) */}
						<p className="mt-4 indent-[1.25em] leading-relaxed text-lg line-clamp-3">
							{m.description[0]}
						</p>

						{/* Ссылки */}
						<div className="w-full mt-4 flex items-center justify-end gap-6">
							<Link href={`/catalog/${m.id}`} className="text-brand underline flex items-center gap-1">
								Каталоги <ArrowRight className="" size={24} />
							</Link>
							<Link href={`/manufactories/${m.id}`} className="text-brand underline flex items-center gap-1">
								Читать далее <ArrowRight size={24} />
							</Link>
						</div>
					</div>
				))}
			</div>
		</Container>
	)
}

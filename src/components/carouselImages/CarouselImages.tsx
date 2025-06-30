"use client"
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	type CarouselApi,
} from "@/components/ui/carousel"
import { ArrowRight } from "lucide-react"

export function CarouselImages({
	images,
	aspectRatio = '3/1'
}: {
	images: string[],
	aspectRatio?: string,
}) {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const [count, setCount] = useState(0)
	
	useEffect(() => {
		if (!api) return
		// всего слайдов
		setCount(api.scrollSnapList().length)
		// текущий индекс
		setCurrent(api.selectedScrollSnap())
		// при смене слайда — обновляем current
		api.on("select", () => {
			setCurrent(api.selectedScrollSnap())
		})
	}, [api])
	
	return (
		<div className="relative w-full">
			<Carousel setApi={setApi} className="w-full">
				<CarouselContent>
					{images.map((src, idx) => (
						<CarouselItem key={idx} className="basis-full">
							<div
								className='relative w-full'
								style={{ aspectRatio: aspectRatio }}
							>
								<Image fill src={src} alt={`slide-${idx}`} className="w-full object-contain" />
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2">
					<ArrowRight className="rotate-180" />
				</CarouselPrevious>
				<CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2">
					<ArrowRight />
				</CarouselNext>
			</Carousel>
			
			{/* Точки-пагинация */}
			<div className="flex justify-center space-x-2 mt-2">
				{Array.from({ length: count }).map((_, idx) => (
					<span
						key={idx}
						className={
							"w-2 h-2 rounded-full transition-colors " +
							(idx === current ? "bg-brand" : "bg-transparent border border-brand")
						}
					/>
				))}
			</div>
		</div>
	)
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/container/Container";
import { ArrowRight } from "lucide-react";
import { CarouselImages } from "@/components/carouselImages/CarouselImages";
import manufactories from "@/data/manufactories.json";
import type { ManufactoriesData, Manufactury, Album } from "@/types/manufactories";
import { Pagination } from "@/components/pagination/Pagination";

export default function CatalogClient({ slug }: { slug: string }) {
	const data = manufactories as ManufactoriesData;
	const m = data.find((mf) => mf.id === +slug) as Manufactury;
	
	console.log(m);
	
	if (!m) {
		return (
			<Container>
				<p className="text-center mt-20 text-xl text-red-600">
					Мануфактура не найдена
				</p>
			</Container>
		);
	}
	
	const albumsPerPage = 2;
	const totalPages = Math.ceil(m.albums.length / albumsPerPage);
	const [page, setPage] = useState(0);
	
	const visibleAlbums = m.albums.slice(
		page * albumsPerPage,
		page * albumsPerPage + albumsPerPage
	);
	
	return (
		<Container>
			{/* Breadcrumbs */}
			<div className="mb-16 -mt-15 flex items-center gap-2 text-brand">
				<Link href="/manufactories" className="flex items-center gap-1 hover:underline">
					<ArrowRight className="rotate-180" size={20} />
					Мануфактуры
				</Link>
				<ArrowRight size={16} className="rotate-180 text-brand/50" />
				<Link href={`/manufactories/${slug}`} className="flex items-center gap-1 hover:underline">
					{m.name}
				</Link>
				<ArrowRight size={16} className="rotate-180 text-brand/50" />
				<span className="font-semibold">Каталоги</span>
			</div>
			
			<h1 className="text-center text-[102px] uppercase font-[family-name:var(--font-serpantin)] text-brand">
				Каталоги
			</h1>
			
			{/* Пагинация */}
			<Pagination
				className="mt-6"
				page={page}
				total={totalPages}
				onChange={setPage}
			/>
			
			{/* Альбомы */}
			<div className="w-full mt-8">
				{visibleAlbums.map((album: Album) => (
					<div key={album.id} className="flex flex-col items-center">
						<div className="w-full">
							<CarouselImages images={album.coverImages} />
						</div>
						<h2 className="mt-4 text-2xl font-semibold text-brand hover:underline">
							<Link href={`${slug}/album/${album.id}`}>{album.title}</Link>
						</h2>
					</div>
				))}
			</div>
			
			{/* Пагинация */}
			<Pagination
				className="mt-6"
				page={page}
				total={totalPages}
				onChange={setPage}
			/>
		</Container>
	);
}

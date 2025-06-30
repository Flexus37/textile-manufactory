import Container from "@/components/container/Container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CarouselImages } from "@/components/carouselImages/CarouselImages";
import manufactories from "@/data/manufactories.json";
import type { ManufactoriesData, Manufactury } from "@/types/manufactories";

interface Props {
	params: Promise<{ slug: string }>
}

export default async function ManufactoryItemPage({params}: Props) {
	const { slug } = await params;
	const data = manufactories as ManufactoriesData;
	const m = data.find((mf) => mf.id === +slug);
	
	if (!m) {
		return (
			<Container>
				<p className="text-center mt-20 text-xl text-red-600">Мануфактура не найдена</p>
			</Container>
		);
	}
	
	return (
		<Container>
			{/* Навигация назад */}
			<div className="mb-16 -mt-15 flex items-center gap-2 text-brand">
				<Link href="/manufactories" className="p-2 hover:bg-brand/10 rounded">
					<ArrowRight className="rotate-180" size={24} />
				</Link>
				<Link href="/manufactories" className="underline">
					Мануфактуры
				</Link>
			</div>
			
			{/* Заголовок */}
			<h1 className="text-center text-[36px] font-bold uppercase text-brand">
				{m.name}
			</h1>
			
			{/* Карусель */}
			<div className="mt-8">
				<CarouselImages images={m.carouselImages} />
			</div>
			
			{/* Описание абзацами */}
			<div className="mt-8 mx-auto max-w-[800px] space-y-6 leading-relaxed text-lg">
				{m.description.map((paragraph, idx) => (
					<p key={idx} className="indent-[1.25em]">
						{paragraph}
					</p>
				))}
			</div>
			
			{/* Кнопка «Каталоги» */}
			<div className="flex justify-end mt-8 mb-16">
				<Link
					href={`/catalogs/${m.id}`}
					className="px-6 py-3 border-2 border-dashed border-brand rounded-3xl text-brand hover:bg-brand hover:text-white transition-colors"
				>
					Каталоги
				</Link>
			</div>
		</Container>
	);
}

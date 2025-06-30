// app/search/page.tsx
"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Container from "@/components/container/Container"
import { ArrowRight, Search } from 'lucide-react'
import { Label } from "@/components/ui/label"
import {
	RadioGroup,
	RadioGroupItem,
} from "@/components/ui/radio-group"
import manufactoriesJson from "@/data/manufactories.json"
import type {
	ManufactoriesData,
} from "@/types/manufactories"

const data = manufactoriesJson as ManufactoriesData

type ResultItem =
	| { type: "manufactury"; id: number; name: string }
	| { type: "album"; manufId: number; id: number; name: string }
	| { type: "fabric"; manufId: number; albumId: number; id: number; name: string }

export default function SearchPage() {
	const [keywords, setKeywords] = useState("")
	const [openSettings, setOpenSettings] = useState(false)
	
	// Одно из трёх: мануфактуры, альбомы или полотна
	const [viewMode, setViewMode] = useState<"manufactories" | "albums" | "fabrics">(
		"manufactories"
	)
	// Сортировка
	const [sortBy, setSortBy] = useState<"alphabet" | "date" | "size">("alphabet")
	const [sortAsc, setSortAsc] = useState<"asc" | "desc">("asc")
	
	// Собираем результат
	const results: ResultItem[] = useMemo(() => {
		const kw = keywords
			.split(",")
			.map((s) => s.trim().toLowerCase())
			.filter(Boolean)
		if (!kw.length) return []
		
		let items: ResultItem[] = []
		
		if (viewMode === "manufactories") {
			items = data
				.filter((m) => kw.some((k) => m.name.toLowerCase().includes(k)))
				.map((m) => ({ type: "manufactury", id: +m.id, name: m.name }))
		} else if (viewMode === "albums") {
			data.forEach((m) => {
				m.albums.forEach((a) => {
					if (kw.some((k) => a.title.toLowerCase().includes(k))) {
						items.push({
							type: "album",
							manufId: +m.id,
							id: a.id,
							name: a.title,
						})
					}
				})
			})
		} else {
			data.forEach((m) => {
				m.albums.forEach((a) => {
					a.fabrics.forEach((f) => {
						if (kw.some((k) => f.name.toLowerCase().includes(k))) {
							items.push({
								type: "fabric",
								manufId: +m.id,
								albumId: a.id,
								id: f.id,
								name: f.name,
							})
						}
					})
				})
			})
		}
		
		// Сортировка по выбранному полю
		items.sort((a, b) => {
			const pa = a.name.toLowerCase()
			const pb = b.name.toLowerCase()
			let cmp = pa.localeCompare(pb)
			
			return sortAsc === "asc" ? cmp : -cmp
		})
		
		return items
	}, [keywords, viewMode, sortBy, sortAsc])
	
	return (
		<Container>
			<h1 className="mt-12 mb-8 text-center text-[102px] uppercase font-[family-name:var(--font-serpantin)]">
				Поиск
			</h1>
			
			{/* ввод */}
			<div className="flex items-center gap-2">
				<input
					type="text"
					placeholder="Ключевые слова (через запятую)"
					value={keywords}
					onChange={(e) => setKeywords(e.target.value)}
					className="flex-1 p-4 border-2 border-dashed border-brand rounded-3xl outline-none focus:border-brand/80"
				/>
				<button className="p-4 bg-brand text-white rounded-2xl">
					<Search size={20} />
				</button>
			</div>
			
			{/* дополнительные настройки */}
			<button
				className="mt-2 text-brand underline"
				onClick={() => setOpenSettings((o) => !o)}
			>
				Дополнительные настройки {openSettings ? "▲" : "▼"}
			</button>
			{openSettings && (
				<div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-brand">
					{/* Вид результатов */}
					<div>
						<div className="font-semibold mb-2">Что искать:</div>
						<RadioGroup
							defaultValue={viewMode}
							value={viewMode}
							onValueChange={(v) =>
								setViewMode(v as "manufactories" | "albums" | "fabrics")
							}
						>
							{[
								{ value: "manufactories", label: "Мануфактуры" },
								{ value: "albums", label: "Каталоги" },
								{ value: "fabrics", label: "Полотна" },
							].map((opt) => (
								<div
									key={opt.value}
									className="flex items-center space-x-2 mb-1"
								>
									<RadioGroupItem
										value={opt.value}
										id={opt.value}
										className="ring-brand checked:bg-brand"
									/>
									<Label htmlFor={opt.value}>{opt.label}</Label>
								</div>
							))}
						</RadioGroup>
					</div>
					
					{/* Сортировка */}
					<div>
						<div className="font-semibold mb-2">Сортировка:</div>
						<RadioGroup
							defaultValue={sortBy}
							value={sortBy}
							onValueChange={(v) =>
								setSortBy(v as "alphabet" | "date" | "size")
							}
						>
							{[
								{ value: "alphabet", label: "По алфавиту" },
								{ value: "date", label: "По дате" },
								{ value: "size", label: "По объёму" },
							].map((opt) => (
								<div
									key={opt.value}
									className="flex items-center space-x-2 mb-1"
								>
									<RadioGroupItem
										value={opt.value}
										id={`sort-${opt.value}`}
										className="ring-brand checked:bg-brand"
									/>
									<Label htmlFor={`sort-${opt.value}`}>{opt.label}</Label>
								</div>
							))}
						</RadioGroup>
						<div className="mt-2">
							<RadioGroup
								defaultValue={sortAsc}
								value={sortAsc}
								onValueChange={(v) => setSortAsc(v as "asc" | "desc")}
							>
								<div className="flex items-center space-x-2 mb-1">
									<RadioGroupItem
										value="asc"
										id="order-asc"
										className="ring-brand checked:bg-brand"
									/>
									<Label htmlFor="order-asc">По возрастанию</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="desc"
										id="order-desc"
										className="ring-brand checked:bg-brand"
									/>
									<Label htmlFor="order-desc">По убыванию</Label>
								</div>
							</RadioGroup>
						</div>
					</div>
				</div>
			)}
			
			{/* результаты */}
			<div className="mt-8 space-y-4">
				{results.length === 0 ? (
					<p className="text-center text-lg text-gray-500">Ничего не найдено</p>
				) : (
					results.map((it, i) => {
						let href = "#"
						if (it.type === "manufactury") {
							href = `/manufactories/${it.id}`
						} else if (it.type === "album") {
							href = `catalog/${it.manufId}/album/${it.id}`
						} else {
							href = `catalog/${it.manufId}/album/${it.albumId}/fabrics/${it.id}`
						}
						return (
							<div
								key={i}
								className="flex items-center justify-between border-b pb-2"
							>
								<span className="text-lg">{it.name}</span>
								<Link
									href={href}
									className="text-brand underline flex items-center gap-1"
								>
									Перейти <ArrowRight size={16} />
								</Link>
							</div>
						)
					})
				)}
			</div>
		</Container>
	)
}

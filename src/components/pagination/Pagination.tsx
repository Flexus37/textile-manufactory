// components/Pagination.tsx
"use client"

import { FC } from "react"
import { ArrowRight } from "lucide-react"

interface PaginationProps {
	page: number
	total: number
	onChange: (newPage: number) => void
	className?: string
}

export const Pagination: FC<PaginationProps> = ({
  page,
  total,
  onChange,
  className = "",
}) => {
	const prev = () => onChange(Math.max(0, page - 1))
	const next = () => onChange(Math.min(total - 1, page + 1))
	
	return (
		<div className={`flex items-center justify-center gap-4 text-lg text-brand ${className}`}>
			<button
				onClick={prev}
				disabled={page === 0}
				className="p-2 disabled:opacity-50"
			>
				<ArrowRight className="rotate-180" size={24} />
			</button>
			
			{Array.from({ length: total }).map((_, idx) => (
				<button
					key={idx}
					onClick={() => onChange(idx)}
					className={`px-2 ${
						idx === page ? "font-bold underline" : "opacity-60"
					}`}
				>
					{idx + 1}
				</button>
			))}
			
			<button
				onClick={next}
				disabled={page === total - 1}
				className="p-2 disabled:opacity-50"
			>
				<ArrowRight size={24} />
			</button>
		</div>
	)
}

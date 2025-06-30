import Link from 'next/link'


export default function Header() {
	
	return (
		<header className="w-full flex items-center p-0 h-[60px] border-b-2 border-dashed border-brand mb-[100px]">
			<div className="w-full flex items-center justify-center gap-[50px] text-brand text-2xl lowercase font-light">
				<Link href="/">Главная</Link>
				<Link href="/manufactories">Мануфактуры</Link>
				<Link href="/search">Поиск</Link>
			</div>
		</header>
	)
}
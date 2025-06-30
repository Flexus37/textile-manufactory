import Image from 'next/image'


export default function Footer() {
	return (
		<footer className="w-full h-[200px] flex items-center justify-between bg-brand text-white px-[50px] mt-[50px]">
			<Image
				src='/images/logo.png'
				alt='Логотип ивановского политеха'
				width={255}
				height={115}
			/>
			<p className="text-xl max-w-[415px] text-right">153000, Центральный федеральный округ, Ивановская область, г. Иваново, Шереметевский пр-т, 21</p>
		</footer>
	)
}
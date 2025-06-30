

export default function Container({
 children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-full max-w-[1490px] px-[30px] mx-auto">
			{children}
		</div>
	)
}
import Container from '@/components/container/Container'
import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  return (
    <Container>
      <div className="w-full h-full relative">
        <h1 className="font-[family-name:var(--font-serpantin)] uppercase text-center text-[102px] bg-transparent relative z-20">Текстильная мануфактура</h1>
        <div className="flex mt-12">
          <div>
            <div className="w-[380px] flex flex-col space-y-5 leading-relaxed text-xl">
              <p className="indent-[1.25em]">
                <b>Исторические ткани</b> — ценный источник знаний о культуре, эстетике и технологиях прошлого. Однако подлинных образцов сохранилось крайне мало, и с каждым годом их становится всё меньше.
              </p>
              
              <p className="indent-[1.25em]">
                Наш проект создан с целью документирования, систематизации и демонстрации редких тканевых артефактов.
              </p>
              
              <p className="indent-[1.25em]">
                Представленные материалы призваны подчеркнуть важность сохранения текстильного наследия и способствовать его изучению.
              </p>
            </div>
            <div className="flex items-center gap-[15px] mt-[70px] mb-[50px]">
              <Link href="/manufactories" className="p-5 border-brand border-2 border-dashed rounded-3xl cursor-pointer hover:bg-brand hover:text-white transition-colors">Мануфактуры</Link>
              <Link href="/search" className="p-5 border-brand border-2 border-dashed rounded-3xl cursor-pointer hover:bg-brand hover:text-white transition-colors">Поиск</Link>
            </div>
          </div>
          <Image
            className="absolute top-0 -right-10 z-10"
            src="/images/main/main-bg.png"
            alt="Фоновое изображение ткацкого станка"
            width={1174}
            height={820}
          />
        </div>
      </div>
    </Container>
  );
}

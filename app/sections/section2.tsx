import Image from "next/image";
import { RefObject } from "react";

type Section2Props = {
  secondSectionRef: RefObject<HTMLElement | null>;
  sectionTwoStoryTriggered: boolean;
  showDoubtDarkDuck: boolean;
};

export default function Section2({
  secondSectionRef,
  sectionTwoStoryTriggered,
  showDoubtDarkDuck,
}: Section2Props) {
  return (
    <section
      ref={secondSectionRef}
      className="relative h-screen w-screen snap-start overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/2.png')" }}
    >
      <p className="absolute left-1/2 top-[clamp(26px,7vh,110px)] z-30 w-[min(82vw,700px)] -translate-x-1/2 rounded-2xl bg-white/60 px-[clamp(14px,1.8vw,26px)] py-[clamp(12px,1.5vw,22px)] text-center text-[clamp(16px,1.7vw,30px)] leading-[1.35] text-neutral-900 shadow-lg backdrop-blur-[1px]">
        {showDoubtDarkDuck
          ? "Pero no lo conseguia, le trataban diferente."
          : "El patito diferente inetnataba ser uno mas en su familia."}
      </p>
      <Image
        src={
          sectionTwoStoryTriggered
            ? "/img/patitos_amarillos/patito_amarillos_4.png"
            : "/img/patitos_amarillos/patito_amarillos_2.png"
        }
        alt="Patito amarillo"
        width={230}
        height={230}
        className={`pointer-events-none absolute bottom-[clamp(130px,16vw,260px)] right-[clamp(430px,48vw,900px)] z-10 h-auto ${
          sectionTwoStoryTriggered ? "w-[clamp(72px,8.2vw,152px)]" : "w-[clamp(80px,9.2vw,170px)]"
        }`}
      />
      <Image
        src={
          sectionTwoStoryTriggered
            ? "/img/patitos_amarillos/patito_amarillo_10.png"
            : "/img/patitos_amarillos/patito_amarillos_7.png"
        }
        alt="Patito amarillo"
        width={230}
        height={230}
        className={`pointer-events-none absolute bottom-[clamp(112px,13vw,220px)] right-[clamp(360px,40vw,760px)] z-10 h-auto ${
          sectionTwoStoryTriggered ? "w-[clamp(76px,8.8vw,160px)]" : "w-[clamp(86px,10vw,182px)]"
        }`}
      />
      <Image
        src={
          sectionTwoStoryTriggered
            ? "/img/patitos_amarillos/patito_amarillo_11.png"
            : "/img/patitos_amarillos/patito_amarillos_9.png"
        }
        alt="Patito amarillo"
        width={230}
        height={230}
        className={`pointer-events-none absolute bottom-[clamp(146px,18vw,286px)] right-[clamp(500px,56vw,1000px)] z-10 h-auto ${
          sectionTwoStoryTriggered ? "w-[clamp(66px,7.6vw,140px)]" : "w-[clamp(74px,8.6vw,160px)]"
        }`}
      />
      <Image
        src={sectionTwoStoryTriggered ? "/img/mama_pato/mama_enfadada.png" : "/img/mama_pato/mama.png"}
        alt="MamÃ¡ pato"
        width={380}
        height={380}
        className={`pointer-events-none absolute bottom-[clamp(52px,6.8vw,130px)] z-20 h-auto ${
          sectionTwoStoryTriggered
            ? "right-[clamp(44px,5.5vw,150px)] w-[clamp(420px,48vw,860px)]"
            : "right-[clamp(112px,12vw,260px)] w-[clamp(280px,33vw,620px)]"
        }`}
        style={sectionTwoStoryTriggered ? { transform: "scaleX(-1)" } : undefined}
      />
      <Image
        src={
          showDoubtDarkDuck
            ? "/img/patito_oscuro/patito_oscuro_dudoso.png"
            : "/img/patito_oscuro/patito_oscuro_feliz.png"
        }
        alt="Patito oscuro"
        width={260}
        height={260}
        className={`pointer-events-none absolute bottom-[clamp(170px,22vw,320px)] left-[clamp(44px,8vw,190px)] z-20 h-auto ${
          showDoubtDarkDuck ? "w-[clamp(70px,8.2vw,150px)]" : "w-[clamp(88px,10.2vw,184px)]"
        }`}
      />
    </section>
  );
}

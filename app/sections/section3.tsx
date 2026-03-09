import Image from "next/image";
import { RefObject } from "react";

type Section3Props = {
  thirdSectionRef: RefObject<HTMLElement | null>;
  showSectionThreeDarkDuck: boolean;
  showSectionThreeSadDarkDuck: boolean;
  showSectionThreeAlertDucks: boolean;
  sectionThreeDarkDuckRef: RefObject<HTMLDivElement | null>;
  sectionThreeDuckOneRef: RefObject<HTMLDivElement | null>;
  sectionThreeDuckTwoRef: RefObject<HTMLDivElement | null>;
  sectionThreeDuckSixRef: RefObject<HTMLDivElement | null>;
};

export default function Section3({
  thirdSectionRef,
  showSectionThreeDarkDuck,
  showSectionThreeSadDarkDuck,
  showSectionThreeAlertDucks,
  sectionThreeDarkDuckRef,
  sectionThreeDuckOneRef,
  sectionThreeDuckTwoRef,
  sectionThreeDuckSixRef,
}: Section3Props) {
  return (
    <section
      ref={thirdSectionRef}
      className="relative h-screen w-screen snap-start overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/3.png')" }}
    >
      <p className="absolute left-1/2 top-[clamp(26px,7vh,110px)] z-30 w-[min(84vw,760px)] -translate-x-1/2 rounded-2xl bg-white/60 px-[clamp(14px,1.8vw,26px)] py-[clamp(12px,1.5vw,22px)] text-center text-[clamp(16px,1.7vw,30px)] leading-[1.35] text-neutral-900 shadow-lg backdrop-blur-[1px]">
        Él siempre sintió el rechazo que su propia familia le hacía por ser diferente y eso le puso muy triste.
      </p>
      {showSectionThreeDarkDuck && (
        <div
          ref={sectionThreeDarkDuckRef}
          className="pointer-events-none absolute bottom-[clamp(124px,17vw,236px)] left-[64%] z-10 w-[clamp(76px,8.8vw,146px)] -translate-x-1/2"
        >
          <Image
            src={
              showSectionThreeSadDarkDuck
                ? "/img/patito_oscuro/patito_oscuro_trist.png"
                : "/img/patito_oscuro/patito_oscuro_feliz.png"
            }
            alt="Patito oscuro"
            width={260}
            height={260}
            className="h-auto w-full"
          />
        </div>
      )}
      <div
        ref={sectionThreeDuckOneRef}
        className="pointer-events-none absolute bottom-[clamp(102px,13.5vw,214px)] left-[clamp(45%,50vw,53%)] z-20 w-[clamp(100px,11vw,190px)]"
      >
        <Image
          src={
            showSectionThreeAlertDucks
              ? "/img/patitos_amarillos/patito_amarillo_12.png"
              : "/img/patitos_amarillos/patito_amarillos_1.png"
          }
          alt="Pollito en el camino"
          width={200}
          height={200}
          className="h-auto w-full"
        />
      </div>
      <div
        ref={sectionThreeDuckTwoRef}
        className="pointer-events-none absolute bottom-[clamp(108px,14vw,222px)] left-[clamp(54%,58vw,61%)] z-20 w-[clamp(88px,9.8vw,170px)]"
      >
        <Image
          src={
            showSectionThreeAlertDucks
              ? "/img/patitos_amarillos/patito_amarillo_13.png"
              : "/img/patitos_amarillos/patito_amarillos_2.png"
          }
          alt="Pollito tranquilo"
          width={190}
          height={190}
          className="h-auto w-full"
        />
      </div>
      <div
        ref={sectionThreeDuckSixRef}
        className="pointer-events-none absolute bottom-[clamp(104px,13.8vw,218px)] left-[clamp(61%,65vw,68%)] z-20 w-[clamp(96px,10.6vw,182px)]"
      >
        <Image
          src={
            showSectionThreeAlertDucks
              ? "/img/patitos_amarillos/patito_amarillo_14.png"
              : "/img/patitos_amarillos/patito_amarillos_6.png"
          }
          alt="Pollito caminando"
          width={205}
          height={205}
          className="h-auto w-full"
          style={{ transform: "scaleX(-1)" }}
        />
      </div>
    </section>
  );
}

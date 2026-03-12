import Image from "next/image";
import { RefObject } from "react";

type Section2Props = {
  secondSectionRef: RefObject<HTMLElement | null>;
  storyStep: number;
  onStoryStepChange: (nextStep: number) => void;
};

export default function Section2({
  secondSectionRef,
  storyStep,
  onStoryStepChange,
}: Section2Props) {
  const storyTexts = [
    "El patito diferente intentaba ser uno mas en su familia.",
    "Pero no lo conseguia, le trataban diferente.",
  ];
  const clampedStep = Math.max(0, Math.min(storyStep, storyTexts.length - 1));
  const canGoPrev = clampedStep > 0;
  const canGoNext = clampedStep < storyTexts.length - 1;
  const isSceneTriggered = clampedStep >= 1;
  const showDoubtDarkDuck = clampedStep >= 1;

  return (
    <section
      ref={secondSectionRef}
      className="relative h-screen w-screen snap-start overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/2.png')" }}
    >
      <div className="absolute left-1/2 top-[clamp(26px,7vh,110px)] z-30 w-[min(82vw,700px)] -translate-x-1/2 text-center">
        <div className="min-h-[clamp(96px,13vh,170px)] rounded-2xl bg-white/60 px-[clamp(14px,1.8vw,26px)] py-[clamp(12px,1.5vw,22px)] text-[clamp(16px,1.7vw,30px)] leading-[1.35] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          <button
            type="button"
            onClick={() => {
              if (canGoNext) {
                onStoryStepChange(Math.min(clampedStep + 1, storyTexts.length - 1));
              }
            }}
            aria-label="Avanzar texto"
            className={`w-full border-0 bg-transparent p-0 text-center ${
              canGoNext ? "cursor-pointer" : "cursor-default"
            }`}
          >
            {storyTexts[clampedStep]}
          </button>
        </div>
        <div className="mt-[clamp(10px,1.4vw,20px)] flex items-center justify-center gap-[clamp(10px,2vw,28px)] text-[clamp(18px,2.2vw,36px)] font-semibold text-neutral-900">
          <button
            type="button"
            aria-label="Texto anterior"
            disabled={!canGoPrev}
            onClick={() => onStoryStepChange(Math.max(clampedStep - 1, 0))}
            className={`rounded-full px-[clamp(8px,1vw,16px)] py-[clamp(2px,0.4vw,6px)] ${
              canGoPrev ? "cursor-pointer" : "cursor-not-allowed opacity-40"
            }`}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Texto siguiente"
            disabled={!canGoNext}
            onClick={() => onStoryStepChange(Math.min(clampedStep + 1, storyTexts.length - 1))}
            className={`rounded-full px-[clamp(8px,1vw,16px)] py-[clamp(2px,0.4vw,6px)] ${
              canGoNext ? "cursor-pointer" : "cursor-not-allowed opacity-40"
            }`}
          >
            →
          </button>
        </div>
      </div>
      <Image
        src={
          isSceneTriggered
            ? "/img/patitos_amarillos/patito_amarillos_4.png"
            : "/img/patitos_amarillos/patito_amarillos_2.png"
        }
        alt="Patito amarillo"
        width={220}
        height={220}
        className={`pointer-events-none absolute bottom-[clamp(144px,17.2vw,286px)] right-[clamp(410px,46vw,860px)] z-10 h-auto ${
          isSceneTriggered ? "w-[clamp(66px,7.6vw,140px)]" : "w-[clamp(74px,8.5vw,156px)]"
        }`}
      />
      <Image
        src={
          isSceneTriggered
            ? "/img/patitos_amarillos/patito_amarillo_10.png"
            : "/img/patitos_amarillos/patito_amarillos_7.png"
        }
        alt="Patito amarillo"
        width={230}
        height={230}
        className={`pointer-events-none absolute bottom-[clamp(124px,14.2vw,242px)] right-[clamp(330px,37vw,700px)] z-10 h-auto ${
          isSceneTriggered ? "w-[clamp(70px,8.1vw,148px)]" : "w-[clamp(80px,9.3vw,170px)]"
        }`}
      />
      <Image
        src={
          isSceneTriggered
            ? "/img/patitos_amarillos/patito_amarillo_11.png"
            : "/img/patitos_amarillos/patito_amarillos_9.png"
        }
        alt="Patito amarillo"
        width={210}
        height={210}
        className={`pointer-events-none absolute bottom-[clamp(162px,19.5vw,320px)] right-[clamp(500px,55vw,980px)] z-10 h-auto ${
          isSceneTriggered ? "w-[clamp(60px,7vw,128px)]" : "w-[clamp(68px,8vw,148px)]"
        }`}
      />
      <Image
        src={isSceneTriggered ? "/img/mama_pato/mama_enfadada.png" : "/img/mama_pato/mama.png"}
        alt="Mama pato"
        width={380}
        height={380}
        className={`pointer-events-none absolute bottom-[clamp(52px,6.8vw,130px)] z-20 h-auto ${
          isSceneTriggered
            ? "right-[clamp(44px,5.5vw,150px)] w-[clamp(420px,48vw,860px)]"
            : "right-[clamp(112px,12vw,260px)] w-[clamp(280px,33vw,620px)]"
        }`}
        style={isSceneTriggered ? { transform: "scaleX(-1)" } : undefined}
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
        className={`pointer-events-none absolute bottom-[clamp(310px,35vh,620px)] left-[clamp(90px,11vw,260px)] z-20 h-auto xl:bottom-[clamp(390px,41vh,760px)] 2xl:bottom-[clamp(460px,47vh,900px)] ${
          showDoubtDarkDuck ? "w-[clamp(70px,8.2vw,150px)]" : "w-[clamp(88px,10.2vw,184px)]"
        }`}
      />
    </section>
  );
}

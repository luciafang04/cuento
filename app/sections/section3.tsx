import Image from "next/image";
import { RefObject } from "react";

type Section3Props = {
  thirdSectionRef: RefObject<HTMLElement | null>;
  showSectionThreeDarkDuck: boolean;
  showSectionThreeSadDarkDuck: boolean;
  showSectionThreeAlertDucks: boolean;
  textStep: number;
  onTextStepChange: (nextStep: number) => void;
  onAdvanceScene: () => void;
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
  textStep,
  onTextStepChange,
  onAdvanceScene,
  sectionThreeDarkDuckRef,
  sectionThreeDuckOneRef,
  sectionThreeDuckTwoRef,
  sectionThreeDuckSixRef,
}: Section3Props) {
  const storyTexts = [
    "El patito estaba cnsado de que le trataran diferente, además le decían siempr eque era muy feo.",
    "El patito estaba cnsado de que le trataran diferente, además le decían siempr eque era muy feo.",
  ];
  const clampedStep = Math.max(0, Math.min(textStep, storyTexts.length - 1));
  const canGoPrev = clampedStep > 0;
  const canGoNext = clampedStep < storyTexts.length - 1;

  return (
    <section
      ref={thirdSectionRef}
      className="relative h-screen w-screen snap-start overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/3.png')" }}
    >
      <div className="absolute left-1/2 top-[clamp(26px,7vh,110px)] z-30 w-[min(84vw,760px)] -translate-x-1/2 text-center">
        <div className="min-h-[clamp(96px,13vh,170px)] rounded-2xl bg-white/60 px-[clamp(14px,1.8vw,26px)] py-[clamp(12px,1.5vw,22px)] text-[clamp(16px,1.7vw,30px)] leading-[1.35] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          <button
            type="button"
            onClick={() => {
              if (canGoNext) {
                onTextStepChange(Math.min(clampedStep + 1, storyTexts.length - 1));
                onAdvanceScene();
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
            onClick={() => onTextStepChange(Math.max(clampedStep - 1, 0))}
            className={`rounded-full px-[clamp(8px,1vw,16px)] py-[clamp(2px,0.4vw,6px)] ${
              canGoPrev ? "cursor-pointer" : "cursor-not-allowed opacity-40"
            }`}
          >
            &larr;
          </button>
          <button
            type="button"
            aria-label="Texto siguiente"
            disabled={!canGoNext}
            onClick={() => {
              if (canGoNext) {
                onTextStepChange(Math.min(clampedStep + 1, storyTexts.length - 1));
                onAdvanceScene();
              }
            }}
            className={`rounded-full px-[clamp(8px,1vw,16px)] py-[clamp(2px,0.4vw,6px)] ${
              canGoNext ? "cursor-pointer" : "cursor-not-allowed opacity-40"
            }`}
          >
            &rarr;
          </button>
        </div>
      </div>
      {showSectionThreeDarkDuck && (
        <div
          ref={sectionThreeDarkDuckRef}
          className="pointer-events-none absolute bottom-[clamp(190px,24vw,340px)] left-[67%] z-10 w-[clamp(54px,6.2vw,108px)] -translate-x-1/2 xl:left-[68%] 2xl:left-[69%]"
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
        className="pointer-events-none absolute bottom-[clamp(102px,13.5vw,214px)] left-[clamp(49%,54vw,58%)] z-20 w-[clamp(100px,11vw,190px)] xl:left-[clamp(52%,56vw,60%)] 2xl:left-[clamp(54%,58vw,62%)]"
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
        className="pointer-events-none absolute bottom-[clamp(108px,14vw,222px)] left-[clamp(58%,62vw,66%)] z-20 w-[clamp(88px,9.8vw,170px)] xl:left-[clamp(61%,65vw,69%)] 2xl:left-[clamp(63%,67vw,71%)]"
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
        className="pointer-events-none absolute bottom-[clamp(104px,13.8vw,218px)] left-[clamp(65%,69vw,73%)] z-20 w-[clamp(96px,10.6vw,182px)] xl:left-[clamp(68%,72vw,76%)] 2xl:left-[clamp(70%,74vw,78%)]"
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

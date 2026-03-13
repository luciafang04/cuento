import Image from "next/image";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";

type Section1Props = {
  firstSectionRef: RefObject<HTMLElement | null>;
  allEggsBroken: boolean;
  eggClicks: number[];
  onEggClick: (index: number) => void;
  canPlayNarration: boolean;
};

const normalEggSize = { width: 140, height: 170 };
const protagonistNormalEggSize = { width: 170, height: 205 };
const protagonistBrokenSize = { width: 430, height: 510 };
const sideBrokenScale = 2.35;
const normalEggWidth = "clamp(90px, 10vw, 220px)";
const protagonistNormalEggWidth = "clamp(110px, 12vw, 260px)";
const sideBrokenWidth = "clamp(190px, 22vw, 470px)";
const protagonistBrokenWidth = "clamp(250px, 28vw, 560px)";
const protagonistBrokenDropY = "clamp(-12px, 1vw, 18px)";
const protagonistBrokenShiftRight = "clamp(-72px, -5vw, -18px)";
const sideBrokenDropY = "clamp(-8px, 1.2vw, 20px)";
const sideBrokenShiftRight = "clamp(-58px, -4vw, -14px)";
const protagonistDuckWidth = "clamp(98px, 11.8vw, 212px)";
const protagonistDuckTop = "clamp(-52px, -3.5vw, 8px)";
const protagonistDuckLeft = "clamp(58px, 5.5vw, 140px)";
const sideDuckWidth = "clamp(92px, 11vw, 220px)";
const sideDuckTop = "clamp(-2px, 1vw, 44px)";
const sideDuckLeft = "clamp(34px, 3.5vw, 86px)";

const sideBrokenDuckByEgg: Record<number, string> = {
  1: "/img/patitos_amarillos/patito_amarillos_1.png",
  2: "/img/patitos_amarillos/patito_amarillos_6.png",
  3: "/img/patitos_amarillos/patito_amarillos_8.png",
};

const eggPositions = [
  {
    buttonClass: "z-10 left-[34.8%] top-[18%]",
    label: "Huevo 1",
  },
  {
    buttonClass: "z-20 left-[14.5%] top-[34%]",
    label: "Huevo 2",
  },
  {
    buttonClass: "z-20 left-[55.1%] top-[34%]",
    label: "Huevo 3",
  },
  {
    buttonClass: "z-30 left-[34.8%] top-[40%]",
    label: "Huevo 4",
  },
];

export default function Section1({
  firstSectionRef,
  allEggsBroken,
  eggClicks,
  onEggClick,
  canPlayNarration,
}: Section1Props) {
  const hasStartedEggClicks = eggClicks.some((clicks) => clicks > 0);
  const [storyStep, setStoryStep] = useState(0);
  const narrationAudioRef = useRef<HTMLAudioElement | null>(null);
  const playedNarrationStepsRef = useRef<Set<number>>(new Set());
  const lastStoryStepRef = useRef(0);

  const storyTexts = useMemo(() => {
    const texts = [
      "Un día soleado mamá pato estaba muy feliz ya que sabía que sus polluelos estaban a punto de nacer.",
    ];

    if (allEggsBroken) {
      texts.push(
        "Todo era alegría para la granja ya que todos los pollitos habían nacido sanos y preciosos. Pero..."
      );
      texts.push("¿Por qué había uno diferente?");
    }

    return texts;
  }, [allEggsBroken]);

  useEffect(() => {
    if (allEggsBroken) {
      setStoryStep((prev) => (prev < 1 ? 1 : prev));
    }
  }, [allEggsBroken]);

  useEffect(() => {
    setStoryStep((prev) => Math.min(prev, storyTexts.length - 1));
  }, [storyTexts.length]);

  const playNarrationStep = (step: number) => {
    if (playedNarrationStepsRef.current.has(step)) {
      return;
    }

    const src = `/audios/section1/${step}.mp3`;

    if (narrationAudioRef.current) {
      narrationAudioRef.current.pause();
      narrationAudioRef.current.currentTime = 0;
    }

    const audio = new Audio(src);
    narrationAudioRef.current = audio;
    playedNarrationStepsRef.current.add(step);
    audio.volume = 1;

    audio.play().catch(() => {
      // Ignore autoplay restrictions.
    });
  };

  useEffect(() => {
    if (!canPlayNarration) {
      return;
    }
    if (storyStep === 0) {
      playNarrationStep(1);
    }
  }, [canPlayNarration, storyStep]);

  useEffect(() => {
    if (!canPlayNarration) {
      lastStoryStepRef.current = storyStep;
      return;
    }
    const prevStep = lastStoryStepRef.current;
    if (storyStep > prevStep) {
      if (storyStep === 1) {
        playNarrationStep(3);
      } else if (storyStep === 2) {
        playNarrationStep(4);
      }
    }
    lastStoryStepRef.current = storyStep;
  }, [canPlayNarration, storyStep]);

  useEffect(() => {
    if (!firstSectionRef.current) {
      return;
    }
    const rect = firstSectionRef.current.getBoundingClientRect();
    if (Math.abs(rect.top) > 2) {
      firstSectionRef.current.scrollIntoView({ block: "start", behavior: "auto" });
    }
  }, [firstSectionRef, storyStep]);

  const canGoPrev = storyStep > 0;
  const canGoNext = storyStep < storyTexts.length - 1;
  const isAngryTextStep = allEggsBroken && storyStep === storyTexts.length - 1 && storyTexts.length > 1;

  return (
    <section
      ref={firstSectionRef}
      className="relative flex h-screen w-screen snap-start items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/1.png')" }}
    >
      <Image
        src={isAngryTextStep ? "/img/mama_pato/mama_enfadada.png" : "/img/mama_pato/mama.png"}
        alt="Mamá pato"
        width={260}
        height={260}
        priority
        className={`pointer-events-none absolute bottom-[clamp(-14px,-0.6vw,8px)] z-40 h-auto ${
          isAngryTextStep
            ? "right-[clamp(-62px,-4vw,-8px)] w-[clamp(470px,56vw,1020px)]"
            : "right-[clamp(-8px,-0.6vw,16px)] w-[clamp(300px,36vw,640px)]"
        }`}
        style={{ transform: "scaleX(-1)" }}
      />
      <div className="absolute left-1/2 top-[clamp(26px,7vh,110px)] z-40 w-[min(82vw,700px)] -translate-x-1/2 text-center">
        <div className="rounded-2xl bg-white/60 px-[clamp(14px,1.8vw,26px)] py-[clamp(12px,1.5vw,22px)] text-[clamp(16px,1.7vw,30px)] leading-[1.35] text-neutral-900 shadow-lg backdrop-blur-[1px] min-h-[clamp(96px,13vh,170px)]">
          <button
            type="button"
            onClick={() => {
              if (canGoNext) {
                setStoryStep((prev) => Math.min(prev + 1, storyTexts.length - 1));
              }
            }}
            aria-label="Avanzar texto"
            className={`w-full border-0 bg-transparent p-0 text-center ${
              canGoNext ? "cursor-pointer" : "cursor-default"
            }`}
          >
            {storyTexts[storyStep]}
          </button>
        </div>
        <div className="mt-[clamp(10px,1.4vw,20px)] flex items-center justify-center gap-[clamp(10px,2vw,28px)] text-[clamp(18px,2.2vw,36px)] font-semibold text-neutral-900">
          <button
            type="button"
            aria-label="Texto anterior"
            disabled={!canGoPrev}
            onClick={() => {
              if (canGoPrev) {
                setStoryStep((prev) => Math.max(prev - 1, 0));
              }
            }}
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
            onClick={() => {
              if (canGoNext) {
                setStoryStep((prev) => Math.min(prev + 1, storyTexts.length - 1));
              }
            }}
            className={`rounded-full px-[clamp(8px,1vw,16px)] py-[clamp(2px,0.4vw,6px)] ${
              canGoNext ? "cursor-pointer" : "cursor-not-allowed opacity-40"
            }`}
          >
            →
          </button>
        </div>
      </div>
      {!hasStartedEggClicks && (
        <p className="pointer-events-none absolute left-[49%] top-[66%] z-50 -translate-x-1/2 text-[clamp(9px,0.9vw,14px)] font-semibold text-neutral-900 animate-pulse">
          click!
        </p>
      )}
      <div className="relative h-[clamp(220px,32vw,520px)] w-[clamp(300px,44vw,760px)] translate-y-12 sm:translate-y-16">
        {eggPositions.map((egg, index) => {
          const isBroken = eggClicks[index] >= 4;
          const isProtagonist = index === 0;
          const normalSize = isProtagonist ? protagonistNormalEggSize : normalEggSize;
          const sideBrokenSize = {
            width: Math.round(normalEggSize.width * sideBrokenScale),
            height: Math.round(normalEggSize.height * sideBrokenScale),
          };
          const size = isBroken ? (isProtagonist ? protagonistBrokenSize : sideBrokenSize) : normalSize;
          const brokenDropY = isProtagonist ? protagonistBrokenDropY : sideBrokenDropY;
          const brokenShiftRight = isProtagonist ? protagonistBrokenShiftRight : sideBrokenShiftRight;
          const renderWidth = isBroken
            ? isProtagonist
              ? protagonistBrokenWidth
              : sideBrokenWidth
            : isProtagonist
              ? protagonistNormalEggWidth
              : normalEggWidth;

          return (
            <button
              key={egg.label}
              type="button"
              aria-label={egg.label}
              className={`absolute cursor-pointer border-0 bg-transparent p-0 ${egg.buttonClass}`}
              onClick={() => onEggClick(index)}
            >
              {isBroken && isProtagonist && (
                <Image
                  src="/img/patito_oscuro/patito_oscuro_feliz.png"
                  alt="Patito oscuro feliz saliendo del huevo"
                  width={240}
                  height={240}
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    width: protagonistDuckWidth,
                    height: "auto",
                    left: `calc(${protagonistBrokenShiftRight} + ${protagonistDuckLeft})`,
                    top: `calc(${protagonistBrokenDropY} + ${protagonistDuckTop})`,
                  }}
                />
              )}
              {isBroken && !isProtagonist && sideBrokenDuckByEgg[index] && (
                <Image
                  src={sideBrokenDuckByEgg[index]}
                  alt="Patito amarillo saliendo del huevo"
                  width={140}
                  height={140}
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    width: sideDuckWidth,
                    height: "auto",
                    left: `calc(${sideBrokenShiftRight} + ${sideDuckLeft})`,
                    top: `calc(${sideBrokenDropY} + ${sideDuckTop})`,
                  }}
                />
              )}
              <Image
                src={isBroken ? "/huevo_roto.png" : "/huevo.png"}
                alt="Huevo en el nido"
                width={size.width}
                height={size.height}
                priority
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: renderWidth,
                  height: "auto",
                  marginLeft: isBroken ? brokenShiftRight : "0px",
                  marginTop: isBroken ? brokenDropY : "0px",
                  transform: isBroken ? "scaleX(-1)" : "none",
                }}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}

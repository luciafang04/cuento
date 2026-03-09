import Image from "next/image";
import { RefObject } from "react";

type Section1Props = {
  firstSectionRef: RefObject<HTMLElement | null>;
  showAngryMom: boolean;
  allEggsBroken: boolean;
  eggClicks: number[];
  onEggClick: (index: number) => void;
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
  showAngryMom,
  allEggsBroken,
  eggClicks,
  onEggClick,
}: Section1Props) {
  return (
    <section
      ref={firstSectionRef}
      className="relative flex h-screen w-screen snap-start items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/1.png')" }}
    >
      <Image
        src={showAngryMom ? "/img/mama_pato/mama_enfadada.png" : "/img/mama_pato/mama.png"}
        alt="MamÃ¡ pato"
        width={260}
        height={260}
        priority
        className={`pointer-events-none absolute bottom-[clamp(-14px,-0.6vw,8px)] z-40 h-auto ${
          showAngryMom
            ? "right-[clamp(-62px,-4vw,-8px)] w-[clamp(470px,56vw,1020px)]"
            : "right-[clamp(-8px,-0.6vw,16px)] w-[clamp(300px,36vw,640px)]"
        }`}
        style={{ transform: "scaleX(-1)" }}
      />
      <p className="absolute left-1/2 top-[clamp(26px,7vh,110px)] z-40 w-[min(82vw,700px)] -translate-x-1/2 rounded-2xl bg-white/60 px-[clamp(14px,1.8vw,26px)] py-[clamp(12px,1.5vw,22px)] text-center text-[clamp(16px,1.7vw,30px)] leading-[1.35] text-neutral-900 shadow-lg backdrop-blur-[1px]">
        {allEggsBroken
          ? "Todo era alegria para la granja ya que todos los pollitos habian nacido sanos y precioso. Pero..."
          : "Un dia soleado mama pato estaba muy feliz ya que sabia que sus polluelos estaban a punto de nacer."}
      </p>
      {showAngryMom && (
        <p className="absolute left-1/2 top-[calc(clamp(26px,7vh,110px)+clamp(108px,13vh,186px))] z-40 w-[min(78vw,640px)] -translate-x-1/2 rounded-2xl bg-white/60 px-[clamp(14px,1.8vw,24px)] py-[clamp(10px,1.2vw,18px)] text-center text-[clamp(18px,2vw,34px)] font-semibold leading-[1.25] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          ¿Por qué había uno diferente?
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

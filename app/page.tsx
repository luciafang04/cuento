"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [eggClicks, setEggClicks] = useState([0, 0, 0, 0]);

  const handleEggClick = (index: number) => {
    setEggClicks((prev) => prev.map((clicks, i) => (i === index ? Math.min(clicks + 1, 4) : clicks)));
  };

  const normalEggSize = { width: 140, height: 170 };
  const protagonistNormalEggSize = { width: 170, height: 205 };
  const protagonistBrokenSize = { width: 430, height: 510 };
  const sideBrokenScale = 2.35;
  const normalEggWidth = "clamp(90px, 10vw, 220px)";
  const protagonistNormalEggWidth = "clamp(110px, 12vw, 260px)";
  const sideBrokenWidth = "clamp(190px, 22vw, 470px)";
  const protagonistBrokenWidth = "clamp(250px, 28vw, 560px)";
  const protagonistBrokenDropY = "clamp(24px, 4vw, 44px)";
  const protagonistBrokenShiftRight = "clamp(-110px, -7vw, -48px)";
  const sideBrokenDropY = "clamp(30px, 6vw, 62px)";
  const sideBrokenShiftRight = "clamp(-72px, -5vw, -30px)";

  const eggPositions = [
    {
      buttonClass: "z-10 left-[31.8%] top-[18%]",
      label: "Huevo 1",
    },
    {
      buttonClass: "z-20 left-[11.5%] top-[34%]",
      label: "Huevo 2",
    },
    {
      buttonClass: "z-20 left-[52.1%] top-[34%]",
      label: "Huevo 3",
    },
    {
      buttonClass: "z-30 left-[31.8%] top-[40%]",
      label: "Huevo 4",
    },
  ];

  return (
    <main className="w-screen overflow-x-hidden">
      <section
        className="relative flex h-screen w-screen items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/1.png')" }}
      >
        <div className="relative h-[clamp(220px,32vw,520px)] w-[clamp(300px,44vw,760px)] translate-y-12 sm:translate-y-16">
          {eggPositions.map((egg, index) => {
            const isBroken = eggClicks[index] >= 4;
            const isProtagonist = index === 0;
            const normalSize = isProtagonist ? protagonistNormalEggSize : normalEggSize;
            const sideBrokenSize = {
              width: Math.round(normalEggSize.width * sideBrokenScale),
              height: Math.round(normalEggSize.height * sideBrokenScale),
            };
            const size = isBroken
              ? isProtagonist
                ? protagonistBrokenSize
                : sideBrokenSize
              : normalSize;
            const brokenDropY = isProtagonist ? protagonistBrokenDropY : sideBrokenDropY;
            const brokenShiftRight = isProtagonist
              ? protagonistBrokenShiftRight
              : sideBrokenShiftRight;
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
                onClick={() => handleEggClick(index)}
              >
                <Image
                  src={isBroken ? "/huevo_roto.png" : "/huevo.png"}
                  alt="Huevo en el nido"
                  width={size.width}
                  height={size.height}
                  priority
                  style={{
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

      <section
        className="h-screen w-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/2.png')" }}
      />

      <section
        className="h-screen w-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/3.png')" }}
      />
    </main>
  );
}

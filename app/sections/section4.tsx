import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Section4() {
  const [isSunClicked, setIsSunClicked] = useState(false);
  const darkDuckRef = useRef<HTMLDivElement | null>(null);
  const darkDuckTimeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!isSunClicked || !darkDuckRef.current) {
      darkDuckTimeline.current?.kill();
      darkDuckTimeline.current = null;
      return;
    }

    gsap.set(darkDuckRef.current, { x: 0, y: 0, rotation: 0, opacity: 1 });

    darkDuckTimeline.current = gsap.timeline();
    darkDuckTimeline.current
      .to(darkDuckRef.current, { x: -8, y: 16, rotation: -2, duration: 0.65, ease: "power1.inOut" })
      .to(darkDuckRef.current, { x: 8, y: 34, rotation: 2, duration: 0.65, ease: "power1.inOut" })
      .to(darkDuckRef.current, { x: -7, y: 56, rotation: -2, duration: 0.65, ease: "power1.inOut" })
      .to(darkDuckRef.current, { x: 7, y: 80, rotation: 2, duration: 0.65, ease: "power1.inOut" })
      .to(darkDuckRef.current, { y: "130vh", opacity: 0, duration: 3.8, ease: "power1.in" });

    return () => {
      darkDuckTimeline.current?.kill();
      darkDuckTimeline.current = null;
    };
  }, [isSunClicked]);

  return (
    <section
      className="relative h-[100vh] w-[100vw] snap-start overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: isSunClicked ? "url('/5.png')" : "url('/4.png')" }}
    >
      <p className="absolute left-1/2 top-[clamp(26px,7vh,110px)] z-30 w-[min(84vw,760px)] -translate-x-1/2 rounded-2xl bg-white/60 px-[clamp(14px,1.8vw,26px)] py-[clamp(12px,1.5vw,22px)] text-center text-[clamp(16px,1.7vw,30px)] leading-[1.35] text-neutral-900 shadow-lg backdrop-blur-[1px]">
        {isSunClicked
          ? "Y una vez cayó la noche, el patito feo se fue hacia el bosque."
          : "Ya cansado de las burlas por su físico y el trato que le daban, decidió esperar a la noche para irse de la granja."}
      </p>
      {!isSunClicked && (
        <>
          <button
            type="button"
            aria-label="Cambiar escena con el sol"
            onClick={() => setIsSunClicked(true)}
            className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0"
          >
            <Image
              src="/sol.png"
              alt="Sol"
              width={220}
              height={220}
              className="h-auto w-[clamp(84px,10vw,196px)]"
            />
          </button>
          <p className="pointer-events-none absolute left-1/2 top-[2%] z-30 -translate-x-1/2 text-[clamp(11px,1.1vw,18px)] font-semibold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] animate-pulse">
            click!
          </p>
        </>
      )}
      <div className="pointer-events-none absolute left-[56%] top-[58%] z-20 -translate-x-1/2 -translate-y-1/2">
        <div ref={darkDuckRef}>
          <Image
            src={
              isSunClicked
                ? "/img/patito_oscuro/patito_oscuro_bolsa.png"
                : "/img/patito_oscuro/patito_oscuro_trist.png"
            }
            alt={isSunClicked ? "Patito oscuro con bolsa" : "Patito oscuro triste"}
            width={260}
            height={260}
            className="h-auto w-[clamp(86px,10.5vw,180px)]"
          />
        </div>
      </div>
    </section>
  );
}

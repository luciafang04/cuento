import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Section8() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasStartedSwap = useRef(false);
  const hasStartedThoughtSequence = useRef(false);
  const [showThoughtfulDuck, setShowThoughtfulDuck] = useState(false);
  const [showLongThought, setShowLongThought] = useState(false);
  const [showShortThought, setShowShortThought] = useState(false);
  const [showSadDuck, setShowSadDuck] = useState(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) {
      return;
    }

    let swapTimer: number | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting;
        if (!isVisible || hasStartedSwap.current) {
          return;
        }

        hasStartedSwap.current = true;
        swapTimer = window.setTimeout(() => {
          setShowThoughtfulDuck(true);
        }, 2000);
      },
      { threshold: 0.6 },
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
      if (swapTimer) {
        window.clearTimeout(swapTimer);
      }
    };
  }, []);

  useEffect(() => {
    if (!showThoughtfulDuck || hasStartedThoughtSequence.current) {
      return;
    }

    hasStartedThoughtSequence.current = true;
    setShowShortThought(true);
    const longThoughtTimer = window.setTimeout(() => {
      setShowLongThought(true);
    }, 2000);
    const sadDuckTimer = window.setTimeout(() => {
      setShowSadDuck(true);
    }, 3000);

    return () => {
      window.clearTimeout(longThoughtTimer);
      window.clearTimeout(sadDuckTimer);
    };
  }, [showThoughtfulDuck]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] w-[100vw] snap-start overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/8.png')" }}
    >
      <p className="absolute left-1/2 top-[clamp(26px,7vh,110px)] z-30 w-[min(84vw,760px)] -translate-x-1/2 rounded-2xl bg-white/60 px-[clamp(14px,1.8vw,26px)] py-[clamp(12px,1.5vw,22px)] text-center text-[clamp(16px,1.7vw,30px)] leading-[1.35] text-neutral-900 shadow-lg backdrop-blur-[1px]">
        {showSadDuck
          ? "La abuelita sí lo quería pero los demás animales no, eran muy hostiles y ya de primeras no lo aceptaron, así que volvió a buscar un nuevo hogar"
          : "Encontró otra granja que la llevaba una anciana muy muy amable. Creyó que allí podría ser feliz por fin, pero había un pequeño detalle...."}
      </p>
      {showShortThought && (
        <div className="absolute left-[58%] top-[46%] z-30 max-w-[min(34vw,300px)] rounded-[24px] bg-white/75 px-[clamp(10px,1.4vw,16px)] py-[clamp(8px,1.2vw,12px)] text-[clamp(12px,1.1vw,18px)] leading-[1.25] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          En cuanto pueda, cazo al nuevo
          <span className="absolute -bottom-[9px] right-[22%] h-[10px] w-[10px] rounded-full bg-white/75" />
          <span className="absolute -bottom-[18px] right-[18%] h-[8px] w-[8px] rounded-full bg-white/75" />
          <span className="absolute -bottom-[24px] right-[15%] h-[6px] w-[6px] rounded-full bg-white/75" />
        </div>
      )}
      {showLongThought && (
        <div className="absolute left-[68%] top-[66%] z-30 max-w-[min(40vw,360px)] rounded-[24px] bg-white/75 px-[clamp(10px,1.4vw,16px)] py-[clamp(8px,1.2vw,12px)] text-[clamp(12px,1.1vw,18px)] leading-[1.25] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          que se marche ya, no quiero más gente en MI granja
          <span className="absolute -bottom-[9px] left-[26%] h-[10px] w-[10px] rounded-full bg-white/75" />
          <span className="absolute -bottom-[18px] left-[22%] h-[8px] w-[8px] rounded-full bg-white/75" />
          <span className="absolute -bottom-[24px] left-[19%] h-[6px] w-[6px] rounded-full bg-white/75" />
        </div>
      )}
      <Image
        src={
          showSadDuck
            ? "/img/patito_oscuro/patito_oscuro_trist.png"
            : showThoughtfulDuck
              ? "/img/patito_oscuro/patito_oscuro_dudoso.png"
              : "/img/patito_oscuro/patito_oscuro_feliz.png"
        }
        alt={showSadDuck ? "Patito oscuro triste" : showThoughtfulDuck ? "Patito oscuro pensando" : "Patito oscuro feliz"}
        width={260}
        height={260}
        className="pointer-events-none absolute left-[60%] top-[67%] z-20 h-auto w-[clamp(46px,5.6vw,92px)] -translate-x-1/2 -translate-y-1/2"
      />
    </section>
  );
}

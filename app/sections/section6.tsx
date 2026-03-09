import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Section6() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const darkDuckRef = useRef<HTMLDivElement | null>(null);
  const hasStartedDialog = useRef(false);
  const hasStartedSadDuckAnimation = useRef(false);
  const sadDuckTimeline = useRef<gsap.core.Timeline | null>(null);
  const [visibleDialogs, setVisibleDialogs] = useState(0);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) {
      return;
    }

    const timers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting;
        if (!isVisible || hasStartedDialog.current) {
          return;
        }

        hasStartedDialog.current = true;
        timers.push(
          window.setTimeout(() => setVisibleDialogs(1), 5000),
          window.setTimeout(() => setVisibleDialogs(2), 7000),
          window.setTimeout(() => setVisibleDialogs(3), 9000),
        );
      },
      { threshold: 0.6 },
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (!darkDuckRef.current) {
      return;
    }
    gsap.set(darkDuckRef.current, { scaleX: -1, transformOrigin: "50% 50%" });
  }, []);

  useEffect(() => {
    if (!darkDuckRef.current || visibleDialogs >= 3) {
      return;
    }
    gsap.set(darkDuckRef.current, { x: 0, opacity: 1, scaleX: -1, transformOrigin: "50% 50%" });
  }, [visibleDialogs]);

  useEffect(() => {
    if (visibleDialogs < 3 || hasStartedSadDuckAnimation.current || !darkDuckRef.current) {
      return;
    }

    hasStartedSadDuckAnimation.current = true;
    sadDuckTimeline.current = gsap.timeline();
    sadDuckTimeline.current
      .to(darkDuckRef.current, {
        delay: 1,
        scaleX: 1,
        duration: 0.28,
        ease: "power1.inOut",
      })
      .to(darkDuckRef.current, {
        x: "-140vw",
        duration: 3.8,
        ease: "power2.inOut",
      });

    return () => {
      sadDuckTimeline.current?.kill();
      sadDuckTimeline.current = null;
    };
  }, [visibleDialogs]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] w-[100vw] snap-start overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/6.png')" }}
    >
      <p className="absolute left-1/2 top-[clamp(26px,7vh,110px)] z-30 w-[min(84vw,760px)] -translate-x-1/2 rounded-2xl bg-white/60 px-[clamp(14px,1.8vw,26px)] py-[clamp(12px,1.5vw,22px)] text-center text-[clamp(16px,1.7vw,30px)] leading-[1.35] text-neutral-900 shadow-lg backdrop-blur-[1px]">
        {visibleDialogs >= 3
          ? "Aunque lo aceptaban seguían diciéndole feo y prefirió buscar otro hogar"
          : "El patito feo encontró una familia de patos en el bosque, y se alegró porque le dejaron quedarse con ellos."}
      </p>

      {visibleDialogs >= 1 && (
        <div className="absolute left-[50%] top-[44%] z-30 max-w-[min(44vw,360px)] rounded-[26px] bg-white/75 px-[clamp(12px,1.6vw,18px)] py-[clamp(10px,1.4vw,14px)] text-[clamp(13px,1.25vw,21px)] leading-[1.25] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          Quédate con nosotros
          <span className="absolute -bottom-[8px] left-[72%] h-[14px] w-[14px] rotate-45 bg-white/75" />
        </div>
      )}

      {visibleDialogs >= 2 && (
        <div className="absolute left-[71%] top-[42%] z-30 max-w-[min(52vw,420px)] rounded-[26px] bg-white/75 px-[clamp(12px,1.6vw,18px)] py-[clamp(10px,1.4vw,14px)] text-[clamp(12px,1.15vw,19px)] leading-[1.25] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          Qué pequeñín es, pero... es un poco feo ¿no?
          <span className="absolute -bottom-[8px] left-[20%] h-[14px] w-[14px] -rotate-45 bg-white/75" />
        </div>
      )}

      {visibleDialogs >= 3 && (
        <div className="absolute left-[72%] top-[82%] z-30 max-w-[min(24vw,220px)] rounded-[26px] bg-white/75 px-[clamp(12px,1.6vw,18px)] py-[clamp(10px,1.4vw,14px)] text-[clamp(12px,1.15vw,19px)] leading-[1.25] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          jaja, cierto
          <span className="absolute -top-[8px] left-[24%] h-[14px] w-[14px] rotate-45 bg-white/75" />
        </div>
      )}

      <div
        ref={darkDuckRef}
        className="pointer-events-none absolute left-[24%] top-[38%] z-20 -translate-x-1/2 -translate-y-1/2"
      >
        <Image
          src={
            visibleDialogs >= 3
              ? "/img/patito_oscuro/patito_oscuro_llorando (2).png"
              : "/img/patito_oscuro/patito_encontrando.png"
          }
          alt={visibleDialogs >= 3 ? "Patito oscuro llorando" : "Patito oscuro encontrando"}
          width={260}
          height={260}
          className="h-auto w-[clamp(48px,5.8vw,96px)]"
        />
      </div>
    </section>
  );
}

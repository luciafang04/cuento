import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Section6() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const darkDuckRef = useRef<HTMLDivElement | null>(null);
  const hasStartedSadDuckAnimation = useRef(false);
  const sadDuckTimeline = useRef<gsap.core.Timeline | null>(null);
  const [storyStep, setStoryStep] = useState(0);
  const maxStep = 4;
  const clampedStep = Math.max(0, Math.min(storyStep, maxStep));
  const visibleDialogs = Math.min(clampedStep, 3);
  const canGoPrev = clampedStep > 0;
  const canGoNext = clampedStep < maxStep;

  useEffect(() => {
    if (!darkDuckRef.current) {
      return;
    }
    gsap.set(darkDuckRef.current, { scaleX: -1, transformOrigin: "50% 50%" });
  }, []);

  useEffect(() => {
    if (!darkDuckRef.current || clampedStep >= 4) {
      return;
    }
    gsap.set(darkDuckRef.current, { x: 0, opacity: 1, scaleX: -1, transformOrigin: "50% 50%" });
  }, [clampedStep]);

  useEffect(() => {
    if (clampedStep < 4 || hasStartedSadDuckAnimation.current || !darkDuckRef.current) {
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
  }, [clampedStep]);

  useEffect(() => {
    if (clampedStep >= 4) {
      return;
    }
    hasStartedSadDuckAnimation.current = false;
    sadDuckTimeline.current?.kill();
    sadDuckTimeline.current = null;
    if (darkDuckRef.current) {
      gsap.set(darkDuckRef.current, { x: 0, opacity: 1, scaleX: -1, transformOrigin: "50% 50%" });
    }
  }, [clampedStep]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] w-[100vw] snap-start overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/6.png')" }}
    >
      <div className="absolute left-1/2 top-[clamp(26px,7vh,110px)] z-30 w-[min(84vw,760px)] -translate-x-1/2 text-center">
        <div className="min-h-[clamp(96px,13vh,170px)] rounded-2xl bg-white/60 px-[clamp(14px,1.8vw,26px)] py-[clamp(12px,1.5vw,22px)] text-[clamp(16px,1.7vw,30px)] leading-[1.35] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          <button
            type="button"
            onClick={() => {
              if (canGoNext) {
                setStoryStep((prev) => Math.min(prev + 1, maxStep));
              }
            }}
            aria-label="Avanzar texto"
            className={`w-full border-0 bg-transparent p-0 text-center ${
              canGoNext ? "cursor-pointer" : "cursor-default"
            }`}
          >
            {clampedStep >= 4
              ? "Aunque lo aceptaban seguían diciéndole feo y prefirió buscar otro hogar."
              : "El patito encontró una familia de patos en el bosque, y se alegró porque le dejaron quedarse con ellos."}
          </button>
        </div>
        <div className="mt-[clamp(10px,1.4vw,20px)] flex items-center justify-center gap-[clamp(10px,2vw,28px)] text-[clamp(18px,2.2vw,36px)] font-semibold text-neutral-900">
          <button
            type="button"
            aria-label="Texto anterior"
            disabled={!canGoPrev}
            onClick={() => setStoryStep((prev) => Math.max(prev - 1, 0))}
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
                setStoryStep((prev) => Math.min(prev + 1, maxStep));
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

      {visibleDialogs >= 1 && (
        <div className="absolute left-[50%] top-[41%] z-30 max-w-[min(44vw,360px)] rounded-[26px] bg-white/75 px-[clamp(12px,1.6vw,18px)] py-[clamp(10px,1.4vw,14px)] text-[clamp(13px,1.25vw,21px)] leading-[1.25] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          Quédate con nosotros
          <span className="absolute -bottom-[8px] left-[72%] h-[14px] w-[14px] rotate-45 bg-white/75" />
        </div>
      )}

      {visibleDialogs >= 2 && (
        <div className="absolute left-[71%] top-[39%] z-30 max-w-[min(52vw,420px)] rounded-[26px] bg-white/75 px-[clamp(12px,1.6vw,18px)] py-[clamp(10px,1.4vw,14px)] text-[clamp(12px,1.15vw,19px)] leading-[1.25] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          Qué pequeñín es, pero... es un poco feo ¿no?
          <span className="absolute -bottom-[8px] left-[20%] h-[14px] w-[14px] -rotate-45 bg-white/75" />
        </div>
      )}

      {visibleDialogs >= 3 && (
        <div className="absolute left-[72%] top-[86%] z-30 max-w-[min(24vw,220px)] rounded-[26px] bg-white/75 px-[clamp(12px,1.6vw,18px)] py-[clamp(10px,1.4vw,14px)] text-[clamp(12px,1.15vw,19px)] leading-[1.25] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          jaja, cierto
          <span className="absolute -top-[8px] left-[24%] h-[14px] w-[14px] rotate-45 bg-white/75" />
        </div>
      )}

      <div
        ref={darkDuckRef}
        className={`pointer-events-none absolute left-[24%] top-[38%] z-20 -translate-x-1/2 -translate-y-1/2 ${
          clampedStep >= 4 ? "translate-y-[24px]" : ""
        }`}
      >
        <Image
          src={
            clampedStep >= 4
              ? "/img/patito_oscuro/patito_oscuro_llorando (2).png"
              : "/img/patito_oscuro/patito_encontrando.png"
          }
          alt={clampedStep >= 4 ? "Patito oscuro llorando" : "Patito oscuro encontrando"}
          width={260}
          height={260}
          className={`h-auto ${
            clampedStep >= 4 ? "w-[clamp(52px,6.2vw,114px)]" : "w-[clamp(48px,5.8vw,96px)]"
          }`}
        />
      </div>
    </section>
  );
}

import Image from "next/image";
import { useState } from "react";

export default function Section8() {
  const [storyStep, setStoryStep] = useState(0);
  const maxStep = 2;
  const clampedStep = Math.max(0, Math.min(storyStep, maxStep));
  const showShortThought = clampedStep >= 1;
  const showLongThought = clampedStep >= 1;
  const showSadDuck = clampedStep >= 2;
  const showThoughtfulDuck = clampedStep >= 1;
  const canGoPrev = clampedStep > 0;
  const canGoNext = clampedStep < maxStep;

  return (
    <section
      className="relative h-[100vh] w-[100vw] snap-start overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/8.png')" }}
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
            {showSadDuck
              ? "La abuelita sí lo quería pero los demás animales no, eran muy hostiles y ya de primeras no lo aceptaron, así que volvió a buscar un nuevo hogar."
              : "Encontró otra granja que la llevaba una anciana muy muy amable. Creyó que allí podría ser feliz por fin, pero había un pequeño detalle...."}
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
            &larr;
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
            &rarr;
          </button>
        </div>
      </div>
      {showShortThought && (
        <div className="absolute left-[54%] top-[40%] z-30 max-w-[min(34vw,300px)] rounded-[24px] bg-white/75 px-[clamp(10px,1.4vw,16px)] py-[clamp(8px,1.2vw,12px)] text-[clamp(12px,1.1vw,18px)] leading-[1.25] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          En cuanto pueda, cazo al nuevo
          <span className="absolute -bottom-[9px] right-[22%] h-[10px] w-[10px] rounded-full bg-white/75" />
          <span className="absolute -bottom-[18px] right-[18%] h-[8px] w-[8px] rounded-full bg-white/75" />
          <span className="absolute -bottom-[24px] right-[15%] h-[6px] w-[6px] rounded-full bg-white/75" />
        </div>
      )}
      {showLongThought && (
        <div className="absolute left-[68%] top-[66%] z-30 max-w-[min(40vw,360px)] rounded-[24px] bg-white/75 px-[clamp(10px,1.4vw,16px)] py-[clamp(8px,1.2vw,12px)] text-[clamp(12px,1.1vw,18px)] leading-[1.25] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          Que se marche ya, no quiero más gente en MI granja
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
        className={`pointer-events-none absolute left-[60%] top-[67%] z-20 h-auto -translate-x-1/2 -translate-y-1/2 ${
          showSadDuck
            ? "w-[clamp(60px,7vw,120px)]"
            : showThoughtfulDuck
              ? "w-[clamp(60px,7vw,120px)]"
              : "w-[clamp(78px,9vw,150px)]"
        }`}
      />
    </section>
  );
}

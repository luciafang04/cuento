import Image from "next/image";
import { useState } from "react";

export default function Section7() {
  const [storyStep, setStoryStep] = useState(0);
  const maxStep = 8;
  const clampedStep = Math.max(0, Math.min(storyStep, maxStep));
  const canGoPrev = clampedStep > 0;
  const canGoNext = clampedStep < maxStep;

  return (
    <section
      className="relative h-[100vh] w-[100vw] snap-start overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/7.png')" }}
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
            {clampedStep === 0 && "Después de caminar y caminar encontró un gran estanque con cisnes."}
            {clampedStep === 1 && "El patito quedó muy sorprendido al ver lo bellos que eran todos."}
            {clampedStep >= 8
              ? "No era un patito, era un pequeño cisne."
              : clampedStep >= 7
                ? "El patito estuvo tanto tiempo buscando un hogar que no se dio cuenta que su plumaje cambió."
                : clampedStep >= 6
                  ? "Pero esta vez pasó algo raro, ¿por qué dijeron que era uno más de los suyos si él era feo y ellos eran bonitos?"
                  : clampedStep >= 2
                    ? "Pero se sintió avergonzado porque siempre le habían dicho que él era muy feo."
                    : ""}
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
      <Image
        src={
          clampedStep >= 8
            ? "/img/patito_oscuro/patito_blanco.png"
            : clampedStep >= 6
              ? "/img/patito_oscuro/pato_blanco_pensativo.png"
              : clampedStep >= 2
                ? "/img/patito_oscuro/patito_oscuro_trist.png"
                : "/img/patito_oscuro/sorpresa.png"
        }
        alt={
          clampedStep >= 8
            ? "Patito blanco"
            : clampedStep >= 6
              ? "Patito blanco pensativo"
              : clampedStep >= 2
                ? "Patito oscuro triste"
                : "Patito oscuro sorprendido"
        }
        width={260}
        height={260}
        className={`pointer-events-none absolute left-[62%] top-[46%] z-20 h-auto -translate-x-1/2 -translate-y-1/2 ${
          clampedStep >= 8
            ? "w-[clamp(64px,8vw,140px)] -translate-y-[64px] top-[4%]"
            : clampedStep >= 6
              ? "w-[clamp(84px,10vw,190px)] -translate-y-[80px] top-[8%]"
              : "w-[clamp(48px,5.8vw,100px)]"
        } ${clampedStep >= 2 && clampedStep < 7 ? "-translate-y-[12px]" : ""} ${
          clampedStep >= 6 && clampedStep < 8 ? "top-[6%] -translate-y-[96px]" : ""
        }`}
      />
      {clampedStep >= 3 && (
        <div className="absolute left-[30%] top-[38%] z-30 max-w-[min(28vw,240px)] rounded-[22px] bg-white/75 px-[clamp(8px,1.2vw,14px)] py-[clamp(6px,1vw,12px)] text-[clamp(11px,1vw,16px)] leading-[1.2] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          Ey, uno más de los nuestros
          <span className="absolute -bottom-[6px] right-[22%] h-[12px] w-[12px] rotate-45 bg-white/75" />
        </div>
      )}
      {clampedStep >= 4 && (
        <div className="absolute left-[20%] top-[44%] z-30 max-w-[min(40vw,360px)] rounded-[24px] bg-white/75 px-[clamp(10px,1.4vw,16px)] py-[clamp(8px,1.2vw,12px)] text-[clamp(12px,1.1vw,18px)] leading-[1.25] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          Qué pequeñito es
          <span className="absolute -bottom-[8px] left-[26%] h-[14px] w-[14px] -rotate-45 bg-white/75" />
        </div>
      )}
      {clampedStep >= 5 && (
        <div className="absolute left-[42%] top-[64%] z-30 max-w-[min(44vw,380px)] rounded-[24px] bg-white/75 px-[clamp(10px,1.4vw,16px)] py-[clamp(8px,1.2vw,12px)] text-[clamp(12px,1.1vw,18px)] leading-[1.25] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          ¿Quieres nadar con nosotros?
          <span className="absolute left-[-7px] top-[40%] h-[14px] w-[14px] rotate-45 bg-white/75" />
        </div>
      )}
    </section>
  );
}



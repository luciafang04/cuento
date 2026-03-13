import { useState } from "react";

export default function Section9() {
  const [showText, setShowText] = useState(true);

  return (
    <section
      className="relative h-[100vh] w-[100vw] snap-start bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/9.png')" }}
    >
      {showText && (
        <div className="absolute left-1/2 top-[clamp(26px,7vh,110px)] z-30 w-[min(84vw,760px)] -translate-x-1/2 text-center">
          <div className="min-h-[clamp(96px,13vh,170px)] rounded-2xl bg-white/60 px-[clamp(14px,1.8vw,26px)] py-[clamp(12px,1.5vw,22px)] text-[clamp(16px,1.7vw,30px)] leading-[1.35] text-neutral-900 shadow-lg backdrop-blur-[1px]">
            Y por fin el patito feo, que ya no era feo, encontró su hogar donde pudo ser feliz.
          </div>
          <div className="mt-[clamp(10px,1.4vw,20px)] flex items-center justify-center gap-[clamp(10px,2vw,28px)] text-[clamp(18px,2.2vw,36px)] font-semibold text-neutral-900">
            <button
              type="button"
              aria-label="Finalizar"
              onClick={() => setShowText(false)}
              className="cursor-pointer rounded-full px-[clamp(8px,1vw,16px)] py-[clamp(2px,0.4vw,6px)]"
            >
              &rarr;
            </button>
          </div>
        </div>
      )}
      {!showText && (
        <div className="absolute inset-0 z-30 flex items-center justify-center text-[clamp(52px,10vw,160px)] text-neutral-900 font-archivo-black -translate-y-[clamp(44px,8vw,110px)]">
          FIN
        </div>
      )}
    </section>
  );
}

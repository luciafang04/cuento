export default function Section9() {
  return (
    <section
      className="relative h-[100vh] w-[100vw] snap-start bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/9.png')" }}
    >
      <div className="absolute left-1/2 top-[clamp(26px,7vh,110px)] z-30 w-[min(84vw,760px)] -translate-x-1/2 text-center">
        <div className="min-h-[clamp(96px,13vh,170px)] rounded-2xl bg-white/60 px-[clamp(14px,1.8vw,26px)] py-[clamp(12px,1.5vw,22px)] text-[clamp(16px,1.7vw,30px)] leading-[1.35] text-neutral-900 shadow-lg backdrop-blur-[1px]">
          Y por fin el patito feo, que ya no era feo, encontró su hogar donde pudo ser feliz.
        </div>
      </div>
    </section>
  );
}

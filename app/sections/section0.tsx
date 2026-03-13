type Section0Props = {
  onStart: () => void;
};

export default function Section0({ onStart }: Section0Props) {
  return (
    <section
      className="relative h-[100vh] w-[100vw] snap-start bg-cover bg-[center_20%] bg-no-repeat"
      style={{ backgroundImage: "url('/portada.png')" }}
    >
      <div className="absolute bottom-[clamp(24px,6vh,80px)] left-1/2 z-30 -translate-x-1/2">
        <button
          type="button"
          onClick={onStart}
          className="cursor-pointer rounded-full bg-white/85 px-[clamp(18px,2.4vw,34px)] py-[clamp(10px,1.2vw,18px)] text-[clamp(16px,1.8vw,30px)] font-semibold text-neutral-900 shadow-xl backdrop-blur-[2px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Empezar el cuento
        </button>
      </div>
    </section>
  );
}

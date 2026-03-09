import Image from "next/image";
import { useState } from "react";

export default function Section7() {
  const [storyStep, setStoryStep] = useState(0);

  const handleTextClick = () => {
    if (storyStep < 2) {
      setStoryStep((prev) => prev + 1);
    }
  };

  return (
    <section
      className="relative h-[100vh] w-[100vw] snap-start overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/7.png')" }}
    >
      <p
        onClick={handleTextClick}
        className={`absolute left-1/2 top-[clamp(26px,7vh,110px)] z-30 w-[min(84vw,760px)] -translate-x-1/2 rounded-2xl bg-white/60 px-[clamp(14px,1.8vw,26px)] py-[clamp(12px,1.5vw,22px)] text-center text-[clamp(16px,1.7vw,30px)] leading-[1.35] text-neutral-900 shadow-lg backdrop-blur-[1px] ${
          storyStep < 2 ? "cursor-pointer" : ""
        }`}
      >
        {storyStep === 0 && "Después de caminar y caminar encontró un gran estanque con cisnes."}
        {storyStep === 1 && "El patito quedó muy sorprendido al ver lo bellos que eran todos."}
        {storyStep === 2 &&
          "Pero se sintió avergonzado porque siempre le habían dicho que él era muy feo."}
      </p>
      <Image
        src={storyStep === 2 ? "/img/patito_oscuro/patito_oscuro_trist.png" : "/img/patito_oscuro/sorpresa.png"}
        alt={storyStep === 2 ? "Patito oscuro triste" : "Patito oscuro sorprendido"}
        width={260}
        height={260}
        className="pointer-events-none absolute left-[64%] top-[46%] z-20 h-auto w-[clamp(48px,5.8vw,100px)] -translate-x-1/2 -translate-y-1/2"
      />
    </section>
  );
}

import Image from "next/image";
import { useState } from "react";

export default function Section4() {
  const [isSunClicked, setIsSunClicked] = useState(false);

  return (
    <section
      className="relative h-[100vh] w-[100vw] snap-start overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: isSunClicked ? "url('/5.png')" : "url('/4.png')" }}
    >
      {!isSunClicked && (
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
      )}
      <Image
        src="/img/patito_oscuro/patito_oscuro_trist.png"
        alt="Patito oscuro triste"
        width={260}
        height={260}
        className="pointer-events-none absolute left-1/2 top-[58%] z-20 h-auto w-[clamp(86px,10.5vw,180px)] -translate-x-1/2 -translate-y-1/2"
      />
    </section>
  );
}

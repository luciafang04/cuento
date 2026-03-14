import { useEffect, useRef, useState } from "react";

type Section5Props = {
  canPlayNarration: boolean;
};

export default function Section5({ canPlayNarration }: Section5Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const narrationAudioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedNarrationRef = useRef(false);
  const canPlay = canPlayNarration && isInView;

  useEffect(() => {
    const root = document.querySelector("main");
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { root: root instanceof Element ? root : null, threshold: 0.6 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canPlay || hasPlayedNarrationRef.current) {
      return;
    }
    const audio = new Audio("/audios/section5/1.mp3");
    if (narrationAudioRef.current) {
      narrationAudioRef.current.pause();
      narrationAudioRef.current.currentTime = 0;
    }
    narrationAudioRef.current = audio;
    hasPlayedNarrationRef.current = true;
    audio.volume = 1;
    audio.play().catch(() => {
      // Ignore autoplay restrictions.
    });
  }, [canPlay]);

  return (
    <section
      ref={sectionRef}
      className="h-[100vh] w-[100vw] snap-start bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/5.png')", backgroundSize: "90%" }}
    />
  );
}

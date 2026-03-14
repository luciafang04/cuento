"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Section0 from "./sections/section0";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";
import Section6 from "./sections/section6";
import Section7 from "./sections/section7";
import Section8 from "./sections/section8";
import Section9 from "./sections/section9";

export default function Home() {
  const [eggClicks, setEggClicks] = useState([0, 0, 0, 0]);
  const [isStoryStarted, setIsStoryStarted] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isSectionTwoLocked, setIsSectionTwoLocked] = useState(false);
  const [isSectionThreeLocked, setIsSectionThreeLocked] = useState(false);
  const [sectionTwoStep, setSectionTwoStep] = useState(0);
  const [showSectionThreeSadDarkDuck, setShowSectionThreeSadDarkDuck] = useState(false);
  const [showSectionThreeAlertDucks, setShowSectionThreeAlertDucks] = useState(false);
  const [sectionThreeStep, setSectionThreeStep] = useState(0);
  const [sectionThreeTextStep, setSectionThreeTextStep] = useState(0);
  const hasPlayedAllEggsAudio = useRef(false);
  const chicksAudioRef = useRef<HTMLAudioElement | null>(null);
  const hasCompletedSectionTwoSequence = useRef(false);
  const hasStartedSectionTwoSequence = useRef(false);
  const hasCompletedSectionThreeSequence = useRef(false);
  const hasStartedSectionThreeSequence = useRef(false);
  const sectionThreeTimeline = useRef<gsap.core.Timeline | null>(null);
  const sectionThreeSwapTimer = useRef<number | null>(null);
  const sectionThreeRunTimer = useRef<number | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const firstSectionRef = useRef<HTMLElement | null>(null);
  const secondSectionRef = useRef<HTMLElement | null>(null);
  const thirdSectionRef = useRef<HTMLElement | null>(null);
  const sectionThreeDuckOneRef = useRef<HTMLDivElement | null>(null);
  const sectionThreeDuckTwoRef = useRef<HTMLDivElement | null>(null);
  const sectionThreeDuckSixRef = useRef<HTMLDivElement | null>(null);
  const sectionThreeDarkDuckRef = useRef<HTMLDivElement | null>(null);
  const allEggsBroken = eggClicks.every((clicks) => clicks >= 4);
  const showSectionThreeDarkDuck = sectionThreeStep >= 1;
  const shouldMuteAudio = isSectionTwoLocked || sectionTwoStep >= 1;

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const scrollContainer = mainRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  const playCrackSound = () => {
    if (shouldMuteAudio) {
      return;
    }
    const crackAudio = new Audio("/audios/cracking-egg.wav");
    crackAudio.play().catch(() => {
      // Ignore playback rejections from the browser.
    });
  };

  const handleEggClick = (index: number) => {
    playCrackSound();
    setEggClicks((prev) => prev.map((clicks, i) => (i === index ? Math.min(clicks + 1, 4) : clicks)));
  };

  useEffect(() => {
    if (!allEggsBroken || hasPlayedAllEggsAudio.current || shouldMuteAudio) {
      return;
    }

    hasPlayedAllEggsAudio.current = true;
    chicksAudioRef.current = new Audio("/audios/audio_pollitos.wav");
    chicksAudioRef.current.volume = 0.2;
    chicksAudioRef.current.play().catch(() => {
      // Ignore playback rejections from the browser.
    });
  }, [allEggsBroken, shouldMuteAudio]);

  useEffect(() => {
    if (!shouldMuteAudio || !chicksAudioRef.current) {
      return;
    }

    chicksAudioRef.current.pause();
    chicksAudioRef.current.currentTime = 0;
  }, [shouldMuteAudio]);

  useEffect(() => {
    if (!isStoryStarted || !firstSectionRef.current) {
      return;
    }

    firstSectionRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [isStoryStarted]);


  useEffect(() => {
    if (isSectionTwoLocked) {
      return;
    }

    const scrollContainer = mainRef.current;
    if (!scrollContainer) {
      return;
    }

    const handleScroll = () => {
      if (hasCompletedSectionTwoSequence.current) {
        return;
      }

      const secondSectionTop = secondSectionRef.current?.offsetTop ?? Infinity;
      if (scrollContainer.scrollTop < secondSectionTop - 2) {
        return;
      }

      secondSectionRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
      setIsSectionTwoLocked(true);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [isSectionTwoLocked]);

  useEffect(() => {
    if (!isSectionTwoLocked) {
      return;
    }

    const scrollContainer = mainRef.current;
    if (!scrollContainer) {
      return;
    }

    const secondSectionTop = secondSectionRef.current?.offsetTop ?? 0;
    scrollContainer.scrollTo({ top: secondSectionTop, behavior: "auto" });
  }, [isSectionTwoLocked]);

  useEffect(() => {
    if (!isSectionTwoLocked || sectionTwoStep < 1 || hasCompletedSectionTwoSequence.current) {
      return;
    }

    const scrollContainer = mainRef.current;
    if (!scrollContainer) {
      return;
    }

    const secondSectionTop = secondSectionRef.current?.offsetTop ?? 0;
    hasCompletedSectionTwoSequence.current = true;
    setIsSectionTwoLocked(false);
    window.requestAnimationFrame(() => {
      scrollContainer.scrollTo({ top: secondSectionTop + 2, behavior: "auto" });
    });
  }, [isSectionTwoLocked, sectionTwoStep]);

  useEffect(() => {
    if (isSectionThreeLocked) {
      return;
    }

    const scrollContainer = mainRef.current;
    if (!scrollContainer) {
      return;
    }

    const handleScroll = () => {
      if (hasCompletedSectionThreeSequence.current || isSectionTwoLocked) {
        return;
      }

      const thirdSectionTop = thirdSectionRef.current?.offsetTop ?? Infinity;
      if (scrollContainer.scrollTop < thirdSectionTop - 2) {
        return;
      }

      thirdSectionRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
      setIsSectionThreeLocked(true);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [isSectionThreeLocked, isSectionTwoLocked]);

  useEffect(() => {
    if (!isSectionThreeLocked) {
      return;
    }

    const scrollContainer = mainRef.current;
    if (!scrollContainer) {
      return;
    }

    const thirdSectionTop = thirdSectionRef.current?.offsetTop ?? 0;
    scrollContainer.scrollTo({ top: thirdSectionTop, behavior: "auto" });
  }, [isSectionThreeLocked]);

  useEffect(() => {
    if (sectionThreeStep !== 0) {
      return;
    }

    setSectionThreeTextStep(0);
    hasCompletedSectionThreeSequence.current = false;
    hasStartedSectionThreeSequence.current = false;
    setShowSectionThreeAlertDucks(false);
    setShowSectionThreeSadDarkDuck(false);
    sectionThreeTimeline.current?.kill();
    sectionThreeTimeline.current = null;
    if (sectionThreeSwapTimer.current) {
      window.clearTimeout(sectionThreeSwapTimer.current);
      sectionThreeSwapTimer.current = null;
    }
    if (sectionThreeRunTimer.current) {
      window.clearTimeout(sectionThreeRunTimer.current);
      sectionThreeRunTimer.current = null;
    }

    const duckOne = sectionThreeDuckOneRef.current;
    const duckTwo = sectionThreeDuckTwoRef.current;
    const duckSix = sectionThreeDuckSixRef.current;
    const darkDuck = sectionThreeDarkDuckRef.current;
    if (duckOne || duckTwo || duckSix) {
      gsap.set([duckOne, duckTwo, duckSix], { x: 0, y: 0, rotation: 0, opacity: 1 });
    }
    if (darkDuck) {
      gsap.set(darkDuck, { y: 0, scale: 1 });
    }
  }, [sectionThreeStep]);

  useEffect(() => {
    if (sectionThreeStep < 1 || hasCompletedSectionThreeSequence.current) {
      return;
    }
    if (hasStartedSectionThreeSequence.current) {
      return;
    }

    const scrollContainer = mainRef.current;
    if (!scrollContainer) {
      return;
    }

    const thirdSectionTop = thirdSectionRef.current?.offsetTop ?? 0;

    const runSectionThreeScatter = () => {
      const duckOne = sectionThreeDuckOneRef.current;
      const duckTwo = sectionThreeDuckTwoRef.current;
      const duckSix = sectionThreeDuckSixRef.current;
      if (!duckOne || !duckTwo || !duckSix) {
        return;
      }

      sectionThreeTimeline.current = gsap.timeline({
        onComplete: () => {
          setShowSectionThreeSadDarkDuck(true);
          hasCompletedSectionThreeSequence.current = true;
          setIsSectionThreeLocked(false);
          window.requestAnimationFrame(() => {
            scrollContainer.scrollTo({ top: thirdSectionTop + 2, behavior: "auto" });
          });
        },
      });

      sectionThreeTimeline.current
        .to(duckOne, { x: -220, y: -140, rotation: -18, opacity: 0, duration: 1, ease: "power3.in" }, 0)
        .to(duckTwo, { x: 190, y: -130, rotation: 14, opacity: 0, duration: 1, ease: "power3.in" }, 0)
        .to(duckSix, { x: 240, y: -150, rotation: 20, opacity: 0, duration: 1, ease: "power3.in" }, 0);
    };

    hasStartedSectionThreeSequence.current = true;
    sectionThreeSwapTimer.current = window.setTimeout(() => {
      const darkDuck = sectionThreeDarkDuckRef.current;
      if (!darkDuck) {
        setShowSectionThreeAlertDucks(true);
        sectionThreeRunTimer.current = window.setTimeout(() => {
          runSectionThreeScatter();
        }, 1000);
        return;
      }

      gsap.to(darkDuck, {
        y: 34,
        scale: 1.15,
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => {
          setShowSectionThreeAlertDucks(true);
          sectionThreeRunTimer.current = window.setTimeout(() => {
            runSectionThreeScatter();
          }, 1000);
        },
      });
    }, 0);

    return () => {
      sectionThreeTimeline.current?.kill();
      sectionThreeTimeline.current = null;
      if (sectionThreeSwapTimer.current) {
        window.clearTimeout(sectionThreeSwapTimer.current);
        sectionThreeSwapTimer.current = null;
      }
      if (sectionThreeRunTimer.current) {
        window.clearTimeout(sectionThreeRunTimer.current);
        sectionThreeRunTimer.current = null;
      }
    };
  }, [sectionThreeStep]);

  return (
    <main
      ref={mainRef}
      className={`h-screen w-screen overflow-x-hidden ${
        isStoryStarted ? "snap-y snap-mandatory overflow-y-auto" : "overflow-hidden"
      }`}
      style={{ touchAction: isStoryStarted ? "pan-y" : "none" }}
    >
      <Section0
        onStart={() => {
          setIsStoryStarted(true);
          setHasUserInteracted(true);
        }}
      />
      <Section1
        firstSectionRef={firstSectionRef}
        allEggsBroken={allEggsBroken}
        eggClicks={eggClicks}
          onEggClick={handleEggClick}
        canPlayNarration={hasUserInteracted}
        />
        <Section2
          secondSectionRef={secondSectionRef}
          storyStep={sectionTwoStep}
          canPlayNarration={hasUserInteracted && isSectionTwoLocked}
          onStoryStepChange={(nextStep) => {
            setSectionTwoStep(nextStep);
            if (nextStep > 0) {
              hasStartedSectionTwoSequence.current = true;
            }
          }}
        />
        <Section3
          thirdSectionRef={thirdSectionRef}
          showSectionThreeDarkDuck={showSectionThreeDarkDuck}
          showSectionThreeSadDarkDuck={showSectionThreeSadDarkDuck}
          showSectionThreeAlertDucks={showSectionThreeAlertDucks}
          textStep={sectionThreeTextStep}
          canPlayNarration={hasUserInteracted}
          onTextStepChange={(nextStep) => {
            setSectionThreeTextStep(nextStep);
            if (nextStep === 0) {
              setSectionThreeStep(0);
            }
          }}
          onAdvanceScene={() => setSectionThreeStep(1)}
          sectionThreeDarkDuckRef={sectionThreeDarkDuckRef}
          sectionThreeDuckOneRef={sectionThreeDuckOneRef}
          sectionThreeDuckTwoRef={sectionThreeDuckTwoRef}
          sectionThreeDuckSixRef={sectionThreeDuckSixRef}
        />
        <Section4 canPlayNarration={hasUserInteracted} />
        <Section6 canPlayNarration={hasUserInteracted} />
      <Section8 canPlayNarration={hasUserInteracted} />
      <Section7 canPlayNarration={hasUserInteracted} />
      <Section9 canPlayNarration={hasUserInteracted} />
    </main>
  );
}

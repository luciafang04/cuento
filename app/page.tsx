"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";
import Section6 from "./sections/section6";
import Section7 from "./sections/section7";
import Section8 from "./sections/section8";

export default function Home() {
  const [eggClicks, setEggClicks] = useState([0, 0, 0, 0]);
  const [showAngryMom, setShowAngryMom] = useState(false);
  const [isSectionTwoLocked, setIsSectionTwoLocked] = useState(false);
  const [isSectionThreeLocked, setIsSectionThreeLocked] = useState(false);
  const [sectionTwoStoryTriggered, setSectionTwoStoryTriggered] = useState(false);
  const [showDoubtDarkDuck, setShowDoubtDarkDuck] = useState(false);
  const [showSectionThreeDarkDuck, setShowSectionThreeDarkDuck] = useState(false);
  const [showSectionThreeSadDarkDuck, setShowSectionThreeSadDarkDuck] = useState(false);
  const [showSectionThreeAlertDucks, setShowSectionThreeAlertDucks] = useState(false);
  const hasPlayedAllEggsAudio = useRef(false);
  const chicksAudioRef = useRef<HTMLAudioElement | null>(null);
  const hasCompletedSectionTwoSequence = useRef(false);
  const hasStartedSectionTwoSequence = useRef(false);
  const hasCompletedSectionThreeSequence = useRef(false);
  const hasStartedSectionThreeSequence = useRef(false);
  const sectionTwoDelayTimer = useRef<number | null>(null);
  const sectionTwoUnlockTimer = useRef<number | null>(null);
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
  const shouldMuteAudio = sectionTwoStoryTriggered;

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
    if (!allEggsBroken || !firstSectionRef.current) {
      return;
    }

    firstSectionRef.current.scrollIntoView({ block: "start", behavior: "auto" });
  }, [allEggsBroken]);

  useEffect(() => {
    if (!allEggsBroken) {
      return;
    }

    const angryMomTimer = window.setTimeout(() => {
      setShowAngryMom(true);
    }, 5000);

    return () => {
      window.clearTimeout(angryMomTimer);
    };
  }, [allEggsBroken]);

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

    const triggerStory = () => {
      if (!sectionTwoStoryTriggered) {
        if (hasStartedSectionTwoSequence.current) {
          return;
        }
        hasStartedSectionTwoSequence.current = true;
        sectionTwoDelayTimer.current = window.setTimeout(() => {
          setSectionTwoStoryTriggered(true);
        }, 3000);
        return;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY > 0) {
        triggerStory();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const scrollKeys = ["ArrowDown", "PageDown", "Space"];
      if (!scrollKeys.includes(event.code)) {
        return;
      }
      event.preventDefault();
      triggerStory();
    };

    let touchStartY = 0;
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touchY = event.touches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - touchY;
      event.preventDefault();
      if (deltaY > 8) {
        triggerStory();
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    scrollContainer.addEventListener("touchstart", handleTouchStart, { passive: false });
    scrollContainer.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      scrollContainer.removeEventListener("touchstart", handleTouchStart);
      scrollContainer.removeEventListener("touchmove", handleTouchMove);
      if (sectionTwoDelayTimer.current) {
        window.clearTimeout(sectionTwoDelayTimer.current);
        sectionTwoDelayTimer.current = null;
      }
    };
  }, [isSectionTwoLocked, sectionTwoStoryTriggered]);

  useEffect(() => {
    if (!sectionTwoStoryTriggered) {
      return;
    }

    const darkDuckTimer = window.setTimeout(() => {
      setShowDoubtDarkDuck(true);
    }, 5000);

    return () => {
      window.clearTimeout(darkDuckTimer);
    };
  }, [sectionTwoStoryTriggered]);

  useEffect(() => {
    if (!isSectionTwoLocked || !showDoubtDarkDuck || hasCompletedSectionTwoSequence.current) {
      return;
    }

    const scrollContainer = mainRef.current;
    if (!scrollContainer) {
      return;
    }

    const secondSectionTop = secondSectionRef.current?.offsetTop ?? 0;
    sectionTwoUnlockTimer.current = window.setTimeout(() => {
      hasCompletedSectionTwoSequence.current = true;
      setIsSectionTwoLocked(false);
      window.requestAnimationFrame(() => {
        scrollContainer.scrollTo({ top: secondSectionTop + 2, behavior: "auto" });
      });
    }, 2000);

    return () => {
      if (sectionTwoUnlockTimer.current) {
        window.clearTimeout(sectionTwoUnlockTimer.current);
        sectionTwoUnlockTimer.current = null;
      }
    };
  }, [isSectionTwoLocked, showDoubtDarkDuck]);

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

    const triggerSceneThree = () => {
      if (!showSectionThreeDarkDuck) {
        setShowSectionThreeDarkDuck(true);
        return;
      }

      if (hasStartedSectionThreeSequence.current) {
        return;
      }

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
      }, 2000);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY > 0) {
        triggerSceneThree();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const scrollKeys = ["ArrowDown", "PageDown", "Space"];
      if (!scrollKeys.includes(event.code)) {
        return;
      }
      event.preventDefault();
      triggerSceneThree();
    };

    let touchStartY = 0;
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touchY = event.touches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - touchY;
      event.preventDefault();
      if (deltaY > 8) {
        triggerSceneThree();
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    scrollContainer.addEventListener("touchstart", handleTouchStart, { passive: false });
    scrollContainer.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      scrollContainer.removeEventListener("touchstart", handleTouchStart);
      scrollContainer.removeEventListener("touchmove", handleTouchMove);
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
  }, [isSectionThreeLocked, showSectionThreeDarkDuck]);

  return (
    <main ref={mainRef} className="h-screen w-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden">
      <Section1
        firstSectionRef={firstSectionRef}
        showAngryMom={showAngryMom}
        allEggsBroken={allEggsBroken}
        eggClicks={eggClicks}
        onEggClick={handleEggClick}
      />
      <Section2
        secondSectionRef={secondSectionRef}
        sectionTwoStoryTriggered={sectionTwoStoryTriggered}
        showDoubtDarkDuck={showDoubtDarkDuck}
      />
      <Section3
        thirdSectionRef={thirdSectionRef}
        showSectionThreeDarkDuck={showSectionThreeDarkDuck}
        showSectionThreeSadDarkDuck={showSectionThreeSadDarkDuck}
        showSectionThreeAlertDucks={showSectionThreeAlertDucks}
        sectionThreeDarkDuckRef={sectionThreeDarkDuckRef}
        sectionThreeDuckOneRef={sectionThreeDuckOneRef}
        sectionThreeDuckTwoRef={sectionThreeDuckTwoRef}
        sectionThreeDuckSixRef={sectionThreeDuckSixRef}
      />
      <Section4 />
      <Section6 />
      <Section8 />
      <Section7 />
    </main>
  );
}


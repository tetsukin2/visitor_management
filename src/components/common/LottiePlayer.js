"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";

export default function LottiePlayer({
  animationData,
  loop = true,
  className = "",
}) {
  const lottieContainer = useRef(null);

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: lottieContainer.current,
      renderer: "svg",
      loop,
      autoplay: true,
      animationData,
    });

    return () => {
      instance.destroy();
    };
  }, [animationData, loop]);

  return <div ref={lottieContainer} className={`w-full h-full ${className}`} />;
}

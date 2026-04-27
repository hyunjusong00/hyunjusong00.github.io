"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  cursorClassName?: string;
}

export default function Typewriter({
  text,
  speed = 70,
  startDelay = 0,
  className,
  cursorClassName,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    let typeTimer: ReturnType<typeof setTimeout> | undefined;
    const startTimer = setTimeout(() => {
      const step = () => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i < text.length) {
          typeTimer = setTimeout(step, speed);
        }
      };
      step();
    }, startDelay);
    return () => {
      clearTimeout(startTimer);
      if (typeTimer) clearTimeout(typeTimer);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={className}>
      {displayed}
      <span
        aria-hidden
        className={cn(
          "inline-block w-[0.06em] h-[0.85em] bg-current ml-1 align-middle caret-blink",
          cursorClassName
        )}
      />
    </span>
  );
}

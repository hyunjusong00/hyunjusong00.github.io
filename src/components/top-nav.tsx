"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#work", label: "Work" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export default function TopNav() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-40 bg-background/70 backdrop-blur-md border-b border-border/40">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.22em] font-semibold hover:opacity-70 transition-opacity"
        >
          Hyunju Song
        </Link>
        <div className="flex items-center gap-5 md:gap-7">
          {links.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeId === id;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-[11px] uppercase tracking-[0.2em] font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-[18px] left-0 right-0 h-px bg-foreground transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

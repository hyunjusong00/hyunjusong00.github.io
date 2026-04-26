"use client";

import Link from "next/link";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#work", label: "Work" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export default function TopNav() {
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
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

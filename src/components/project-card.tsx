/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";

function ProjectImage({
  src,
  alt,
  fit,
  bg,
  aspect,
}: {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  bg?: string;
  aspect?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const sizeClass = aspect ? "w-full" : "w-full h-48";
  const sizeStyle = aspect ? { aspectRatio: aspect.replace("/", " / ") } : undefined;

  if (!src || imageError) {
    return <div className={cn(sizeClass, "bg-muted")} style={sizeStyle} />;
  }

  const isContain = fit === "contain";
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        sizeClass,
        "transition-transform duration-700 ease-out group-hover:scale-[1.03]",
        isContain ? "object-contain p-6" : "object-cover",
        isContain && !bg ? "bg-white" : ""
      )}
      style={{
        ...sizeStyle,
        ...(isContain && bg ? { backgroundColor: bg } : {}),
      }}
      onError={() => setImageError(true)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  imageFit?: "cover" | "contain";
  imageBg?: string;
  imageAspect?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  imageFit,
  imageBg,
  imageAspect,
  video,
  links,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "group flex flex-col h-full border border-border rounded-xl overflow-hidden cursor-pointer transition-colors duration-300 hover:border-foreground/30",
        className
      )}
    >
      <div className="relative shrink-0 overflow-hidden">
        <Link
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative"
        >
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-48 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : image ? (
            <ProjectImage src={image} alt={title} fit={imageFit} bg={imageBg} aspect={imageAspect} />
          ) : (
            <div className="w-full h-48 bg-muted" />
          )}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
            <span className="text-background text-sm font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground/80">
              View Project
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-2">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{title}</h3>
            <time className="text-xs text-muted-foreground">{dates}</time>
          </div>
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="text-xs flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

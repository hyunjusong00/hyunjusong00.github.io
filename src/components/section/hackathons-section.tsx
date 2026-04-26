/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Timeline, TimelineItem, TimelineConnectItem } from "@/components/timeline";

export default function HackathonsSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-6 w-full">
      <h2 className="text-sm uppercase tracking-[0.22em] font-semibold flex items-baseline gap-3">
        <span className="text-muted-foreground tabular-nums text-[11px]">06</span>
        <span>Awards &amp; Programs</span>
      </h2>
      <Timeline>
        {DATA.hackathons.map((hackathon) => (
          <TimelineItem key={hackathon.title + hackathon.dates} className="w-full flex items-start justify-between gap-10">
            <TimelineConnectItem className="flex items-start justify-center">
              {hackathon.image ? (
                <img
                  src={hackathon.image}
                  alt={hackathon.title}
                  className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full object-contain flex-none"
                />
              ) : (
                <div className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full flex-none" />
              )}
            </TimelineConnectItem>
            <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
              {hackathon.dates && (
                <time className="text-xs text-muted-foreground">{hackathon.dates}</time>
              )}
              {hackathon.title && (
                <h3 className="font-medium leading-none">{hackathon.title}</h3>
              )}
              {hackathon.location && (
                <p className="text-sm text-muted-foreground">{hackathon.location}</p>
              )}
              {hackathon.description && (
                <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                  {hackathon.description}
                </p>
              )}
              {hackathon.links && hackathon.links.length > 0 && (
                <div className="mt-1 flex flex-row flex-wrap items-start gap-2">
                  {hackathon.links.map((link, idx) => (
                    <Link
                      href={link.href}
                      key={idx}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Badge className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground">
                        {link.icon}
                        {link.title}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}

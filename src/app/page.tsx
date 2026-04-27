/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight } from "lucide-react";
import { allPosts } from "content-collections";

const BLUR_FADE_DELAY = 0.04;

function SectionHeading({ number, label }: { number: string; label: string }) {
  return (
    <h2 className="text-sm uppercase tracking-[0.22em] font-semibold flex items-baseline gap-3">
      <span className="text-muted-foreground tabular-nums text-[11px]">
        {number}
      </span>
      <span>{label}</span>
    </h2>
  );
}

export default function Page() {
  const recentPosts = [...allPosts]
    .sort((a, b) =>
      new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1
    )
    .slice(0, 3)
    .map((post) => ({
      slug: post._meta.path.replace(/\.mdx$/, ""),
      title: post.title,
      summary: post.summary,
      publishedAt: post.publishedAt,
    }));

  return (
    <main className="min-h-dvh flex flex-col gap-24 md:gap-32 relative">
      <section id="hero" className="pt-6 md:pt-12">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-10 md:gap-12">
          <div className="flex flex-col gap-6 md:gap-7 md:flex-1 md:min-w-0">
            <div className="flex flex-col gap-1 leading-[1.05]">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
                yOffset={12}
                text="Hi there!"
              />
              <BlurFadeText
                delay={BLUR_FADE_DELAY * 1.5}
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
                yOffset={12}
                text="I'm HyunJu (Elle) Song"
              />
              <BlurFadeText
                delay={BLUR_FADE_DELAY * 2}
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
                yOffset={12}
                text="— Product Manager"
              />
              <BlurFadeText
                delay={BLUR_FADE_DELAY * 2.5}
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
                yOffset={12}
                text="bridging Korea and California."
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="flex flex-wrap gap-3 mt-1">
                <Link
                  href="#projects"
                  className="group inline-flex items-center gap-1.5 px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors"
                >
                  View Projects
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-1.5 px-5 py-2.5 border border-border text-sm font-medium rounded-full hover:border-foreground/40 transition-colors"
                >
                  Get in Touch
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </BlurFade>
          </div>
          <BlurFade delay={BLUR_FADE_DELAY} className="md:flex-none">
            <div className="relative size-32 md:size-44 lg:size-52">
              <img
                src={DATA.avatarUrl}
                alt={DATA.name}
                className="absolute inset-0 size-full object-cover rounded-full"
              />
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow:
                    "inset 0 0 18px 6px var(--background)",
                }}
              />
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-5">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <SectionHeading number="01" label="About" />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-3xl text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <ProjectsSection />
        </BlurFade>
      </section>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <SectionHeading number="03" label="Work" />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <SectionHeading number="04" label="Education" />
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 10 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-8 md:size-10 p-1 border rounded-full overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <div className="size-8 md:size-10 p-1 border rounded-full bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-medium leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          aria-hidden
                        />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-5">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <SectionHeading number="05" label="Skills" />
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade
                key={skill.name}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <div className="border border-border rounded-full h-8 w-fit px-3 flex items-center">
                  <span className="text-foreground text-sm">
                    {skill.name}
                  </span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>

      {recentPosts.length > 0 && (
        <section id="writing">
          <div className="flex min-h-0 flex-col gap-y-6">
            <BlurFade delay={BLUR_FADE_DELAY * 14}>
              <SectionHeading number="07" label="Writing" />
            </BlurFade>
            <div className="flex flex-col gap-6">
              {recentPosts.map((post, id) => (
                <BlurFade
                  key={post.slug}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex flex-col gap-1 group max-w-3xl"
                  >
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-lg font-medium tracking-tight group-hover:underline underline-offset-4">
                        {post.title}
                      </h3>
                      <ArrowUpRight
                        className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                        aria-hidden
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {post.summary}
                    </p>
                    <p className="text-xs text-muted-foreground tabular-nums">
                      {post.publishedAt}
                    </p>
                  </Link>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}

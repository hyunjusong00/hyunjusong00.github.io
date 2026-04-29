/* eslint-disable @next/next/no-img-element */
import { allProjects } from "content-collections";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
import Link from "next/link";
import { ChevronLeft, ArrowUpRight } from "lucide-react";

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project._meta.path.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const project = allProjects.find(
    (p) => p._meta.path.replace(/\.mdx$/, "") === slug
  );
  if (!project) return undefined;

  const { title, summary, coverImage } = project;
  return {
    title: `${title} — Case Study`,
    description: summary,
    openGraph: {
      title: `${title} — Case Study`,
      description: summary,
      type: "article",
      url: `${DATA.url}/projects/${slug}`,
      ...(coverImage && {
        images: [{ url: `${DATA.url}${coverImage}` }],
      }),
    },
  };
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = allProjects.find(
    (p) => p._meta.path.replace(/\.mdx$/, "") === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <section id="project">
      <div className="flex justify-start gap-4 items-center">
        <Link
          href="/#projects"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 mb-6 group"
          aria-label="Back to Projects"
        >
          <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" />
          Back to Projects
        </Link>
      </div>

      <header className="flex flex-col gap-5 max-w-3xl">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>{project.dates}</span>
          {project.role && <span>· {project.role}</span>}
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
          {project.title}
        </h1>
        <p className="text-muted-foreground md:text-lg leading-relaxed">
          {project.summary}
        </p>
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {project.technologies.map((tag) => (
              <span
                key={tag}
                className="border border-border rounded-full h-7 w-fit px-3 flex items-center text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {project.liveUrl && (
          <div className="mt-2">
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors"
            >
              View Live Site
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        )}
      </header>

      <div className="my-10 flex w-full items-center">
        <div
          className="flex-1 h-px bg-border"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        />
      </div>

      {(project.coverVideo || project.coverImage) && (
        <div className="mb-12 rounded-xl overflow-hidden border border-border">
          {project.coverVideo ? (
            <video
              src={project.coverVideo}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-auto"
            />
          ) : (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-auto"
            />
          )}
        </div>
      )}

      <article className="prose max-w-3xl text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
        <MDXContent code={project.mdx} components={mdxComponents} />
      </article>
    </section>
  );
}

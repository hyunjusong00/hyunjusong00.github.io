import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
    return (
        <div className="flex min-h-0 flex-col gap-y-8">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <h2 className="text-sm uppercase tracking-[0.22em] font-semibold">Projects</h2>
            </BlurFade>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                {DATA.projects.map((project, id) => (
                    <BlurFade
                        key={project.title}
                        delay={BLUR_FADE_DELAY * 6 + id * 0.05}
                        className="h-full"
                    >
                        <ProjectCard
                            href={project.href}
                            key={project.title}
                            title={project.title}
                            description={project.description}
                            dates={project.dates}
                            tags={project.technologies}
                            image={project.image}
                            imageFit={"imageFit" in project ? (project as { imageFit?: "cover" | "contain" }).imageFit : undefined}
                            imageBg={"imageBg" in project ? (project as { imageBg?: string }).imageBg : undefined}
                            imageAspect={"imageAspect" in project ? (project as { imageAspect?: string }).imageAspect : undefined}
                            video={project.video}
                            links={project.links}
                        />
                    </BlurFade>
                ))}
            </div>
        </div>
    );
}

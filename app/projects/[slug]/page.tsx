// app/projects/[slug]/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/actions/project.actions";
import Image from "next/image";
import ErrorPage from "@/app/error";

export default async function ProjectDetails(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data: project } = await getProjectBySlug(slug);
  if (!project) return <ErrorPage />;
  console.log("", project);
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <article className="w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <header className="col-span-5 space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
              <time dateTime={project?.createdAt.toISOString()}>
                {new Date(project.createdAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                })}
              </time>
              <span>•</span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech.id}
                    className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </header>

          <div className="col-span-5 prose dark:prose-invert max-w-none">
            <p>{project.description}</p>
          </div>

          <div className="col-span-3">
            {project.image && (
              <div className="col-span-1 relative w-full h-96 rounded-lg overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={500}
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold mb-2">Fonctionnalités</h3>
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
            {project.link_url && (
              <Button
                asChild
                className="bg-green-500 hover:bg-green-600 text-white transition mt-4"
              >
                <Link target="_blank" href={project.link_url}>
                  Voir le projet
                </Link>
              </Button>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

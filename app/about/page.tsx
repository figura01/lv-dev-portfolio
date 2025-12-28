// app/a-propos/page.tsx
import { Briefcase, Code, GraduationCap, Rocket } from "lucide-react";
import ItemExperience from "@/components/experience/ItemExperience";
import { getAllExperience } from "@/lib/actions/experience.actions";
// const experiences = [
//   {
//     year: "2020 - Présent",
//     role: "Développeur Full Stack Freelance",
//     company: "Auto-entrepreneur",
//     description:
//       "Développement d'applications web sur mesure pour divers clients.",
//   },
//   {
//     year: "2018 - 2020",
//     role: "Développeur Frontend",
//     company: "Entreprise Tech",
//     description:
//       "Développement d'interfaces utilisateur réactives et accessibles.",
//   },
// ];

const skills = [
  { name: "Développement Web", level: 90, icon: <Code className="h-5 w-5" /> },
  { name: "UI/UX Design", level: 80, icon: <Rocket className="h-5 w-5" /> },
  { name: "Mobile", level: 75, icon: <Briefcase className="h-5 w-5" /> },
  { name: "DevOps", level: 70, icon: <GraduationCap className="h-5 w-5" /> },
];

export default async function AboutPage() {
  const { data: exps } = await getAllExperience();

  console.log("exps: ", exps);

  const transformData = exps?.map((exp) => ({
    year: `${new Date(exp.startDate).getFullYear()} - ${
      exp.endDate ? new Date(exp.endDate).getFullYear() : "Présent"
    }`,
    role: exp.role,
    company: exp.company,
    description: exp.description,
  }));
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            À Propos de Moi
          </h1>
          <p className="text-xl text-muted-foreground">
            Passionné par la création d&apos;expériences numériques
            exceptionnelles
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Mon Parcours</h2>
              <p className="text-muted-foreground mb-6">
                Développeur passionné avec plus de 5 ans d&apos;expérience dans
                la création d&apos;applications web modernes et performantes. Je
                me spécialise dans les technologies JavaScript/TypeScript, en
                particulier avec React et Next.js.
              </p>
              <p className="text-muted-foreground">
                Mon objectif est de créer des solutions numériques qui allient
                performance, accessibilité et élégance, tout en offrant une
                expérience utilisateur exceptionnelle.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Expérience Professionnelle
              </h2>
              <div className="space-y-8">
                {transformData?.map((exp, index) => (
                  <ItemExperience key={index} exp={exp} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-24">
              <div className="bg-card p-6 rounded-xl border shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Mes Compétences</h2>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {skill.icon}
                          <span>{skill.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

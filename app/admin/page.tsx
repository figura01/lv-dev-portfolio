import { Card } from "@/components/ui/card";

export default function AdminDashboard() {
  const stats = [
    {
      name: "Projets en ligne",
      value: "12",
      change: "+2",
      changeType: "positive",
    },
    { name: "Compétences", value: "8", change: "+1", changeType: "positive" },
    {
      name: "Visites ce mois",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    stat.changeType === "positive"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="mt-1 text-3xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Dernières activités</h2>
        <div className="space-y-4">
          {/* Ici vous pourriez ajouter une liste des dernières activités */}
          <p className="text-sm text-gray-500">Aucune activité récente</p>
        </div>
      </Card>
    </div>
  );
}

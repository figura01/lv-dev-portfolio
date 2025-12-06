// app/services/page.tsx
export default function ServicesPage() {
  const services = [
    {
      title: "Développement Web",
      description:
        "Création de sites web modernes et réactifs avec les dernières technologies comme Next.js et React.",
      icon: "💻",
    },
    {
      title: "Applications Mobiles",
      description:
        "Développement d'applications mobiles cross-plateformes avec React Native.",
      icon: "📱",
    },
    {
      title: "Conception UI/UX",
      description:
        "Création d'interfaces utilisateur intuitives et esthétiques pour une expérience utilisateur optimale.",
      icon: "🎨",
    },
    {
      title: "Optimisation SEO",
      description:
        "Amélioration du référencement naturel pour une meilleure visibilité sur les moteurs de recherche.",
      icon: "🔍",
    },
    {
      title: "Maintenance",
      description:
        "Services de maintenance et de support technique pour maintenir votre site à jour et sécurisé.",
      icon: "🔧",
    },
    {
      title: "Hébergement",
      description:
        "Solutions d'hébergement performantes et sécurisées pour vos projets web.",
      icon: "☁️",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Mes Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Des solutions sur mesure pour répondre à tous vos besoins numériques
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-muted-foreground">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

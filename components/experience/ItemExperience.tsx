type Experience = {
  year: string;
  role: string;
  company: string;
  description: string;
};

const ItemExperience = ({ exp }: { exp: Experience }) => {
  return (
    <div className="relative pl-8 border-l-2 border-primary/20">
      <div className="absolute left-0 top-0 -translate-x-2.5 w-4 h-4 rounded-full bg-primary" />
      <span className="text-sm text-muted-foreground">{exp.year}</span>
      <h3 className="text-lg font-medium mt-1">{exp.role}</h3>
      <p className="text-primary font-medium mb-2">{exp.company}</p>
      <p className="text-muted-foreground">{exp.description}</p>
    </div>
  );
};

export default ItemExperience;

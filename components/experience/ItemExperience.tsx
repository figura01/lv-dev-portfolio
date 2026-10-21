type Experience = {
  year: string;
  role: string;
  company: string;
  description: string;
};

const ItemExperience = ({ exp }: { exp: Experience }) => {
  return (
    <div className="relative border-l-2 border-primary/20 pl-8">
      <div className="absolute left-0 top-1 h-4 w-4 -translate-x-[9px] rounded-full border-4 border-background bg-primary" />
      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {exp.year}
      </span>
      <h3 className="mt-1.5 font-display text-xl font-bold">{exp.role}</h3>
      <p className="mb-2 font-medium text-primary">{exp.company}</p>
      <p className="leading-relaxed text-muted-foreground">{exp.description}</p>
    </div>
  );
};

export default ItemExperience;

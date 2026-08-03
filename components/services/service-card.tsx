import { Check } from "lucide-react";

import type { Service } from "@/app/services/data.services";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Card className="group h-full border-border/60 bg-card/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <CardHeader className="space-y-5">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-6" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <CardTitle className="text-xl">{service.title}</CardTitle>

          <p className="text-sm leading-6 text-muted-foreground">
            {service.description}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <Check
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden="true"
              />

              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
// Limiteur de débit en mémoire (fenêtre glissante).
// Suffisant ici : le site tourne dans un seul conteneur sur le VPS.
// Le compteur repart à zéro à chaque redémarrage du conteneur, ce qui est
// acceptable pour un formulaire de contact. Avec plusieurs instances, il
// faudrait un stockage partagé (Redis par exemple).

type Bucket = number[];
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    buckets.set(key, recent);
    const retryAfterMs = windowMs - (now - recent[0]);
    return { ok: false as const, retryAfterSec: Math.ceil(retryAfterMs / 1000) };
  }

  recent.push(now);
  buckets.set(key, recent);

  // Ménage occasionnel pour que la Map ne grossisse pas indéfiniment.
  if (buckets.size > 5000) {
    for (const [k, times] of buckets) {
      if (times.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }

  return { ok: true as const };
}

/**
 * IP du visiteur derrière le reverse proxy du VPS.
 * On prend la DERNIÈRE adresse de X-Forwarded-For : c'est celle ajoutée par
 * ton proxy, alors que les premières peuvent être inventées par le client.
 */
export function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return req.headers.get("x-real-ip") ?? "inconnue";
}

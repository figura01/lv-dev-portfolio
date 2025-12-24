import { Session, Role } from "./types";

export function requireAuth(
  session: Session | null
): asserts session is Session {
  if (!session) throw new Error("Unauthorized");
}

export function requireRole(session: Session | null, role: Role) {
  requireAuth(session);
  if (session.user.role !== role) {
    throw new Error("Forbidden");
  }
}

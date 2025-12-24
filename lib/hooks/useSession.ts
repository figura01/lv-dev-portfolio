import { useAuthContext } from "@/app/providers/AuthProvider";
import { Session } from "@/lib/auth/types";

type UseSessionResult = {
  session: Session | null;
  user: Session["user"] | null;
  isAuthenticated: boolean;
  loading: boolean;
  refetchSession: () => Promise<void>;
};

export function useSession(): UseSessionResult {
  const { session, loading, refetchSession } = useAuthContext();

  return {
    session,
    user: session?.user ?? null,
    isAuthenticated: !!session,
    loading,
    refetchSession,
  };
}

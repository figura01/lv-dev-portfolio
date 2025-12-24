import { useAuthContext } from "@/app/providers/AuthProvider";

type LoginInput = {
  email: string;
  password: string;
};

type LoginOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export function useAuth() {
  const { login, logout } = useAuthContext();

  return {
    /**
     * Login utilisateur
     */
    login: async (input: LoginInput, options?: LoginOptions) => {
      try {
        await login(input, options);
      } catch (error) {
        options?.onError?.(error as Error);
        throw error;
      }
    },

    /**
     * Logout utilisateur
     */
    logout,
  };
}

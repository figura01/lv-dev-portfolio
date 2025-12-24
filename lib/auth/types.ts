export type Role = "ADMIN" | "USER";

export type UserSession = {
  id: string;
  email: string;
  role: Role;
};

export type Session = {
  user: UserSession;
  expiresAt: Date;
};

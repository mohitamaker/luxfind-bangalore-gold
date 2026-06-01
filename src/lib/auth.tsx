import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type MockUser = { email: string; name: string };

type AuthCtx = {
  user: MockUser | null;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  openAuth: () => void;
  closeAuth: () => void;
  authOpen: boolean;
};

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "maison.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const signIn = (email: string, name?: string) => {
    const u: MockUser = { email, name: name || email.split("@")[0] };
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
    setAuthOpen(false);
  };
  const signOut = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return (
    <Ctx.Provider
      value={{
        user,
        signIn,
        signOut,
        authOpen,
        openAuth: () => setAuthOpen(true),
        closeAuth: () => setAuthOpen(false),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth outside AuthProvider");
  return c;
}

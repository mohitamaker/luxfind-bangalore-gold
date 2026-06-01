import { useState } from "react";
import { X, Mail, Lock, User as UserIcon, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function AuthModal() {
  const { authOpen, closeAuth, signIn } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  if (!authOpen) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    signIn(email, mode === "signup" ? name : undefined);
  };

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-background/85 backdrop-blur-sm p-4"
      onClick={closeAuth}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl border border-gold/25 bg-card p-8 shadow-[var(--shadow-luxe)]"
      >
        <button
          onClick={closeAuth}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary text-muted-foreground"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center">
          <div className="mx-auto w-12 h-12 grid place-items-center rounded-full border border-gold/40">
            <Sparkles className="w-5 h-5 text-gold" />
          </div>
          <h2 className="mt-4 font-display text-3xl text-foreground">
            {mode === "signin" ? "Welcome back" : "Join Maison"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Sign in to manage your bookings."
              : "Create an account to book luxury experiences."}
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {mode === "signup" && (
            <Field icon={<UserIcon className="w-4 h-4" />}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                required
              />
            </Field>
          )}
          <Field icon={<Mail className="w-4 h-4" />}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
              required
            />
          </Field>
          <Field icon={<Lock className="w-4 h-4" />}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
              required
            />
          </Field>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-xl text-sm font-medium text-primary-foreground bg-[image:var(--gradient-gold)] shadow-[var(--shadow-gold)] hover:brightness-110 transition"
          >
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>

          <button
            type="button"
            onClick={() => signIn("guest@maison.com", "Guest")}
            className="w-full px-6 py-3 rounded-xl text-sm border border-border hover:border-gold/50 text-foreground transition"
          >
            Continue with Google
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {mode === "signin" ? "New to Maison?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-gold hover:underline"
          >
            {mode === "signin" ? "Create one" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-background/50 focus-within:border-gold/60 transition">
      <span className="text-gold/70">{icon}</span>
      {children}
    </label>
  );
}

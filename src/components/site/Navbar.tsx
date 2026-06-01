import { Scissors, LogOut, LayoutDashboard, User as UserIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

export function Navbar() {
  const { user, openAuth, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center w-9 h-9 rounded-full border border-gold/40 bg-background/40 backdrop-blur">
            <Scissors className="w-4 h-4 text-gold" strokeWidth={1.5} />
          </span>
          <span className="font-display text-xl tracking-wide text-foreground">
            Maison<span className="text-gold">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm text-muted-foreground">
          <Link to="/" hash="salons" className="hover:text-gold transition-colors">Find Salons</Link>
          <Link to="/partner" className="hover:text-gold transition-colors">For Partners</Link>
          <Link to="/vendor-dashboard" className="hover:text-gold transition-colors">Vendor Portal</Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-gold/30 bg-background/40 backdrop-blur text-sm text-foreground hover:border-gold/60 transition"
              >
                <span className="w-6 h-6 rounded-full bg-[image:var(--gradient-gold)] grid place-items-center text-[10px] font-medium text-primary-foreground uppercase">
                  {user.name.charAt(0)}
                </span>
                <span className="hidden sm:inline">{user.name}</span>
              </button>
              {open && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-luxe)]"
                  onMouseLeave={() => setOpen(false)}
                >
                  <div className="px-3 py-2 text-xs text-muted-foreground border-b border-border mb-1">
                    {user.email}
                  </div>
                  <MenuLink to="/" onClick={() => setOpen(false)}>
                    <UserIcon className="w-4 h-4 text-gold/70" /> My Bookings
                  </MenuLink>
                  <MenuLink to="/vendor-dashboard" onClick={() => setOpen(false)}>
                    <LayoutDashboard className="w-4 h-4 text-gold/70" /> Vendor Dashboard
                  </MenuLink>
                  <button
                    onClick={() => { setOpen(false); signOut(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openAuth}
              className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-gold transition"
            >
              Sign In
            </button>
          )}
          <Link
            to="/partner"
            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-primary-foreground bg-[image:var(--gradient-gold)] shadow-[var(--shadow-gold)] hover:brightness-110 transition"
          >
            Partner with Us
          </Link>
        </div>
      </div>
    </header>
  );
}

function MenuLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-foreground hover:bg-secondary transition"
    >
      {children}
    </Link>
  );
}

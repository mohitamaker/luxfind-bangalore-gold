import { LogOut, LayoutDashboard, User as UserIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";

export function Navbar() {
  const { user, openAuth, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 luxe-transition ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-8 lg:px-14 py-5 flex items-center justify-between">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight text-foreground font-light">
            Maison
          </span>
          <span className="text-gold text-xs">●</span>
        </Link>

        <nav className="hidden md:flex items-center gap-12">
          <Link to="/" hash="salons" className="eyebrow text-muted-foreground hover:text-gold luxe-transition">
            The Collection
          </Link>
          <Link to="/partner" className="eyebrow text-muted-foreground hover:text-gold luxe-transition">
            For Partners
          </Link>
          <Link to="/vendor-dashboard" className="eyebrow text-muted-foreground hover:text-gold luxe-transition">
            Vendor Portal
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-3 eyebrow text-foreground/80 hover:text-gold luxe-transition"
              >
                <span className="w-8 h-8 border border-[rgba(255,255,255,0.12)] grid place-items-center text-[10px] text-gold uppercase">
                  {user.name.charAt(0)}
                </span>
                <span className="hidden sm:inline">{user.name}</span>
              </button>
              {open && (
                <div
                  className="absolute right-0 mt-3 w-60 border border-[rgba(255,255,255,0.08)] bg-background/95 backdrop-blur-xl p-1"
                  onMouseLeave={() => setOpen(false)}
                >
                  <div className="px-4 py-3 eyebrow text-muted-foreground border-b border-[rgba(255,255,255,0.06)] mb-1">
                    {user.email}
                  </div>
                  <MenuLink to="/" onClick={() => setOpen(false)}>
                    <UserIcon className="w-3.5 h-3.5 text-gold/70" /> My Bookings
                  </MenuLink>
                  <MenuLink to="/vendor-dashboard" onClick={() => setOpen(false)}>
                    <LayoutDashboard className="w-3.5 h-3.5 text-gold/70" /> Vendor Dashboard
                  </MenuLink>
                  <button
                    onClick={() => { setOpen(false); signOut(); }}
                    className="w-full flex items-center gap-2 px-4 py-3 eyebrow text-muted-foreground hover:bg-white/[0.03] hover:text-foreground luxe-transition"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openAuth}
              className="hidden sm:inline-flex eyebrow text-muted-foreground hover:text-gold luxe-transition"
            >
              Sign In
            </button>
          )}
          <Link
            to="/partner"
            className="group relative eyebrow text-foreground border border-[rgba(255,255,255,0.15)] hover:border-gold px-6 py-3 luxe-transition hover:text-gold"
          >
            Partner With Us
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
      className="flex items-center gap-2 px-4 py-3 eyebrow text-foreground/80 hover:bg-white/[0.03] hover:text-gold luxe-transition"
    >
      {children}
    </Link>
  );
}

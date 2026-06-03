import { LogOut, LayoutDashboard, User as UserIcon, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";

export const BRAND = "Maison Bangalore";

export function Navbar() {
  const { user, openAuth, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 luxe-transition ${
        scrolled || mobileOpen
          ? "bg-background/85 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14 h-16 sm:h-20 flex items-center justify-between gap-4">
        <Link to="/" className="group flex items-baseline gap-1.5 shrink-0" onClick={() => setMobileOpen(false)}>
          <span className="font-display text-xl sm:text-2xl tracking-tight text-foreground font-light">
            {BRAND}
          </span>
          <span className="text-gold text-xs">●</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          <Link to="/" hash="salons" className="eyebrow text-muted-foreground hover:text-gold luxe-transition">
            The Collection
          </Link>
          <Link to="/partner" className="eyebrow text-muted-foreground hover:text-gold luxe-transition">
            Partners
          </Link>
          <Link to="/vendor-dashboard" className="eyebrow text-muted-foreground hover:text-gold luxe-transition">
            Vendor Portal
          </Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          {user ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2.5 eyebrow text-foreground/80 hover:text-gold luxe-transition"
              >
                <span className="w-8 h-8 border border-[rgba(255,255,255,0.12)] grid place-items-center text-[10px] text-gold uppercase">
                  {user.name.charAt(0)}
                </span>
                <span className="hidden md:inline">{user.name}</span>
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
            className="hidden sm:inline-flex group relative items-center eyebrow text-foreground px-5 lg:px-7 py-3 border border-[rgba(255,255,255,0.14)] hover:border-gold hover:text-gold luxe-transition"
          >
            <span className="absolute inset-0 bg-gold/0 group-hover:bg-gold/[0.04] luxe-transition" />
            <span className="relative">Partner With Us</span>
          </Link>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden w-10 h-10 grid place-items-center border border-[rgba(255,255,255,0.14)] hover:border-gold hover:text-gold luxe-transition text-foreground/90"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-4 h-4" strokeWidth={1.5} /> : <Menu className="w-4 h-4" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden luxe-transition ${
          mobileOpen ? "max-h-[80vh] border-t border-[rgba(255,255,255,0.06)]" : "max-h-0"
        }`}
      >
        <div className="px-6 py-8 space-y-1 bg-background/95 backdrop-blur-xl">
          <MobileLink to="/" hash="salons" onClick={() => setMobileOpen(false)}>The Collection</MobileLink>
          <MobileLink to="/partner" onClick={() => setMobileOpen(false)}>For Partners</MobileLink>
          <MobileLink to="/vendor-dashboard" onClick={() => setMobileOpen(false)}>Vendor Portal</MobileLink>

          <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-col gap-3">
            {user ? (
              <>
                <div className="eyebrow text-muted-foreground px-1">{user.email}</div>
                <button
                  onClick={() => { setMobileOpen(false); signOut(); }}
                  className="eyebrow text-foreground/80 text-left px-1 py-2 hover:text-gold luxe-transition flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => { setMobileOpen(false); openAuth(); }}
                className="eyebrow text-foreground/80 text-left px-1 py-2 hover:text-gold luxe-transition"
              >
                Sign In
              </button>
            )}
            <Link
              to="/partner"
              onClick={() => setMobileOpen(false)}
              className="eyebrow text-center text-foreground px-6 py-4 border border-[rgba(255,255,255,0.14)] hover:border-gold hover:text-gold luxe-transition mt-2"
            >
              Partner With Us
            </Link>
          </div>
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

function MobileLink({ to, hash, children, onClick }: { to: string; hash?: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      to={to}
      hash={hash}
      onClick={onClick}
      className="block py-4 eyebrow text-foreground/85 hover:text-gold luxe-transition border-b border-[rgba(255,255,255,0.04)]"
    >
      {children}
    </Link>
  );
}

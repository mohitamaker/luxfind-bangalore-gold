import { Scissors } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Navbar() {
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
        </nav>

        <Link
          to="/partner"
          className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-primary-foreground bg-[image:var(--gradient-gold)] shadow-[var(--shadow-gold)] hover:brightness-110 transition"
        >
          Partner with Us
        </Link>
      </div>
    </header>
  );
}

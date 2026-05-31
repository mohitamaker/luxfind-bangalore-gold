import { Scissors } from "lucide-react";

export function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <span className="grid place-items-center w-9 h-9 rounded-full border border-gold/40 bg-background/40 backdrop-blur">
            <Scissors className="w-4 h-4 text-gold" strokeWidth={1.5} />
          </span>
          <span className="font-display text-xl tracking-wide text-foreground">
            Maison<span className="text-gold">.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10 text-sm text-muted-foreground">
          <a href="#salons" className="hover:text-gold transition-colors">Find Salons</a>
          <a href="#services" className="hover:text-gold transition-colors">Services</a>
          <a href="#journal" className="hover:text-gold transition-colors">Journal</a>
        </nav>

        <a
          href="#partner"
          className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-primary-foreground bg-[image:var(--gradient-gold)] shadow-[var(--shadow-gold)] hover:brightness-110 transition"
        >
          Partner with Us
        </a>
      </div>
    </header>
  );
}

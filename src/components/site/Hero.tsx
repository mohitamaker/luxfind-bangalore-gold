import { Search, MapPin, ArrowUpRight, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-salon.jpg";
import { StyleQuiz } from "./StyleQuiz";

type Props = {
  onSearch: (area: string, service: string) => void;
};

export function Hero({ onSearch }: Props) {
  const [area, setArea] = useState("");
  const [service, setService] = useState("");

  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-24 overflow-hidden">
      {/* Ambient emerald glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full bg-emerald-bright/15 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[40rem] h-[40rem] rounded-full bg-gold/10 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
        {/* Eyebrow row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 animate-luxe-fade-in">
          <span className="eyebrow text-gold flex items-center gap-3">
            <span className="w-10 h-px bg-gradient-to-r from-gold to-transparent animate-shimmer-line" />
            Bangalore · Vol. I · 2026
          </span>
          <span className="eyebrow text-muted-foreground hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-bright animate-pulse" />
            42 Houses · Concierge Live
          </span>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-12 gap-3 sm:gap-4 auto-rows-[minmax(120px,auto)]">
          {/* Headline tile */}
          <div className="col-span-12 lg:col-span-8 row-span-2 bento-tile p-8 sm:p-12 lg:p-16 flex flex-col justify-between min-h-[420px] lg:min-h-[560px] animate-luxe-fade-up">
            <h1 className="font-display text-[clamp(2.75rem,6.5vw,6rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              The city's<br />
              quietest <span className="gold-text italic">luxury</span><br />
              kept, well-kept.
            </h1>
            <div className="mt-10 flex items-end justify-between gap-6 flex-wrap">
              <p className="max-w-md text-muted-foreground font-light leading-relaxed text-base">
                An invitation-only directory of Bangalore's most accomplished
                salons, spas, and bridal ateliers — vetted by hand.
              </p>
              <a
                href="#salons"
                className="group inline-flex items-center gap-3 eyebrow text-gold hover:gap-5 luxe-transition shrink-0"
              >
                Enter the Collection
                <span className="w-10 h-10 grid place-items-center border border-gold/40 rounded-full group-hover:bg-gold group-hover:text-emerald-deep luxe-transition">
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </a>
            </div>
          </div>

          {/* Hero image tile */}
          <div className="col-span-12 sm:col-span-7 lg:col-span-4 row-span-2 relative overflow-hidden min-h-[260px] lg:min-h-[560px] bento-tile p-0 group animate-luxe-fade-in">
            <img
              src={heroImage}
              alt="Luxury salon interior"
              className="absolute inset-0 w-full h-full object-cover brightness-90 group-hover:brightness-105 group-hover:scale-[1.04] luxe-transition"
              style={{ transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1), filter 0.6s cubic-bezier(0.16,1,0.3,1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-emerald-deep/30 to-transparent" />
            <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
              <div className="self-end eyebrow text-foreground/80 backdrop-blur-md bg-emerald-deep/40 px-3 py-1.5 border border-gold/20">
                № 01 · Featured
              </div>
              <div>
                <div className="eyebrow text-gold/80 mb-2">Atelier of the Week</div>
                <div className="font-display text-2xl text-foreground">Auré Atelier</div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 text-gold fill-gold" /> 4.9 · Indiranagar
                </div>
              </div>
            </div>
          </div>

          {/* Stat tile A */}
          <div className="col-span-6 sm:col-span-5 lg:col-span-2 bento-tile p-6 flex flex-col justify-between min-h-[140px]">
            <div className="eyebrow text-muted-foreground">Houses</div>
            <div className="font-display text-5xl text-foreground">42</div>
          </div>

          {/* Stat tile B */}
          <div className="col-span-6 lg:col-span-3 bento-tile p-6 flex flex-col justify-between min-h-[140px]">
            <div className="eyebrow text-muted-foreground">Avg. Rating</div>
            <div className="flex items-baseline gap-2">
              <div className="font-display text-5xl gold-text">4.9</div>
              <Star className="w-4 h-4 text-gold fill-gold" />
            </div>
          </div>

          {/* Quiz tile */}
          <div className="col-span-12 lg:col-span-3 bento-tile p-6 flex items-center justify-between gap-4 min-h-[140px]">
            <div>
              <div className="eyebrow text-gold flex items-center gap-2 mb-2">
                <Sparkles className="w-3 h-3" /> Concierge AI
              </div>
              <div className="font-display text-lg text-foreground leading-tight">
                Find your house in 3 questions
              </div>
            </div>
            <div className="shrink-0">
              <StyleQuiz />
            </div>
          </div>

          {/* Search tile - spans full bottom */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch(area, service);
              document.getElementById("salons")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="col-span-12 bento-tile p-2 flex flex-col sm:flex-row items-stretch gap-2"
          >
            <div className="flex items-center gap-4 flex-1 px-5 py-4">
              <MapPin className="w-4 h-4 text-gold shrink-0" strokeWidth={1.5} />
              <div className="flex-1">
                <div className="eyebrow text-muted-foreground mb-0.5">Neighbourhood</div>
                <input
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  type="text"
                  placeholder="Indiranagar, Koramangala…"
                  className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
            <div className="hidden sm:block w-px bg-gold/15 my-3" />
            <div className="flex items-center gap-4 flex-1 px-5 py-4">
              <Search className="w-4 h-4 text-gold shrink-0" strokeWidth={1.5} />
              <div className="flex-1">
                <div className="eyebrow text-muted-foreground mb-0.5">Service</div>
                <input
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  type="text"
                  placeholder="Haircut, Spa, Bridal…"
                  className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
            <button
              type="submit"
              className="eyebrow px-8 py-5 sm:py-0 text-emerald-deep bg-gradient-to-r from-gold to-gold-bright hover:from-gold-bright hover:to-gold luxe-transition flex items-center justify-center gap-2 group"
            >
              Discover
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 luxe-transition" strokeWidth={2} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

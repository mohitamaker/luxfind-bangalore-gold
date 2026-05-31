import { Search, MapPin } from "lucide-react";
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
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury salon interior with marble and gold accents"
          width={1920}
          height={1280}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_85%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10 text-center pt-32 pb-24">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-background/40 backdrop-blur text-xs uppercase tracking-[0.25em] text-gold">
          <span className="w-1 h-1 rounded-full bg-gold" />
          Bangalore's Curated Salon Marketplace
        </span>

        <h1 className="mt-8 font-display text-5xl sm:text-6xl lg:text-8xl leading-[1.02] text-foreground">
          Where the city's most{" "}
          <span className="italic text-gold">refined</span>
          <br />
          salons find you.
        </h1>

        <p className="mt-6 max-w-xl mx-auto text-base sm:text-lg text-muted-foreground">
          Discover hand-picked luxury salons, spas, and ateliers across Bangalore — booked
          in seconds, indulged in for hours.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(area, service);
            document.getElementById("salons")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-12 mx-auto max-w-2xl"
        >
          <div className="flex flex-col sm:flex-row items-stretch gap-2 p-2 rounded-2xl bg-card/80 backdrop-blur-xl border border-gold/20 shadow-[var(--shadow-luxe)]">
            <div className="flex items-center gap-3 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-border">
              <MapPin className="w-4 h-4 text-gold shrink-0" strokeWidth={1.5} />
              <input
                value={area}
                onChange={(e) => setArea(e.target.value)}
                type="text"
                placeholder="Area — Indiranagar, Koramangala…"
                className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-3 flex-1 px-4 py-3">
              <Search className="w-4 h-4 text-gold shrink-0" strokeWidth={1.5} />
              <input
                value={service}
                onChange={(e) => setService(e.target.value)}
                type="text"
                placeholder="Service — Haircut, Spa, Bridal…"
                className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3 rounded-xl text-sm font-medium text-primary-foreground bg-[image:var(--gradient-gold)] hover:brightness-110 transition shadow-[var(--shadow-gold)]"
            >
              Search
            </button>
          </div>

          <div className="mt-8 flex justify-center">
            <StyleQuiz />
          </div>
        </form>
      </div>
    </section>
  );
}

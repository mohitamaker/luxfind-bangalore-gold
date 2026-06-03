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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 animate-luxe-fade-up">
        <img
          src={heroImage}
          alt="Luxury salon interior with marble and gold accents"
          width={1920}
          height={1280}
          className="w-full h-full object-cover opacity-40 luxe-transition"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      <div className="relative mx-auto max-w-[1400px] w-full px-8 lg:px-14 pt-44 pb-32">
        <div className="grid lg:grid-cols-12 gap-16 items-end">
          <div className="lg:col-span-8">
            <span className="eyebrow text-gold flex items-center gap-3">
              <span className="w-8 h-px bg-gold/60" />
              Bangalore · Est. 2026
            </span>

            <h1 className="mt-10 font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.95] text-foreground font-light">
              Where the city's<br />
              most <em className="text-gold not-italic font-normal" style={{ fontStyle: "italic" }}>refined</em><br />
              salons find you.
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pb-6">
            <div className="h-px w-16 bg-gold/40 mb-8" />
            <p className="prose-luxe text-muted-foreground text-base leading-relaxed font-light">
              An invitation-only directory of Bangalore's most accomplished
              salons, spas, and bridal ateliers — vetted by hand, booked in
              seconds.
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(area, service);
            document.getElementById("salons")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-24 max-w-4xl"
        >
          <div className="flex flex-col sm:flex-row items-stretch border-t border-b border-[rgba(255,255,255,0.08)] bg-background/30 backdrop-blur-md">
            <div className="flex items-center gap-4 flex-1 px-6 py-6 border-b sm:border-b-0 sm:border-r border-[rgba(255,255,255,0.08)]">
              <MapPin className="w-4 h-4 text-gold/70 shrink-0" strokeWidth={1.25} />
              <div className="flex-1">
                <div className="eyebrow text-muted-foreground mb-1">Neighbourhood</div>
                <input
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  type="text"
                  placeholder="Indiranagar, Koramangala…"
                  className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground/60"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 flex-1 px-6 py-6">
              <Search className="w-4 h-4 text-gold/70 shrink-0" strokeWidth={1.25} />
              <div className="flex-1">
                <div className="eyebrow text-muted-foreground mb-1">Service</div>
                <input
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  type="text"
                  placeholder="Haircut, Spa, Bridal…"
                  className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground/60"
                />
              </div>
            </div>
            <button
              type="submit"
              className="eyebrow px-10 py-6 text-background bg-gold hover:bg-[#c5a880] luxe-transition"
            >
              Discover
            </button>
          </div>

          <div className="mt-10">
            <StyleQuiz />
          </div>
        </form>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 eyebrow text-muted-foreground/60">
        Scroll to explore
      </div>
    </section>
  );
}

import { Star, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Salon } from "@/lib/salons";

type Props = { salons: Salon[]; query?: { area: string; service: string }; isLoading?: boolean };

export function FeaturedSalons({ salons, query, isLoading }: Props) {
  const hasQuery = query && (query.area || query.service);

  return (
    <section id="salons" className="relative py-40 lg:py-56 border-t border-[rgba(255,255,255,0.06)]">
      <div className="mx-auto max-w-[1400px] px-8 lg:px-14">
        <div className="grid lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-7">
            <span className="eyebrow text-gold flex items-center gap-3">
              <span className="w-8 h-px bg-gold/60" />
              The Collection — Volume I
            </span>
            <h2 className="mt-8 font-display text-5xl lg:text-7xl text-foreground font-light leading-[1.02]">
              A directory<br />
              for the <em className="text-gold" style={{ fontStyle: "italic" }}>discerning</em>.
            </h2>
            {hasQuery && (
              <p className="mt-6 eyebrow text-muted-foreground">
                {salons.length} result{salons.length === 1 ? "" : "s"}
                {query?.area && <> · {query.area}</>}
                {query?.service && <> · {query.service}</>}
              </p>
            )}
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-10">
            <div className="h-px w-12 bg-gold/40 mb-6" />
            <p className="prose-luxe text-muted-foreground text-sm leading-relaxed font-light">
              Every house in our collection has been visited, vetted, and
              quietly approved by the Maison Bangalore team. No paid placements. No noise.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-x-10 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-white/[0.02] animate-pulse" />
            ))}
          </div>
        ) : salons.length === 0 ? (
          <div className="py-32 text-center border-t border-b border-[rgba(255,255,255,0.06)]">
            <p className="eyebrow text-muted-foreground">No houses match your search.</p>
          </div>
        ) : (
          <div className="grid gap-x-10 gap-y-24 md:grid-cols-2 lg:grid-cols-3">
            {salons.map((salon, idx) => (
              <article key={salon.id} className="group">
                <Link
                  to="/salons/$salonId"
                  params={{ salonId: salon.id }}
                  className="block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-card">
                    <img
                      src={salon.image}
                      alt={`${salon.name} interior`}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="absolute inset-0 w-full h-full object-cover brightness-90 group-hover:brightness-110 group-hover:scale-[1.03] luxe-transition"
                      style={{ transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1), filter 0.6s cubic-bezier(0.16,1,0.3,1)" }}
                    />
                    <div className="absolute top-5 left-5 eyebrow text-foreground/80 mix-blend-difference">
                      № {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="absolute top-5 right-5 eyebrow text-gold">
                      {salon.priceTier}
                    </div>
                  </div>

                  <div className="pt-8">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-3xl text-foreground font-light group-hover:text-gold luxe-transition">
                        {salon.name}
                      </h3>
                      <div className="flex items-center gap-1.5 eyebrow text-muted-foreground shrink-0">
                        <Star className="w-3 h-3 text-gold fill-gold" />
                        {salon.rating}
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground font-light leading-relaxed prose-luxe">
                      {salon.tagline}
                    </p>

                    <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                      <span className="eyebrow text-muted-foreground">{salon.area}</span>
                      <span className="eyebrow text-gold flex items-center gap-2 group-hover:gap-3 luxe-transition">
                        View House
                        <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

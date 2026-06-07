import { Star, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Salon } from "@/lib/salons";

type Props = { salons: Salon[]; query?: { area: string; service: string }; isLoading?: boolean };

// Bento layout pattern - varies tile sizes for editorial rhythm
const TILE_PATTERN = [
  "md:col-span-8 md:row-span-2 aspect-[16/10] md:aspect-auto md:min-h-[520px]", // large feature
  "md:col-span-4 aspect-[4/5] md:min-h-[250px]",
  "md:col-span-4 aspect-[4/5] md:min-h-[250px]",
  "md:col-span-4 aspect-[4/5] md:min-h-[340px]",
  "md:col-span-4 aspect-[4/5] md:min-h-[340px]",
  "md:col-span-4 aspect-[4/5] md:min-h-[340px]",
  "md:col-span-6 aspect-[16/10] md:min-h-[360px]",
  "md:col-span-6 aspect-[16/10] md:min-h-[360px]",
  "md:col-span-4 aspect-[4/5] md:min-h-[340px]",
  "md:col-span-4 aspect-[4/5] md:min-h-[340px]",
  "md:col-span-4 aspect-[4/5] md:min-h-[340px]",
];

export function FeaturedSalons({ salons, query, isLoading }: Props) {
  const hasQuery = query && (query.area || query.service);

  return (
    <section id="salons" className="relative py-28 lg:py-40 border-t border-gold/10">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
        {/* Section header — asymmetric */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-24">
          <div className="lg:col-span-7">
            <span className="eyebrow text-gold flex items-center gap-3">
              <span className="w-10 h-px bg-gold/60" />
              The Collection · Volume I
            </span>
            <h2 className="mt-6 font-display text-5xl lg:text-7xl text-foreground leading-[0.98] tracking-[-0.03em]">
              A directory<br />
              for the <span className="gold-text italic">discerning</span>.
            </h2>
            {hasQuery && (
              <p className="mt-6 eyebrow text-muted-foreground">
                {salons.length} result{salons.length === 1 ? "" : "s"}
                {query?.area && <> · {query.area}</>}
                {query?.service && <> · {query.service}</>}
              </p>
            )}
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
            <div className="h-px w-12 bg-gold/40 mb-5" />
            <p className="text-muted-foreground text-sm leading-relaxed font-light">
              Every house has been visited, vetted, and quietly approved by the
              Maison Bangalore team. No paid placements. No noise.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`bento-tile ${TILE_PATTERN[i] ?? "md:col-span-4 aspect-[4/5]"} animate-pulse`} />
            ))}
          </div>
        ) : salons.length === 0 ? (
          <div className="py-32 text-center border-t border-b border-gold/10">
            <p className="eyebrow text-muted-foreground">No houses match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {salons.map((salon, idx) => {
              const tileClass = TILE_PATTERN[idx % TILE_PATTERN.length];
              const isFeature = idx % TILE_PATTERN.length === 0;
              return (
                <Link
                  key={salon.id}
                  to="/salons/$salonId"
                  params={{ salonId: salon.id }}
                  className={`group bento-tile p-0 relative overflow-hidden ${tileClass}`}
                >
                  <img
                    src={salon.image}
                    alt={`${salon.name} interior`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.72] group-hover:brightness-100 group-hover:scale-[1.05] luxe-transition"
                    style={{ transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1), filter 0.6s cubic-bezier(0.16,1,0.3,1)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-emerald-deep/40 to-transparent" />

                  {/* Top row */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <span className="eyebrow text-foreground/90 bg-emerald-deep/50 backdrop-blur-md px-2.5 py-1 border border-gold/20">
                      № {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="eyebrow text-gold bg-emerald-deep/50 backdrop-blur-md px-2.5 py-1 border border-gold/20">
                      {salon.priceTier}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">
                    <div className="flex items-center gap-2 eyebrow text-gold/90 mb-2">
                      <Star className="w-3 h-3 fill-gold" /> {salon.rating} · {salon.area}
                    </div>
                    <h3 className={`font-display text-foreground leading-[1.05] tracking-tight ${isFeature ? "text-4xl lg:text-5xl" : "text-2xl"}`}>
                      {salon.name}
                    </h3>
                    {isFeature && (
                      <p className="mt-3 text-sm text-foreground/70 font-light max-w-md leading-relaxed">
                        {salon.tagline}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="eyebrow text-foreground/60 group-hover:text-gold luxe-transition">
                        View House
                      </span>
                      <span className="w-9 h-9 grid place-items-center border border-gold/30 rounded-full group-hover:bg-gold group-hover:text-emerald-deep group-hover:rotate-45 luxe-transition">
                        <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

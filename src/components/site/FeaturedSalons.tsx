import { Star, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Salon } from "@/lib/salons";

type Props = { salons: Salon[]; query?: { area: string; service: string } };

export function FeaturedSalons({ salons, query }: Props) {
  const hasQuery = query && (query.area || query.service);

  return (
    <section id="salons" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold">
              The Collection
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-foreground max-w-2xl">
              Bangalore's most coveted <span className="italic text-gold">salons</span>.
            </h2>
            {hasQuery && (
              <p className="mt-3 text-sm text-muted-foreground">
                Showing {salons.length} result{salons.length === 1 ? "" : "s"}
                {query?.area && <> in <span className="text-gold">{query.area}</span></>}
                {query?.service && <> for <span className="text-gold">{query.service}</span></>}
              </p>
            )}
          </div>
          <p className="max-w-sm text-muted-foreground text-sm leading-relaxed">
            Vetted for craft, ambience and service. Every house in our collection
            is visited and approved by the Maison team.
          </p>
        </div>

        {salons.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-2xl">
            <p className="text-muted-foreground">No salons matched your search. Try a different area or service.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {salons.map((salon) => (
              <article
                key={salon.id}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-gold/50 transition-all duration-500 shadow-[var(--shadow-luxe)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={salon.image}
                    alt={`${salon.name} interior`}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur border border-gold/30 text-xs">
                    <Star className="w-3 h-3 text-gold fill-gold" />
                    <span className="text-foreground font-medium">{salon.rating}</span>
                    <span className="text-muted-foreground">({salon.reviews})</span>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur border border-gold/30 text-xs text-gold font-medium tracking-widest">
                    {salon.priceTier}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-2xl text-foreground">{salon.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{salon.tagline}</p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-gold/70" strokeWidth={1.5} />
                    {salon.area}
                  </div>

                  <Link
                    to="/salons/$salonId"
                    params={{ salonId: salon.id }}
                    className="mt-6 w-full inline-flex items-center justify-between gap-2 px-5 py-3 rounded-xl border border-gold/40 text-sm text-foreground hover:bg-gold hover:text-primary-foreground transition-colors"
                  >
                    View Profile
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

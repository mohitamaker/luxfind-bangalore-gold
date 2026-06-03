import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { FeaturedSalons } from "@/components/site/FeaturedSalons";
import { Chatbot } from "@/components/site/Chatbot";
import { searchSalons } from "@/lib/salons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Bangalore — Bangalore's Luxury Salon Marketplace" },
      {
        name: "description",
        content:
          "Discover and book Bangalore's most refined luxury salons, spas, and bridal ateliers — curated by Maison Bangalore.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState({ area: "", service: "" });

  const { data: salons = [], isLoading } = useQuery({
    queryKey: ["salons", query.area, query.service],
    queryFn: () => searchSalons(query.area, query.service),
  });

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <Hero onSearch={(area, service) => setQuery({ area, service })} />
      <FeaturedSalons salons={salons} query={query} isLoading={isLoading} />
      <footer className="border-t border-[rgba(255,255,255,0.06)]">
        <div className="mx-auto max-w-[1400px] px-8 lg:px-14 py-20 grid md:grid-cols-3 gap-12 items-start">
          <div>
            <div className="font-display text-2xl font-light text-foreground">Maison Bangalore<span className="text-gold">.</span></div>
            <p className="mt-4 text-sm text-muted-foreground font-light prose-luxe">A quiet directory of Bangalore's most refined salons & ateliers.</p>
          </div>
          <div className="eyebrow text-muted-foreground space-y-3">
            <div className="text-foreground/80">Navigate</div>
            <div>The Collection</div>
            <div>For Partners</div>
            <div>Vendor Portal</div>
          </div>
          <div className="eyebrow text-muted-foreground space-y-3 md:text-right">
            <div className="text-foreground/80">Contact</div>
            <div>concierge@coterie.in</div>
            <div>Bangalore, India</div>
          </div>
        </div>
        <div className="border-t border-[rgba(255,255,255,0.06)] py-8 text-center eyebrow text-muted-foreground/60">
          © {new Date().getFullYear()} Maison Bangalore — All rights reserved
        </div>
      </footer>
      <Chatbot />
    </main>
  );
}

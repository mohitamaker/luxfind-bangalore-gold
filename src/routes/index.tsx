import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { FeaturedSalons } from "@/components/site/FeaturedSalons";
import { Chatbot } from "@/components/site/Chatbot";
import { filterSalons, salons } from "@/lib/salons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison — Bangalore's Luxury Salon Marketplace" },
      {
        name: "description",
        content:
          "Discover and book Bangalore's most refined luxury salons, spas, and bridal ateliers — curated by Maison.",
      },
      { property: "og:title", content: "Maison — Luxury Salons in Bangalore" },
      {
        property: "og:description",
        content:
          "Hand-picked luxury salons, spas and ateliers across Bangalore. Booked in seconds.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState({ area: "", service: "" });

  const filtered = useMemo(() => {
    if (!query.area && !query.service) return salons;
    return filterSalons(query.area, query.service);
  }, [query]);

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <Hero onSearch={(area, service) => setQuery({ area, service })} />
      <FeaturedSalons salons={filtered} query={query} />
      <footer className="border-t border-border py-10 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        © {new Date().getFullYear()} Maison · Bangalore
      </footer>
      <Chatbot />
    </main>
  );
}

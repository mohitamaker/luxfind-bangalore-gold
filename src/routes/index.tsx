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
      { title: "Maison — Bangalore's Luxury Salon Marketplace" },
      {
        name: "description",
        content:
          "Discover and book Bangalore's most refined luxury salons, spas, and bridal ateliers — curated by Maison.",
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
      <footer className="border-t border-border py-10 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        © {new Date().getFullYear()} Maison · Bangalore
      </footer>
      <Chatbot />
    </main>
  );
}

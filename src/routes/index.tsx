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
      <footer className="relative border-t border-gold/10 mt-12">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {/* Brand tile */}
            <div className="bento-tile md:col-span-6 p-8 lg:p-10 flex flex-col justify-between min-h-[240px]">
              <div>
                <div className="font-display text-3xl lg:text-4xl text-foreground leading-tight">
                  Maison <span className="gold-text italic">Bangalore</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground font-light max-w-sm leading-relaxed">
                  A quiet directory of Bangalore's most refined salons, spas, and ateliers — vetted by hand.
                </p>
              </div>
              <div className="mt-8 eyebrow text-muted-foreground">
                Bangalore, India · Est. 2026
              </div>
            </div>

            {/* Navigate */}
            <div className="bento-tile md:col-span-3 p-8 lg:p-10 flex flex-col gap-4">
              <div className="eyebrow text-gold mb-2">Navigate</div>
              <a href="#salons" className="text-foreground/85 hover:text-gold luxe-transition text-sm">The Collection</a>
              <a href="/partner" className="text-foreground/85 hover:text-gold luxe-transition text-sm">For Partners</a>
              <a href="/vendor-dashboard" className="text-foreground/85 hover:text-gold luxe-transition text-sm">Vendor Portal</a>
            </div>

            {/* Policies */}
            <div className="bento-tile md:col-span-3 p-8 lg:p-10 flex flex-col gap-4">
              <div className="eyebrow text-gold mb-2">Concierge</div>
              <a href="#" className="text-foreground/85 hover:text-gold luxe-transition text-sm">Terms of Service</a>
              <a href="#" className="text-foreground/85 hover:text-gold luxe-transition text-sm">Privacy Policy</a>
              <a href="#" className="text-foreground/85 hover:text-gold luxe-transition text-sm">Cancellation Policy</a>
              <a href="#" className="text-foreground/85 hover:text-gold luxe-transition text-sm">Contact Support</a>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="eyebrow text-muted-foreground/70">
              © {new Date().getFullYear()} Maison Bangalore · All rights reserved
            </div>
            <div className="eyebrow text-muted-foreground/70">
              Crafted with quiet care
            </div>
          </div>
        </div>
      </footer>
      <Chatbot />
    </main>
  );
}

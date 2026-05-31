import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, MapPin, Calendar, ArrowLeft, Sparkles, Flame, TrendingDown } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Chatbot } from "@/components/site/Chatbot";
import { findSalon, generateSlots, type Service } from "@/lib/salons";

export const Route = createFileRoute("/salons/$salonId")({
  loader: ({ params }) => {
    const salon = findSalon(params.salonId);
    if (!salon) throw notFound();
    return { salon };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.salon.name} — Maison` },
      { name: "description", content: loaderData?.salon.tagline },
    ],
  }),
  component: SalonProfile,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-foreground">
      Salon not found. <Link to="/" className="text-gold ml-2">Go back</Link>
    </div>
  ),
});

function SalonProfile() {
  const { salon } = Route.useLoaderData();
  const navigate = useNavigate();
  const slots = generateSlots();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service>(salon.services[0]);

  function bookNow() {
    navigate({
      to: "/book/$salonId",
      params: { salonId: salon.id },
      search: { service: selectedService.name, time: selectedSlot ?? slots[0].time },
    });
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-12 px-6 lg:px-10 mx-auto max-w-7xl">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold mb-6">
          <ArrowLeft className="w-3 h-3" /> Back to collection
        </Link>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold">{salon.priceTier} · {salon.area}</span>
            <h1 className="mt-3 font-display text-5xl lg:text-7xl text-foreground">{salon.name}</h1>
            <p className="mt-2 text-muted-foreground">{salon.tagline}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gold/30">
              <Star className="w-4 h-4 text-gold fill-gold" />
              <span className="text-foreground font-medium">{salon.rating}</span>
              <span className="text-muted-foreground text-sm">({salon.reviews})</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-gold/70" /> {salon.area}, Bangalore
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 lg:px-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {salon.gallery.map((src, i) => (
            <div key={i} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-[16/10]" : "aspect-square"}`}>
              <img src={src} alt={`${salon.name} interior ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Services + Booking */}
      <section className="px-6 lg:px-10 mx-auto max-w-7xl py-20 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-3xl text-foreground">Services</h2>
          <p className="text-sm text-muted-foreground mt-1">Tap to select before booking.</p>
          <ul className="mt-6 divide-y divide-border border border-border rounded-2xl overflow-hidden">
            {salon.services.map((s) => {
              const active = selectedService.name === s.name;
              return (
                <li key={s.name}>
                  <button
                    onClick={() => setSelectedService(s)}
                    className={`w-full flex items-center justify-between px-5 py-4 text-left transition ${
                      active ? "bg-secondary" : "hover:bg-secondary/40"
                    }`}
                  >
                    <span className="text-foreground">{s.name}</span>
                    <span className={`font-medium ${active ? "text-gold" : "text-muted-foreground"}`}>
                      ₹{s.price.toLocaleString("en-IN")}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-3xl text-foreground flex items-center gap-3">
            <Calendar className="w-6 h-6 text-gold" /> Select Time Slot
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Smart pricing — pay less in low-demand windows.
          </p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {slots.map((slot) => {
              const active = selectedSlot === slot.time;
              return (
                <button
                  key={slot.time}
                  onClick={() => setSelectedSlot(slot.time)}
                  className={`relative rounded-xl border px-4 py-4 text-left transition ${
                    active
                      ? "border-gold bg-[image:var(--gradient-gold)]/10"
                      : "border-border hover:border-gold/50"
                  }`}
                >
                  <div className="text-foreground font-medium">{slot.time}</div>
                  {slot.tag === "low" && (
                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-400">
                      <TrendingDown className="w-3 h-3" /> {slot.discount}% Off · Low Demand
                    </div>
                  )}
                  {slot.tag === "peak" && (
                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-gold">
                      <Flame className="w-3 h-3" /> Peak Hours
                    </div>
                  )}
                  {slot.tag === "normal" && (
                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                      <Sparkles className="w-3 h-3" /> Standard
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={bookNow}
            className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-medium text-primary-foreground bg-[image:var(--gradient-gold)] shadow-[var(--shadow-gold)] hover:brightness-110 transition"
          >
            Book Now · {selectedService.name} · ₹{selectedService.price.toLocaleString("en-IN")}
          </button>
        </div>
      </section>

      <Chatbot />
    </main>
  );
}

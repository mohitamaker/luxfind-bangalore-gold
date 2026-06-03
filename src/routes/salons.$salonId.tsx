import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, MapPin, Calendar, ArrowLeft, Sparkles, Flame, TrendingDown, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Chatbot } from "@/components/site/Chatbot";
import { fetchSalon, generateSlots, type Service, type Salon } from "@/lib/salons";

export const Route = createFileRoute("/salons/$salonId")({
  head: ({ params }) => ({
    meta: [{ title: `${params.salonId} — Maison Bangalore` }],
  }),
  component: SalonProfile,
});

function SalonProfile() {
  const { salonId } = Route.useParams();
  const { data: salon, isLoading } = useQuery({
    queryKey: ["salon", salonId],
    queryFn: () => fetchSalon(salonId),
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 text-center text-muted-foreground">Loading salon…</div>
      </main>
    );
  }

  if (!salon) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 text-center text-muted-foreground">
          Salon not found. <Link to="/" className="text-gold ml-2">Go back</Link>
        </div>
      </main>
    );
  }

  return <SalonProfileContent salon={salon} />;
}

function SalonProfileContent({ salon }: { salon: Salon }) {
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

      <section className="px-6 lg:px-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {salon.gallery.map((src, i) => (
            <div key={i} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-[16/10]" : "aspect-square"}`}>
              <img src={src} alt={`${salon.name} interior ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <SalonTabs salon={salon} selectedService={selectedService} setSelectedService={setSelectedService} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} bookNow={bookNow} slots={slots} />

      <Chatbot />
    </main>
  );
}

type TabKey = "services" | "stylists" | "booking";

function SalonTabs({
  salon, selectedService, setSelectedService, selectedSlot, setSelectedSlot, bookNow, slots,
}: {
  salon: Salon;
  selectedService: Service;
  setSelectedService: (s: Service) => void;
  selectedSlot: string | null;
  setSelectedSlot: (s: string) => void;
  bookNow: () => void;
  slots: ReturnType<typeof generateSlots>;
}) {
  const [tab, setTab] = useState<TabKey>("services");
  const stylists = getStylists(salon.id);

  return (
    <section className="px-6 lg:px-10 mx-auto max-w-7xl py-16">
      <div className="flex items-center gap-2 border-b border-border mb-10 overflow-x-auto">
        {([
          { k: "services", label: "Services & Pricing" },
          { k: "stylists", label: "Meet the Stylists" },
          { k: "booking", label: "Pick a Time" },
        ] as { k: TabKey; label: string }[]).map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`px-5 py-3 text-sm transition border-b-2 -mb-px whitespace-nowrap ${
              tab === t.k
                ? "border-gold text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "services" && (
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl text-foreground">Services</h2>
          <p className="text-sm text-muted-foreground mt-1">Tap to select before booking.</p>
          <ul className="mt-6 divide-y divide-border border border-border rounded-2xl overflow-hidden">
            {salon.services.map((s) => {
              const active = selectedService.name === s.name;
              return (
                <li key={s.name}>
                  <button
                    onClick={() => { setSelectedService(s); setTab("booking"); }}
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
      )}

      {tab === "stylists" && (
        <div>
          <h2 className="font-display text-3xl text-foreground">Meet the Stylists</h2>
          <p className="text-sm text-muted-foreground mt-1">Master artists trained at top international academies.</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {stylists.map((st) => (
              <div key={st.name} className="rounded-2xl border border-border bg-card p-6 hover:border-gold/40 transition">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[image:var(--gradient-gold)] grid place-items-center text-primary-foreground font-display text-xl">
                    {st.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-display text-xl text-foreground">{st.name}</p>
                    <p className="text-xs text-gold uppercase tracking-widest">{st.title}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Star className="w-3.5 h-3.5 text-gold fill-gold" /> {st.rating} · {st.years} yrs experience
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {st.specialties.map((sp) => (
                    <span key={sp} className="text-[11px] uppercase tracking-wider text-muted-foreground px-2 py-1 rounded-full border border-border">
                      {sp}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground italic">"{st.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "booking" && (
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl text-foreground flex items-center gap-3">
            <Calendar className="w-6 h-6 text-gold" /> Select Time Slot
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Smart pricing — pay less in low-demand windows.
          </p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {slots.map((slot) => {
              const active = selectedSlot === slot.time;
              const scarce = slot.tag === "peak" && (slot.slotsLeft ?? 0) <= 1;
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
                      <TrendingDown className="w-3 h-3" /> {slot.discount}% Off · Early Bird
                    </div>
                  )}
                  {slot.tag === "peak" && (
                    <div className={`mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider ${scarce ? "text-red-400" : "text-gold"}`}>
                      {scarce ? <AlertCircle className="w-3 h-3" /> : <Flame className="w-3 h-3" />}
                      {scarce ? `Only ${slot.slotsLeft} left!` : `Peak · ${slot.slotsLeft} slots`}
                    </div>
                  )}
                  {slot.tag === "normal" && (
                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                      <Sparkles className="w-3 h-3" /> {slot.slotsLeft} slots
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
      )}
    </section>
  );
}

type Stylist = { name: string; title: string; rating: number; years: number; specialties: string[]; quote: string };

function getStylists(salonId: string): Stylist[] {
  const pool: Stylist[] = [
    { name: "Anaya Mehra", title: "Creative Director", rating: 4.9, years: 12, specialties: ["Balayage", "Bridal"], quote: "Hair is the crown you never take off." },
    { name: "Rohan Iyer", title: "Senior Stylist", rating: 4.8, years: 9, specialties: ["Precision Cuts", "Texture"], quote: "Every cut tells a story." },
    { name: "Sara Kapoor", title: "Color Specialist", rating: 4.95, years: 14, specialties: ["Color", "Highlights"], quote: "Color is emotion made visible." },
    { name: "Vikram Shetty", title: "Master Barber", rating: 4.85, years: 11, specialties: ["Beard", "Classic Cuts"], quote: "Sharp lines, sharper confidence." },
    { name: "Priya Nair", title: "Spa Therapist", rating: 4.9, years: 8, specialties: ["Facials", "Skincare"], quote: "Glow comes from within — and within reach." },
    { name: "Aditya Rao", title: "Makeup Artist", rating: 4.92, years: 10, specialties: ["Editorial", "Bridal"], quote: "Beauty in every brushstroke." },
  ];
  const start = (salonId.length * 3) % pool.length;
  return [pool[start], pool[(start + 1) % pool.length], pool[(start + 2) % pool.length]];
}


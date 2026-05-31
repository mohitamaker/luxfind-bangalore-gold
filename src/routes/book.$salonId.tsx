import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Chatbot } from "@/components/site/Chatbot";
import { findSalon } from "@/lib/salons";

type Search = { service?: string; time?: string };

export const Route = createFileRoute("/book/$salonId")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    service: typeof s.service === "string" ? s.service : undefined,
    time: typeof s.time === "string" ? s.time : undefined,
  }),
  loader: ({ params }) => {
    const salon = findSalon(params.salonId);
    if (!salon) throw notFound();
    return { salon };
  },
  head: () => ({ meta: [{ title: "Checkout — Maison" }] }),
  component: Booking,
});

function Booking() {
  const { salon } = Route.useLoaderData();
  const { service: serviceName, time } = Route.useSearch();
  const [confirmed, setConfirmed] = useState(false);

  const service =
    salon.services.find((s: { name: string }) => s.name === serviceName) ?? salon.services[0];
  const cost = service.price;
  const platformFee = Math.round(cost * 0.1);
  const total = cost + platformFee;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 px-6 mx-auto max-w-2xl">
        <Link
          to="/salons/$salonId"
          params={{ salonId: salon.id }}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold mb-6"
        >
          <ArrowLeft className="w-3 h-3" /> Back to salon
        </Link>

        <span className="text-xs uppercase tracking-[0.3em] text-gold">Checkout</span>
        <h1 className="mt-3 font-display text-4xl lg:text-5xl text-foreground">Review & confirm</h1>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-luxe)]">
          <div className="flex items-center justify-between pb-6 border-b border-border">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Salon</p>
              <p className="font-display text-2xl text-foreground">{salon.name}</p>
              <p className="text-sm text-muted-foreground">{salon.area}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Slot</p>
              <p className="text-foreground">{time ?? "—"}</p>
            </div>
          </div>

          <div className="py-6 space-y-3 text-sm">
            <Row label={service.name} value={`₹${cost.toLocaleString("en-IN")}`} />
            <Row label="Platform Fee (10%)" value={`₹${platformFee.toLocaleString("en-IN")}`} />
            <div className="border-t border-border pt-3 mt-3 flex items-center justify-between">
              <span className="font-display text-lg text-foreground">Total Amount</span>
              <span className="font-display text-2xl text-gold">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <button
            onClick={() => setConfirmed(true)}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-medium text-primary-foreground bg-[image:var(--gradient-gold)] shadow-[var(--shadow-gold)] hover:brightness-110 transition"
          >
            Confirm Booking
          </button>
        </div>
      </section>

      {confirmed && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-gold/30 bg-card p-10 text-center shadow-[var(--shadow-luxe)]">
            <div className="mx-auto w-20 h-20 rounded-full grid place-items-center bg-emerald-500/15 border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" strokeWidth={1.5} />
            </div>
            <h2 className="mt-6 font-display text-3xl text-foreground">Appointment Confirmed!</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {service.name} at {salon.name} · {time ?? ""}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              A confirmation has been sent to your inbox.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex items-center justify-center px-6 py-3 rounded-full bg-[image:var(--gradient-gold)] text-primary-foreground text-sm"
            >
              Back to Maison
            </Link>
          </div>
        </div>
      )}

      <Chatbot />
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

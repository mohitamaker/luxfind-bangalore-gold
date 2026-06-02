import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import confetti from "canvas-confetti";
import {
  CheckCircle2, ArrowLeft, CreditCard, Lock, Shield,
  MessageCircle, CalendarX, Loader2,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Chatbot } from "@/components/site/Chatbot";
import { fetchSalon, type Salon } from "@/lib/salons";
import { useAuth } from "@/lib/auth";

type Search = { service?: string; time?: string };

export const Route = createFileRoute("/book/$salonId")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    service: typeof s.service === "string" ? s.service : undefined,
    time: typeof s.time === "string" ? s.time : undefined,
  }),
  head: () => ({ meta: [{ title: "Checkout — Cotérie" }] }),
  component: Booking,
});

function Booking() {
  const { salonId } = Route.useParams();
  const { data: salon, isLoading } = useQuery({
    queryKey: ["salon", salonId],
    queryFn: () => fetchSalon(salonId),
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 text-center text-muted-foreground">Loading…</div>
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
  return <BookingContent salon={salon} />;
}

type Stage = "idle" | "processing" | "verifying" | "confirming" | "done";

const STAGES: { key: Stage; label: string }[] = [
  { key: "processing", label: "Encrypting your payment…" },
  { key: "verifying", label: "Verifying with your bank…" },
  { key: "confirming", label: "Confirming with the salon…" },
];

function BookingContent({ salon }: { salon: Salon }) {
  const { service: serviceName, time } = Route.useSearch();
  const { user, openAuth } = useAuth();
  const [stage, setStage] = useState<Stage>("idle");

  const service = salon.services.find((s) => s.name === serviceName) ?? salon.services[0];
  const cost = service.price;
  const platformFee = Math.round(cost * 0.1);
  const total = cost + platformFee;

  useEffect(() => {
    if (stage === "done") {
      const burst = (originX: number) => {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { x: originX, y: 0.4 },
          colors: ["#d4af37", "#f0d78c", "#ffffff", "#c9a84c"],
        });
      };
      burst(0.2);
      setTimeout(() => burst(0.8), 200);
      setTimeout(() => burst(0.5), 400);
    }
  }, [stage]);

  function confirmBooking() {
    if (!user) { openAuth(); return; }
    setStage("processing");
    setTimeout(() => setStage("verifying"), 900);
    setTimeout(() => setStage("confirming"), 1900);
    setTimeout(() => setStage("done"), 2900);
  }

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

          {/* Payment method */}
          <div className="rounded-xl border border-border p-4 bg-background/40">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gold" />
              <div className="flex-1">
                <p className="text-sm text-foreground">Card ending 4242</p>
                <p className="text-xs text-muted-foreground">Mock secure checkout</p>
              </div>
              <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                <Lock className="w-3 h-3" /> SSL
              </span>
            </div>
          </div>

          <button
            onClick={confirmBooking}
            disabled={stage !== "idle"}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-medium text-primary-foreground bg-[image:var(--gradient-gold)] shadow-[var(--shadow-gold)] hover:brightness-110 transition disabled:opacity-60"
          >
            {stage === "idle" ? `Confirm Booking · ₹${total.toLocaleString("en-IN")}` : "Processing…"}
          </button>

          {/* Trust + policy lines */}
          <div className="mt-6 space-y-2 text-xs text-muted-foreground">
            <p className="inline-flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              Booking confirmation will be sent instantly on WhatsApp.
            </p>
            <p className="inline-flex items-center gap-2">
              <CalendarX className="w-3.5 h-3.5 text-gold/80" />
              Free cancellation up to 4 hours before your appointment.
            </p>
            <p className="inline-flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-gold/80" />
              Cotérie Guarantee · refund if the salon is not as described.
            </p>
          </div>
        </div>
      </section>

      {stage !== "idle" && stage !== "done" && (
        <ProcessingOverlay stage={stage} />
      )}

      {stage === "done" && (
        <SuccessOverlay
          salon={salon}
          service={service.name}
          time={time ?? ""}
          total={total}
        />
      )}

      <Chatbot />
    </main>
  );
}

function ProcessingOverlay({ stage }: { stage: Stage }) {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-background/85 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-3xl border border-gold/25 bg-card p-8 text-center shadow-[var(--shadow-luxe)]">
        <Loader2 className="w-10 h-10 text-gold mx-auto animate-spin" strokeWidth={1.5} />
        <h3 className="mt-4 font-display text-2xl text-foreground">Securing your booking</h3>
        <ul className="mt-6 space-y-3 text-left">
          {STAGES.map((s) => {
            const idx = STAGES.findIndex((x) => x.key === stage);
            const myIdx = STAGES.findIndex((x) => x.key === s.key);
            const done = myIdx < idx;
            const active = myIdx === idx;
            return (
              <li key={s.key} className="flex items-center gap-3 text-sm">
                <span className={`w-5 h-5 rounded-full grid place-items-center border ${
                  done ? "bg-emerald-500/20 border-emerald-500/50" : active ? "border-gold" : "border-border"
                }`}>
                  {done ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : active ? <Loader2 className="w-3 h-3 text-gold animate-spin" /> : null}
                </span>
                <span className={done ? "text-muted-foreground line-through" : active ? "text-foreground" : "text-muted-foreground"}>
                  {s.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function SuccessOverlay({ salon, service, time, total }: { salon: Salon; service: string; time: string; total: number }) {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-background/85 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl border border-gold/30 bg-card p-10 text-center shadow-[var(--shadow-luxe)]">
        <div className="mx-auto w-20 h-20 rounded-full grid place-items-center bg-emerald-500/15 border border-emerald-500/40">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" strokeWidth={1.5} />
        </div>
        <h2 className="mt-6 font-display text-3xl text-foreground">Appointment Confirmed!</h2>
        <p className="mt-2 text-sm text-muted-foreground">{service} at {salon.name} · {time}</p>
        <div className="mt-6 rounded-xl border border-border p-4 text-left text-sm space-y-1.5">
          <Row label="Booking ID" value={`MN-${Math.floor(Math.random() * 90000 + 10000)}`} />
          <Row label="Amount paid" value={`₹${total.toLocaleString("en-IN")}`} />
          <Row label="WhatsApp" value="Confirmation sent ✓" />
        </div>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center px-6 py-3 rounded-full bg-[image:var(--gradient-gold)] text-primary-foreground text-sm"
        >
          Back to Cotérie
        </Link>
      </div>
    </div>
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

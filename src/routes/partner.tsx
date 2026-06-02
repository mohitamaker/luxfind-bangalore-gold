import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Building2, Phone, MapPin, User } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Chatbot } from "@/components/site/Chatbot";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Partner with Cotérie — List your salon" },
      { name: "description", content: "Join Bangalore's curated luxury salon marketplace. Apply to be listed." },
    ],
  }),
  component: Partner,
});

function Partner() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ business: "", owner: "", address: "", phone: "" });

  function update(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 px-6 mx-auto max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold mb-6">
          <ArrowLeft className="w-3 h-3" /> Back home
        </Link>

        <span className="text-xs uppercase tracking-[0.3em] text-gold">For Partners</span>
        <h1 className="mt-3 font-display text-5xl lg:text-6xl text-foreground">
          Join the city's most <span className="italic text-gold">refined</span> marketplace.
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl">
          Cotérie curates Bangalore's best salons. Apply to be listed — our team will visit and approve your space.
        </p>

        {submitted ? (
          <div className="mt-12 rounded-2xl border border-emerald-500/30 bg-card p-10 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" strokeWidth={1.5} />
            <h2 className="mt-4 font-display text-3xl text-foreground">Application received</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you, {form.owner || "partner"}. Our concierge will reach out within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-12 grid gap-5 rounded-2xl border border-border bg-card p-8">
            <Field icon={Building2} label="Business name" value={form.business} onChange={update("business")} placeholder="Auré Atelier" required />
            <Field icon={User} label="Owner / contact name" value={form.owner} onChange={update("owner")} placeholder="Your full name" required />
            <Field icon={MapPin} label="Address" value={form.address} onChange={update("address")} placeholder="100ft Road, Indiranagar, Bangalore" required />
            <Field icon={Phone} label="Phone number" value={form.phone} onChange={update("phone")} placeholder="+91 98xxxxxx" required type="tel" />

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center px-6 py-4 rounded-xl text-sm font-medium text-primary-foreground bg-[image:var(--gradient-gold)] shadow-[var(--shadow-gold)] hover:brightness-110 transition"
            >
              Request to be listed
            </button>
          </form>
        )}
      </section>
      <Chatbot />
    </main>
  );
}

function Field({
  icon: Icon, label, ...props
}: { icon: React.ComponentType<{ className?: string }>; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-2 flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-background focus-within:border-gold/60 transition">
        <Icon className="w-4 h-4 text-gold shrink-0" />
        <input
          {...props}
          className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
        />
      </div>
    </label>
  );
}

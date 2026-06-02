import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  TrendingUp, IndianRupee, CalendarCheck2, Users, Check, X,
  Sparkles, ArrowUpRight, LayoutDashboard,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/vendor-dashboard")({
  head: () => ({
    meta: [
      { title: "Vendor Dashboard — Cotérie" },
      { name: "description", content: "Manage your salon's appointments, revenue, and customer requests on Cotérie." },
    ],
  }),
  component: VendorDashboard,
});

type Appt = {
  id: string;
  customer: string;
  service: string;
  time: string;
  price: number;
  status: "pending" | "accepted" | "declined";
};

const INITIAL: Appt[] = [
  { id: "MN-30214", customer: "Aanya Sharma", service: "Bridal Hair & Makeup", time: "Today · 2:00 PM", price: 12000, status: "pending" },
  { id: "MN-30219", customer: "Rohan Patel", service: "Classic Haircut", time: "Today · 4:30 PM", price: 800, status: "pending" },
  { id: "MN-30225", customer: "Meera Iyer", service: "Hydra Facial", time: "Tomorrow · 11:00 AM", price: 3500, status: "pending" },
  { id: "MN-30231", customer: "Karan Verma", service: "Beard Sculpt", time: "Tomorrow · 5:00 PM", price: 600, status: "accepted" },
  { id: "MN-30240", customer: "Tara D'Souza", service: "Balayage Color", time: "Wed · 1:00 PM", price: 8500, status: "pending" },
];

const REVENUE = [
  { month: "Jan", value: 142000 },
  { month: "Feb", value: 168000 },
  { month: "Mar", value: 154000 },
  { month: "Apr", value: 192000 },
  { month: "May", value: 218000 },
  { month: "Jun", value: 246000 },
];

function VendorDashboard() {
  const { user, openAuth } = useAuth();
  const [appts, setAppts] = useState<Appt[]>(INITIAL);

  const monthly = REVENUE[REVENUE.length - 1].value;
  const prevMonthly = REVENUE[REVENUE.length - 2].value;
  const delta = ((monthly - prevMonthly) / prevMonthly) * 100;
  const pendingCount = appts.filter((a) => a.status === "pending").length;
  const acceptedCount = appts.filter((a) => a.status === "accepted").length;
  const maxRev = useMemo(() => Math.max(...REVENUE.map((r) => r.value)), []);

  function decide(id: string, status: "accepted" | "declined") {
    setAppts((cur) => cur.map((a) => (a.id === id ? { ...a, status } : a)));
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-40 px-6 mx-auto max-w-md text-center">
          <div className="mx-auto w-14 h-14 rounded-full border border-gold/40 grid place-items-center">
            <LayoutDashboard className="w-6 h-6 text-gold" />
          </div>
          <h1 className="mt-6 font-display text-4xl text-foreground">Vendor Portal</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in as a salon partner to view revenue and manage appointments.
          </p>
          <button
            onClick={openAuth}
            className="mt-8 inline-flex items-center justify-center px-6 py-3 rounded-full bg-[image:var(--gradient-gold)] text-primary-foreground text-sm"
          >
            Sign In to Continue
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-12 px-6 lg:px-10 mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Vendor Dashboard</span>
            <h1 className="mt-2 font-display text-4xl lg:text-5xl text-foreground">
              Welcome back, {user.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Cotérie · Indiranagar Atelier</p>
          </div>
          <Link
            to="/"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-gold"
          >
            ← Back to Cotérie
          </Link>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="px-6 lg:px-10 mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi
          label="Monthly Revenue"
          value={`₹${(monthly / 1000).toFixed(0)}K`}
          delta={`+${delta.toFixed(1)}%`}
          icon={<IndianRupee className="w-4 h-4 text-gold" />}
        />
        <Kpi
          label="Upcoming Bookings"
          value={String(appts.length)}
          delta={`${pendingCount} pending`}
          icon={<CalendarCheck2 className="w-4 h-4 text-gold" />}
        />
        <Kpi
          label="Accepted"
          value={String(acceptedCount)}
          delta="this week"
          icon={<Check className="w-4 h-4 text-emerald-400" />}
        />
        <Kpi
          label="Repeat Clients"
          value="68%"
          delta="loyalty rate"
          icon={<Users className="w-4 h-4 text-gold" />}
        />
      </section>

      {/* Revenue chart */}
      <section className="px-6 lg:px-10 mx-auto max-w-7xl mt-10">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-luxe)]">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gold" /> Revenue · last 6 months
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                You earned <span className="text-gold">₹{monthly.toLocaleString("en-IN")}</span> this month.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
              <ArrowUpRight className="w-3 h-3" /> Trending up
            </span>
          </div>

          <div className="flex items-end gap-3 h-48">
            {REVENUE.map((r) => {
              const h = (r.value / maxRev) * 100;
              const latest = r.month === REVENUE[REVENUE.length - 1].month;
              return (
                <div key={r.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-[10px] text-muted-foreground">
                    ₹{(r.value / 1000).toFixed(0)}K
                  </div>
                  <div className="w-full flex items-end h-full">
                    <div
                      style={{ height: `${h}%` }}
                      className={`w-full rounded-t-lg transition-all ${
                        latest
                          ? "bg-[image:var(--gradient-gold)] shadow-[var(--shadow-gold)]"
                          : "bg-secondary"
                      }`}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{r.month}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Appointments */}
      <section className="px-6 lg:px-10 mx-auto max-w-7xl my-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-3xl text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" /> Customer Appointment Requests
          </h2>
          <span className="text-xs text-muted-foreground">{pendingCount} awaiting your decision</span>
        </div>

        <div className="rounded-3xl border border-border bg-card overflow-hidden">
          <div className="hidden md:grid grid-cols-12 px-6 py-3 text-[11px] uppercase tracking-widest text-muted-foreground border-b border-border bg-background/40">
            <div className="col-span-3">Customer</div>
            <div className="col-span-3">Service</div>
            <div className="col-span-3">Time</div>
            <div className="col-span-1 text-right">Price</div>
            <div className="col-span-2 text-right">Action</div>
          </div>
          {appts.map((a) => (
            <div
              key={a.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 px-6 py-5 border-b border-border last:border-0 items-center"
            >
              <div className="md:col-span-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary grid place-items-center text-sm text-gold">
                  {a.customer.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm text-foreground">{a.customer}</p>
                  <p className="text-[11px] text-muted-foreground">{a.id}</p>
                </div>
              </div>
              <div className="md:col-span-3 text-sm text-foreground">{a.service}</div>
              <div className="md:col-span-3 text-sm text-muted-foreground">{a.time}</div>
              <div className="md:col-span-1 md:text-right text-sm text-gold font-medium">
                ₹{a.price.toLocaleString("en-IN")}
              </div>
              <div className="md:col-span-2 md:text-right">
                {a.status === "pending" ? (
                  <div className="flex md:justify-end gap-2">
                    <button
                      onClick={() => decide(a.id, "accepted")}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25 transition"
                    >
                      <Check className="w-3 h-3" /> Accept
                    </button>
                    <button
                      onClick={() => decide(a.id, "declined")}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs border border-border text-muted-foreground hover:border-red-500/50 hover:text-red-400 transition"
                    >
                      <X className="w-3 h-3" /> Decline
                    </button>
                  </div>
                ) : (
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-widest ${
                      a.status === "accepted"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-secondary text-muted-foreground border border-border"
                    }`}
                  >
                    {a.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Kpi({ label, value, delta, icon }: { label: string; value: string; delta: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 hover:border-gold/40 transition">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
        <span className="w-8 h-8 rounded-full border border-border grid place-items-center">{icon}</span>
      </div>
      <p className="mt-3 font-display text-3xl text-foreground">{value}</p>
      <p className="mt-1 text-xs text-gold">{delta}</p>
    </div>
  );
}

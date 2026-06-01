import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { searchSalons, type Salon } from "@/lib/salons";

const questions = [
  {
    key: "budget",
    label: "What's your budget?",
    options: ["₹₹ Comfortable", "₹₹₹ Premium", "₹₹₹₹ Ultra-Luxe"],
  },
  {
    key: "style",
    label: "Your preferred style?",
    options: ["Classic & Elegant", "Modern & Edgy", "Bridal & Glam", "Wellness & Calm"],
  },
  {
    key: "time",
    label: "When do you usually book?",
    options: ["Weekday Mornings", "Weekday Evenings", "Weekends"],
  },
];

export function StyleQuiz() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  function reset() {
    setStep(0);
    setAnswers([]);
  }

  function pick(opt: string) {
    const next = [...answers, opt];
    setAnswers(next);
    if (step + 1 < questions.length) setStep(step + 1);
    else setStep(questions.length); // results
  }

  // Pick a recommended salon based on first answer (budget tier)
  const { data: salons = [] } = useQuery({
    queryKey: ["salons", "", ""],
    queryFn: () => searchSalons("", ""),
  });

  const recommended: Salon | undefined =
    answers[0]?.includes("Ultra")
      ? salons.find((s) => s.priceTier === "₹₹₹₹") ?? salons[0]
      : answers[0]?.includes("Premium")
        ? salons.find((s) => s.priceTier === "₹₹₹") ?? salons[0]
        : salons.find((s) => s.priceTier === "₹₹") ?? salons[0];

  return (
    <>
      <button
        onClick={() => {
          reset();
          setOpen(true);
        }}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gold/40 bg-background/40 backdrop-blur text-sm text-foreground hover:border-gold transition"
      >
        <Sparkles className="w-4 h-4 text-gold" />
        Take our 30-Second AI Style Quiz
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-background/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-gold/30 bg-card shadow-[var(--shadow-luxe)] p-8">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-gold"
            >
              <X className="w-5 h-5" />
            </button>

            {step < questions.length ? (
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-gold">
                  Step {step + 1} of {questions.length}
                </span>
                <h3 className="mt-2 font-display text-3xl text-foreground">
                  {questions[step].label}
                </h3>
                <div className="mt-6 grid gap-3">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => pick(opt)}
                      className="w-full text-left px-5 py-4 rounded-xl border border-border hover:border-gold hover:bg-secondary/50 transition text-foreground"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : recommended ? (
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-gold mx-auto" />
                <h3 className="mt-3 font-display text-3xl text-foreground">
                  Your perfect match
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Based on your style, here's the salon for you.
                </p>
                <div className="mt-6 rounded-2xl border border-gold/30 overflow-hidden">
                  <img src={recommended.image} alt={recommended.name} className="w-full h-40 object-cover" />
                  <div className="p-5 text-left">
                    <h4 className="font-display text-2xl text-foreground">{recommended.name}</h4>
                    <p className="text-sm text-muted-foreground">{recommended.tagline} · {recommended.area}</p>
                    <Link
                      to="/salons/$salonId"
                      params={{ salonId: recommended.id }}
                      onClick={() => setOpen(false)}
                      className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[image:var(--gradient-gold)] text-primary-foreground text-sm"
                    >
                      View Profile <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <button onClick={reset} className="mt-4 text-xs text-muted-foreground hover:text-gold underline">
                  Retake quiz
                </button>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-10">Loading recommendation…</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "ai" | "me"; text: string }[]>([
    {
      from: "ai",
      text: "Hi! I am your AI Beauty Assistant. Tell me what service you need today and I will find the best luxury salon in the city for you!",
    },
  ]);
  const [input, setInput] = useState("");

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const q = input.trim();
    setMessages((m) => [...m, { from: "me", text: q }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: "ai",
          text: `For "${q}", I recommend Auré Atelier in Indiranagar — a 4.9★ favourite. Want me to open their profile?`,
        },
      ]);
    }, 700);
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-gold/30 bg-card/95 backdrop-blur-xl shadow-[var(--shadow-luxe)] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-[image:var(--gradient-gold)]/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="font-display text-lg text-foreground">AI Beauty Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-gold">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 max-h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.from === "ai"
                    ? "bg-secondary text-foreground"
                    : "ml-auto bg-[image:var(--gradient-gold)] text-primary-foreground"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={send} className="flex items-center gap-2 p-3 border-t border-border">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about salons, services…"
              className="flex-1 bg-secondary rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button
              type="submit"
              className="grid place-items-center w-9 h-9 rounded-full bg-[image:var(--gradient-gold)] text-primary-foreground"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI assistant"
        className="fixed bottom-6 right-6 z-50 grid place-items-center w-14 h-14 rounded-full bg-[image:var(--gradient-gold)] text-primary-foreground shadow-[var(--shadow-gold)] hover:brightness-110 transition"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>
    </>
  );
}

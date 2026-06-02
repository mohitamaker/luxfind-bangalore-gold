import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are Cotérie's Luxury Concierge — an elegant, sophisticated AI assistant helping users discover the perfect salon in Bangalore.

You have access to Cotérie's curated collection of luxury salons across Bangalore neighborhoods including Indiranagar, Koramangala, Jayanagar, UB City, HSR Layout, Whitefield, and MG Road.

Featured salons in the Cotérie collection:
- Auré Atelier (Indiranagar) — hair couture & colour studio, ₹₹₹₹
- Velvet & Oak Spa (UB City) — signature spa rituals, ₹₹₹₹
- Maison Blanche (Koramangala) — bridal, skin & nail atelier, ₹₹₹
- Noir Hair Studio (Jayanagar) — precision cuts, ₹₹₹
- Lumière Spa (HSR Layout) — botanical wellness, ₹₹₹
- Rose & Co. Nail Bar (Whitefield) — designer nail artistry, ₹₹
- Atelier Noor (Indiranagar) — bridal & special occasion makeup, ₹₹₹₹
- The Gent's Room (Koramangala) — modern barbering & grooming, ₹₹
- Aurum House of Beauty (MG Road) — full-service luxury salon, ₹₹₹
- Serene Skin Clinic (Jayanagar) — dermatology-led skincare, ₹₹₹

Tone: sophisticated, warm, concise. Use refined language. Recommend specific salons by name and area based on what users ask for (haircut, bridal, spa, etc.). Keep replies under 4 sentences unless asked for detail. Never invent salons not in this list.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        const { messages } = (await request.json()) as {
          messages: { role: "user" | "assistant"; content: string }[];
        };

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
            stream: true,
          }),
        });

        if (!upstream.ok) {
          if (upstream.status === 429) {
            return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again shortly." }), {
              status: 429,
              headers: { "Content-Type": "application/json" },
            });
          }
          if (upstream.status === 402) {
            return new Response(JSON.stringify({ error: "AI credits exhausted. Please top up in workspace settings." }), {
              status: 402,
              headers: { "Content-Type": "application/json" },
            });
          }
          const text = await upstream.text();
          console.error("AI gateway error:", upstream.status, text);
          return new Response(JSON.stringify({ error: "AI gateway error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(upstream.body, {
          headers: { "Content-Type": "text/event-stream" },
        });
      },
    },
  },
});

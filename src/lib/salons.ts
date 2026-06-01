import salon1 from "@/assets/salon-1.jpg";
import salon2 from "@/assets/salon-2.jpg";
import salon3 from "@/assets/salon-3.jpg";
import salon4 from "@/assets/salon-4.jpg";
import salon5 from "@/assets/salon-5.jpg";
import salon6 from "@/assets/salon-6.jpg";
import salon7 from "@/assets/salon-7.jpg";
import salon8 from "@/assets/salon-8.jpg";
import { supabase } from "@/integrations/supabase/client";

export type Service = { name: string; price: number };

export type Salon = {
  id: string;
  name: string;
  area: string;
  tagline: string;
  rating: number;
  reviews: number;
  priceTier: string;
  image: string;
  gallery: string[];
  services: Service[];
};

const IMAGE_MAP: Record<string, string> = {
  "salon-1": salon1, "salon-2": salon2, "salon-3": salon3, "salon-4": salon4,
  "salon-5": salon5, "salon-6": salon6, "salon-7": salon7, "salon-8": salon8,
};

export function resolveImage(key: string | null | undefined): string {
  if (!key) return salon1;
  return IMAGE_MAP[key] ?? salon1;
}

type Row = {
  id: string; name: string; area: string; tagline: string | null;
  rating: number; reviews: number; price_tier: string;
  image_url: string | null; gallery: string[]; services: Service[];
};

function toSalon(r: Row): Salon {
  return {
    id: r.id, name: r.name, area: r.area, tagline: r.tagline ?? "",
    rating: Number(r.rating), reviews: r.reviews, priceTier: r.price_tier,
    image: resolveImage(r.image_url),
    gallery: (r.gallery ?? []).map(resolveImage),
    services: r.services ?? [],
  };
}

export async function searchSalons(area: string, service: string): Promise<Salon[]> {
  let query = supabase.from("salons").select("*").order("rating", { ascending: false });
  const a = area.trim();
  const s = service.trim();
  if (a) query = query.ilike("area", `%${a}%`);
  const { data, error } = await query;
  if (error) throw error;
  let rows = (data ?? []) as unknown as Row[];
  if (s) {
    const needle = s.toLowerCase();
    rows = rows.filter(
      (r) =>
        (r.tagline ?? "").toLowerCase().includes(needle) ||
        (r.services ?? []).some((sv) => sv.name.toLowerCase().includes(needle)),
    );
  }
  return rows.map(toSalon);
}

export async function fetchSalon(id: string): Promise<Salon | null> {
  const { data, error } = await supabase.from("salons").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? toSalon(data as unknown as Row) : null;
}

export type Slot = { time: string; tag: "peak" | "low" | "normal"; discount?: number; slotsLeft?: number };

export function generateSlots(): Slot[] {
  return [
    { time: "9:00 AM", tag: "low", discount: 15, slotsLeft: 5 },
    { time: "10:30 AM", tag: "low", discount: 10, slotsLeft: 4 },
    { time: "12:00 PM", tag: "normal", slotsLeft: 3 },
    { time: "2:00 PM", tag: "peak", slotsLeft: 1 },
    { time: "4:00 PM", tag: "peak", slotsLeft: 2 },
    { time: "6:00 PM", tag: "peak", slotsLeft: 1 },
    { time: "7:30 PM", tag: "peak", slotsLeft: 2 },
  ];
}

import salon1 from "@/assets/salon-1.jpg";
import salon2 from "@/assets/salon-2.jpg";
import salon3 from "@/assets/salon-3.jpg";
import salon4 from "@/assets/salon-4.jpg";
import salon5 from "@/assets/salon-5.jpg";
import salon6 from "@/assets/salon-6.jpg";
import salon7 from "@/assets/salon-7.jpg";
import salon8 from "@/assets/salon-8.jpg";

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

export const salons: Salon[] = [
  {
    id: "aure-atelier",
    name: "Auré Atelier",
    area: "Indiranagar",
    tagline: "Hair couture & colour studio",
    rating: 4.9, reviews: 312, priceTier: "₹₹₹₹",
    image: salon1, gallery: [salon1, salon4, salon8],
    services: [
      { name: "Signature Haircut", price: 1800 },
      { name: "Global Hair Colour", price: 6500 },
      { name: "Keratin Treatment", price: 8500 },
      { name: "Blow Dry & Styling", price: 1200 },
    ],
  },
  {
    id: "velvet-oak",
    name: "Velvet & Oak Spa",
    area: "UB City",
    tagline: "Signature treatments & rituals",
    rating: 4.8, reviews: 248, priceTier: "₹₹₹₹",
    image: salon2, gallery: [salon2, salon5, salon7],
    services: [
      { name: "Deep Tissue Massage", price: 3500 },
      { name: "Aromatherapy Ritual", price: 4200 },
      { name: "Hydrating Facial", price: 2800 },
      { name: "Body Scrub & Wrap", price: 3800 },
    ],
  },
  {
    id: "maison-blanche",
    name: "Maison Blanche",
    area: "Koramangala",
    tagline: "Bridal, skin & nail atelier",
    rating: 4.9, reviews: 189, priceTier: "₹₹₹",
    image: salon3, gallery: [salon3, salon7, salon6],
    services: [
      { name: "Bridal Makeup", price: 18000 },
      { name: "Engagement Makeup", price: 9500 },
      { name: "Gel Manicure", price: 1500 },
      { name: "Hydra Facial", price: 3500 },
    ],
  },
  {
    id: "noir-studio",
    name: "Noir Hair Studio",
    area: "Jayanagar",
    tagline: "Precision cuts & modern colour",
    rating: 4.7, reviews: 156, priceTier: "₹₹₹",
    image: salon4, gallery: [salon4, salon1, salon8],
    services: [
      { name: "Haircut", price: 500 },
      { name: "Hair Spa", price: 1800 },
      { name: "Highlights", price: 4500 },
      { name: "Beard Sculpting", price: 600 },
    ],
  },
  {
    id: "lumière-spa",
    name: "Lumière Spa",
    area: "HSR Layout",
    tagline: "Pure botanical wellness",
    rating: 4.8, reviews: 201, priceTier: "₹₹₹",
    image: salon5, gallery: [salon5, salon2, salon7],
    services: [
      { name: "Swedish Massage", price: 2800 },
      { name: "Facial", price: 1200 },
      { name: "Foot Reflexology", price: 1500 },
      { name: "Body Polish", price: 3200 },
    ],
  },
  {
    id: "rose-nails",
    name: "Rose & Co. Nail Bar",
    area: "Whitefield",
    tagline: "Designer nail artistry",
    rating: 4.6, reviews: 142, priceTier: "₹₹",
    image: salon6, gallery: [salon6, salon3, salon7],
    services: [
      { name: "Classic Manicure", price: 800 },
      { name: "Gel Extensions", price: 2500 },
      { name: "Nail Art", price: 1200 },
      { name: "Spa Pedicure", price: 1400 },
    ],
  },
  {
    id: "atelier-noor",
    name: "Atelier Noor",
    area: "Indiranagar",
    tagline: "Bridal & special occasion makeup",
    rating: 4.9, reviews: 267, priceTier: "₹₹₹₹",
    image: salon7, gallery: [salon7, salon3, salon6],
    services: [
      { name: "Bridal Makeup", price: 22000 },
      { name: "Party Makeup", price: 4500 },
      { name: "HD Airbrush Makeup", price: 6500 },
      { name: "Hair Styling", price: 2500 },
    ],
  },
  {
    id: "the-gents-room",
    name: "The Gent's Room",
    area: "Koramangala",
    tagline: "Modern barbering & grooming",
    rating: 4.7, reviews: 178, priceTier: "₹₹",
    image: salon8, gallery: [salon8, salon4, salon1],
    services: [
      { name: "Haircut", price: 700 },
      { name: "Hot Towel Shave", price: 600 },
      { name: "Beard Trim & Style", price: 500 },
      { name: "Head Massage", price: 800 },
    ],
  },
  {
    id: "aurum-house",
    name: "Aurum House of Beauty",
    area: "MG Road",
    tagline: "Full-service luxury salon",
    rating: 4.8, reviews: 223, priceTier: "₹₹₹",
    image: salon1, gallery: [salon1, salon5, salon6],
    services: [
      { name: "Haircut", price: 1200 },
      { name: "Facials", price: 1800 },
      { name: "Manicure & Pedicure", price: 1800 },
      { name: "Hair Colour", price: 4200 },
    ],
  },
  {
    id: "serene-skin",
    name: "Serene Skin Clinic",
    area: "Jayanagar",
    tagline: "Dermatology-led skincare",
    rating: 4.7, reviews: 134, priceTier: "₹₹₹",
    image: salon5, gallery: [salon5, salon7, salon2],
    services: [
      { name: "Anti-Ageing Facial", price: 3800 },
      { name: "Chemical Peel", price: 4500 },
      { name: "Laser Hair Removal", price: 5500 },
      { name: "Acne Treatment", price: 2200 },
    ],
  },
];

export function findSalon(id: string) {
  return salons.find((s) => s.id === id);
}

export function filterSalons(area: string, service: string) {
  const a = area.trim().toLowerCase();
  const s = service.trim().toLowerCase();
  return salons.filter((salon) => {
    const matchArea = !a || salon.area.toLowerCase().includes(a);
    const matchService =
      !s ||
      salon.services.some((sv) => sv.name.toLowerCase().includes(s)) ||
      salon.tagline.toLowerCase().includes(s);
    return matchArea && matchService;
  });
}

export type Slot = { time: string; tag: "peak" | "low" | "normal"; discount?: number };

export function generateSlots(): Slot[] {
  return [
    { time: "9:00 AM", tag: "low", discount: 15 },
    { time: "10:30 AM", tag: "low", discount: 10 },
    { time: "12:00 PM", tag: "normal" },
    { time: "2:00 PM", tag: "normal" },
    { time: "4:00 PM", tag: "peak" },
    { time: "6:00 PM", tag: "peak" },
    { time: "7:30 PM", tag: "peak" },
  ];
}

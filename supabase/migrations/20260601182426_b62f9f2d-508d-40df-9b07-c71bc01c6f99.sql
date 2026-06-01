CREATE TABLE public.salons (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  area TEXT NOT NULL,
  tagline TEXT,
  rating NUMERIC(2,1) NOT NULL DEFAULT 4.5,
  reviews INTEGER NOT NULL DEFAULT 0,
  price_tier TEXT NOT NULL DEFAULT '₹₹₹',
  image_url TEXT,
  gallery TEXT[] NOT NULL DEFAULT '{}',
  services JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.salons TO anon, authenticated;
GRANT ALL ON public.salons TO service_role;

ALTER TABLE public.salons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Salons are publicly readable"
  ON public.salons FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX salons_area_idx ON public.salons (lower(area));

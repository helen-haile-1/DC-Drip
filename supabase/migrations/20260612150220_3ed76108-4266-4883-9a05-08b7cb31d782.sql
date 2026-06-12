CREATE TABLE public.social_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  url text,
  clicked_at timestamp with time zone NOT NULL DEFAULT now(),
  user_agent text,
  referrer text
);

GRANT INSERT ON public.social_clicks TO anon;
GRANT INSERT ON public.social_clicks TO authenticated;
GRANT SELECT ON public.social_clicks TO service_role;
GRANT ALL ON public.social_clicks TO service_role;

ALTER TABLE public.social_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous click tracking" ON public.social_clicks
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow service role to read clicks" ON public.social_clicks
  FOR SELECT TO service_role
  USING (true);
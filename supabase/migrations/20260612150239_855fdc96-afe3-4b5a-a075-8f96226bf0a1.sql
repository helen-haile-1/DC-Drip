CREATE POLICY "Allow public read of click stats" ON public.social_clicks
  FOR SELECT TO anon, authenticated
  USING (true);
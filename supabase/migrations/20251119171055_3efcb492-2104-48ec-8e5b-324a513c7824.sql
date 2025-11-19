-- Allow admin0 to update any profile's points
CREATE POLICY "Admin0 can update all profiles"
ON public.profiles
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin0'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin0'::app_role));
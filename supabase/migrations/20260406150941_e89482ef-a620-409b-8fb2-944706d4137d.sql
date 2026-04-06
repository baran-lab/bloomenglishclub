
-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Fix the overly permissive beta_requests INSERT policy
DROP POLICY IF EXISTS "Anyone can submit beta requests" ON public.beta_requests;

-- Recreate with basic validation - anyone can submit but must provide their own data
CREATE POLICY "Anyone can submit beta requests"
ON public.beta_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email IS NOT NULL AND
  name IS NOT NULL AND
  length(email) > 0 AND
  length(name) > 0
);

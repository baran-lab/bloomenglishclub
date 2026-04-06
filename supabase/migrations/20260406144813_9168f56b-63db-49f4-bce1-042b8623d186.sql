
-- Create a secure validation function that returns boolean only
CREATE OR REPLACE FUNCTION public.validate_access_code(p_code text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.access_codes
    WHERE code = upper(trim(p_code))
      AND is_used = false
      AND (expires_at IS NULL OR expires_at > now())
  )
$$;

-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Anyone can read access codes for validation" ON public.access_codes;

-- Add admin-only SELECT policy
CREATE POLICY "Admins can view access codes"
ON public.access_codes
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Fix search_path on functions that are missing it
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;

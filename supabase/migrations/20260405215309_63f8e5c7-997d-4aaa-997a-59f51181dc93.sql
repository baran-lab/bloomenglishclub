
-- Access codes table for beta invitations
CREATE TABLE public.access_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  is_used boolean NOT NULL DEFAULT false,
  used_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  used_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone
);

-- Beta requests table for automatic code assignment
CREATE TABLE public.beta_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  access_code_id uuid REFERENCES public.access_codes(id),
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Login tracking for anti-sharing protection
CREATE TABLE public.login_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beta_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.login_sessions ENABLE ROW LEVEL SECURITY;

-- Access codes: admins can manage, anyone can read (for validation during signup)
CREATE POLICY "Anyone can read access codes for validation"
  ON public.access_codes FOR SELECT TO public
  USING (true);

CREATE POLICY "Admins can insert access codes"
  ON public.access_codes FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update access codes"
  ON public.access_codes FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete access codes"
  ON public.access_codes FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Beta requests: admins can manage, public can insert (for the request form)
CREATE POLICY "Anyone can submit beta requests"
  ON public.beta_requests FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view beta requests"
  ON public.beta_requests FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update beta requests"
  ON public.beta_requests FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Login sessions: users can insert their own, admins can view all
CREATE POLICY "Users can insert own login sessions"
  ON public.login_sessions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all login sessions"
  ON public.login_sessions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own login sessions"
  ON public.login_sessions FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Function to claim an access code atomically (prevents race conditions)
CREATE OR REPLACE FUNCTION public.claim_access_code(p_code text, p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_code_id uuid;
BEGIN
  SELECT id INTO v_code_id
  FROM public.access_codes
  WHERE code = p_code
    AND is_used = false
    AND (expires_at IS NULL OR expires_at > now())
  FOR UPDATE SKIP LOCKED;

  IF v_code_id IS NULL THEN
    RETURN false;
  END IF;

  UPDATE public.access_codes
  SET is_used = true, used_by = p_user_id, used_at = now()
  WHERE id = v_code_id;

  RETURN true;
END;
$$;

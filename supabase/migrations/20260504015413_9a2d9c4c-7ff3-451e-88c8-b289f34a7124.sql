
-- Lock down direct contact_submissions inserts; the new edge function will use service role.
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

-- Add length constraints to enforce server-side input limits
ALTER TABLE public.contact_submissions
  ADD CONSTRAINT contact_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  ADD CONSTRAINT contact_email_len CHECK (char_length(email) BETWEEN 3 AND 254),
  ADD CONSTRAINT contact_company_len CHECK (char_length(company) BETWEEN 1 AND 200),
  ADD CONSTRAINT contact_phone_len CHECK (char_length(phone) BETWEEN 4 AND 40),
  ADD CONSTRAINT contact_message_len CHECK (char_length(message) BETWEEN 1 AND 5000);

-- Set immutable search_path on all SECURITY DEFINER functions to prevent search-path hijacking
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;

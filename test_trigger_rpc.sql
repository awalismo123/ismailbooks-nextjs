CREATE OR REPLACE FUNCTION public.test_trigger_logic(test_email TEXT)
RETURNS json AS $$
DECLARE
  legacy_user_id BIGINT;
  new_id UUID := gen_random_uuid();
BEGIN
  -- 1. Create a profile for the new user
  INSERT INTO public.profiles (id, username, full_name, is_admin, account_status)
  VALUES (
    new_id,
    SPLIT_PART(test_email, '@', 1),
    'Test Name',
    false,
    'active'
  )
  ON CONFLICT (id) DO NOTHING;

  -- 2. Link legacy purchases if they exist
  SELECT user_id INTO legacy_user_id FROM public.users WHERE email = test_email LIMIT 1;
  IF legacy_user_id IS NOT NULL THEN
    UPDATE public.payments SET auth_user_id = new_id WHERE user_id = legacy_user_id AND auth_user_id IS NULL;
    UPDATE public.user_books SET auth_user_id = new_id WHERE user_id = legacy_user_id AND auth_user_id IS NULL;
  END IF;

  RETURN json_build_object('success', true, 'new_id', new_id, 'legacy_id', legacy_user_id);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

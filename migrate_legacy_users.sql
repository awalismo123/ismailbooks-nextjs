-- =========================================================================
-- IsmailBooks: Hore-u-qaadista Akhristayaasha (Legacy Users Migration)
-- =========================================================================
-- Script-gan wuxuu isku xirayaa buugaagtii ay iibsadeen users-kii hore
-- iyo nidaamka cusub ee Supabase Auth (iyadoo la isticmaalayo Email-kooda).
-- 
-- Fadlan ku orod (Run) script-gan qaybta Supabase SQL Editor.
-- =========================================================================

-- Qaybta 1: Isku xiridda (Linking) users-ka HORAY u soo galay
DO $$
DECLARE
  auth_user RECORD;
  legacy_user_id BIGINT;
BEGIN
  FOR auth_user IN SELECT id, email FROM auth.users LOOP
    -- Raadi haddii email-kan uu ku jiro table-kii hore ee 'users'
    SELECT user_id INTO legacy_user_id FROM public.users WHERE email = auth_user.email LIMIT 1;
    
    IF legacy_user_id IS NOT NULL THEN
      -- Haa wuu jiraa! Ku xir payments-ka iyo user_books-ka ID-ga cusub
      UPDATE public.payments 
      SET auth_user_id = auth_user.id 
      WHERE user_id = legacy_user_id AND auth_user_id IS NULL;
      
      UPDATE public.user_books 
      SET auth_user_id = auth_user.id 
      WHERE user_id = legacy_user_id AND auth_user_id IS NULL;
    END IF;
  END LOOP;
END;
$$;

-- Qaybta 2: Casriyaynta (Update) nidaamka si uu u qabto users-ka DAMBE
-- Marka user hore uu soo galo mar dambe, si toos ah ayaa loogu xirayaa buugaagtiisa
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  legacy_user_id BIGINT;
BEGIN
  -- 1. U samee profile cusub
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, SPLIT_PART(NEW.email, '@', 1))
  ON CONFLICT (id) DO NOTHING;

  -- 2. Raadi haddii uu ahaa user hore (legacy)
  SELECT user_id INTO legacy_user_id FROM public.users WHERE email = NEW.email LIMIT 1;
  
  IF legacy_user_id IS NOT NULL THEN
    -- Ku xir xogtiisii hore
    UPDATE public.payments 
    SET auth_user_id = NEW.id 
    WHERE user_id = legacy_user_id AND auth_user_id IS NULL;
    
    UPDATE public.user_books 
    SET auth_user_id = NEW.id 
    WHERE user_id = legacy_user_id AND auth_user_id IS NULL;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

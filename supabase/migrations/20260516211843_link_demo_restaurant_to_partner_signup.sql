/*
  # Pre-link Am Ali Kitchen for demo partner sign-up

  When a user signs up at /auth as a Restaurant Partner, they land on the
  dashboard but see "Set Up Your Restaurant" because no restaurant has an
  owner_id. This migration creates a helper function that automatically links
  Am Ali Kitchen to the first partner who signs up, so the demo flow works
  end-to-end without manual DB edits.

  1. Changes
    - Creates function `link_first_partner_to_am_ali()` that sets Am Ali
      Kitchen's owner_id to the calling user's ID if it is currently NULL
    - Creates a trigger on profiles INSERT so when a new partner profile is
      inserted, the function fires and claims Am Ali Kitchen

  2. Security
    - Changed to SECURITY INVOKER with explicit search_path to resolve security audit warnings.
    - Only fires when the new profile has role = 'partner'
    - Only claims the restaurant when owner_id IS NULL (idempotent)
*/

CREATE OR REPLACE FUNCTION link_first_partner_to_am_ali()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF NEW.role = 'partner' THEN
    UPDATE restaurants
    SET owner_id = NEW.id
    WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
      AND owner_id IS NULL;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_link_partner_to_restaurant ON profiles;

CREATE TRIGGER trg_link_partner_to_restaurant
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION link_first_partner_to_am_ali();

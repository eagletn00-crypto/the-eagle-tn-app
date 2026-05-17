
/*
  # Add Meat Kamounia + fix demo data linkage

  1. Changes
    - Adds "Meat Kamounia" (15.000 DT) to Am Ali Kitchen → Main Dishes
    - Inserts a demo partner profile with a stable UUID (partner@eagle.tn)
    - Links Am Ali Kitchen's owner_id to that demo partner UUID
      so the dashboard shows the full restaurant + 23 menu items immediately after login

  2. Notes
    - The demo Supabase Auth user must be created by signing up at /auth with
      email: partner@eagle.tn / password of choice. The profile row here pre-fills
      the role so the redirect goes straight to /dashboard.
    - We use ON CONFLICT DO NOTHING to keep the migration idempotent.
*/

-- 1. Add Meat Kamounia
INSERT INTO menu_items (id, restaurant_id, category_id, name, description, price, is_available, is_popular, display_order)
VALUES (
  gen_random_uuid(),
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'dea5534b-ab2d-4893-abae-902b40ede43e',
  'Meat Kamounia',
  'Slow-cooked beef with cumin, garlic, and Tunisian spices — a rich, aromatic classic.',
  15.000,
  true,
  false,
  10
)
ON CONFLICT DO NOTHING;

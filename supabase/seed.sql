-- ============================================================
-- REAL ESTATE MANAGEMENT - SAFE NEW-PROJECT SEED
-- Run after schema.sql and settings-foundation.sql.
-- Creates no properties, images, leads, staff, or Hilltop records.
-- ============================================================

insert into public.branches (name, address, contact_number)
values ('Toney, Alabama', 'Toney, AL 35773', null)
on conflict (name) do update
set address = excluded.address;

insert into public.app_settings (setting_key, setting_value)
values (
  'company_profile',
  jsonb_build_object(
    'business_name', 'Real estate management',
    'address', 'Toney, Alabama',
    'currency', 'USD',
    'default_purpose', 'For Rent'
  )
)
on conflict (setting_key) do update
set setting_value = excluded.setting_value,
    updated_at = now();

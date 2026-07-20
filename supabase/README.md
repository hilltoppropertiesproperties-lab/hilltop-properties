# Real estate management Supabase setup

This copied site must use a new, empty Supabase project. None of these scripts
connect to or modify the original Hilltop project.

## New-project SQL order

Run these files in the new project's SQL Editor, in order:

1. `schema.sql`
2. `settings-foundation.sql`
3. `cms-foundation.sql`
4. `lead-communication-logs.sql`
5. `property-exclusive-controls.sql`
6. `property-currency-support.sql`
7. `property-services-cms.sql`
8. `services-showcase-cms.sql`
9. `team-members-setup.sql`
10. `cms-testimonial-backgrounds.sql`
11. `why-hilltop-hero-settings.sql`
12. `hero-video-cms-policies.sql`
13. `rls-policies.sql`
14. `security-hardening.sql`
15. `storage-setup.sql`
16. `cms-media-storage.sql`
17. `public-website-read-policies.sql`
18. `public-enquiry-policies.sql`
19. `seed.sql`

`seed.sql` creates only the `Toney, Alabama` location and safe company
settings. It deliberately creates no properties, images, leads, or staff.

`add-auth-user-id-to-staff-users.sql` is needed only if a pre-existing
`staff_users` table is missing `auth_user_id`. A fresh project created with
`schema.sql` does not need it. The optional sample-data file inserts nothing.

## Storage buckets

The SQL creates these buckets used by the existing dashboard:

- `property-images` (public listing photos)
- `property-documents` (private dashboard documents)
- `cms-media`
- `service-illustrations`
- `team-members`

Property uploads in `properties.js` use `property-images`; because the browser
client is created with the new project's URL/key, uploads cannot reach the old
project.

## Admin account

Create staff accounts manually in **Authentication → Users**. Then add a
matching dashboard profile, using the new Auth user's UID and the Toney branch:

```sql
insert into public.staff_users (
  full_name,
  email,
  auth_user_id,
  phone,
  role,
  branch_id,
  is_active
)
select
  'Admin User',
  'admin@example.com',
  'PASTE_NEW_AUTH_USER_UID_HERE'::uuid,
  null,
  'super_admin',
  id,
  true
from public.branches
where name = 'Toney, Alabama';
```

Do not create a public sign-up page and never place a service-role key in the
browser.

## Frontend connection

Edit `supabase-config.js` and replace only these placeholders with the new
project values:

```js
const SUPABASE_URL = "https://YOUR_NEW_PROJECT_REF.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_NEW_PROJECT_PUBLISHABLE_OR_ANON_KEY";
```

Until both values are replaced, the browser deliberately creates no Supabase
client and shows empty/error states instead of sample property records.

## Visibility rule

The dashboard uses the authenticated policy `using (true)` for property reads,
so Draft, Active, Archived, Under Offer, Let, and Withdrawn records remain
available to staff. The public JavaScript queries add `status = 'Active'`, and
the anonymous RLS policies independently enforce the same condition for
properties, property images, featured-property references, and viewing leads.

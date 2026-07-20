/* ============================================================
   REAL ESTATE MANAGEMENT - SUPABASE FRONTEND CONFIGURATION

   This copied project must point only to its own Supabase project.
   Replace the two placeholders below with the new project's URL and
   publishable (or legacy anon) key. Never use a service-role key here.
   ============================================================ */

const SUPABASE_URL = "https://YOUR_NEW_PROJECT_REF.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_NEW_PROJECT_PUBLISHABLE_OR_ANON_KEY";

function isRealEstateManagementSupabaseConfigured() {
  return Boolean(
    SUPABASE_URL &&
    SUPABASE_PUBLISHABLE_KEY &&
    !SUPABASE_URL.includes("YOUR_NEW_PROJECT") &&
    !SUPABASE_PUBLISHABLE_KEY.includes("YOUR_NEW_PROJECT")
  );
}

function setupRealEstateManagementSupabaseClient() {
  if (!window.supabase) {
    console.error("Supabase CDN script is not loaded yet.");
    window.realEstateManagementSupabase = null;
    window.hilltopSupabase = null;
    return;
  }

  if (!isRealEstateManagementSupabaseConfigured()) {
    console.warn(
      "Supabase is not configured. Add the new Real estate management project URL and publishable/anon key in supabase-config.js."
    );
    window.realEstateManagementSupabase = null;
    // Compatibility alias retained so the existing dashboard modules do
    // not need a risky interface rewrite. It never points to Hilltop.
    window.hilltopSupabase = null;
    return;
  }

  var client = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

  window.realEstateManagementSupabase = client;
  window.hilltopSupabase = client;
  console.info("Supabase client initialized for Real estate management.");
}

setupRealEstateManagementSupabaseClient();

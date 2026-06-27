/* ============================================================
   HILLTOP PROPERTIES ZAMBIA - SUPABASE FRONTEND CONFIG
   Plain browser JavaScript only. No secret keys here.

   Load before page-specific scripts like this:
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   <script src="supabase-config.js"></script>
   <script src="login.js"></script>
   ============================================================ */

const SUPABASE_URL = "https://jhyedqmoaenkyzrgpvsc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable__XbGNz6V9C8YIyprXv3L2Q_e-VDwbdl";

function setupHilltopSupabaseClient() {
  if (!window.supabase) {
    console.error("Supabase CDN script is not loaded yet.");
    window.hilltopSupabase = null;
    return;
  }

  if (
    !SUPABASE_URL ||
    !SUPABASE_PUBLISHABLE_KEY ||
    SUPABASE_URL.includes("YOUR_") ||
    SUPABASE_URL.includes("PASTE_") ||
    SUPABASE_PUBLISHABLE_KEY.includes("YOUR_") ||
    SUPABASE_PUBLISHABLE_KEY.includes("PASTE_")
  ) {
    console.warn("Supabase is not configured yet. Add your project URL and publishable/anon key in supabase-config.js.");
    window.hilltopSupabase = null;
    return;
  }

  window.hilltopSupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

  console.info("Supabase client initialized for Hilltop Properties Zambia.");
}

setupHilltopSupabaseClient();

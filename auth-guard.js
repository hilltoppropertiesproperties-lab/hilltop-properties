/* ============================================================
   HILLTOP PROPERTIES ZAMBIA - AUTH GUARD
   Reusable protection for admin pages.
   ============================================================ */

(function initAuthGuard() {
  var LOGIN_PAGE = 'login.html';
  var supabaseClient = window.hilltopSupabase;

  function currentPageName() {
    var path = window.location.pathname || '';
    return path.split('/').pop() || 'index.html';
  }

  function redirectToLogin() {
    if (currentPageName() !== LOGIN_PAGE) {
      window.location.href = LOGIN_PAGE;
    }
  }

  async function requireLogin() {
    if (!supabaseClient) {
      console.warn('Supabase client is not available. Redirecting to login.');
      redirectToLogin();
      return;
    }

    try {
      var response = await supabaseClient.auth.getSession();
      if (!response.data || !response.data.session) {
        redirectToLogin();
      }
    } catch (error) {
      console.warn('Unable to verify login session. Redirecting to login.', error);
      redirectToLogin();
    }
  }

  async function logout() {
    if (supabaseClient) {
      try {
        await supabaseClient.auth.signOut();
      } catch (error) {
        console.warn('Logout failed, returning to login anyway.', error);
      }
    }

    window.location.href = LOGIN_PAGE;
  }

  window.hilltopLogout = logout;
  window.logout = logout;

  document.querySelectorAll('[data-logout-button]').forEach(function(button) {
    button.addEventListener('click', logout);
  });

  if (currentPageName() !== LOGIN_PAGE) {
    requireLogin();
  }
})();

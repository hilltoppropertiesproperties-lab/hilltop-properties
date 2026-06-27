/* ============================================================
   HILLTOP PROPERTIES ZAMBIA — MODULE 5: WEBSITE CMS
   cms.js
   All data is frontend-only sample data.
   Later this can be replaced with Supabase API calls.
   ============================================================ */


/* ══════════════════════════════════════════════════════════════
   1. SAMPLE CMS DATA
   Later: replace these arrays with Supabase table queries.
   e.g. const { data } = await supabase.from('banners').select('*')
══════════════════════════════════════════════════════════════ */

// ── Homepage content object ──────────────────────────────────
var homepageContent = {
  heroHeadline:   'Find Your Perfect Property in Zambia',
  heroSubtitle:   'Hilltop Properties Zambia connects buyers, tenants, and investors with premium real estate in Lusaka and Livingstone.',
  ctaText:        'Browse Properties',
  ctaLink:        'https://hilltopzambia.com/properties',
  aboutText:      'Hilltop Properties Zambia has been a trusted name in the Zambian real estate market for over a decade, offering personalised service across both residential and commercial sectors.',
  servicesText:   'We offer property sales, residential and commercial rentals, property management, valuations, and expert investment advice for the Zambian market.'
};

// ── Banners ──────────────────────────────────────────────────
// Later: supabase.from('banners').select('*')
var banners = [
  {
    id: 1,
    title:      'Premium Properties in Lusaka',
    subtitle:   'Explore executive homes, apartments, and investment opportunities in the heart of Lusaka.',
    branch:     'Lusaka',
    btnText:    'View Lusaka Properties',
    btnLink:    '#',
    status:     'Published',
    imageNote:  'Lusaka City Banner'
  },
  {
    id: 2,
    title:      'Invest in Livingstone Real Estate',
    subtitle:   'Riverside lodges, rental cottages, and prime land near Victoria Falls — a growing market.',
    branch:     'Livingstone',
    btnText:    'Explore Livingstone',
    btnLink:    '#',
    status:     'Published',
    imageNote:  'Livingstone/Victoria Falls Banner'
  },
  {
    id: 3,
    title:      'Hilltop Properties — Trusted Across Zambia',
    subtitle:   'Two branches, one standard of excellence. Find your next property with Hilltop.',
    branch:     'All',
    btnText:    'Contact Us Today',
    btnLink:    '#',
    status:     'Draft',
    imageNote:  'General Brand Banner'
  }
];

// ── Team Profiles ─────────────────────────────────────────────
// Later: supabase.from('team_profiles').select('*')
var teamProfiles = [
  {
    id: 1,
    name:       'Admin User',
    jobTitle:   'Managing Director',
    branch:     'All',
    phone:      '+260 97 123 4567',
    email:      'admin@hilltopzambia.com',
    bio:        'Founder and MD of Hilltop Properties Zambia. Over 15 years of experience in Zambian real estate.',
    status:     'Visible'
  },
  {
    id: 2,
    name:       'John Phiri',
    jobTitle:   'Senior Property Agent',
    branch:     'Lusaka',
    phone:      '+260 96 234 5678',
    email:      'john.phiri@hilltopzambia.com',
    bio:        'John specialises in high-value residential sales in Lusaka\'s premium neighbourhoods including Kabulonga and Roma.',
    status:     'Visible'
  },
  {
    id: 3,
    name:       'Mary Banda',
    jobTitle:   'Lettings Manager',
    branch:     'Lusaka',
    phone:      '+260 95 345 6789',
    email:      'mary.banda@hilltopzambia.com',
    bio:        'Mary manages the Lusaka lettings portfolio and client follow-ups. Known for her warm client communication style.',
    status:     'Visible'
  },
  {
    id: 4,
    name:       'David Mwale',
    jobTitle:   'Branch Manager — Livingstone',
    branch:     'Livingstone',
    phone:      '+260 97 456 7890',
    email:      'david.mwale@hilltopzambia.com',
    bio:        'David leads the Livingstone office and has deep knowledge of the tourism and investment property market near Victoria Falls.',
    status:     'Visible'
  },
  {
    id: 5,
    name:       'Grace Mbewe',
    jobTitle:   'Marketing & CMS Officer',
    branch:     'Lusaka',
    phone:      '+260 96 567 8901',
    email:      'grace.mbewe@hilltopzambia.com',
    bio:        'Grace handles digital marketing, social media, and website content updates for Hilltop Properties Zambia.',
    status:     'Hidden'
  }
];

// ── Testimonials ──────────────────────────────────────────────
// Later: supabase.from('testimonials').select('*')
var testimonials = [
  {
    id: 1,
    clientName:  'Mr. Chanda Mulenga',
    clientType:  'Buyer',
    message:     'Hilltop Properties made buying our family home in Kabulonga completely stress-free. John was professional, honest, and always available. We could not be happier.',
    rating:      5,
    branch:      'Lusaka',
    status:      'Published'
  },
  {
    id: 2,
    clientName:  'Ms. Thandiwe Nkosi',
    clientType:  'Tenant',
    message:     'I\'ve been renting through Hilltop for two years now and the process has always been smooth. Mary is incredibly helpful and responds quickly to any issues.',
    rating:      5,
    branch:      'Lusaka',
    status:      'Published'
  },
  {
    id: 3,
    clientName:  'Mr. Peter Zimba',
    clientType:  'Landlord',
    message:     'Hilltop manages two of my properties and I\'ve had zero headaches. They find quality tenants and handle everything professionally. Highly recommended.',
    rating:      4,
    branch:      'Lusaka',
    status:      'Published'
  },
  {
    id: 4,
    clientName:  'Ms. Luyando Sikufele',
    clientType:  'Investor',
    message:     'I was looking for riverside investment land near Livingstone and David helped me find an exceptional plot. The whole experience was excellent.',
    rating:      5,
    branch:      'Livingstone',
    status:      'Pending'
  }
];

// ── Featured Properties ───────────────────────────────────────
// Later: supabase.from('featured_properties').select('*')
var featuredProperties = [
  {
    id: 1,
    ref:        'HT-LSK-001',
    title:      '4-Bedroom Executive House in Kabulonga',
    branch:     'Lusaka',
    purpose:    'For Sale',
    price:      'ZMW 2,400,000',
    propStatus: 'Active',
    featured:   true,
    order:      1
  },
  {
    id: 2,
    ref:        'HT-LSK-003',
    title:      'Commercial Office Space — Cairo Road',
    branch:     'Lusaka',
    purpose:    'For Rent',
    price:      'ZMW 22,000 / month',
    propStatus: 'Under Offer',
    featured:   true,
    order:      2
  },
  {
    id: 3,
    ref:        'HT-LVN-002',
    title:      'Riverside Lodge Plot — Victoria Falls',
    branch:     'Livingstone',
    purpose:    'For Sale',
    price:      'ZMW 3,200,000',
    propStatus: 'Active',
    featured:   true,
    order:      3
  },
  {
    id: 4,
    ref:        'HT-LVN-004',
    title:      'Commercial Guesthouse — Maramba',
    branch:     'Livingstone',
    purpose:    'For Sale',
    price:      'ZMW 4,800,000',
    propStatus: 'Under Offer',
    featured:   true,
    order:      4
  }
];

// ── News / Articles ───────────────────────────────────────────
// Later: supabase.from('articles').select('*')
var articles = [
  {
    id: 1,
    title:      'Why Invest in Lusaka Real Estate in 2025',
    category:   'Investment',
    author:     'Admin User',
    summary:    'Lusaka\'s expanding middle class, infrastructure investment, and growing demand for quality housing make it one of Africa\'s most compelling real estate markets.',
    body:       '',
    publishDate:'15 January 2025',
    status:     'Published',
    branch:     'Lusaka'
  },
  {
    id: 2,
    title:      'Livingstone Property Market Opportunities',
    category:   'Market Update',
    author:     'David Mwale',
    summary:    'Tourism growth and international interest are driving demand for lodges, guesthouses, and riverside land near Victoria Falls.',
    body:       '',
    publishDate:'22 February 2025',
    status:     'Published',
    branch:     'Livingstone'
  },
  {
    id: 3,
    title:      'Tips for First-Time Property Buyers in Zambia',
    category:   'Buyer Guide',
    author:     'Mary Banda',
    summary:    'Buying property for the first time can be overwhelming. Here are the key steps every first-time buyer in Zambia needs to know before signing anything.',
    body:       '',
    publishDate:'10 March 2025',
    status:     'Draft',
    branch:     'All'
  }
];

// ID counters for new records
var nextBannerId      = 10;
var nextTeamId        = 10;
var nextTestimonialId = 10;
var nextArticleId     = 10;


/* ══════════════════════════════════════════════════════════════
   2. STATE
══════════════════════════════════════════════════════════════ */

var currentBranch    = 'all';
var currentSearch    = '';
var currentStatus    = 'all';
var activeSection    = 'homepage';
// Which type the modal is currently working on: 'banner'|'team'|'testimonial'|'article'
var modalContentType = '';
var modalMode        = 'add'; // 'add' or 'edit'
var modalEditId      = null;


/* ══════════════════════════════════════════════════════════════
   3. DOM REFERENCES
══════════════════════════════════════════════════════════════ */

var cmsModal        = document.getElementById('cmsModal');
var modalOverlay    = document.getElementById('modalOverlay');
var cmsModalTitle   = document.getElementById('cmsModalTitle');
var cmsModalSubtitle= document.getElementById('cmsModalSubtitle');
var cmsModalBody    = document.getElementById('cmsModalBody');
var cmsModalClose   = document.getElementById('cmsModalClose');
var cmsModalCancel  = document.getElementById('cmsModalCancel');
var cmsModalSave    = document.getElementById('cmsModalSave');
var toastEl         = document.getElementById('toast');
var cmsSearch       = document.getElementById('cmsSearch');
var cmsStatusFilter = document.getElementById('cmsStatusFilter');


/* ══════════════════════════════════════════════════════════════
   4. UTILITY HELPERS
══════════════════════════════════════════════════════════════ */

// Show a brief toast notification
var toastTimer;
function showToast(msg, type) {
  type = type || 'success';
  toastEl.textContent = msg;
  toastEl.className = 'toast ' + type;
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){ toastEl.classList.add('show'); });
  });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ toastEl.classList.remove('show'); }, 3200);
}

// Get badge class for various status strings
function getBadgeClass(status) {
  var map = {
    'Published': 'badge-active',
    'Active':    'badge-active',
    'Visible':   'badge-active',
    'Draft':     'badge-draft',
    'Hidden':    'badge-withdrawn',
    'Pending':   'badge-offer',
    'Featured':  'badge-let',
    'Not Featured': 'badge-draft',
    'Under Offer':  'badge-offer',
    'Sold':      'badge-sold',
    'Let / Rented': 'badge-let',
    'Withdrawn': 'badge-withdrawn'
  };
  return map[status] || 'badge-draft';
}

// Render N filled stars as ★ and empty as ☆
function renderStars(n) {
  var s = '';
  for (var i = 1; i <= 5; i++) { s += (i <= n) ? '★' : '☆'; }
  return s;
}

// Get first letter(s) for avatars
function initials(name) {
  return name.split(' ').map(function(w){ return w[0]; }).join('').slice(0,2).toUpperCase();
}

// Branch match helper (compares lowercase)
function branchMatch(itemBranch) {
  if (currentBranch === 'all') return true;
  var ib = itemBranch.toLowerCase();
  return ib === currentBranch || ib === 'all';
}

// Search match helper
function searchMatch(str) {
  if (!currentSearch) return true;
  return str.toLowerCase().includes(currentSearch.toLowerCase());
}

// Status match helper
function statusMatch(s) {
  if (currentStatus === 'all') return true;
  return s === currentStatus;
}


/* ══════════════════════════════════════════════════════════════
   5. CMS STATS
══════════════════════════════════════════════════════════════ */

function updateCmsStats() {
  document.getElementById('statBanners').textContent =
    banners.filter(function(b){ return b.status === 'Published' && branchMatch(b.branch); }).length;

  document.getElementById('statTeam').textContent =
    teamProfiles.filter(function(t){ return t.status === 'Visible' && branchMatch(t.branch); }).length;

  document.getElementById('statTestimonials').textContent =
    testimonials.filter(function(t){ return t.status === 'Published' && branchMatch(t.branch); }).length;

  document.getElementById('statFeatured').textContent =
    featuredProperties.filter(function(p){ return p.featured && branchMatch(p.branch); }).length;
}


/* ══════════════════════════════════════════════════════════════
   6. SECTION TABS
══════════════════════════════════════════════════════════════ */

document.querySelectorAll('.cms-tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    var section = tab.dataset.section;
    switchSection(section);
  });
});

function switchSection(section) {
  activeSection = section;

  // Update tab buttons
  document.querySelectorAll('.cms-tab').forEach(function(t) {
    t.classList.toggle('active', t.dataset.section === section);
  });

  // Update section panels
  document.querySelectorAll('.cms-panel').forEach(function(p) {
    p.classList.toggle('active', p.id === 'panel-' + section);
  });

  // Hide filter bar on homepage section (it has its own controls)
  var filterBar = document.getElementById('cmsFilterBar');
  filterBar.style.display = (section === 'homepage') ? 'none' : 'flex';

  // Render the active section
  renderSection(section);
}

function renderSection(section) {
  if (section === 'homepage')     renderHomepage();
  if (section === 'banners')      renderBanners();
  if (section === 'team')         renderTeam();
  if (section === 'testimonials') renderTestimonials();
  if (section === 'featured')     renderFeatured();
  if (section === 'news')         renderArticles();
  updateCmsStats();
}


/* ══════════════════════════════════════════════════════════════
   7. HOMEPAGE CONTENT
══════════════════════════════════════════════════════════════ */

function renderHomepage() {
  document.getElementById('hpHeroHeadline').value  = homepageContent.heroHeadline;
  document.getElementById('hpHeroSubtitle').value  = homepageContent.heroSubtitle;
  document.getElementById('hpCtaText').value       = homepageContent.ctaText;
  document.getElementById('hpCtaLink').value       = homepageContent.ctaLink;
  document.getElementById('hpAboutText').value     = homepageContent.aboutText;
  document.getElementById('hpServicesText').value  = homepageContent.servicesText;
}

function readHomepageForm() {
  homepageContent.heroHeadline  = document.getElementById('hpHeroHeadline').value.trim();
  homepageContent.heroSubtitle  = document.getElementById('hpHeroSubtitle').value.trim();
  homepageContent.ctaText       = document.getElementById('hpCtaText').value.trim();
  homepageContent.ctaLink       = document.getElementById('hpCtaLink').value.trim();
  homepageContent.aboutText     = document.getElementById('hpAboutText').value.trim();
  homepageContent.servicesText  = document.getElementById('hpServicesText').value.trim();
}

document.getElementById('btnHpDraft').addEventListener('click', function() {
  readHomepageForm();
  showToast('Homepage content saved as Draft', 'success');
  // Later: supabase.from('homepage_content').upsert(homepageContent)
});

document.getElementById('btnHpPreview').addEventListener('click', function() {
  readHomepageForm();
  showToast('Preview opened — connect to live website in a later phase', 'success');
});

document.getElementById('btnHpPublish').addEventListener('click', function() {
  readHomepageForm();
  showToast('Homepage content published successfully!', 'success');
  // Later: supabase.from('homepage_content').upsert({ ...homepageContent, status: 'published' })
});


/* ══════════════════════════════════════════════════════════════
   8. BANNERS
══════════════════════════════════════════════════════════════ */

function renderBanners() {
  var grid  = document.getElementById('bannerGrid');
  var empty = document.getElementById('bannerEmpty');

  var filtered = banners.filter(function(b) {
    return branchMatch(b.branch)
        && statusMatch(b.status)
        && searchMatch(b.title + ' ' + b.subtitle);
  });

  if (!filtered.length) {
    grid.innerHTML = '';
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';
  grid.innerHTML = '';

  filtered.forEach(function(b) {
    var bc  = getBadgeClass(b.status);
    var card = document.createElement('div');
    card.className = 'banner-card';
    card.innerHTML = [
      '<div class="banner-image-placeholder">',
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>',
        '<p>Image placeholder</p>',
        '<span class="banner-image-note">',
          'Image storage: backend phase',
        '</span>',
      '</div>',
      '<div class="banner-body">',
        '<div class="banner-meta">',
          '<span class="badge ' + bc + '">' + b.status + '</span>',
          '<span class="banner-branch-pill">' + b.branch + '</span>',
        '</div>',
        '<div class="banner-title">' + b.title + '</div>',
        '<div class="banner-subtitle">' + b.subtitle + '</div>',
        (b.btnText ? '<div style="font-size:12px;color:var(--text-light);margin-top:4px;">Button: <strong>' + b.btnText + '</strong></div>' : ''),
      '</div>',
      '<div class="banner-actions">',
        '<button class="action-btn outline small" onclick="openCmsModal(\'banner\',\'edit\',' + b.id + ')">Edit</button>',
        '<button class="action-btn small ' + (b.status === 'Published' ? 'danger' : 'secondary') + '" onclick="toggleBannerStatus(' + b.id + ')">',
          (b.status === 'Published' ? 'Unpublish' : 'Publish'),
        '</button>',
        '<button class="action-btn danger small" onclick="deleteCmsRecord(\'banner\',' + b.id + ')">Delete</button>',
      '</div>'
    ].join('');
    grid.appendChild(card);
  });
}

document.getElementById('btnAddBanner').addEventListener('click', function() {
  openCmsModal('banner', 'add');
});

function toggleBannerStatus(id) {
  var b = banners.find(function(x){ return x.id === id; });
  if (!b) return;
  b.status = (b.status === 'Published') ? 'Draft' : 'Published';
  renderBanners();
  updateCmsStats();
  showToast('Banner ' + (b.status === 'Published' ? 'published' : 'unpublished'), 'success');
}


/* ══════════════════════════════════════════════════════════════
   9. TEAM PROFILES
══════════════════════════════════════════════════════════════ */

function renderTeam() {
  var grid  = document.getElementById('teamGrid');
  var empty = document.getElementById('teamEmpty');

  var filtered = teamProfiles.filter(function(t) {
    return branchMatch(t.branch)
        && statusMatch(t.status)
        && searchMatch(t.name + ' ' + t.jobTitle);
  });

  if (!filtered.length) {
    grid.innerHTML = '';
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';
  grid.innerHTML = '';

  filtered.forEach(function(t) {
    var bc   = getBadgeClass(t.status);
    var card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = [
      '<div class="team-card-top">',
        '<div class="team-avatar">' + initials(t.name) + '</div>',
        '<div class="team-name">' + t.name + '</div>',
        '<div class="team-title">' + t.jobTitle + '</div>',
      '</div>',
      '<div class="team-card-body">',
        '<div class="team-contact-row">',
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.66A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>',
          t.phone,
        '</div>',
        '<div class="team-contact-row">',
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
          t.email,
        '</div>',
        '<div class="team-contact-row">',
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>',
          t.branch,
        '</div>',
        (t.bio ? '<div class="team-bio">' + t.bio + '</div>' : ''),
      '</div>',
      '<div class="team-card-footer">',
        '<span class="badge ' + bc + '" style="margin-right:auto">' + t.status + '</span>',
        '<button class="action-btn outline small" onclick="openCmsModal(\'team\',\'edit\',' + t.id + ')">Edit</button>',
        '<button class="action-btn small ' + (t.status === 'Visible' ? 'danger' : 'secondary') + '" onclick="toggleTeamStatus(' + t.id + ')">',
          (t.status === 'Visible' ? 'Hide' : 'Show'),
        '</button>',
        '<button class="action-btn danger small" onclick="deleteCmsRecord(\'team\',' + t.id + ')">Delete</button>',
      '</div>'
    ].join('');
    grid.appendChild(card);
  });
}

document.getElementById('btnAddTeam').addEventListener('click', function() {
  openCmsModal('team', 'add');
});

function toggleTeamStatus(id) {
  var t = teamProfiles.find(function(x){ return x.id === id; });
  if (!t) return;
  t.status = (t.status === 'Visible') ? 'Hidden' : 'Visible';
  renderTeam();
  updateCmsStats();
  showToast('Profile ' + t.status.toLowerCase(), 'success');
}


/* ══════════════════════════════════════════════════════════════
   10. TESTIMONIALS
══════════════════════════════════════════════════════════════ */

function renderTestimonials() {
  var list  = document.getElementById('testimonialList');
  var empty = document.getElementById('testimonialEmpty');

  var filtered = testimonials.filter(function(t) {
    return branchMatch(t.branch)
        && statusMatch(t.status)
        && searchMatch(t.clientName + ' ' + t.message);
  });

  if (!filtered.length) {
    list.innerHTML = '';
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';
  list.innerHTML = '';

  filtered.forEach(function(t) {
    var bc   = getBadgeClass(t.status);
    var item = document.createElement('div');
    item.className = 'cms-list-item testimonial-item';
    item.innerHTML = [
      '<div class="testimonial-avatar">' + initials(t.clientName) + '</div>',
      '<div class="testimonial-content">',
        '<div class="testimonial-client">' + t.clientName + '</div>',
        '<div class="testimonial-type">' + t.clientType + '</div>',
        '<div class="testimonial-stars">' + renderStars(t.rating) + '</div>',
        '<div class="testimonial-message">"' + t.message + '"</div>',
        '<div class="testimonial-meta">',
          '<span class="badge ' + bc + '">' + t.status + '</span>',
          '<span class="banner-branch-pill">' + t.branch + '</span>',
        '</div>',
      '</div>',
      '<div class="item-actions">',
        (t.status === 'Pending' ?
          '<button class="action-btn secondary small" onclick="approveTestimonial(' + t.id + ')">Approve</button>' : ''),
        '<button class="action-btn outline small" onclick="openCmsModal(\'testimonial\',\'edit\',' + t.id + ')">Edit</button>',
        '<button class="action-btn small ' + (t.status === 'Published' ? 'danger' : 'secondary') + '" onclick="toggleTestimonialStatus(' + t.id + ')">',
          (t.status === 'Published' ? 'Hide' : 'Publish'),
        '</button>',
        '<button class="action-btn danger small" onclick="deleteCmsRecord(\'testimonial\',' + t.id + ')">Delete</button>',
      '</div>'
    ].join('');
    list.appendChild(item);
  });
}

document.getElementById('btnAddTestimonial').addEventListener('click', function() {
  openCmsModal('testimonial', 'add');
});

function approveTestimonial(id) {
  var t = testimonials.find(function(x){ return x.id === id; });
  if (!t) return;
  t.status = 'Published';
  renderTestimonials();
  updateCmsStats();
  showToast('Testimonial approved and published', 'success');
}

function toggleTestimonialStatus(id) {
  var t = testimonials.find(function(x){ return x.id === id; });
  if (!t) return;
  t.status = (t.status === 'Published') ? 'Hidden' : 'Published';
  renderTestimonials();
  updateCmsStats();
  showToast('Testimonial ' + t.status.toLowerCase(), 'success');
}


/* ══════════════════════════════════════════════════════════════
   11. FEATURED PROPERTIES
══════════════════════════════════════════════════════════════ */

function renderFeatured() {
  var tbody = document.getElementById('featuredTableBody');
  tbody.innerHTML = '';

  // Sort by order value
  var sorted = featuredProperties.slice().sort(function(a,b){ return a.order - b.order; });
  var filtered = sorted.filter(function(p) {
    return branchMatch(p.branch) && searchMatch(p.ref + ' ' + p.title);
  });

  filtered.forEach(function(p, idx) {
    var bc  = getBadgeClass(p.propStatus);
    var fp  = p.featured ? 'badge-active' : 'badge-draft';
    var row = document.createElement('tr');
    row.innerHTML = [
      '<td>',
        '<div class="order-controls">',
          '<button class="btn-move" onclick="moveFeatured(' + p.id + ',-1)" title="Move up">',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>',
          '</button>',
          '<span style="font-size:12px;font-weight:700;color:var(--text-mid)">' + p.order + '</span>',
          '<button class="btn-move" onclick="moveFeatured(' + p.id + ',1)" title="Move down">',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>',
          '</button>',
        '</div>',
      '</td>',
      '<td><span class="prop-ref" style="font-size:12px;font-weight:600;color:var(--text-light)">' + p.ref + '</span></td>',
      '<td style="font-weight:600;max-width:220px">' + p.title + '</td>',
      '<td>' + p.branch + '</td>',
      '<td><span class="purpose-pill ' + (p.purpose === 'For Sale' ? 'pill-sale' : 'pill-rent') + '">' + p.purpose + '</span></td>',
      '<td style="font-weight:600;white-space:nowrap">' + p.price + '</td>',
      '<td><span class="badge ' + bc + '">' + p.propStatus + '</span></td>',
      '<td><span class="badge ' + fp + '">' + (p.featured ? 'Featured' : 'Not Featured') + '</span></td>',
      '<td>',
        '<div class="table-actions">',
          '<button class="action-btn small ' + (p.featured ? 'danger' : 'secondary') + '" onclick="toggleFeatured(' + p.id + ')">',
            (p.featured ? 'Unfeature' : 'Feature'),
          '</button>',
        '</div>',
      '</td>'
    ].join('');
    tbody.appendChild(row);
  });
}

function toggleFeatured(id) {
  var p = featuredProperties.find(function(x){ return x.id === id; });
  if (!p) return;
  p.featured = !p.featured;
  renderFeatured();
  updateCmsStats();
  showToast(p.featured ? 'Property featured on homepage' : 'Property removed from homepage', 'success');
}

function moveFeatured(id, direction) {
  var idx = featuredProperties.findIndex(function(x){ return x.id === id; });
  if (idx < 0) return;
  var swap = featuredProperties.findIndex(function(x){ return x.order === featuredProperties[idx].order + direction; });
  if (swap < 0) return;
  // Swap order values
  var tmp = featuredProperties[idx].order;
  featuredProperties[idx].order = featuredProperties[swap].order;
  featuredProperties[swap].order = tmp;
  renderFeatured();
}


/* ══════════════════════════════════════════════════════════════
   12. NEWS / ARTICLES
══════════════════════════════════════════════════════════════ */

function renderArticles() {
  var list  = document.getElementById('articleList');
  var empty = document.getElementById('articleEmpty');

  var filtered = articles.filter(function(a) {
    return branchMatch(a.branch)
        && statusMatch(a.status)
        && searchMatch(a.title + ' ' + a.author + ' ' + a.category);
  });

  if (!filtered.length) {
    list.innerHTML = '';
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';
  list.innerHTML = '';

  filtered.forEach(function(a) {
    var bc   = getBadgeClass(a.status);
    var item = document.createElement('div');
    item.className = 'cms-list-item article-item';
    item.innerHTML = [
      '<div class="article-content">',
        '<div class="article-title">' + a.title + '</div>',
        '<div class="article-meta">',
          '<span>',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
            a.author,
          '</span>',
          '<span>',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
            a.publishDate,
          '</span>',
          '<span>' + a.category + '</span>',
          '<span class="badge ' + bc + '">' + a.status + '</span>',
        '</div>',
        '<div class="article-summary">' + a.summary + '</div>',
      '</div>',
      '<div class="item-actions">',
        '<button class="action-btn outline small" onclick="openCmsModal(\'article\',\'edit\',' + a.id + ')">Edit</button>',
        '<button class="action-btn small ' + (a.status === 'Published' ? 'danger' : 'secondary') + '" onclick="toggleArticleStatus(' + a.id + ')">',
          (a.status === 'Published' ? 'Unpublish' : 'Publish'),
        '</button>',
        '<button class="action-btn danger small" onclick="deleteCmsRecord(\'article\',' + a.id + ')">Delete</button>',
      '</div>'
    ].join('');
    list.appendChild(item);
  });
}

document.getElementById('btnAddArticle').addEventListener('click', function() {
  openCmsModal('article', 'add');
});

function toggleArticleStatus(id) {
  var a = articles.find(function(x){ return x.id === id; });
  if (!a) return;
  a.status = (a.status === 'Published') ? 'Draft' : 'Published';
  renderArticles();
  showToast('Article ' + a.status.toLowerCase(), 'success');
}


/* ══════════════════════════════════════════════════════════════
   13. GENERIC DELETE
══════════════════════════════════════════════════════════════ */

function deleteCmsRecord(type, id) {
  var confirmMsg = {
    banner:      'Delete this banner?',
    team:        'Remove this team profile?',
    testimonial: 'Delete this testimonial?',
    article:     'Delete this article?'
  };
  if (!confirm(confirmMsg[type] || 'Delete this item?')) return;

  if (type === 'banner')       banners       = banners.filter(function(x){ return x.id !== id; });
  if (type === 'team')         teamProfiles  = teamProfiles.filter(function(x){ return x.id !== id; });
  if (type === 'testimonial')  testimonials  = testimonials.filter(function(x){ return x.id !== id; });
  if (type === 'article')      articles      = articles.filter(function(x){ return x.id !== id; });

  renderSection(activeSection);
  showToast('Record deleted', 'success');
}


/* ══════════════════════════════════════════════════════════════
   14. CMS MODAL — OPEN
══════════════════════════════════════════════════════════════ */

function openCmsModal(type, mode, id) {
  modalContentType = type;
  modalMode        = mode;
  modalEditId      = id || null;

  var titles = {
    banner:      { add: 'Add New Banner',       edit: 'Edit Banner' },
    team:        { add: 'Add Team Profile',      edit: 'Edit Team Profile' },
    testimonial: { add: 'Add Testimonial',       edit: 'Edit Testimonial' },
    article:     { add: 'Add Article',           edit: 'Edit Article' }
  };

  cmsModalTitle.textContent    = titles[type][mode];
  cmsModalSubtitle.textContent = (mode === 'add') ? 'Fill in the details below.' : 'Update the details below.';

  // Inject the correct form into the modal body
  cmsModalBody.innerHTML = buildModalForm(type, mode, id);

  // Show modal
  cmsModal.style.display = 'flex';
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){ cmsModal.classList.add('open'); });
  });
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}


/* ══════════════════════════════════════════════════════════════
   15. MODAL FORM BUILDER
   Returns HTML string for the form body based on content type.
══════════════════════════════════════════════════════════════ */

function buildModalForm(type, mode, id) {
  var record = null;

  if (mode === 'edit') {
    if (type === 'banner')       record = banners.find(function(x){ return x.id === id; });
    if (type === 'team')         record = teamProfiles.find(function(x){ return x.id === id; });
    if (type === 'testimonial')  record = testimonials.find(function(x){ return x.id === id; });
    if (type === 'article')      record = articles.find(function(x){ return x.id === id; });
  }

  var v = function(field, def) {
    return (record && record[field] !== undefined) ? record[field] : (def || '');
  };

  var branchOptions = [
    '<option value="All"'           + (v('branch') === 'All'           ? ' selected' : '') + '>All Branches</option>',
    '<option value="Lusaka"'        + (v('branch') === 'Lusaka'        ? ' selected' : '') + '>Lusaka</option>',
    '<option value="Livingstone"'   + (v('branch') === 'Livingstone'   ? ' selected' : '') + '>Livingstone</option>'
  ].join('');

  // ── BANNER FORM ──────────────────────────────────────────────
  if (type === 'banner') {
    return [
      '<div class="form-section-label">Banner Details</div>',
      '<div class="form-group full"><label>Banner Title</label>',
        '<input type="text" id="mf_title" value="' + v('title') + '" placeholder="e.g. Premium Properties in Lusaka" /></div>',
      '<div class="form-group full"><label>Subtitle</label>',
        '<textarea id="mf_subtitle" rows="2">' + v('subtitle') + '</textarea></div>',
      '<div class="form-row">',
        '<div class="form-group half"><label>Branch</label>',
          '<select id="mf_branch">' + branchOptions + '</select></div>',
        '<div class="form-group half"><label>Status</label>',
          '<select id="mf_status">',
            '<option value="Draft"' + (v('status') === 'Draft' ? ' selected' : '') + '>Draft</option>',
            '<option value="Published"' + (v('status') === 'Published' ? ' selected' : '') + '>Published</option>',
          '</select></div>',
      '</div>',
      '<div class="form-row">',
        '<div class="form-group half"><label>CTA Button Text</label>',
          '<input type="text" id="mf_btnText" value="' + v('btnText') + '" /></div>',
        '<div class="form-group half"><label>CTA Button Link</label>',
          '<input type="url" id="mf_btnLink" value="' + v('btnLink') + '" placeholder="https://…" /></div>',
      '</div>',
      '<div class="form-section-label">Banner Image</div>',
      '<div class="cms-img-upload">',
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
        '<p>Click to upload a banner image</p>',
      '</div>',
      '<p class="cms-img-note">Image storage will be connected to secure backend storage in a later phase.</p>'
    ].join('');
  }

  // ── TEAM FORM ─────────────────────────────────────────────────
  if (type === 'team') {
    return [
      '<div class="form-section-label">Personal Details</div>',
      '<div class="form-row">',
        '<div class="form-group half"><label>Full Name</label>',
          '<input type="text" id="mf_name" value="' + v('name') + '" /></div>',
        '<div class="form-group half"><label>Job Title</label>',
          '<input type="text" id="mf_jobTitle" value="' + v('jobTitle') + '" /></div>',
      '</div>',
      '<div class="form-row">',
        '<div class="form-group third"><label>Branch</label>',
          '<select id="mf_branch">' + branchOptions + '</select></div>',
        '<div class="form-group third"><label>Phone</label>',
          '<input type="tel" id="mf_phone" value="' + v('phone') + '" /></div>',
        '<div class="form-group third"><label>Email</label>',
          '<input type="email" id="mf_email" value="' + v('email') + '" /></div>',
      '</div>',
      '<div class="form-group full"><label>Short Bio</label>',
        '<textarea id="mf_bio" rows="3">' + v('bio') + '</textarea></div>',
      '<div class="form-row">',
        '<div class="form-group half"><label>Visibility</label>',
          '<select id="mf_status">',
            '<option value="Visible"' + (v('status') === 'Visible' ? ' selected' : '') + '>Visible</option>',
            '<option value="Hidden"'  + (v('status') === 'Hidden'  ? ' selected' : '') + '>Hidden</option>',
          '</select></div>',
      '</div>',
      '<div class="form-section-label">Profile Photo</div>',
      '<div class="cms-img-upload">',
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
        '<p>Click to upload a profile photo</p>',
      '</div>',
      '<p class="cms-img-note">Image storage will be connected to secure backend storage in a later phase.</p>'
    ].join('');
  }

  // ── TESTIMONIAL FORM ──────────────────────────────────────────
  if (type === 'testimonial') {
    var stars = '';
    for (var s = 5; s >= 1; s--) {
      stars += '<input type="radio" name="mf_rating" id="star' + s + '" value="' + s + '"' + (v('rating', 5) == s ? ' checked' : '') + ' />';
      stars += '<label for="star' + s + '">★</label>';
    }
    return [
      '<div class="form-row">',
        '<div class="form-group half"><label>Client Name</label>',
          '<input type="text" id="mf_clientName" value="' + v('clientName') + '" /></div>',
        '<div class="form-group half"><label>Client Type</label>',
          '<select id="mf_clientType">',
            '<option value="Buyer"'    + (v('clientType') === 'Buyer'    ? ' selected' : '') + '>Buyer</option>',
            '<option value="Tenant"'   + (v('clientType') === 'Tenant'   ? ' selected' : '') + '>Tenant</option>',
            '<option value="Landlord"' + (v('clientType') === 'Landlord' ? ' selected' : '') + '>Landlord</option>',
            '<option value="Investor"' + (v('clientType') === 'Investor' ? ' selected' : '') + '>Investor</option>',
          '</select></div>',
      '</div>',
      '<div class="form-group full"><label>Testimonial Message</label>',
        '<textarea id="mf_message" rows="4">' + v('message') + '</textarea></div>',
      '<div class="form-group full"><label>Rating</label>',
        '<div class="star-rating-input">' + stars + '</div></div>',
      '<div class="form-row">',
        '<div class="form-group half"><label>Branch</label>',
          '<select id="mf_branch">' + branchOptions + '</select></div>',
        '<div class="form-group half"><label>Status</label>',
          '<select id="mf_status">',
            '<option value="Pending"'   + (v('status') === 'Pending'   ? ' selected' : '') + '>Pending</option>',
            '<option value="Published"' + (v('status') === 'Published' ? ' selected' : '') + '>Published</option>',
            '<option value="Hidden"'    + (v('status') === 'Hidden'    ? ' selected' : '') + '>Hidden</option>',
          '</select></div>',
      '</div>'
    ].join('');
  }

  // ── ARTICLE FORM ──────────────────────────────────────────────
  if (type === 'article') {
    return [
      '<div class="form-group full"><label>Article Title</label>',
        '<input type="text" id="mf_title" value="' + v('title') + '" /></div>',
      '<div class="form-row">',
        '<div class="form-group third"><label>Category</label>',
          '<select id="mf_category">',
            ['Investment','Market Update','Buyer Guide','Seller Guide','Rental Tips','Company News'].map(function(c){
              return '<option' + (v('category') === c ? ' selected' : '') + '>' + c + '</option>';
            }).join(''),
          '</select></div>',
        '<div class="form-group third"><label>Author</label>',
          '<input type="text" id="mf_author" value="' + v('author') + '" /></div>',
        '<div class="form-group third"><label>Branch</label>',
          '<select id="mf_branch">' + branchOptions + '</select></div>',
      '</div>',
      '<div class="form-group full"><label>Summary</label>',
        '<textarea id="mf_summary" rows="2">' + v('summary') + '</textarea></div>',
      '<div class="form-group full"><label>Body / Content</label>',
        '<textarea id="mf_body" rows="6" placeholder="Full article text…">' + v('body') + '</textarea></div>',
      '<div class="form-row">',
        '<div class="form-group half"><label>Publish Date</label>',
          '<input type="text" id="mf_publishDate" value="' + v('publishDate') + '" placeholder="e.g. 15 January 2025" /></div>',
        '<div class="form-group half"><label>Status</label>',
          '<select id="mf_status">',
            '<option value="Draft"'     + (v('status') === 'Draft'     ? ' selected' : '') + '>Draft</option>',
            '<option value="Published"' + (v('status') === 'Published' ? ' selected' : '') + '>Published</option>',
          '</select></div>',
      '</div>'
    ].join('');
  }

  return '<p style="color:var(--text-light);padding:20px">Unknown content type.</p>';
}


/* ══════════════════════════════════════════════════════════════
   16. MODAL — SAVE
══════════════════════════════════════════════════════════════ */

cmsModalSave.addEventListener('click', function() {
  saveCmsModal();
});

function saveCmsModal() {
  var type = modalContentType;
  var mode = modalMode;
  var id   = modalEditId;

  // Helper: read a field value safely
  function fv(fieldId) {
    var el = document.getElementById(fieldId);
    return el ? el.value.trim() : '';
  }

  if (type === 'banner') {
    var record = {
      title:    fv('mf_title'),
      subtitle: fv('mf_subtitle'),
      branch:   fv('mf_branch'),
      status:   fv('mf_status'),
      btnText:  fv('mf_btnText'),
      btnLink:  fv('mf_btnLink'),
      imageNote:''
    };
    if (!record.title) { showToast('Please enter a banner title', 'error'); return; }
    if (mode === 'add') {
      record.id = nextBannerId++;
      banners.push(record);
    } else {
      var idx = banners.findIndex(function(x){ return x.id === id; });
      if (idx > -1) { record.id = id; banners[idx] = record; }
    }
  }

  if (type === 'team') {
    var record = {
      name:     fv('mf_name'),
      jobTitle: fv('mf_jobTitle'),
      branch:   fv('mf_branch'),
      phone:    fv('mf_phone'),
      email:    fv('mf_email'),
      bio:      fv('mf_bio'),
      status:   fv('mf_status')
    };
    if (!record.name) { showToast('Please enter a name', 'error'); return; }
    if (mode === 'add') {
      record.id = nextTeamId++;
      teamProfiles.push(record);
    } else {
      var idx = teamProfiles.findIndex(function(x){ return x.id === id; });
      if (idx > -1) { record.id = id; teamProfiles[idx] = record; }
    }
  }

  if (type === 'testimonial') {
    var ratingEl = document.querySelector('input[name="mf_rating"]:checked');
    var record = {
      clientName: fv('mf_clientName'),
      clientType: fv('mf_clientType'),
      message:    fv('mf_message'),
      rating:     ratingEl ? parseInt(ratingEl.value) : 5,
      branch:     fv('mf_branch'),
      status:     fv('mf_status')
    };
    if (!record.clientName) { showToast('Please enter a client name', 'error'); return; }
    if (mode === 'add') {
      record.id = nextTestimonialId++;
      testimonials.push(record);
    } else {
      var idx = testimonials.findIndex(function(x){ return x.id === id; });
      if (idx > -1) { record.id = id; testimonials[idx] = record; }
    }
  }

  if (type === 'article') {
    var record = {
      title:       fv('mf_title'),
      category:    fv('mf_category'),
      author:      fv('mf_author'),
      branch:      fv('mf_branch'),
      summary:     fv('mf_summary'),
      body:        fv('mf_body'),
      publishDate: fv('mf_publishDate'),
      status:      fv('mf_status')
    };
    if (!record.title) { showToast('Please enter an article title', 'error'); return; }
    if (mode === 'add') {
      record.id = nextArticleId++;
      articles.push(record);
    } else {
      var idx = articles.findIndex(function(x){ return x.id === id; });
      if (idx > -1) { record.id = id; articles[idx] = record; }
    }
  }

  // Later: supabase.from(tableMap[type]).upsert(record)

  closeCmsModal();
  renderSection(activeSection);
  updateCmsStats();
  showToast((mode === 'add' ? 'Record added' : 'Record updated') + ' successfully', 'success');
}


/* ══════════════════════════════════════════════════════════════
   17. MODAL — CLOSE
══════════════════════════════════════════════════════════════ */

function closeCmsModal() {
  cmsModal.classList.remove('open');
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(function(){ cmsModal.style.display = 'none'; }, 320);
}

cmsModalClose.addEventListener('click',  closeCmsModal);
cmsModalCancel.addEventListener('click', closeCmsModal);
modalOverlay.addEventListener('click',   closeCmsModal);


/* ══════════════════════════════════════════════════════════════
   18. BRANCH FILTER
══════════════════════════════════════════════════════════════ */

document.querySelectorAll('.branch-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.branch-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    currentBranch = btn.dataset.branch;
    renderSection(activeSection);
  });
});


/* ══════════════════════════════════════════════════════════════
   19. SEARCH & STATUS FILTER
══════════════════════════════════════════════════════════════ */

cmsSearch.addEventListener('input', function() {
  currentSearch = cmsSearch.value.trim();
  renderSection(activeSection);
});

cmsStatusFilter.addEventListener('change', function() {
  currentStatus = cmsStatusFilter.value;
  renderSection(activeSection);
});


/* ══════════════════════════════════════════════════════════════
   20. MOBILE SIDEBAR TOGGLE
══════════════════════════════════════════════════════════════ */

var hamburgerBtn   = document.getElementById('hamburger');
var sidebar        = document.getElementById('sidebar');
var sidebarOverlay = document.getElementById('sidebarOverlay');

if (hamburgerBtn && sidebar && sidebarOverlay) {
  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    if (!cmsModal.classList.contains('open')) {
      document.body.style.overflow = '';
    }
  }
  hamburgerBtn.addEventListener('click', function() {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  sidebarOverlay.addEventListener('click', function() {
    if (cmsModal.classList.contains('open')) {
      closeCmsModal();
    } else {
      closeSidebar();
    }
  });
}


/* ══════════════════════════════════════════════════════════════
   21. INITIAL PAGE LOAD
══════════════════════════════════════════════════════════════ */

// Render homepage section first (default active tab)
renderSection('homepage');
// Hide the filter bar on initial load (homepage tab is active)
document.getElementById('cmsFilterBar').style.display = 'none';
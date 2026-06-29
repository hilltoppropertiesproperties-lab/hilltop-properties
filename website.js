/* ============================================================
   HILLTOP PROPERTIES ZAMBIA - PUBLIC WEBSITE
   Phase 8A: read-only Supabase public data loading.
   ============================================================ */

var publicState = {
  properties: [],
  images: [],
  branches: [],
  staffProfiles: [],
  homepage: null,
  banners: [],
  teamProfiles: [],
  testimonials: [],
  featuredRows: [],
  appSettings: {},
  search: '',
  purpose: 'all',
  type: 'all',
  branch: 'all',
  publicStatus: 'all',
  sort: 'newest'
};

var fallbackContact = {
  phone: '+260 211 000 001',
  email: 'admin@hilltopproperties.co.zm',
  address: 'Kabulonga, Lusaka, Zambia'
};

var enquirySubmitting = false;
var activeEnquiryProperty = null;
var PUBLIC_SETTING_KEYS = [
  'company_profile',
  'website_preferences',
  'seo_metadata',
  'homepage_hero_video_url',
  'homepage_hero_poster_url',
  'homepage_hero_video_updated_at'
];

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function byId(id) {
  return document.getElementById(id);
}

function getSupabaseClient() {
  return window.hilltopSupabase || null;
}

function showStatus(message, type) {
  var status = byId('siteStatus');
  if (!status) return;
  status.textContent = message;
  status.className = 'site-status' + (type ? ' ' + type : '');
}

function hideStatus() {
  var status = byId('siteStatus');
  if (status) status.className = 'site-status hidden';
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, function(ch) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
  });
}

function formatPrice(price, purpose) {
  var amount = Number(price || 0);
  var formatted = 'ZMW ' + amount.toLocaleString('en-ZM', {
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2
  });
  return purpose === 'For Rent' ? formatted + ' / month' : formatted;
}

function buildLookup(rows) {
  var lookup = {};
  (rows || []).forEach(function(row) {
    lookup[String(row.id)] = row;
  });
  return lookup;
}

function getBranchName(branchId) {
  var branch = publicState.branches.find(function(item) {
    return String(item.id) === String(branchId);
  });
  return branch ? branch.name : 'Hilltop Branch';
}

function getBranchById(branchId) {
  return publicState.branches.find(function(item) {
    return String(item.id) === String(branchId);
  }) || null;
}

function getPropertyById(propertyId) {
  return publicState.properties.find(function(item) {
    return String(item.id) === String(propertyId);
  }) || null;
}

function getCoverImage(propertyId) {
  var rows = publicState.images
    .filter(function(image) { return String(image.property_id) === String(propertyId); })
    .sort(function(a, b) {
      if (a.is_cover && !b.is_cover) return -1;
      if (!a.is_cover && b.is_cover) return 1;
      return Number(a.display_order || 0) - Number(b.display_order || 0);
    });
  return rows.length ? rows[0].image_url : '';
}

function stars(rating) {
  var count = Number(rating || 5);
  var output = '';
  for (var i = 1; i <= 5; i += 1) output += i <= count ? '*' : '-';
  return output;
}

function initials(name) {
  return String(name || 'HP').split(' ').map(function(part) {
    return part.charAt(0);
  }).join('').slice(0, 2).toUpperCase();
}

async function safeSelect(label, queryBuilder, fallback) {
  try {
    var result = await queryBuilder();
    if (result.error) throw result.error;
    return result.data || fallback || [];
  } catch (error) {
    console.warn('Public website could not load ' + label + '.', error);
    return fallback || [];
  }
}

async function loadPublicData() {
  var supabase = getSupabaseClient();
  if (!supabase) {
    showStatus('Supabase is not configured. Showing fallback website content.', 'error');
    renderWebsite();
    return;
  }

  showStatus('Loading website content...');

  var results = await Promise.all([
    safeSelect('properties', function() {
      return supabase
        .from('properties')
        .select('id, reference_number, title, description, price, purpose, property_type, area, full_address, bedrooms, bathrooms, garages, square_metres, status, featured, branch_id, created_at')
        .in('status', ['Active', 'Under Offer'])
        .order('created_at', { ascending: false });
    }),
    safeSelect('property images', function() {
      return supabase
        .from('property_images')
        .select('property_id, image_url, display_order, is_cover')
        .order('display_order', { ascending: true });
    }),
    safeSelect('branches', function() {
      return supabase
        .from('branches')
        .select('id, name, address, contact_number')
        .order('name', { ascending: true });
    }),
    safeSelect('homepage content', function() {
      return supabase
        .from('cms_homepage_content')
        .select('id, hero_title, hero_subtitle, hero_button_text, hero_button_link, about_title, about_content, contact_phone, contact_email, contact_address, updated_at')
        .order('updated_at', { ascending: false })
        .limit(1);
    }),
    safeSelect('CMS banners', function() {
      return supabase
        .from('cms_banners')
        .select('id, title, subtitle, image_url, button_text, button_link, display_order, is_active')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
    }),
    safeSelect('CMS team profiles', function() {
      return supabase
        .from('cms_team_profiles')
        .select('id, display_name, role_title, bio, photo_url, display_order, is_visible')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });
    }),
    safeSelect('CMS testimonials', function() {
      return supabase
        .from('cms_testimonials')
        .select('id, client_name, client_role, message, rating, display_order, is_visible')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });
    }),
    safeSelect('CMS featured properties', function() {
      return supabase
        .from('cms_featured_properties')
        .select('id, property_id, display_order, is_visible')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });
    }),
    safeSelect('app settings', function() {
      return supabase
        .from('app_settings')
        .select('setting_key, setting_value')
        .in('setting_key', PUBLIC_SETTING_KEYS);
    })
  ]);

  publicState.properties = results[0];
  publicState.images = results[1];
  publicState.branches = results[2];
  publicState.homepage = results[3] && results[3].length ? results[3][0] : null;
  publicState.banners = results[4];
  publicState.teamProfiles = results[5];
  publicState.testimonials = results[6];
  publicState.featuredRows = results[7];
  publicState.appSettings = {};
  (results[8] || []).forEach(function(row) {
    publicState.appSettings[row.setting_key] = row.setting_value || {};
  });
  publicState.staffProfiles = [];

  renderWebsite();
  hideStatus();

  if (!publicState.properties.length) {
    showStatus('No active public properties are available yet. Please check back soon or contact Hilltop Properties for current listings.', 'error');
  }
}

async function loadSharedPublicData() {
  var supabase = getSupabaseClient();
  if (!supabase) {
    renderContact();
    return;
  }

  var results = await Promise.all([
    safeSelect('branches', function() {
      return supabase
        .from('branches')
        .select('id, name, address, contact_number')
        .order('name', { ascending: true });
    }),
    safeSelect('app settings', function() {
      return supabase
        .from('app_settings')
        .select('setting_key, setting_value')
        .in('setting_key', PUBLIC_SETTING_KEYS);
    })
  ]);

  publicState.branches = results[0];
  publicState.appSettings = {};
  (results[1] || []).forEach(function(row) {
    publicState.appSettings[row.setting_key] = row.setting_value || {};
  });

  renderContact();
}

async function loadListingsData() {
  var supabase = getSupabaseClient();
  if (!supabase) {
    showStatus('Supabase is not configured. Listings cannot be loaded right now.', 'error');
    renderListingsPage();
    return;
  }

  showStatus('Loading available properties...');

  try {
    var results = await Promise.all([
      supabase
        .from('properties')
        .select('id, reference_number, title, description, price, purpose, property_type, area, full_address, bedrooms, bathrooms, garages, square_metres, status, featured, branch_id, created_at')
        .in('status', ['Active', 'Under Offer'])
        .order('created_at', { ascending: false }),
      supabase
        .from('property_images')
        .select('property_id, image_url, display_order, is_cover')
        .order('display_order', { ascending: true }),
      supabase
        .from('branches')
        .select('id, name, address, contact_number')
        .order('name', { ascending: true }),
      supabase
        .from('app_settings')
        .select('setting_key, setting_value')
        .in('setting_key', PUBLIC_SETTING_KEYS)
    ]);

    results.forEach(function(result) {
      if (result.error) throw result.error;
    });

    publicState.properties = results[0].data || [];
    publicState.images = results[1].data || [];
    publicState.branches = results[2].data || [];
    
    // Injected mock properties fallback if DB is empty
    if (!publicState.properties.length && typeof getMockProperties === 'function') {
      console.warn("Using local mock properties database for testing/screenshot rendering.");
      publicState.properties = getMockProperties();
      publicState.images = getMockPropertyImages();
      publicState.branches = getMockBranches();
    }

    publicState.appSettings = {};
    (results[3].data || []).forEach(function(row) {
      publicState.appSettings[row.setting_key] = row.setting_value || {};
    });

    renderListingsPage();
    hideStatus();
  } catch (error) {
    console.warn('Public listings could not be loaded.', error);
    publicState.properties = [];
    publicState.images = [];
    renderListingsPage();
    showStatus('We could not load listings right now. Please try again shortly or contact Hilltop Properties.', 'error');
  }
}

function applySeoSettings() {
  var seo = publicState.appSettings.seo_metadata || {};
  if (seo.siteTitle) document.title = seo.siteTitle;

  var description = document.querySelector('meta[name="description"]');
  if (description && seo.metaDescription) {
    description.setAttribute('content', seo.metaDescription);
  }

  var keywords = document.querySelector('meta[name="keywords"]');
  if (keywords && seo.keywords) {
    keywords.setAttribute('content', seo.keywords);
  }
}

function settingUrl(key) {
  var value = publicState.appSettings[key];
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.url || value.value || '';
}

function setHeroPoster(hero, video, posterUrl, fallbackImageUrl) {
  if (posterUrl && video) {
    video.setAttribute('poster', posterUrl);
  } else if (video) {
    video.removeAttribute('poster');
  }

  var backgroundUrl = posterUrl || fallbackImageUrl || '';
  if (backgroundUrl && hero) {
    hero.style.backgroundImage = 'url("' + backgroundUrl + '")';
  } else if (hero) {
    hero.style.backgroundImage = '';
  }
}

function configureHeroVideo(videoUrl, posterUrl, fallbackImageUrl) {
  var hero = byId('home');
  var video = byId('heroVideo');
  if (!hero || !video) return;

  setHeroPoster(hero, video, posterUrl, fallbackImageUrl);

  if (!videoUrl || prefersReducedMotion()) {
    video.removeAttribute('src');
    video.load();
    video.classList.remove('is-visible');
    return;
  }

  if (video.getAttribute('src') !== videoUrl) {
    video.setAttribute('src', videoUrl);
  }

  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.autoplay = true;
  video.onerror = function() {
    console.warn('Hero video failed to load. Falling back to poster/static background.');
    video.classList.remove('is-visible');
  };
  video.classList.add('is-visible');

  var playPromise = video.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(function(error) {
      console.warn('Hero video autoplay was blocked or failed. Falling back to poster/static background.', error);
      video.classList.remove('is-visible');
    });
  }
}

function renderHero() {
  if (!byId('heroTitle') || !byId('heroSubtitle') || !byId('heroButton')) return;
  var homepage = publicState.homepage || {};
  var banner = publicState.banners.length ? publicState.banners[0] : null;
  var title = homepage.hero_title || (banner && banner.title) || 'Find Verified Properties Across Zambia';
  var subtitle = homepage.hero_subtitle || (banner && banner.subtitle) || 'Buy, rent, and enquire about trusted properties through Hilltop Properties Zambia.';
  var buttonText = homepage.hero_button_text || (banner && banner.button_text) || 'View Listings';
  var buttonLink = homepage.hero_button_link || (banner && banner.button_link) || 'listings.html';

  byId('heroTitle').textContent = title;
  byId('heroSubtitle').textContent = subtitle;
  byId('heroButton').textContent = buttonText;
  byId('heroButton').setAttribute('href', buttonLink || '#properties');

  var heroMedia = byId('heroMedia');
  var imageUrl = banner && banner.image_url;
  if (heroMedia) {
    heroMedia.className = 'hero-overlay';
    heroMedia.style.backgroundImage = '';
  }
  configureHeroVideo(
    settingUrl('homepage_hero_video_url'),
    settingUrl('homepage_hero_poster_url'),
    imageUrl
  );
}

function resolveFeaturedProperties() {
  var propertyLookup = buildLookup(publicState.properties);
  var featured = publicState.featuredRows
    .map(function(row) { return propertyLookup[String(row.property_id)]; })
    .filter(Boolean);

  if (featured.length) return featured;

  return publicState.properties.filter(function(property) {
    return property.featured && property.status === 'Active';
  });
}

function propertyStatusClass(status) {
  var value = String(status || '').toLowerCase();
  if (value === 'active') return 'status-active';
  if (value === 'under offer') return 'status-offer';
  if (value === 'sold' || value === 'let / rented') return 'status-closed';
  return 'status-default';
}

function featuredPropertyCard(property) {
  return propertyCard(property);
}

function propertyCard(property) {
  var image = getCoverImage(property.id);
  var detailsUrl = 'property-details.html?id=' + encodeURIComponent(property.id);
  var statusClass = propertyStatusClass(property.status);
  var location = property.area || getBranchName(property.branch_id) || 'Location available on request';
  var imageMarkup = image ? '<img class="property-card-img" src="' + escapeHtml(image) + '" alt="" loading="lazy" />' : '';

  var specHtmls = [];
  var isLand = String(property.property_type || '').toLowerCase() === 'land';

  if (!isLand) {
    if (Number(property.bedrooms) > 0) {
      specHtmls.push([
        '<span class="property-spec-item" title="Bedrooms">',
          '<svg class="property-spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
            '<path d="M2 20V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12"></path>',
            '<path d="M2 14h20"></path>',
            '<rect x="6" y="10" width="4" height="4"></rect>',
            '<rect x="14" y="10" width="4" height="4"></rect>',
          '</svg>',
          '<span>' + property.bedrooms + ' beds</span>',
        '</span>'
      ].join(''));
    }
    if (Number(property.bathrooms) > 0) {
      specHtmls.push([
        '<span class="property-spec-item" title="Bathrooms">',
          '<svg class="property-spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
            '<path d="M9 6v6H5v-6h4M2 11h20M2 17a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5H2z"></path>',
          '</svg>',
          '<span>' + property.bathrooms + ' baths</span>',
        '</span>'
      ].join(''));
    }
    if (Number(property.garages) > 0) {
      specHtmls.push([
        '<span class="property-spec-item" title="Garages">',
          '<svg class="property-spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
            '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>',
            '<rect x="6" y="12" width="12" height="10"></rect>',
          '</svg>',
          '<span>' + property.garages + ' garages</span>',
        '</span>'
      ].join(''));
    }
  }
  if (Number(property.square_metres) > 0) {
    specHtmls.push([
      '<span class="property-spec-item" title="Area">',
        '<svg class="property-spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
          '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>',
          '<path d="M9 3v18M15 3v18M3 9h18M3 15h18"></path>',
        '</svg>',
        '<span>' + Number(property.square_metres).toLocaleString('en-ZM') + ' sqm</span>',
      '</span>'
    ].join(''));
  }
  var specsHtml = specHtmls.length ? '<div class="property-card-specs">' + specHtmls.join('') + '</div>' : '';

  return [
    '<article class="property-card">',
      '<div class="property-card-image-wrapper">',
        '<div class="property-card-placeholder" aria-hidden="true">',
          '<svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
            '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>',
            '<polyline points="9 22 9 12 15 12 15 22"></polyline>',
          '</svg>',
          '<span class="placeholder-text">Hilltop Property</span>',
        '</div>',
        imageMarkup,
        '<div class="property-card-badges">',
          '<span class="badge purpose-badge">' + escapeHtml(property.purpose) + '</span>',
          '<span class="badge status-badge ' + statusClass + '">' + escapeHtml(property.status) + '</span>',
        '</div>',
        '<div class="property-card-overlay-label">',
          '<span class="property-card-ref">' + escapeHtml(property.reference_number) + '</span>',
          '<h4 class="property-card-overlay-title">' + escapeHtml(property.title) + '</h4>',
        '</div>',
      '</div>',
      '<div class="property-card-body">',
        '<div class="property-card-price">' + formatPrice(property.price, property.purpose) + '</div>',
        '<p class="property-card-location">' + escapeHtml(location) + ' &middot; ' + escapeHtml(property.property_type) + '</p>',
        specsHtml,
        '<div class="property-card-actions">',
          '<a class="btn property-card-btn-primary" href="' + detailsUrl + '">View Details</a>',
          '<button class="btn property-card-btn-secondary enquire-btn" type="button" data-property-id="' + escapeHtml(property.id) + '">Enquire</button>',
        '</div>',
      '</div>',
    '</article>'
  ].join('');
}

function renderFeatured() {
  if (!byId('featuredGrid') || !byId('featuredEmpty')) return;
  var featured = resolveFeaturedProperties();
  byId('featuredGrid').innerHTML = featured.map(featuredPropertyCard).join('');
  byId('featuredEmpty').style.display = featured.length ? 'none' : 'block';
}

function filteredProperties() {
  return publicState.properties.filter(function(property) {
    var searchBlob = [
      property.title,
      property.area,
      property.reference_number,
      property.description
    ].join(' ').toLowerCase();
    var matchesSearch = !publicState.search || searchBlob.indexOf(publicState.search.toLowerCase()) !== -1;
    var matchesPurpose = publicState.purpose === 'all' || property.purpose === publicState.purpose;
    var matchesType = publicState.type === 'all' || property.property_type === publicState.type;
    var matchesBranch = publicState.branch === 'all' || String(property.branch_id) === String(publicState.branch);
    return matchesSearch && matchesPurpose && matchesType && matchesBranch;
  });
}

function renderProperties() {
  if (!byId('propertiesGrid') || !byId('propertiesEmpty')) return;
  var rows = filteredProperties();
  byId('propertiesGrid').innerHTML = rows.map(propertyCard).join('');
  byId('propertiesEmpty').style.display = rows.length ? 'none' : 'block';
}

function listingSearchBlob(property) {
  return [
    property.title,
    property.reference_number,
    property.area,
    property.full_address,
    property.property_type,
    property.description
  ].join(' ').toLowerCase();
}

function filteredListings() {
  var rows = publicState.properties.filter(function(property) {
    var search = publicState.search.toLowerCase();
    var matchesSearch = !search || listingSearchBlob(property).indexOf(search) !== -1;
    var matchesPurpose = publicState.purpose === 'all' || property.purpose === publicState.purpose;
    var matchesType = publicState.type === 'all' || property.property_type === publicState.type;
    var matchesStatus = publicState.publicStatus === 'all' || property.status === publicState.publicStatus;
    return matchesSearch && matchesPurpose && matchesType && matchesStatus;
  });

  return rows.sort(function(a, b) {
    if (publicState.sort === 'price-low') return Number(a.price || 0) - Number(b.price || 0);
    if (publicState.sort === 'price-high') return Number(b.price || 0) - Number(a.price || 0);
    if (publicState.sort === 'featured') {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
    }
    return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
  });
}

function renderListingsTypeFilter() {
  var typeFilter = byId('listingTypeFilter');
  if (!typeFilter) return;

  var currentValue = typeFilter.value || 'all';
  var types = [];
  publicState.properties.forEach(function(property) {
    if (property.property_type && types.indexOf(property.property_type) === -1) {
      types.push(property.property_type);
    }
  });
  types.sort();

  typeFilter.innerHTML = '<option value="all">All property types</option>' + types.map(function(type) {
    return '<option value="' + escapeHtml(type) + '">' + escapeHtml(type) + '</option>';
  }).join('');

  typeFilter.value = types.indexOf(currentValue) !== -1 ? currentValue : 'all';
  publicState.type = typeFilter.value;
}

function renderListings() {
  var grid = byId('listingsGrid');
  var empty = byId('listingsEmpty');
  var count = byId('listingsCount');
  if (!grid || !empty) return;

  var rows = filteredListings();
  grid.innerHTML = rows.map(propertyCard).join('');
  empty.style.display = rows.length ? 'none' : 'block';
  if (count) {
    count.textContent = rows.length + ' public listing' + (rows.length === 1 ? '' : 's') + ' found';
  }
}

function renderListingsPage() {
  renderListingsTypeFilter();
  renderListings();
}

function renderFilters() {
  var branchFilter = byId('branchFilter');
  if (!branchFilter) return;
  branchFilter.innerHTML = '<option value="all">All branches</option>' + publicState.branches.map(function(branch) {
    return '<option value="' + escapeHtml(branch.id) + '">' + escapeHtml(branch.name) + '</option>';
  }).join('');
}

function renderAbout() {
  if (!byId('aboutTitle') || !byId('aboutContent')) return;
  var homepage = publicState.homepage || {};
  byId('aboutTitle').textContent = homepage.about_title || 'Trusted Property Guidance';
  byId('aboutContent').textContent = homepage.about_content || 'Hilltop Properties Zambia helps clients buy, rent, sell, and manage quality real estate across Lusaka and Livingstone.';
}

function renderTeam() {
  if (!byId('teamGrid') || !byId('teamEmpty')) return;
  var rows = publicState.teamProfiles;
  if (!rows.length && publicState.staffProfiles.length) {
    rows = publicState.staffProfiles.map(function(staff) {
      return {
        display_name: staff.full_name,
        role_title: staff.role,
        bio: getBranchName(staff.branch_id),
        photo_url: ''
      };
    });
  }

  byId('teamGrid').innerHTML = rows.map(function(member) {
    var photo = member.photo_url
      ? '<img src="' + escapeHtml(member.photo_url) + '" alt="' + escapeHtml(member.display_name) + '" />'
      : initials(member.display_name);
    return [
      '<article class="team-card">',
        '<div class="team-photo">' + photo + '</div>',
        '<h3>' + escapeHtml(member.display_name || 'Hilltop Team Member') + '</h3>',
        '<p><strong>' + escapeHtml(member.role_title || 'Property Specialist') + '</strong></p>',
        '<p>' + escapeHtml(member.bio || 'Available for property guidance and client support.') + '</p>',
      '</article>'
    ].join('');
  }).join('');
  byId('teamEmpty').style.display = rows.length ? 'none' : 'block';
}

function renderTestimonials() {
  if (!byId('testimonialGrid') || !byId('testimonialEmpty')) return;
  var rows = publicState.testimonials;
  byId('testimonialGrid').innerHTML = rows.map(function(item) {
    return [
      '<article class="testimonial-card">',
        '<div class="stars">' + stars(item.rating) + '</div>',
        '<h3>' + escapeHtml(item.client_name) + '</h3>',
        '<p><strong>' + escapeHtml(item.client_role || 'Client') + '</strong></p>',
        '<p>"' + escapeHtml(item.message) + '"</p>',
      '</article>'
    ].join('');
  }).join('');
  byId('testimonialEmpty').style.display = rows.length ? 'none' : 'block';
}

function resolveContact() {
  var company = publicState.appSettings.company_profile || {};
  var homepage = publicState.homepage || {};
  return {
    phone: company.phone || homepage.contact_phone || fallbackContact.phone,
    email: company.email || homepage.contact_email || fallbackContact.email,
    address: company.address || homepage.contact_address || fallbackContact.address
  };
}

function renderContact() {
  if (!byId('contactGrid')) return;
  var contact = resolveContact();
  var cards = [
    { title: 'Head Office', lines: [contact.address, contact.phone, contact.email] }
  ].concat(publicState.branches.map(function(branch) {
    return {
      title: branch.name + ' Branch',
      lines: [branch.address, branch.contact_number]
    };
  }));

  byId('contactGrid').innerHTML = cards.map(function(card) {
    return [
      '<article class="contact-card">',
        '<h3>' + escapeHtml(card.title) + '</h3>',
        card.lines.filter(Boolean).map(function(line) {
          return '<p>' + escapeHtml(line) + '</p>';
        }).join(''),
      '</article>'
    ].join('');
  }).join('');
}

function setBodyMenuLock(isOpen) {
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function setMobileMenuOpen(isOpen) {
  var nav = byId('siteNav');
  var toggle = byId('navToggle');
  var overlay = byId('navOverlay');
  if (!nav || !toggle || !overlay) return;

  nav.classList.toggle('open', isOpen);
  overlay.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  setBodyMenuLock(isOpen);
}

function initMobileNavigation() {
  var toggle = byId('navToggle');
  var overlay = byId('navOverlay');
  var nav = byId('siteNav');
  if (!toggle || !overlay || !nav) return;

  toggle.addEventListener('click', function() {
    setMobileMenuOpen(!nav.classList.contains('open'));
  });

  overlay.addEventListener('click', function() {
    setMobileMenuOpen(false);
  });

  nav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      setMobileMenuOpen(false);
    });
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') setMobileMenuOpen(false);
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth > 900) setMobileMenuOpen(false);
  });
}

function initHeaderShadow() {
  var header = document.querySelector('.site-header');
  if (!header) return;

  function updateHeaderShadow() {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }

  updateHeaderShadow();
  window.addEventListener('scroll', updateHeaderShadow, { passive: true });
}

function initSmoothScroll() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(event) {
      var targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function setEnquiryMessage(message, type) {
  var messageBox = byId('enquiryMessage');
  if (!messageBox) return;
  messageBox.textContent = message || '';
  messageBox.className = 'enquiry-message' + (type ? ' ' + type : '');
}

function setWhatsappFallback(referenceNumber) {
  var contact = resolveContact();
  var fallback = byId('enquiryWhatsappFallback');
  if (!fallback) return;

  if (!contact.phone) {
    fallback.classList.add('hidden');
    return;
  }

  var phone = String(contact.phone).replace(/[^0-9]/g, '');
  var message = referenceNumber
    ? 'Hello Hilltop Properties Zambia, I would like to enquire about property ' + referenceNumber + '.'
    : 'Hello Hilltop Properties Zambia, I would like to make a property enquiry.';

  fallback.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
  fallback.classList.remove('hidden');
}

function populateEnquiryBranches(selectedBranchId, isPropertyEnquiry) {
  var branchSelect = byId('enquiryBranchSelect');
  if (!branchSelect) return;

  branchSelect.innerHTML = '<option value="">Select branch</option>' + publicState.branches.map(function(branch) {
    return '<option value="' + escapeHtml(branch.id) + '">' + escapeHtml(branch.name) + '</option>';
  }).join('');

  if (selectedBranchId) {
    if (!getBranchById(selectedBranchId)) {
      branchSelect.innerHTML += '<option value="' + escapeHtml(selectedBranchId) + '">Property branch</option>';
    }
    branchSelect.value = String(selectedBranchId);
  } else if (publicState.branch !== 'all' && getBranchById(publicState.branch)) {
    branchSelect.value = String(publicState.branch);
  } else if (publicState.branches.length) {
    branchSelect.value = String(publicState.branches[0].id);
  }

  branchSelect.disabled = Boolean(isPropertyEnquiry);
  byId('enquiryBranchId').value = selectedBranchId || branchSelect.value || '';
}

function openEnquiryModal(property) {
  activeEnquiryProperty = property || null;
  var modal = byId('enquiryModal');
  var title = byId('enquiryModalTitle');
  var display = byId('enquiryPropertyDisplay');
  var notes = byId('enquiryNotes');
  var propertyId = byId('enquiryPropertyId');

  byId('enquiryForm').reset();
  setEnquiryMessage('', '');
  byId('enquiryWhatsappFallback').classList.add('hidden');

  if (property) {
    title.textContent = 'Send Property Enquiry';
    display.textContent = property.reference_number + ' - ' + property.title;
    propertyId.value = property.id;
    notes.value = 'Website enquiry for property ' + property.reference_number;
    populateEnquiryBranches(property.branch_id, true);
    setWhatsappFallback(property.reference_number);
  } else {
    title.textContent = 'Send General Enquiry';
    display.textContent = 'Tell us what you are looking for and our team will contact you.';
    propertyId.value = '';
    notes.value = '';
    populateEnquiryBranches('', false);
    setWhatsappFallback('');
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  byId('enquiryName').focus();
}

function closeEnquiryModal() {
  var modal = byId('enquiryModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  activeEnquiryProperty = null;
  enquirySubmitting = false;
  byId('enquirySubmit').disabled = false;
}

function validateEnquiryPayload(name, phone, email, branchId, notes, property) {
  if (!name) return 'Full name is required.';
  if (!phone) return 'Phone number is required.';
  if (!branchId) return 'No branch is available to receive this enquiry.';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.';
  if (notes.length > 1000) return 'Message must be 1000 characters or less.';
  if (property && ['Active', 'Under Offer'].indexOf(property.status) === -1) {
    return 'This property is not available for public enquiry.';
  }
  return '';
}

async function submitEnquiry(event) {
  event.preventDefault();
  if (enquirySubmitting) return;

  var supabase = getSupabaseClient();
  var name = byId('enquiryName').value.trim();
  var phone = byId('enquiryPhone').value.trim();
  var email = byId('enquiryEmail').value.trim();
  var branchId = byId('enquiryBranchSelect').value || byId('enquiryBranchId').value;
  var notes = byId('enquiryNotes').value.trim();
  var honeypot = byId('enquiryWebsiteUrl').value.trim();
  var property = activeEnquiryProperty;

  if (honeypot) {
    setEnquiryMessage('Thank you. Your enquiry has been sent. Hilltop Properties will contact you shortly.', 'success');
    setTimeout(closeEnquiryModal, 1100);
    return;
  }

  var validationError = validateEnquiryPayload(name, phone, email, branchId, notes, property);
  if (validationError) {
    setEnquiryMessage(validationError, 'error');
    return;
  }

  if (!supabase) {
    setEnquiryMessage('We could not send the enquiry right now. Please use the WhatsApp contact option or try again shortly.', 'error');
    setWhatsappFallback(property && property.reference_number);
    return;
  }

  enquirySubmitting = true;
  byId('enquirySubmit').disabled = true;
  setEnquiryMessage('Sending enquiry...', '');

  var payload = {
    client_name: name,
    phone: phone,
    email: email || null,
    property_id: property ? property.id : null,
    branch_id: branchId,
    source: 'Website',
    status: 'New',
    notes: notes || null
  };

  try {
    var result = await supabase.from('leads').insert(payload);
    if (result.error) throw result.error;

    setEnquiryMessage('Thank you. Your enquiry has been sent. Hilltop Properties will contact you shortly.', 'success');
    byId('enquiryForm').reset();
    setTimeout(closeEnquiryModal, 1400);
  } catch (error) {
    console.warn('Public enquiry could not be submitted.', error);
    setEnquiryMessage('We could not send the enquiry right now. Please use the WhatsApp contact option or try again shortly.', 'error');
    setWhatsappFallback(property && property.reference_number);
  } finally {
    enquirySubmitting = false;
    byId('enquirySubmit').disabled = false;
  }
}

function bindEvents() {
  var searchInput = byId('searchInput');
  if (searchInput) searchInput.addEventListener('input', function(event) {
    publicState.search = event.target.value.trim();
    renderProperties();
  });

  var purposeFilter = byId('purposeFilter');
  if (purposeFilter) purposeFilter.addEventListener('change', function(event) {
    publicState.purpose = event.target.value;
    renderProperties();
  });

  var typeFilter = byId('typeFilter');
  if (typeFilter) typeFilter.addEventListener('change', function(event) {
    publicState.type = event.target.value;
    renderProperties();
  });

  var branchFilter = byId('branchFilter');
  if (branchFilter) branchFilter.addEventListener('change', function(event) {
    publicState.branch = event.target.value;
    renderProperties();
  });

  var listingsSearchInput = byId('listingSearchInput');
  if (listingsSearchInput) listingsSearchInput.addEventListener('input', function(event) {
    publicState.search = event.target.value.trim();
    renderListings();
  });

  var listingPurposeFilter = byId('listingPurposeFilter');
  if (listingPurposeFilter) listingPurposeFilter.addEventListener('change', function(event) {
    publicState.purpose = event.target.value;
    renderListings();
  });

  var listingTypeFilter = byId('listingTypeFilter');
  if (listingTypeFilter) listingTypeFilter.addEventListener('change', function(event) {
    publicState.type = event.target.value;
    renderListings();
  });

  var listingStatusFilter = byId('listingStatusFilter');
  if (listingStatusFilter) listingStatusFilter.addEventListener('change', function(event) {
    publicState.publicStatus = event.target.value;
    renderListings();
  });

  var listingSortSelect = byId('listingSortSelect');
  if (listingSortSelect) listingSortSelect.addEventListener('change', function(event) {
    publicState.sort = event.target.value;
    renderListings();
  });

  var generalEnquiryButton = byId('generalEnquiryButton');
  if (generalEnquiryButton) generalEnquiryButton.addEventListener('click', function() {
    openEnquiryModal(null);
  });

  var headerEnquiryButton = byId('headerEnquiryButton');
  if (headerEnquiryButton) {
    headerEnquiryButton.addEventListener('click', function() {
      openEnquiryModal(null);
    });
  }

  var serviceEnquiryButton = byId('serviceEnquiryButton');
  if (serviceEnquiryButton) {
    serviceEnquiryButton.addEventListener('click', function() {
      openEnquiryModal(null);
    });
  }

  var ctaEnquiryButton = byId('ctaEnquiryButton');
  if (ctaEnquiryButton) {
    ctaEnquiryButton.addEventListener('click', function() {
      openEnquiryModal(null);
    });
  }

  document.querySelectorAll('.public-enquiry-trigger').forEach(function(button) {
    button.addEventListener('click', function() {
      openEnquiryModal(null);
    });
  });

  var enquiryForm = byId('enquiryForm');
  if (enquiryForm) enquiryForm.addEventListener('submit', submitEnquiry);

  var enquiryModalClose = byId('enquiryModalClose');
  if (enquiryModalClose) enquiryModalClose.addEventListener('click', closeEnquiryModal);

  var enquiryModal = byId('enquiryModal');
  if (enquiryModal) enquiryModal.addEventListener('click', function(event) {
    if (event.target === enquiryModal) closeEnquiryModal();
  });

  var enquiryBranchSelect = byId('enquiryBranchSelect');
  if (enquiryBranchSelect) enquiryBranchSelect.addEventListener('change', function(event) {
    var enquiryBranchId = byId('enquiryBranchId');
    if (enquiryBranchId) enquiryBranchId.value = event.target.value;
  });

  document.addEventListener('click', function(event) {
    var button = event.target.closest('.enquire-btn');
    if (button) {
      var property = getPropertyById(button.dataset.propertyId);
      if (property) openEnquiryModal(property);
    }
  });

  document.addEventListener('error', function(event) {
    var target = event.target;
    if (target && target.tagName === 'IMG' && target.closest('.property-image, .featured-property-image, .property-card-image-wrapper')) {
      target.classList.add('is-broken');
      target.setAttribute('aria-hidden', 'true');
    }
  }, true);
}

function renderWebsite() {
  applySeoSettings();
  renderHero();
  renderFilters();
  renderFeatured();
  renderProperties();
  renderAbout();
  renderTeam();
  renderTestimonials();
  renderContact();
}

document.addEventListener('DOMContentLoaded', function() {
  var year = byId('year');
  if (year) year.textContent = new Date().getFullYear();
  initMobileNavigation();
  initHeaderShadow();
  initSmoothScroll();
  bindEvents();
  if (byId('listingsGrid')) {
    loadListingsData();
  } else if (byId('featuredGrid') && byId('propertiesGrid')) {
    loadPublicData();
  } else {
    loadSharedPublicData();
  }
});

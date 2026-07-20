/* ============================================================
   REAL ESTATE MANAGEMENT - PUBLIC RENTAL DETAILS
   Phase 8C: read one public property and submit enquiries.
   ============================================================ */

var detailsState = {
  property: null,
  images: [],
  branches: [],
  appSettings: {},
  similar: [],
  selectedImageIndex: 0
};

var enquirySubmitting = false;

var fallbackContact = {
  phone: '(256) 555-0100',
  email: 'viewings@example.com',
  address: 'Toney, Alabama'
};

function byId(id) {
  return document.getElementById(id);
}

function getSupabaseClient() {
  return window.hilltopSupabase || null;
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, function (ch) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
  });
}

function formatPrice(price, purpose, currencyCode, billingPeriod) {
  return window.HilltopCurrency.formatPropertyPrice(
    price,
    currencyCode,
    purpose,
    billingPeriod
  );
}

function showStatus(message, type) {
  var status = byId('detailsStatus');
  if (!status) return;
  status.textContent = message;
  status.className = 'site-status' + (type ? ' ' + type : '');
}

function hideStatus() {
  var status = byId('detailsStatus');
  if (status) status.className = 'site-status hidden';
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function resolveContact() {
  var company = detailsState.appSettings.company_profile || {};
  return {
    phone: company.phone || fallbackContact.phone,
    email: company.email || fallbackContact.email,
    address: company.address || fallbackContact.address
  };
}

function getBranch() {
  var property = detailsState.property || {};
  return detailsState.branches.find(function (branch) {
    return String(branch.id) === String(property.branch_id);
  }) || null;
}

function sortImages(images) {
  return (images || []).slice().sort(function (a, b) {
    if (a.is_cover && !b.is_cover) return -1;
    if (!a.is_cover && b.is_cover) return 1;
    return Number(a.display_order || 0) - Number(b.display_order || 0);
  });
}

function getBranchName(branchId) {
  var branch = detailsState.branches.find(function (item) {
    return String(item.id) === String(branchId);
  });
  return branch ? branch.name : 'Toney, Alabama';
}

function getSimilarCoverImage(propertyId) {
  var rows = (detailsState.similarImages || [])
    .filter(function (image) { return String(image.property_id) === String(propertyId); })
    .sort(function (a, b) {
      if (a.is_cover && !b.is_cover) return -1;
      if (!a.is_cover && b.is_cover) return 1;
      return Number(a.display_order || 0) - Number(b.display_order || 0);
    });
  return rows.length ? rows[0].image_url : '';
}

function propertyStatusClass(status) {
  var value = String(status || '').toLowerCase();
  if (value === 'active') return 'status-active';
  if (value === 'under offer') return 'status-offer';
  if (value === 'let') return 'status-closed';
  return 'status-default';
}

async function safeSelect(label, queryBuilder, fallback) {
  try {
    var result = await queryBuilder();
    if (result.error) throw result.error;
    return result.data || fallback || [];
  } catch (error) {
    console.warn('Property details could not load ' + label + '.', error);
    return fallback || [];
  }
}

async function loadPropertyDetails() {
  var supabase = getSupabaseClient();
  var id = getQueryParam('id');
  var ref = getQueryParam('ref');

  if (!supabase) {
    showStatus('Supabase is not configured. Property details cannot be loaded.', 'error');
    return;
  }

  if (!id && !ref) {
    showStatus('This property is no longer available.', 'error');
    return;
  }

  showStatus('Loading property details...');

  var propertyQuery = supabase
    .from('properties')
    .select('id, reference_number, title, description, price, currency_code, billing_period, purpose, property_type, area, full_address, bedrooms, bathrooms, garages, square_metres, status, amenities, availability, viewing_contact_name, viewing_contact_phone, viewing_contact_email, virtual_tour_link, youtube_link, branch_id, created_at')
    .eq('status', 'Active')
    .limit(1);

  propertyQuery = id ? propertyQuery.eq('id', id) : propertyQuery.eq('reference_number', ref);

  var propertyResult = await safeSelect('property', function () {
    return propertyQuery;
  }, []);

  if (!propertyResult.length) {
    showStatus('This property is no longer available.', 'error');
    return;
  }

  detailsState.property = propertyResult[0];

  var results = await Promise.all([
    safeSelect('property images', function () {
      return supabase
        .from('property_images')
        .select('property_id, image_url, display_order, is_cover')
        .eq('property_id', detailsState.property.id)
        .order('display_order', { ascending: true });
    }),
    safeSelect('branches', function () {
      return supabase
        .from('branches')
        .select('id, name, address, contact_number')
        .order('name', { ascending: true });
    }),
    safeSelect('app settings', function () {
      return supabase
        .from('app_settings')
        .select('setting_key, setting_value')
        .in('setting_key', ['company_profile']);
    }),
    safeSelect('similar property candidates', function () {
      return supabase
        .from('properties')
        .select('id, reference_number, title, price, currency_code, billing_period, purpose, property_type, area, status, availability, branch_id, created_at')
        .eq('status', 'Active')
        .neq('id', detailsState.property.id)
        .order('created_at', { ascending: false })
        .limit(12);
    })
  ]);

  detailsState.images = sortImages(results[0]);
  detailsState.branches = results[1];

  detailsState.appSettings = {};
  (results[2] || []).forEach(function (row) {
    detailsState.appSettings[row.setting_key] = row.setting_value || {};
  });

  var similarCandidates = results[3] || [];
  detailsState.similar = similarCandidates.filter(function (property) {
    return property.purpose === detailsState.property.purpose
      || property.property_type === detailsState.property.property_type;
  }).slice(0, 3);

  // Fetch similar property images
  var similarIds = detailsState.similar.map(function (p) { return p.id; });
  if (similarIds.length) {
    var similarImages = await safeSelect('similar images', function () {
      return supabase
        .from('property_images')
        .select('property_id, image_url, display_order, is_cover')
        .in('property_id', similarIds)
        .order('display_order', { ascending: true });
    }, []);
    detailsState.similarImages = similarImages || [];
  } else {
    detailsState.similarImages = [];
  }

  renderDetails();
  hideStatus();
}

function updateSeo(property) {
  document.title = property.title + ' | Real estate management';
  var description = document.querySelector('meta[name="description"]');
  if (description && property.description) {
    description.setAttribute('content', String(property.description).slice(0, 155));
  }
}

function renderGallery() {
  var mainImage = byId('mainImage');
  var thumbnailRow = byId('thumbnailRow');
  var images = detailsState.images;
  var selected = images[detailsState.selectedImageIndex];

  if (!images.length) {
    mainImage.innerHTML = [
      '<div class="property-details-placeholder">',
      '<svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
      '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>',
      '<polyline points="9 22 9 12 15 12 15 22"></polyline>',
      '</svg>',
      '<span class="placeholder-text">Rental Property</span>',
      '</div>'
    ].join('');
    thumbnailRow.innerHTML = '';
    return;
  }

  mainImage.innerHTML = [
    '<img src="' + escapeHtml(selected.image_url) + '" alt="' + escapeHtml(detailsState.property.title) + '" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';" />',
    '<div class="property-details-placeholder" style="display: none;">',
    '<svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
    '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>',
    '<polyline points="9 22 9 12 15 12 15 22"></polyline>',
    '</svg>',
    '<span class="placeholder-text">Rental Property</span>',
    '</div>'
  ].join('');

  thumbnailRow.innerHTML = images.map(function (image, index) {
    return [
      '<button class="thumb-button' + (index === detailsState.selectedImageIndex ? ' active' : '') + '" type="button" data-image-index="' + index + '">',
      '<img src="' + escapeHtml(image.image_url) + '" alt="' + escapeHtml(detailsState.property.title) + ' thumbnail" />',
      '</button>'
    ].join('');
  }).join('');
}

function renderFacts(property) {
  var facts = [
    ['Bedrooms', Number(property.bedrooms || 0)],
    ['Bathrooms', Number(property.bathrooms || 0)],
    ['Garages', Number(property.garages || 0)],
    ['Square Metres', Number(property.square_metres || 0).toLocaleString('en-ZM')],
    ['Purpose', property.purpose],
    ['Property Type', property.property_type],
    ['Availability', property.availability || 'Available now'],
    ['Area', property.area],
    ['Address', property.full_address || 'Available on request']
  ];

  byId('factsGrid').innerHTML = facts.map(function (item) {
    return [
      '<div class="fact-card">',
      '<span>' + escapeHtml(item[0]) + '</span>',
      '<strong>' + escapeHtml(item[1]) + '</strong>',
      '</div>'
    ].join('');
  }).join('');
}

function renderAmenities(property) {
  var amenities = Array.isArray(property.amenities) ? property.amenities.filter(Boolean) : [];
  byId('amenitiesList').innerHTML = amenities.length
    ? amenities.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('')
    : '<li>Details available on request</li>';
}

function renderMediaLinks(property) {
  var links = [];
  if (property.virtual_tour_link) {
    links.push('<a href="' + escapeHtml(property.virtual_tour_link) + '" target="_blank" rel="noopener">Virtual Tour</a>');
  }
  if (property.youtube_link) {
    links.push('<a href="' + escapeHtml(property.youtube_link) + '" target="_blank" rel="noopener">YouTube Video</a>');
  }
  byId('mediaLinks').innerHTML = links.join('');
}

function renderBranchContact() {
  var branch = getBranch();
  var contact = resolveContact();
  var property = detailsState.property || {};
  var contactName = property.viewing_contact_name || 'Real estate management';
  var contactPhone = property.viewing_contact_phone || (branch && branch.contact_number) || contact.phone;
  var contactEmail = property.viewing_contact_email || contact.email;

  byId('branchContact').innerHTML = [
    '<h3>' + escapeHtml(contactName) + '</h3>',
    '<p>' + escapeHtml((branch && branch.address) || contact.address) + '</p>',
    contactPhone ? '<p>' + escapeHtml(contactPhone) + '</p>' : '',
    contactEmail ? '<p>' + escapeHtml(contactEmail) + '</p>' : ''
  ].join('');
}

function renderSimilar() {
  var section = byId('similarSection');
  var grid = byId('similarGrid');

  if (!detailsState.similar.length) {
    section.classList.add('hidden');
    return;
  }

  grid.innerHTML = detailsState.similar.map(function (property) {
    var image = getSimilarCoverImage(property.id);
    var detailsUrl = 'property-details.html?id=' + encodeURIComponent(property.id);
    var statusClass = propertyStatusClass(property.status);
    var location = property.area || getBranchName(property.branch_id) || 'Location available on request';
    var imageMarkup = image ? '<img class="property-card-img" src="' + escapeHtml(image) + '" alt="" loading="lazy" onerror="this.style.display=\'none\'" />' : '';

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
      '<span class="placeholder-text">Rental Property</span>',
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
      '<div class="property-card-price">' + formatPrice(property.price, property.purpose, property.currency_code, property.billing_period) + '</div>',
      '<p class="property-card-location">' + escapeHtml(location) + ' &middot; ' + escapeHtml(property.property_type) + '</p>',
      specsHtml,
      '<div class="property-card-actions">',
      '<a class="btn property-card-btn-primary" href="' + detailsUrl + '">View Details</a>',
      '<button class="btn property-card-btn-secondary enquire-btn" type="button" data-property-id="' + escapeHtml(property.id) + '">Enquire</button>',
      '</div>',
      '</div>',
      '</article>'
    ].join('');
  }).join('');
  section.classList.remove('hidden');
}

function renderDetails() {
  var property = detailsState.property;
  var statusClass = property.status === 'Under Offer' ? 'badge offer' : 'badge';

  updateSeo(property);
  renderGallery();
  renderFacts(property);
  renderAmenities(property);
  renderMediaLinks(property);
  renderBranchContact();
  renderSimilar();

  byId('propertyReference').textContent = property.reference_number;
  byId('propertyTitle').textContent = property.title;
  byId('propertyStatus').textContent = property.status;
  byId('propertyStatus').className = statusClass;
  byId('propertyPrice').textContent = formatPrice(property.price, property.purpose, property.currency_code, property.billing_period);
  byId('propertyPurpose').textContent = property.purpose;
  byId('propertyType').textContent = property.property_type;
  byId('propertyArea').textContent = property.area || 'Toney, Alabama';
  byId('propertyDescription').textContent = property.description || 'Details available on request.';

  byId('detailsContent').classList.remove('hidden');
  byId('detailsBody').classList.remove('hidden');
}

function setEnquiryMessage(message, type) {
  var messageBox = byId('enquiryMessage');
  if (!messageBox) return;
  messageBox.textContent = message || '';
  messageBox.className = 'enquiry-message' + (type ? ' ' + type : '');
}

function setWhatsappFallback() {
  var property = detailsState.property || {};
  var contact = resolveContact();
  var fallback = byId('enquiryWhatsappFallback');
  if (!fallback) return;

  if (!contact.phone) {
    fallback.classList.add('hidden');
    return;
  }

  var phone = String(contact.phone).replace(/[^0-9]/g, '');
  var message = 'Hello Real estate management, I would like to schedule a viewing for property ' + property.reference_number + '.';
  fallback.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
  fallback.classList.remove('hidden');
}

function openEnquiryModal() {
  var property = detailsState.property;
  if (!property) return;

  byId('enquiryForm').reset();
  byId('enquiryPropertyId').value = property.id;
  byId('enquiryBranchId').value = property.branch_id || '';
  byId('enquiryPropertyDisplay').textContent = property.reference_number + ' - ' + property.title;
  byId('enquiryNotes').value = 'Website enquiry for property ' + property.reference_number;
  setEnquiryMessage('', '');
  setWhatsappFallback();

  var modal = byId('enquiryModal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  byId('enquiryName').focus();
}

function closeEnquiryModal() {
  var modal = byId('enquiryModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  enquirySubmitting = false;
  byId('enquirySubmit').disabled = false;
}

function validateEnquiryPayload(name, phone, email, branchId, notes, property) {
  if (!name) return 'Full name is required.';
  if (!phone) return 'Phone number is required.';
  if (!branchId) return 'No branch is available to receive this enquiry.';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.';
  if (notes.length > 1000) return 'Message must be 1000 characters or less.';
  if (!property || property.status !== 'Active') {
    return 'This property is not available for public enquiry.';
  }
  return '';
}

async function submitEnquiry(event) {
  event.preventDefault();
  if (enquirySubmitting) return;

  var supabase = getSupabaseClient();
  var property = detailsState.property;
  var name = byId('enquiryName').value.trim();
  var phone = byId('enquiryPhone').value.trim();
  var email = byId('enquiryEmail').value.trim();
  var notes = byId('enquiryNotes').value.trim();
  var branchId = byId('enquiryBranchId').value;
  var honeypot = byId('enquiryWebsiteUrl').value.trim();

  if (honeypot) {
    setEnquiryMessage('Thank you. Your viewing request has been sent. Real estate management will contact you shortly.', 'success');
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
    setWhatsappFallback();
    return;
  }

  enquirySubmitting = true;
  byId('enquirySubmit').disabled = true;
  setEnquiryMessage('Sending enquiry...', '');

  try {
    var result = await supabase.from('leads').insert({
      client_name: name,
      phone: phone,
      email: email || null,
      property_id: property.id,
      branch_id: branchId,
      source: 'Website',
      status: 'New',
      notes: notes || null
    });

    if (result.error) throw result.error;

    setEnquiryMessage('Thank you. Your viewing request has been sent. Real estate management will contact you shortly.', 'success');
    byId('enquiryForm').reset();
    setTimeout(closeEnquiryModal, 1400);
  } catch (error) {
    console.warn('Property enquiry could not be submitted.', error);
    setEnquiryMessage('We could not send the enquiry right now. Please use the WhatsApp contact option or try again shortly.', 'error');
    setWhatsappFallback();
  } finally {
    enquirySubmitting = false;
    byId('enquirySubmit').disabled = false;
  }
}

function bindEvents() {
  byId('navToggle').addEventListener('click', function () {
    byId('siteNav').classList.toggle('open');
  });

  var headerEnq = byId('headerEnquiryButton');
  if (headerEnq) headerEnq.addEventListener('click', openEnquiryModal);
  byId('detailsEnquiryButton').addEventListener('click', openEnquiryModal);
  byId('enquiryForm').addEventListener('submit', submitEnquiry);
  byId('enquiryModalClose').addEventListener('click', closeEnquiryModal);
  byId('enquiryModal').addEventListener('click', function (event) {
    if (event.target === byId('enquiryModal')) closeEnquiryModal();
  });

  byId('thumbnailRow').addEventListener('click', function (event) {
    var button = event.target.closest('.thumb-button');
    if (!button) return;
    detailsState.selectedImageIndex = Number(button.dataset.imageIndex || 0);
    renderGallery();
  });

  document.addEventListener('error', function (event) {
    var target = event.target;
    if (target && target.tagName === 'IMG') {
      if (target.closest('.property-card-image-wrapper')) {
        target.classList.add('is-broken');
        target.setAttribute('aria-hidden', 'true');
      } else if (target.closest('#mainImage')) {
        target.style.display = 'none';
        var placeholder = target.nextElementSibling;
        if (placeholder && placeholder.classList.contains('property-details-placeholder')) {
          placeholder.style.display = 'flex';
        }
      }
    }
  }, true);
}

document.addEventListener('DOMContentLoaded', function () {
  byId('year').textContent = new Date().getFullYear();
  bindEvents();
  loadPropertyDetails();
});

/* ============================================================
   HILLTOP PROPERTIES ZAMBIA — MODULE 2: PROPERTY MANAGEMENT
   properties.js
   ============================================================ */


/* ══════════════════════════════════════════════════════════════
   1. SAMPLE PROPERTY DATA
   Each property is an object. In a real system this would
   come from a backend database via an API call.
══════════════════════════════════════════════════════════════ */

var properties = [
  {
    id: 1,
    ref:       'HT-LSK-001',
    title:     '4-Bedroom Executive House in Kabulonga',
    purpose:   'For Sale',
    type:      'House',
    branch:    'Lusaka',
    area:      'Kabulonga',
    address:   'Plot 18, Lilayi Road, Kabulonga, Lusaka',
    price:     'ZMW 2,400,000',
    status:    'Active',
    beds:      4, baths: 3, garages: 2, size: 320,
    featured:  'Yes',
    amenities: 'Pool, Garden, Security, Borehole',
    virtualTour: '',
    youtube:   '',
    description: 'Stunning executive residence in the prestigious Kabulonga area. Features high ceilings, modern finishes, and a private garden.',
    coverImage: ''
  },
  {
    id: 2,
    ref:       'HT-LSK-002',
    title:     '2-Bedroom Apartment in Levy Junction',
    purpose:   'For Rent',
    type:      'Apartment',
    branch:    'Lusaka',
    area:      'Levy Junction',
    address:   'Levy Junction Complex, Lusaka',
    price:     'ZMW 8,500 / month',
    status:    'Active',
    beds:      2, baths: 2, garages: 1, size: 95,
    featured:  'No',
    amenities: 'Gym, Security, Parking',
    virtualTour: '',
    youtube:   '',
    description: 'Modern apartment in the Levy Junction complex. Perfect for young professionals.',
    coverImage: ''
  },
  {
    id: 3,
    ref:       'HT-LSK-003',
    title:     'Commercial Office Space — Cairo Road',
    purpose:   'For Rent',
    type:      'Commercial',
    branch:    'Lusaka',
    area:      'Cairo Road',
    address:   'Cairo Road Central, Lusaka',
    price:     'ZMW 22,000 / month',
    status:    'Under Offer',
    beds:      0, baths: 2, garages: 4, size: 450,
    featured:  'No',
    amenities: 'Parking, Reception, Server Room',
    virtualTour: '',
    youtube:   '',
    description: 'Premium Grade-A office space in the heart of Lusaka\'s business district.',
    coverImage: ''
  },
  {
    id: 4,
    ref:       'HT-LSK-004',
    title:     '5-Bedroom Mansion — Roma',
    purpose:   'For Sale',
    type:      'House',
    branch:    'Lusaka',
    area:      'Roma',
    address:   'Roma, Lusaka',
    price:     'ZMW 5,800,000',
    status:    'Sold',
    beds:      5, baths: 4, garages: 3, size: 560,
    featured:  'No',
    amenities: 'Pool, Garden, Staff Quarters, Solar Power',
    virtualTour: '',
    youtube:   '',
    description: 'Grand family mansion in the sought-after Roma neighbourhood.',
    coverImage: ''
  },
  {
    id: 5,
    ref:       'HT-LSK-005',
    title:     '1-Acre Residential Plot — Chalala',
    purpose:   'For Sale',
    type:      'Land',
    branch:    'Lusaka',
    area:      'Chalala',
    address:   'Chalala Residential Area, Lusaka',
    price:     'ZMW 980,000',
    status:    'Active',
    beds:      0, baths: 0, garages: 0, size: 4047,
    featured:  'No',
    amenities: 'Title Deed, Serviced',
    virtualTour: '',
    youtube:   '',
    description: 'Prime residential plot in Chalala. Fully serviced with tarred road access.',
    coverImage: ''
  },
  {
    id: 6,
    ref:       'HT-LSK-006',
    title:     '3-Bedroom House in Woodlands',
    purpose:   'For Sale',
    type:      'House',
    branch:    'Lusaka',
    area:      'Woodlands',
    address:   'Woodlands Extension, Lusaka',
    price:     'ZMW 1,350,000',
    status:    'Draft',
    beds:      3, baths: 2, garages: 1, size: 210,
    featured:  'No',
    amenities: 'Garden, Borehole',
    virtualTour: '',
    youtube:   '',
    description: 'Comfortable family home in a quiet Woodlands street. Recently renovated.',
    coverImage: ''
  },
  {
    id: 7,
    ref:       'HT-LVN-001',
    title:     '3-Bedroom Cottage — Livingstone Central',
    purpose:   'For Rent',
    type:      'House',
    branch:    'Livingstone',
    area:      'Livingstone Central',
    address:   'Mosi-oa-Tunya Road, Livingstone',
    price:     'ZMW 6,200 / month',
    status:    'Let / Rented',
    beds:      3, baths: 2, garages: 1, size: 150,
    featured:  'No',
    amenities: 'Garden, Security',
    virtualTour: '',
    youtube:   '',
    description: 'Charming cottage ideal for tourism or expat use, close to the Zambezi.',
    coverImage: ''
  },
  {
    id: 8,
    ref:       'HT-LVN-002',
    title:     'Riverside Lodge Plot — Victoria Falls',
    purpose:   'For Sale',
    type:      'Land',
    branch:    'Livingstone',
    area:      'Victoria Falls',
    address:   'Riverside Area, Livingstone',
    price:     'ZMW 3,200,000',
    status:    'Active',
    beds:      0, baths: 0, garages: 0, size: 8000,
    featured:  'Yes',
    amenities: 'River Frontage, Title Deed',
    virtualTour: '',
    youtube:   '',
    description: 'Rare riverside plot with uninterrupted views of the Zambezi. Exceptional investment opportunity.',
    coverImage: ''
  },
  {
    id: 9,
    ref:       'HT-LVN-003',
    title:     '2-Bedroom Apartment — Livingstone Central',
    purpose:   'For Rent',
    type:      'Apartment',
    branch:    'Livingstone',
    area:      'Livingstone Central',
    address:   'Independence Avenue, Livingstone',
    price:     'ZMW 5,500 / month',
    status:    'Active',
    beds:      2, baths: 1, garages: 1, size: 88,
    featured:  'No',
    amenities: 'Security, Parking',
    virtualTour: '',
    youtube:   '',
    description: 'Neat, well-maintained apartment near the Livingstone town centre.',
    coverImage: ''
  },
  {
    id: 10,
    ref:       'HT-LVN-004',
    title:     'Commercial Guesthouse — Maramba',
    purpose:   'For Sale',
    type:      'Commercial',
    branch:    'Livingstone',
    area:      'Maramba',
    address:   'Maramba Area, Livingstone',
    price:     'ZMW 4,800,000',
    status:    'Under Offer',
    beds:      8, baths: 8, garages: 4, size: 600,
    featured:  'Yes',
    amenities: 'Pool, Restaurant Space, Conference Room',
    virtualTour: '',
    youtube:   '',
    description: 'Established guesthouse with full hospitality infrastructure near Victoria Falls.',
    coverImage: ''
  }
];

// Running ID counter so new properties get unique IDs
var nextId = 11;

// Track which images are staged for the current modal session
var stagedImages = [];


/* ══════════════════════════════════════════════════════════════
   2. DOM REFERENCES
══════════════════════════════════════════════════════════════ */

var branchFilter      = document.getElementById('branchFilter');
var searchInput       = document.getElementById('searchInput');
var statusFilter      = document.getElementById('statusFilter');
var purposeFilter     = document.getElementById('purposeFilter');
var propTableBody     = document.getElementById('propTableBody');
var propCards         = document.getElementById('propCards');
var emptyState        = document.getElementById('emptyState');
var propTable         = document.getElementById('propTable');
var selectAll         = document.getElementById('selectAll');
var bulkCount         = document.getElementById('bulkCount');
var btnBulkStatus     = document.getElementById('btnBulkStatus');
var btnBulkDelete     = document.getElementById('btnBulkDelete');
var bulkStatusSelect  = document.getElementById('bulkStatusSelect');
var btnAddProperty    = document.getElementById('btnAddProperty');
var propModal         = document.getElementById('propModal');
var modalOverlay      = document.getElementById('modalOverlay');
var modalClose        = document.getElementById('modalClose');
var modalCancelBtn    = document.getElementById('modalCancelBtn');
var propForm          = document.getElementById('propForm');
var modalTitle        = document.getElementById('modalTitle');
var editIdField       = document.getElementById('editId');
var imageDropZone     = document.getElementById('imageDropZone');
var imageFileInput    = document.getElementById('imageFileInput');
var imagePreviewGrid  = document.getElementById('imagePreviewGrid');
var btnBrowseImages   = document.getElementById('btnBrowseImages');
var toastEl           = document.getElementById('toast');

// Stat number elements
var statTotal     = document.getElementById('statTotal');
var statActive    = document.getElementById('statActive');
var statUnderOffer = document.getElementById('statUnderOffer');
var statSoldLet   = document.getElementById('statSoldLet');


/* ══════════════════════════════════════════════════════════════
   3. CURRENT FILTER STATE
   We store the active filters here so any change can
   trigger a fresh render.
══════════════════════════════════════════════════════════════ */

var currentBranch  = 'all';
var currentSearch  = '';
var currentStatus  = 'all';
var currentPurpose = 'all';


/* ══════════════════════════════════════════════════════════════
   4. FILTER & RENDER PROPERTIES
══════════════════════════════════════════════════════════════ */

/**
 * Returns a filtered array of properties based on the
 * current branch, search query, status, and purpose filters.
 */
function getFilteredProperties() {
  return properties.filter(function(p) {
    // Branch filter
    if (currentBranch !== 'all') {
      if (p.branch.toLowerCase() !== currentBranch) return false;
    }
    // Status filter
    if (currentStatus !== 'all' && p.status !== currentStatus) return false;
    // Purpose filter
    if (currentPurpose !== 'all' && p.purpose !== currentPurpose) return false;
    // Search filter — title, area, or ref
    if (currentSearch) {
      var q = currentSearch.toLowerCase();
      var match = p.title.toLowerCase().includes(q)
               || p.area.toLowerCase().includes(q)
               || p.ref.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });
}

/**
 * Maps a status string to the correct CSS badge class.
 */
function getBadgeClass(status) {
  var map = {
    'Draft':       'badge-draft',
    'Active':      'badge-active',
    'Under Offer': 'badge-offer',
    'Sold':        'badge-sold',
    'Let / Rented':'badge-let',
    'Withdrawn':   'badge-withdrawn'
  };
  return map[status] || 'badge-draft';
}

/**
 * Renders the desktop table rows and mobile cards
 * from the currently filtered properties.
 */
function renderProperties() {
  var filtered = getFilteredProperties();

  // Update stats from full filtered data
  updateStats(filtered);

  // Show or hide empty state
  var isEmpty = filtered.length === 0;
  emptyState.style.display = isEmpty ? 'flex' : 'none';
  propTable.style.display  = isEmpty ? 'none' : 'table';

  // ── Desktop Table ──
  propTableBody.innerHTML = '';
  filtered.forEach(function(p) {
    var badgeClass = getBadgeClass(p.status);
    var purposeClass = p.purpose === 'For Sale' ? 'pill-sale' : 'pill-rent';

    var row = document.createElement('tr');
    row.dataset.id = p.id;

    row.innerHTML = [
      '<td class="col-check"><input type="checkbox" class="row-check" data-id="' + p.id + '" /></td>',
      '<td>',
        '<div class="prop-cover">',
          p.coverImage
            ? '<img src="' + p.coverImage + '" alt="' + p.title + '" />'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>',
        '</div>',
      '</td>',
      '<td><span class="prop-ref">' + p.ref + '</span></td>',
      '<td>',
        '<div class="prop-ref">' + p.ref + '</div>',
        '<div class="prop-title-cell" title="' + p.title + '">' + p.title + '</div>',
      '</td>',
      '<td><span class="purpose-pill ' + purposeClass + '">' + p.purpose + '</span></td>',
      '<td>' + p.type + '</td>',
      '<td>' + p.branch + '</td>',
      '<td>' + p.area + '</td>',
      '<td style="font-weight:600;white-space:nowrap;">' + p.price + '</td>',
      '<td><span class="badge ' + badgeClass + '">' + p.status + '</span></td>',
      '<td>',
        '<div class="table-actions">',
          '<button class="btn-view" data-id="' + p.id + '" title="View">',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
          '</button>',
          '<button class="btn-edit" data-id="' + p.id + '" title="Edit">',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
          '</button>',
          '<button class="btn-delete" data-id="' + p.id + '" title="Delete">',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>',
          '</button>',
        '</div>',
      '</td>'
    ].join('');

    propTableBody.appendChild(row);
  });

  // ── Mobile Cards ──
  propCards.innerHTML = '';
  filtered.forEach(function(p) {
    var badgeClass = getBadgeClass(p.status);
    var purposeClass = p.purpose === 'For Sale' ? 'pill-sale' : 'pill-rent';

    var card = document.createElement('div');
    card.className = 'prop-card';
    card.dataset.id = p.id;

    card.innerHTML = [
      '<div class="prop-card-cover">',
        p.coverImage
          ? '<img src="' + p.coverImage + '" alt="' + p.title + '" />'
          : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        '<span class="badge ' + badgeClass + ' card-badge">' + p.status + '</span>',
      '</div>',
      '<div class="prop-card-body">',
        '<div class="prop-card-ref">' + p.ref + '</div>',
        '<div class="prop-card-title">' + p.title + '</div>',
        '<div class="prop-card-meta">',
          '<span><span class="purpose-pill ' + purposeClass + '">' + p.purpose + '</span></span>',
          '<span>' + p.type + '</span>',
          '<span>' + p.area + '</span>',
          '<span>' + p.branch + '</span>',
        '</div>',
        '<div class="prop-card-price">' + p.price + '</div>',
        '<div class="prop-card-actions">',
          '<button class="action-btn outline small btn-edit" data-id="' + p.id + '">Edit</button>',
          '<button class="action-btn danger small btn-delete" data-id="' + p.id + '">Delete</button>',
        '</div>',
      '</div>'
    ].join('');

    propCards.appendChild(card);
  });

  // Reset bulk selection
  updateBulkCount();
}


/* ══════════════════════════════════════════════════════════════
   5. UPDATE PROPERTY STATS
══════════════════════════════════════════════════════════════ */

function updateStats(filtered) {
  statTotal.textContent      = filtered.length;
  statActive.textContent     = filtered.filter(function(p){ return p.status === 'Active'; }).length;
  statUnderOffer.textContent = filtered.filter(function(p){ return p.status === 'Under Offer'; }).length;
  statSoldLet.textContent    = filtered.filter(function(p){ return p.status === 'Sold' || p.status === 'Let / Rented'; }).length;
}


/* ══════════════════════════════════════════════════════════════
   6. BRANCH FILTER
══════════════════════════════════════════════════════════════ */

document.querySelectorAll('.branch-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.branch-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    currentBranch = btn.dataset.branch;
    renderProperties();
  });
});


/* ══════════════════════════════════════════════════════════════
   7. SEARCH & FILTER LISTENERS
══════════════════════════════════════════════════════════════ */

searchInput.addEventListener('input', function() {
  currentSearch = searchInput.value.trim();
  renderProperties();
});

statusFilter.addEventListener('change', function() {
  currentStatus = statusFilter.value;
  renderProperties();
});

purposeFilter.addEventListener('change', function() {
  currentPurpose = purposeFilter.value;
  renderProperties();
});


/* ══════════════════════════════════════════════════════════════
   8. TABLE ACTION DELEGATION
   We listen on the parent elements to handle clicks on
   dynamically-created buttons.
══════════════════════════════════════════════════════════════ */

propTableBody.addEventListener('click', function(e) {
  handleTableAction(e);
});

propCards.addEventListener('click', function(e) {
  handleTableAction(e);
});

function handleTableAction(e) {
  var target = e.target;

  // View button
  if (target.closest('.btn-view')) {
    var id = parseInt(target.closest('.btn-view').dataset.id);
    viewProperty(id);
    return;
  }

  // Edit button
  if (target.closest('.btn-edit')) {
    var id = parseInt(target.closest('.btn-edit').dataset.id);
    openEditModal(id);
    return;
  }

  // Delete button
  if (target.closest('.btn-delete')) {
    var id = parseInt(target.closest('.btn-delete').dataset.id);
    deleteProperty(id);
    return;
  }

  // Row checkbox
  if (target.classList.contains('row-check')) {
    updateBulkCount();
  }
}

/**
 * Simple view — shows property details in a browser alert.
 * In a future version, this would open a read-only detail panel.
 */
function viewProperty(id) {
  var p = properties.find(function(x){ return x.id === id; });
  if (!p) return;
  alert(
    'PROPERTY DETAILS\n\n' +
    'Ref: ' + p.ref + '\n' +
    'Title: ' + p.title + '\n' +
    'Purpose: ' + p.purpose + '\n' +
    'Type: ' + p.type + '\n' +
    'Branch: ' + p.branch + '\n' +
    'Area: ' + p.area + '\n' +
    'Price: ' + p.price + '\n' +
    'Status: ' + p.status + '\n' +
    'Beds: ' + p.beds + '  Baths: ' + p.baths + '  Garages: ' + p.garages + '\n' +
    'Size: ' + p.size + ' m²\n' +
    'Featured: ' + p.featured + '\n' +
    'Amenities: ' + p.amenities
  );
}

/**
 * Removes a property from the array and re-renders.
 */
function deleteProperty(id) {
  var p = properties.find(function(x){ return x.id === id; });
  if (!p) return;
  if (!confirm('Delete "' + p.title + '"? This cannot be undone.')) return;

  properties = properties.filter(function(x){ return x.id !== id; });
  renderProperties();
  showToast('Property deleted', 'success');
}


/* ══════════════════════════════════════════════════════════════
   9. SELECT ALL & BULK ACTIONS
══════════════════════════════════════════════════════════════ */

selectAll.addEventListener('change', function() {
  document.querySelectorAll('.row-check').forEach(function(cb) {
    cb.checked = selectAll.checked;
  });
  updateBulkCount();
});

function getCheckedIds() {
  var ids = [];
  document.querySelectorAll('.row-check:checked').forEach(function(cb) {
    ids.push(parseInt(cb.dataset.id));
  });
  return ids;
}

function updateBulkCount() {
  var count = getCheckedIds().length;
  bulkCount.textContent = count + ' selected';
}

// Bulk status change
btnBulkStatus.addEventListener('click', function() {
  var ids = getCheckedIds();
  var newStatus = bulkStatusSelect.value;
  if (!ids.length)    { showToast('No properties selected', 'error'); return; }
  if (!newStatus)     { showToast('Please choose a status', 'error'); return; }

  ids.forEach(function(id) {
    var p = properties.find(function(x){ return x.id === id; });
    if (p) p.status = newStatus;
  });

  bulkStatusSelect.value = '';
  selectAll.checked = false;
  renderProperties();
  showToast('Status updated for ' + ids.length + ' properties', 'success');
});

// Bulk delete
btnBulkDelete.addEventListener('click', function() {
  var ids = getCheckedIds();
  if (!ids.length) { showToast('No properties selected', 'error'); return; }
  if (!confirm('Delete ' + ids.length + ' selected properties? This cannot be undone.')) return;

  properties = properties.filter(function(p){ return !ids.includes(p.id); });
  selectAll.checked = false;
  renderProperties();
  showToast(ids.length + ' properties deleted', 'success');
});


/* ══════════════════════════════════════════════════════════════
   10. MODAL — OPEN / CLOSE
══════════════════════════════════════════════════════════════ */

function openModal(mode, id) {
  mode = mode || 'add';

  // Switch to details tab first
  switchTab('details');

  // Clear staged images
  stagedImages = [];
  imagePreviewGrid.innerHTML = '';

  if (mode === 'edit' && id) {
    // Find the property to edit
    var p = properties.find(function(x){ return x.id === id; });
    if (!p) return;

    modalTitle.textContent = 'Edit Property';
    editIdField.value = p.id;

    // Fill in form fields
    document.getElementById('fTitle').value    = p.title;
    document.getElementById('fRef').value      = p.ref;
    document.getElementById('fPrice').value    = p.price;
    document.getElementById('fDesc').value     = p.description;
    document.getElementById('fPurpose').value  = p.purpose;
    document.getElementById('fType').value     = p.type;
    document.getElementById('fBranch').value   = p.branch;
    document.getElementById('fArea').value     = p.area;
    document.getElementById('fAddress').value  = p.address;
    document.getElementById('fBeds').value     = p.beds;
    document.getElementById('fBaths').value    = p.baths;
    document.getElementById('fGarages').value  = p.garages;
    document.getElementById('fSize').value     = p.size;
    document.getElementById('fFeatured').value = p.featured;
    document.getElementById('fAmenities').value = p.amenities;
    document.getElementById('fVirtualTour').value = p.virtualTour;
    document.getElementById('fYoutube').value  = p.youtube;
    document.getElementById('fStatus').value   = p.status;

    highlightWorkflowStep(p.status);

  } else {
    // Add mode — clear the form
    modalTitle.textContent = 'Add New Property';
    editIdField.value = '';
    propForm.reset();
    highlightWorkflowStep('Draft');
  }

  // Show modal
  propModal.style.display = 'flex';
  // Small delay lets display:flex paint before the CSS transition triggers
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      propModal.classList.add('open');
    });
  });
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  propModal.classList.remove('open');
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  // After transition completes, hide completely
  setTimeout(function() { propModal.style.display = 'none'; }, 320);
}

// Open handlers
btnAddProperty.addEventListener('click', function() { openModal('add'); });
document.querySelectorAll('[data-open-property-modal]').forEach(function(button) {
  button.addEventListener('click', function() { openModal('add'); });
});
modalClose.addEventListener('click', closeModal);
modalCancelBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Open edit modal
function openEditModal(id) { openModal('edit', id); }


/* ══════════════════════════════════════════════════════════════
   11. MODAL TABS
══════════════════════════════════════════════════════════════ */

document.querySelectorAll('.modal-tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    switchTab(tab.dataset.tab);
  });
});

function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.modal-tab').forEach(function(t) {
    t.classList.toggle('active', t.dataset.tab === tabName);
  });
  // Update tab panels
  document.querySelectorAll('.tab-panel').forEach(function(panel) {
    panel.classList.toggle('active', panel.id === 'tab-' + tabName);
  });
}


/* ══════════════════════════════════════════════════════════════
   12. STATUS WORKFLOW HIGHLIGHT
══════════════════════════════════════════════════════════════ */

function highlightWorkflowStep(statusValue) {
  document.querySelectorAll('.workflow-step').forEach(function(step) {
    step.classList.toggle('current', step.dataset.step === statusValue);
  });
}

document.getElementById('fStatus').addEventListener('change', function() {
  highlightWorkflowStep(this.value);
});


/* ══════════════════════════════════════════════════════════════
   13. FORM SAVE (ADD OR EDIT)
══════════════════════════════════════════════════════════════ */

propForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Basic validation
  var required = ['fTitle', 'fRef', 'fPrice', 'fPurpose', 'fType', 'fBranch', 'fArea', 'fStatus'];
  var valid = true;
  required.forEach(function(fieldId) {
    var el = document.getElementById(fieldId);
    if (!el.value.trim()) {
      el.classList.add('error');
      valid = false;
    } else {
      el.classList.remove('error');
    }
  });

  if (!valid) {
    switchTab('details');
    showToast('Please fill in all required fields', 'error');
    return;
  }

  // Build property object from form values
  var formData = {
    title:       document.getElementById('fTitle').value.trim(),
    ref:         document.getElementById('fRef').value.trim(),
    price:       document.getElementById('fPrice').value.trim(),
    description: document.getElementById('fDesc').value.trim(),
    purpose:     document.getElementById('fPurpose').value,
    type:        document.getElementById('fType').value,
    branch:      document.getElementById('fBranch').value,
    area:        document.getElementById('fArea').value.trim(),
    address:     document.getElementById('fAddress').value.trim(),
    beds:        parseInt(document.getElementById('fBeds').value) || 0,
    baths:       parseInt(document.getElementById('fBaths').value) || 0,
    garages:     parseInt(document.getElementById('fGarages').value) || 0,
    size:        parseInt(document.getElementById('fSize').value) || 0,
    featured:    document.getElementById('fFeatured').value,
    amenities:   document.getElementById('fAmenities').value.trim(),
    virtualTour: document.getElementById('fVirtualTour').value.trim(),
    youtube:     document.getElementById('fYoutube').value.trim(),
    status:      document.getElementById('fStatus').value,
    coverImage:  stagedImages.length ? stagedImages[0] : ''
  };

  var editId = editIdField.value;

  if (editId) {
    // EDIT existing property
    var idx = properties.findIndex(function(p){ return p.id === parseInt(editId); });
    if (idx > -1) {
      formData.id = parseInt(editId);
      properties[idx] = formData;
      showToast('Property updated successfully', 'success');
    }
  } else {
    // ADD new property
    formData.id = nextId++;
    properties.push(formData);
    showToast('Property added successfully', 'success');
  }

  closeModal();
  renderProperties();
});


/* ══════════════════════════════════════════════════════════════
   14. IMAGE UPLOAD PREVIEW
══════════════════════════════════════════════════════════════ */

// Clicking the "Browse Images" button triggers the file input
btnBrowseImages.addEventListener('click', function() {
  imageFileInput.click();
});

// Clicking anywhere on the drop zone also opens file picker
imageDropZone.addEventListener('click', function(e) {
  if (e.target !== btnBrowseImages) {
    imageFileInput.click();
  }
});

// Drag-and-drop events
imageDropZone.addEventListener('dragover', function(e) {
  e.preventDefault();
  imageDropZone.classList.add('drag-over');
});
imageDropZone.addEventListener('dragleave', function() {
  imageDropZone.classList.remove('drag-over');
});
imageDropZone.addEventListener('drop', function(e) {
  e.preventDefault();
  imageDropZone.classList.remove('drag-over');
  handleImageFiles(e.dataTransfer.files);
});

// File input change
imageFileInput.addEventListener('change', function() {
  handleImageFiles(imageFileInput.files);
  // Reset so the same file can be re-selected if removed
  imageFileInput.value = '';
});

/**
 * Reads selected image files and creates preview thumbnails.
 * The first image is tagged as the cover.
 */
function handleImageFiles(files) {
  Array.from(files).forEach(function(file) {
    if (!file.type.startsWith('image/')) return;

    var reader = new FileReader();
    reader.onload = function(ev) {
      var dataUrl = ev.target.result;
      stagedImages.push(dataUrl);
      addImagePreview(dataUrl, stagedImages.length === 1);
    };
    reader.readAsDataURL(file);
  });
}

function addImagePreview(src, isCover) {
  var index = imagePreviewGrid.children.length;
  var thumb = document.createElement('div');
  thumb.className = 'preview-thumb';
  thumb.innerHTML =
    '<img src="' + src + '" alt="Preview" />' +
    (isCover ? '<span class="preview-cover-tag">Cover</span>' : '') +
    '<button type="button" class="preview-remove" data-index="' + index + '">×</button>';

  thumb.querySelector('.preview-remove').addEventListener('click', function() {
    var idx = parseInt(this.dataset.index);
    stagedImages.splice(idx, 1);
    // Re-render all previews
    imagePreviewGrid.innerHTML = '';
    stagedImages.forEach(function(s, i) {
      addImagePreview(s, i === 0);
    });
  });

  imagePreviewGrid.appendChild(thumb);
}


/* ══════════════════════════════════════════════════════════════
   15. DOCUMENT UPLOAD — FILE NAME DISPLAY
   Shows the selected file name next to each document upload.
   No actual upload; this is a frontend prototype only.
══════════════════════════════════════════════════════════════ */

function setupDocInput(inputId, nameId) {
  var input = document.getElementById(inputId);
  var nameEl = document.getElementById(nameId);
  if (!input || !nameEl) return;
  input.addEventListener('change', function() {
    nameEl.textContent = input.files[0] ? input.files[0].name : 'Choose file';
  });
}
setupDocInput('docFloorPlan',  'docFloorPlanName');
setupDocInput('docTitleDeed',  'docTitleDeedName');
setupDocInput('docLease',      'docLeaseName');
setupDocInput('docOther',      'docOtherName');


/* ══════════════════════════════════════════════════════════════
   16. MOBILE SIDEBAR TOGGLE
   Reuses the same pattern from Module 1 (script.js),
   but only if sidebar / hamburger exist on this page.
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
    if (!propModal.classList.contains('open')) {
      document.body.style.overflow = '';
    }
  }
  hamburgerBtn.addEventListener('click', function() {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  sidebarOverlay.addEventListener('click', function() {
    // If the modal is open, overlay click closes the modal, not the sidebar
    if (propModal.classList.contains('open')) {
      closeModal();
    } else {
      closeSidebar();
    }
  });
}


/* ══════════════════════════════════════════════════════════════
   17. TOAST NOTIFICATIONS
══════════════════════════════════════════════════════════════ */

var toastTimer;
function showToast(message, type) {
  type = type || 'success';
  toastEl.textContent = message;
  toastEl.className = 'toast ' + type;
  // Trigger show (small delay ensures transition fires)
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      toastEl.classList.add('show');
    });
  });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() {
    toastEl.classList.remove('show');
  }, 3200);
}


/* ══════════════════════════════════════════════════════════════
   18. INITIAL RENDER ON PAGE LOAD
══════════════════════════════════════════════════════════════ */

renderProperties();

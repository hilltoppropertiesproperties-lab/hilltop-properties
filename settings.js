/* ============================================================
   HILLTOP PROPERTIES ZAMBIA - MODULE 6: SETTINGS
   Frontend-only sample data. Supabase can be connected later.
   Never expose service_role keys in frontend code.
   ============================================================ */

var settingsData = {
  company: {
    companyName: 'Hilltop Properties Zambia',
    tradingName: 'Hilltop Properties',
    registrationNumber: 'TPIN / PACRA placeholder',
    mainPhone: '+260 211 000 001',
    mainWhatsapp: '+260 977 000 001',
    mainEmail: 'admin@hilltopproperties.co.zm',
    websiteUrl: 'https://hilltopproperties.co.zm',
    businessAddress: 'Kabulonga, Lusaka, Zambia',
    aboutCompany: 'Hilltop Properties Zambia helps clients buy, rent, sell, and manage quality real estate across Lusaka and Livingstone.',
    currency: 'ZMW',
    country: 'Zambia'
  },
  branches: [
    {
      id: 'lusaka',
      name: 'Lusaka Branch',
      address: 'Kabulonga, Lusaka, Zambia',
      phone: '+260 211 000 001',
      whatsapp: '+260 977 000 001',
      email: 'lusaka@hilltopproperties.co.zm',
      manager: 'John Phiri',
      hours: 'Mon-Fri, 08:00-17:00',
      mapLink: 'Google Maps placeholder - Lusaka',
      status: 'Active',
      showOnWebsite: true
    },
    {
      id: 'livingstone',
      name: 'Livingstone Branch',
      address: 'Mosi-oa-Tunya Road, Livingstone, Zambia',
      phone: '+260 213 000 002',
      whatsapp: '+260 977 000 002',
      email: 'livingstone@hilltopproperties.co.zm',
      manager: 'David Mwale',
      hours: 'Mon-Fri, 08:00-17:00',
      mapLink: 'Google Maps placeholder - Livingstone',
      status: 'Active',
      showOnWebsite: true
    }
  ],
  website: {
    showFeatured: true,
    showTestimonials: true,
    showTeam: true,
    showPublicBranchFilter: true,
    defaultPublicBranch: 'All',
    propertyCardStyle: 'Detailed',
    showPrices: true,
    showClosedProperties: false,
    enquiryButtonLabel: 'Enquire Now',
    whatsappButtonLabel: 'WhatsApp Agent'
  },
  notifications: {
    leads: ['New website enquiry', 'WhatsApp enquiry', 'Viewing scheduled', 'Follow-up due', 'Lead assigned to agent'],
    properties: ['New property added', 'Property approved', 'Property marked sold/rented', 'Property expiring soon'],
    channels: ['Email', 'WhatsApp placeholder', 'Admin dashboard alert'],
    recipients: {
      notifyLusaka: 'lusaka@hilltopproperties.co.zm',
      notifyLivingstone: 'livingstone@hilltopproperties.co.zm',
      notifyHeadOffice: 'admin@hilltopproperties.co.zm'
    }
  },
  seo: {
    seoSiteTitle: 'Hilltop Properties Zambia',
    seoMetaDescription: 'Find houses, apartments, land, and commercial property for sale and rent in Zambia.',
    seoKeywords: 'Zambia property, Lusaka real estate, Livingstone properties, houses for sale Zambia',
    seoHomepageTitle: 'Hilltop Properties Zambia | Real Estate in Lusaka and Livingstone',
    seoHomepageDescription: 'Browse premium properties, rentals, land, and commercial real estate with Hilltop Properties Zambia.',
    seoPropertyTitle: '{property_title} | Hilltop Properties Zambia',
    seoPropertyDescription: '{property_title} in {area}. View price, branch, features, and enquiry details.',
    seoSocialImage: 'Website social sharing image placeholder',
    seoSearchConsole: 'Google Search Console placeholder',
    seoAnalytics: 'Google Analytics placeholder',
    schemaEnabled: true
  },
  propertyDefaults: {
    defaultPurpose: 'For Sale',
    defaultCurrency: 'ZMW',
    defaultPropertyStatus: 'Draft',
    requireReference: true,
    requireImages: true,
    requireLegalStatus: true,
    requireBranch: true,
    defaultImageText: 'Image coming soon',
    types: ['House', 'Apartment', 'Plot/Land', 'Commercial', 'Farm', 'Lodge/Guesthouse']
  },
  workflow: {
    statuses: ['New', 'Contacted', 'Follow-up', 'Viewing Scheduled', 'Offer Made', 'Closed Won', 'Closed Lost'],
    sources: ['Website', 'WhatsApp', 'Phone Call', 'Facebook', 'Referral', 'Walk-in'],
    defaultFollowUpDays: 2,
    overdueWarningDays: 1,
    autoAssignLeads: false,
    requireAssignedAgent: true,
    requireClosingLog: true
  }
};

var recommendedPropertyDefaults = JSON.parse(JSON.stringify(settingsData.propertyDefaults));
var currentBranch = 'all';
var activeSection = 'company';
var toastTimer;

var sidebar = document.getElementById('sidebar');
var hamburgerBtn = document.getElementById('hamburger');
var sidebarOverlay = document.getElementById('sidebarOverlay');
var modalOverlay = document.getElementById('settingsModalOverlay');
var settingsModal = document.getElementById('settingsModal');
var settingsModalClose = document.getElementById('settingsModalClose');
var toastEl = document.getElementById('toast');

function byId(id) {
  return document.getElementById(id);
}

function setValue(id, value) {
  var el = byId(id);
  if (el) el.value = value;
}

function setChecked(id, value) {
  var el = byId(id);
  if (el) el.checked = Boolean(value);
}

function showToast(message, type) {
  type = type || 'success';
  toastEl.textContent = message;
  toastEl.className = 'toast ' + type;
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      toastEl.classList.add('show');
    });
  });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() {
    toastEl.classList.remove('show');
  }, 3000);
}

function updateStats() {
  var visibleBranches = settingsData.branches.filter(function(branch) {
    return branch.status === 'Active' && branch.showOnWebsite;
  }).length;
  var enabledNotifications = settingsData.notifications.leads.length + settingsData.notifications.properties.length;
  byId('statBranches').textContent = visibleBranches;
  byId('statNotifications').textContent = enabledNotifications > 0 ? 'On' : 'Off';
  byId('statSeo').textContent = settingsData.seo.schemaEnabled ? 'Live' : 'Draft';
}

function populateCompanyForm() {
  Object.keys(settingsData.company).forEach(function(key) {
    setValue(key, settingsData.company[key]);
  });
}

function readCompanyForm() {
  Object.keys(settingsData.company).forEach(function(key) {
    var el = byId(key);
    if (el && !el.readOnly) settingsData.company[key] = el.value.trim();
  });
}

function renderBranchCards() {
  var wrap = byId('branchSettingsGrid');
  var branches = settingsData.branches.filter(function(branch) {
    return currentBranch === 'all' || branch.id === currentBranch;
  });
  wrap.innerHTML = branches.map(function(branch) {
    return [
      '<div class="branch-settings-card" data-branch="' + branch.id + '">',
        '<div class="branch-settings-top">',
          '<div><h3>' + branch.name + '</h3><p>' + branch.manager + '</p></div>',
          '<span>' + branch.status + '</span>',
        '</div>',
        '<div class="branch-settings-body">',
          '<div class="form-grid single">',
            fieldHtml(branch.id + '-name', 'Branch name', branch.name),
            fieldHtml(branch.id + '-address', 'Branch address', branch.address, true),
            fieldHtml(branch.id + '-phone', 'Branch phone', branch.phone),
            fieldHtml(branch.id + '-whatsapp', 'Branch WhatsApp', branch.whatsapp),
            fieldHtml(branch.id + '-email', 'Branch email', branch.email),
            fieldHtml(branch.id + '-manager', 'Branch manager', branch.manager),
            fieldHtml(branch.id + '-hours', 'Opening hours', branch.hours),
            fieldHtml(branch.id + '-mapLink', 'Google Maps placeholder link', branch.mapLink),
            '<label>Active/Inactive status<select id="' + branch.id + '-status"><option' + selected(branch.status, 'Active') + '>Active</option><option' + selected(branch.status, 'Inactive') + '>Inactive</option></select></label>',
            '<label>Show on website<select id="' + branch.id + '-showOnWebsite"><option value="yes"' + (branch.showOnWebsite ? ' selected' : '') + '>Yes</option><option value="no"' + (!branch.showOnWebsite ? ' selected' : '') + '>No</option></select></label>',
          '</div>',
          '<div class="settings-actions">',
            '<button type="button" class="action-btn outline" data-branch-edit="' + branch.id + '">Edit</button>',
            '<button type="button" class="action-btn primary" data-branch-save="' + branch.id + '">Save</button>',
            '<button type="button" class="action-btn secondary" data-branch-preview="' + branch.id + '">Preview contact block</button>',
          '</div>',
          '<div class="branch-preview" id="' + branch.id + '-preview">' + contactPreview(branch) + '</div>',
        '</div>',
      '</div>'
    ].join('');
  }).join('');
}

function fieldHtml(id, label, value, textarea) {
  if (textarea) return '<label>' + label + '<textarea id="' + id + '" rows="2">' + escapeHtml(value) + '</textarea></label>';
  return '<label>' + label + '<input id="' + id + '" type="text" value="' + escapeHtml(value) + '" /></label>';
}

function selected(actual, expected) {
  return actual === expected ? ' selected' : '';
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, function(ch) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
  });
}

function contactPreview(branch) {
  return '<strong>' + branch.name + '</strong><br>' + branch.address + '<br>' + branch.phone + ' | ' + branch.whatsapp + '<br>' + branch.email + '<br>' + branch.hours;
}

function saveBranch(branchId) {
  var branch = settingsData.branches.find(function(item) { return item.id === branchId; });
  if (!branch) return;
  ['name', 'address', 'phone', 'whatsapp', 'email', 'manager', 'hours', 'mapLink'].forEach(function(key) {
    branch[key] = byId(branchId + '-' + key).value.trim();
  });
  branch.status = byId(branchId + '-status').value;
  branch.showOnWebsite = byId(branchId + '-showOnWebsite').value === 'yes';
  byId(branchId + '-preview').innerHTML = contactPreview(branch);
  updateStats();
  showToast(branch.name + ' settings saved');
}

function populateWebsiteForm() {
  Object.keys(settingsData.website).forEach(function(key) {
    if (typeof settingsData.website[key] === 'boolean') setChecked(key, settingsData.website[key]);
    else setValue(key, settingsData.website[key]);
  });
}

function readWebsiteForm() {
  Object.keys(settingsData.website).forEach(function(key) {
    var el = byId(key);
    if (!el) return;
    settingsData.website[key] = el.type === 'checkbox' ? el.checked : el.value;
  });
}

function renderNotificationLists() {
  renderCheckList('leadNotificationList', settingsData.notifications.leads);
  renderCheckList('propertyNotificationList', settingsData.notifications.properties);
  renderCheckList('notificationChannels', settingsData.notifications.channels);
  Object.keys(settingsData.notifications.recipients).forEach(function(key) {
    setValue(key, settingsData.notifications.recipients[key]);
  });
}

function renderCheckList(containerId, items) {
  var wrap = byId(containerId);
  wrap.innerHTML = items.map(function(item, index) {
    return '<label class="check-row"><span>' + item + '</span><input type="checkbox" checked data-check-index="' + index + '" /></label>';
  }).join('');
}

function readNotificationRecipients() {
  Object.keys(settingsData.notifications.recipients).forEach(function(key) {
    settingsData.notifications.recipients[key] = byId(key).value.trim();
  });
}

function populateSeoForm() {
  Object.keys(settingsData.seo).forEach(function(key) {
    if (typeof settingsData.seo[key] === 'boolean') setChecked(key, settingsData.seo[key]);
    else setValue(key, settingsData.seo[key]);
  });
  renderSeoPreview();
}

function readSeoForm() {
  Object.keys(settingsData.seo).forEach(function(key) {
    var el = byId(key);
    if (!el) return;
    settingsData.seo[key] = el.type === 'checkbox' ? el.checked : el.value.trim();
  });
}

function renderSeoPreview() {
  readSeoForm();
  byId('seoPreview').innerHTML = [
    '<div class="seo-title">' + escapeHtml(settingsData.seo.seoHomepageTitle) + '</div>',
    '<div class="seo-url">' + escapeHtml(settingsData.company.websiteUrl) + '</div>',
    '<div class="seo-description">' + escapeHtml(settingsData.seo.seoHomepageDescription) + '</div>'
  ].join('');
}

function populatePropertyDefaults() {
  Object.keys(settingsData.propertyDefaults).forEach(function(key) {
    var value = settingsData.propertyDefaults[key];
    if (Array.isArray(value)) return;
    if (typeof value === 'boolean') setChecked(key, value);
    else setValue(key, value);
  });
  renderPropertyTypes();
}

function readPropertyDefaults() {
  Object.keys(settingsData.propertyDefaults).forEach(function(key) {
    var el = byId(key);
    if (!el || Array.isArray(settingsData.propertyDefaults[key])) return;
    settingsData.propertyDefaults[key] = el.type === 'checkbox' ? el.checked : el.value;
  });
}

function renderPropertyTypes() {
  byId('allowedPropertyTypes').innerHTML = settingsData.propertyDefaults.types.map(function(type) {
    return '<label class="check-row"><span>' + type + '</span><input type="checkbox" checked /></label>';
  }).join('');
}

function populateWorkflow() {
  setValue('defaultFollowUpDays', settingsData.workflow.defaultFollowUpDays);
  setValue('overdueWarningDays', settingsData.workflow.overdueWarningDays);
  setChecked('autoAssignLeads', settingsData.workflow.autoAssignLeads);
  setChecked('requireAssignedAgent', settingsData.workflow.requireAssignedAgent);
  setChecked('requireClosingLog', settingsData.workflow.requireClosingLog);
  renderPills('leadStatuses', settingsData.workflow.statuses);
  renderPills('leadSources', settingsData.workflow.sources);
}

function readWorkflow() {
  settingsData.workflow.defaultFollowUpDays = Number(byId('defaultFollowUpDays').value || 2);
  settingsData.workflow.overdueWarningDays = Number(byId('overdueWarningDays').value || 1);
  settingsData.workflow.autoAssignLeads = byId('autoAssignLeads').checked;
  settingsData.workflow.requireAssignedAgent = byId('requireAssignedAgent').checked;
  settingsData.workflow.requireClosingLog = byId('requireClosingLog').checked;
}

function renderPills(containerId, items) {
  byId(containerId).innerHTML = items.map(function(item) {
    return '<span class="settings-pill">' + item + '</span>';
  }).join('');
}

function renderSecurityChecklist() {
  var items = [
    'Do not expose service_role key',
    'Do not store secret keys in frontend',
    'Use publishable key only',
    'RLS policies enabled in Supabase',
    'Staff accounts created by system administrator',
    'Later: stricter branch-level access rules'
  ];
  byId('securityChecklist').innerHTML = items.map(function(item) {
    return '<label class="check-row"><span>' + item + '</span><input type="checkbox" checked disabled /></label>';
  }).join('');
}

function switchSection(section) {
  activeSection = section;
  document.querySelectorAll('.settings-tab').forEach(function(tab) {
    tab.classList.toggle('active', tab.dataset.section === section);
  });
  document.querySelectorAll('.settings-panel').forEach(function(panel) {
    panel.classList.toggle('active', panel.id === 'panel-' + section);
  });
}

function openSettingsModal(title, html) {
  byId('settingsModalTitle').textContent = title;
  byId('settingsModalBody').innerHTML = html;
  settingsModal.style.display = 'block';
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(function() {
    settingsModal.classList.add('open');
  });
}

function closeSettingsModal() {
  settingsModal.classList.remove('open');
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(function() {
    settingsModal.style.display = 'none';
  }, 280);
}

function initializeEvents() {
  document.querySelectorAll('.settings-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      switchSection(tab.dataset.section);
    });
  });

  document.querySelectorAll('.branch-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.branch-btn').forEach(function(item) { item.classList.remove('active'); });
      btn.classList.add('active');
      currentBranch = btn.dataset.branch;
      renderBranchCards();
      showToast('Branch filter set to ' + btn.textContent.trim());
    });
  });

  document.addEventListener('click', function(e) {
    var target = e.target;
    if (target.matches('[data-branch-save]')) saveBranch(target.dataset.branchSave);
    if (target.matches('[data-branch-edit]')) showToast('Editing ' + target.dataset.branchEdit + ' branch settings');
    if (target.matches('[data-branch-preview]')) showToast('Contact preview refreshed');
    if (target.matches('[data-save]')) handleSave(target.dataset.save);
    if (target.matches('[data-preview]')) handlePreview(target.dataset.preview);
    if (target.matches('[data-modal="auth"]')) openSettingsModal('Authentication Notes', '<p>Supabase Authentication is used for staff login. Public sign-up remains disabled, and staff accounts are created manually by the system administrator.</p>');
    if (target.matches('[data-modal="rls"]')) openSettingsModal('RLS Notes', '<p>Starter RLS policies are enabled in Supabase. Later, stricter branch-level and role-based rules can be added before connecting live data writes.</p>');
  });

  byId('btnResetPropertyDefaults').addEventListener('click', function() {
    settingsData.propertyDefaults = JSON.parse(JSON.stringify(recommendedPropertyDefaults));
    populatePropertyDefaults();
    showToast('Property defaults reset to recommended values');
  });

  byId('btnAddStatus').addEventListener('click', function() {
    var value = prompt('Enter a custom lead status');
    if (value) {
      settingsData.workflow.statuses.push(value.trim());
      renderPills('leadStatuses', settingsData.workflow.statuses);
      showToast('Custom status added');
    }
  });

  byId('btnAddSource').addEventListener('click', function() {
    var value = prompt('Enter a custom lead source');
    if (value) {
      settingsData.workflow.sources.push(value.trim());
      renderPills('leadSources', settingsData.workflow.sources);
      showToast('Custom source added');
    }
  });

  byId('btnSafetyCheck').addEventListener('click', function() {
    showToast('Frontend safety check passed: no service_role key belongs in browser code');
  });

  ['seoHomepageTitle', 'seoHomepageDescription'].forEach(function(id) {
    byId(id).addEventListener('input', renderSeoPreview);
  });

  settingsModalClose.addEventListener('click', closeSettingsModal);
  modalOverlay.addEventListener('click', closeSettingsModal);

  if (hamburgerBtn && sidebar && sidebarOverlay) {
    hamburgerBtn.addEventListener('click', function() {
      var opening = !sidebar.classList.contains('open');
      sidebar.classList.toggle('open', opening);
      sidebarOverlay.classList.toggle('active', opening);
      document.body.style.overflow = opening ? 'hidden' : '';
    });
    sidebarOverlay.addEventListener('click', function() {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}

function handleSave(type) {
  if (type === 'company' || type === 'company-draft') readCompanyForm();
  if (type === 'website') readWebsiteForm();
  if (type === 'notifications') readNotificationRecipients();
  if (type === 'seo') readSeoForm();
  if (type === 'property') readPropertyDefaults();
  if (type === 'workflow') readWorkflow();
  updateStats();
  showToast(type === 'company-draft' ? 'Company profile draft saved' : 'Settings saved');
}

function handlePreview(type) {
  if (type === 'seo') renderSeoPreview();
  showToast('Preview refreshed for ' + type + ' settings');
}

function initialRender() {
  populateCompanyForm();
  renderBranchCards();
  populateWebsiteForm();
  renderNotificationLists();
  populateSeoForm();
  populatePropertyDefaults();
  populateWorkflow();
  renderSecurityChecklist();
  updateStats();
}

initialRender();
initializeEvents();

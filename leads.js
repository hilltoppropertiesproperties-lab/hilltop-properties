/* ============================================================
   HILLTOP PROPERTIES ZAMBIA — MODULE 3: CRM & LEAD MANAGEMENT
   leads.js
   ============================================================
   All data is stored in the `leads` array below.
   Later, this can be replaced with Supabase API calls.
   Each function that reads/writes data is clearly marked
   with a comment showing where Supabase would plug in.
   ============================================================ */


/* ══════════════════════════════════════════════════════════════
   1. SAMPLE LEAD DATA
   // Later: replace this array with a Supabase fetch.
   // Example: const { data: leads } = await supabase.from('leads').select('*');
══════════════════════════════════════════════════════════════ */

var leads = [
  {
    id: 1,
    name: 'Mr. Chanda Mutale',
    phone: '+260 977 234 567',
    email: 'chanda.mutale@gmail.com',
    property: 'HT-LSK-001 — 4-Bedroom Executive House in Kabulonga',
    source: 'Website',
    branch: 'Lusaka',
    agent: 'John Phiri',
    status: 'New',
    dateEnquiry: '2024-06-01',
    followupDate: '2024-06-05',
    followupNote: 'Call to discuss budget and viewing availability.',
    notes: 'Client is relocating from Ndola. Looking to purchase within 3 months.',
    log: [
      { text: 'Lead created from website enquiry form.', time: '2024-06-01 09:14' }
    ]
  },
  {
    id: 2,
    name: 'Mrs. Grace Tembo',
    phone: '+260 966 345 678',
    email: 'grace.tembo@yahoo.com',
    property: 'HT-LSK-002 — 2-Bedroom Apartment in Levy Junction',
    source: 'WhatsApp',
    branch: 'Lusaka',
    agent: 'Mary Banda',
    status: 'Contacted',
    dateEnquiry: '2024-05-28',
    followupDate: '2024-06-06',
    followupNote: 'Send rental agreement draft.',
    notes: 'Interested in a 12-month rental. Works at Barclays on Cairo Road.',
    log: [
      { text: 'Lead received via WhatsApp message.', time: '2024-05-28 11:02' },
      { text: 'Called client. Confirmed interest and budget of ZMW 9,000/month.', time: '2024-05-30 14:30' },
      { text: 'Sent property brochure via WhatsApp.', time: '2024-05-30 15:00' }
    ]
  },
  {
    id: 3,
    name: 'Mr. Isaac Banda',
    phone: '+260 955 456 789',
    email: '',
    property: 'HT-LSK-003 — Commercial Office Space Cairo Road',
    source: 'Phone Call',
    branch: 'Lusaka',
    agent: 'David Mwale',
    status: 'Follow-up',
    dateEnquiry: '2024-05-25',
    followupDate: '2024-06-04',
    followupNote: 'Confirm if they want to proceed with offer.',
    notes: 'Looking for office space for a law firm. Budget up to ZMW 25,000/month. Wants parking for 6 cars.',
    log: [
      { text: 'Client called the office directly.', time: '2024-05-25 10:00' },
      { text: 'Emailed floor plan and pricing sheet.', time: '2024-05-26 09:30' },
      { text: 'Viewing conducted. Client asked for final pricing with discounts.', time: '2024-05-29 11:00' }
    ]
  },
  {
    id: 4,
    name: 'Dr. Mwansa Chipimo',
    phone: '+260 977 567 890',
    email: 'mwansa.chipimo@clinic.zm',
    property: 'HT-LSK-001 — 4-Bedroom Executive House in Kabulonga',
    source: 'Referral',
    branch: 'Lusaka',
    agent: 'John Phiri',
    status: 'Viewing Scheduled',
    dateEnquiry: '2024-05-30',
    followupDate: '2024-06-07',
    followupNote: 'Viewing confirmed for Saturday at 10:00.',
    notes: 'Referred by Mr. Chanda Mutale. Wants a family home with at least 4 beds and a pool.',
    log: [
      { text: 'Referral received from existing client Chanda Mutale.', time: '2024-05-30 13:00' },
      { text: 'Called Dr. Chipimo. Very interested. Viewing arranged for 7 June at 10:00.', time: '2024-06-01 10:20' }
    ]
  },
  {
    id: 5,
    name: 'Ms. Thandiwe Nkosi',
    phone: '+260 976 678 901',
    email: 'thandiwe@startup.co.zm',
    property: 'HT-LSK-005 — 1-Acre Residential Plot in Chalala',
    source: 'Facebook',
    branch: 'Lusaka',
    agent: 'Grace Mbewe',
    status: 'New',
    dateEnquiry: '2024-06-02',
    followupDate: '',
    followupNote: '',
    notes: 'Commented on our Facebook property post. Looking to buy land for future development.',
    log: [
      { text: 'Lead captured from Facebook ad comment.', time: '2024-06-02 08:45' }
    ]
  },
  {
    id: 6,
    name: 'Mr. Patrick Lunda',
    phone: '+260 955 789 012',
    email: 'patrick.lunda@mail.zm',
    property: 'HT-LSK-006 — 3-Bedroom House in Woodlands',
    source: 'Walk-in',
    branch: 'Lusaka',
    agent: 'Mary Banda',
    status: 'Offer Made',
    dateEnquiry: '2024-05-20',
    followupDate: '2024-06-08',
    followupNote: 'Await signed offer letter from client.',
    notes: 'Walked into the Lusaka branch office. Very serious buyer. Offer of ZMW 1,300,000 submitted.',
    log: [
      { text: 'Client walked into Lusaka branch.', time: '2024-05-20 14:00' },
      { text: 'Showed HT-LSK-006. Client very interested.', time: '2024-05-21 11:00' },
      { text: 'Viewing completed. Client happy with property condition.', time: '2024-05-23 10:30' },
      { text: 'Offer of ZMW 1,300,000 submitted by client.', time: '2024-05-29 16:00' }
    ]
  },
  {
    id: 7,
    name: 'Mr. Emmanuel Phiri',
    phone: '+260 976 890 123',
    email: '',
    property: 'HT-LVN-002 — Riverside Lodge Plot',
    source: 'Website',
    branch: 'Livingstone',
    agent: 'Grace Mbewe',
    status: 'New',
    dateEnquiry: '2024-06-03',
    followupDate: '2024-06-10',
    followupNote: 'Initial call to introduce property and schedule viewing.',
    notes: 'Foreign investor. Very interested in the riverside plot for a boutique lodge project.',
    log: [
      { text: 'Enquiry submitted via website contact form.', time: '2024-06-03 07:30' }
    ]
  },
  {
    id: 8,
    name: 'Ms. Charity Mbewe',
    phone: '+260 966 901 234',
    email: 'charity.mbewe@zesco.co.zm',
    property: 'HT-LVN-001 — 3-Bedroom Cottage Livingstone Central',
    source: 'Referral',
    branch: 'Livingstone',
    agent: 'David Mwale',
    status: 'Contacted',
    dateEnquiry: '2024-05-27',
    followupDate: '2024-06-05',
    followupNote: 'Follow up on lease agreement drafts.',
    notes: 'Referred by a Zesco colleague. Looking for a 6-month rental near the town centre.',
    log: [
      { text: 'Referred by colleague at Zesco Livingstone office.', time: '2024-05-27 09:00' },
      { text: 'Spoke on the phone. Confirmed budget and move-in date of 1 July.', time: '2024-05-29 15:00' }
    ]
  },
  {
    id: 9,
    name: 'Mr. Brian Muzuma',
    phone: '+260 977 012 345',
    email: 'bmuzuma@hotmail.com',
    property: 'HT-LVN-004 — Commercial Guesthouse Maramba',
    source: 'Phone Call',
    branch: 'Livingstone',
    agent: 'John Phiri',
    status: 'Closed Won',
    dateEnquiry: '2024-04-15',
    followupDate: '',
    followupNote: '',
    notes: 'Sale completed. ZMW 4,800,000 offer accepted. Title deed transferred.',
    log: [
      { text: 'Client phoned after seeing our signboard at the property.', time: '2024-04-15 11:00' },
      { text: 'Viewing arranged and completed.', time: '2024-04-18 10:00' },
      { text: 'Offer of ZMW 4,800,000 submitted. Under offer.', time: '2024-04-25 14:00' },
      { text: 'Offer accepted. Legal process initiated.', time: '2024-05-01 09:00' },
      { text: 'Title deed transfer completed. Deal closed.', time: '2024-05-30 16:00' }
    ]
  },
  {
    id: 10,
    name: 'Mrs. Natasha Siame',
    phone: '+260 955 123 456',
    email: 'natasha.siame@gmail.com',
    property: 'HT-LVN-003 — 2-Bedroom Apartment Livingstone Central',
    source: 'Facebook',
    branch: 'Livingstone',
    agent: 'Grace Mbewe',
    status: 'Closed Lost',
    dateEnquiry: '2024-05-10',
    followupDate: '',
    followupNote: '',
    notes: 'Client found a cheaper alternative in the same area. Lead closed as lost.',
    log: [
      { text: 'Enquiry received via Facebook Messenger.', time: '2024-05-10 12:00' },
      { text: 'Called client. Arranged viewing.', time: '2024-05-12 10:30' },
      { text: 'Viewing done. Client liked property but concerned about price.', time: '2024-05-14 11:00' },
      { text: 'Client found cheaper alternative. Lead closed as lost.', time: '2024-05-20 09:00' }
    ]
  }
];

// Running ID counter for new leads
var nextLeadId = 11;


/* ══════════════════════════════════════════════════════════════
   2. DOM REFERENCES
══════════════════════════════════════════════════════════════ */

var hamburgerBtn    = document.getElementById('hamburger');
var sidebar         = document.getElementById('sidebar');
var sidebarOverlay  = document.getElementById('sidebarOverlay');
var modalOverlay    = document.getElementById('modalOverlay');

var searchInput     = document.getElementById('searchInput');
var statusFilter    = document.getElementById('statusFilter');
var sourceFilter    = document.getElementById('sourceFilter');

var statNew         = document.getElementById('statNew');
var statContacted   = document.getElementById('statContacted');
var statFollowup    = document.getElementById('statFollowup');
var statClosed      = document.getElementById('statClosed');

var colNew          = document.getElementById('colNew');
var colContacted    = document.getElementById('colContacted');
var colFollowup     = document.getElementById('colFollowup');
var colClosed       = document.getElementById('colClosed');

var colCountNew       = document.getElementById('colCountNew');
var colCountContacted = document.getElementById('colCountContacted');
var colCountFollowup  = document.getElementById('colCountFollowup');
var colCountClosed    = document.getElementById('colCountClosed');

var kanbanBoard     = document.getElementById('kanbanBoard');
var leadListSection = document.getElementById('leadListSection');
var leadTableBody   = document.getElementById('leadTableBody');
var emptyState      = document.getElementById('emptyState');

var detailsPanel    = document.getElementById('detailsPanel');
var detailsPanelTitle = document.getElementById('detailsPanelTitle');
var detailsBody     = document.getElementById('detailsBody');
var detailsClose    = document.getElementById('detailsClose');
var btnEditFromPanel = document.getElementById('btnEditFromPanel');

var leadModal       = document.getElementById('leadModal');
var leadModalTitle  = document.getElementById('leadModalTitle');
var leadForm        = document.getElementById('leadForm');
var editLeadIdField = document.getElementById('editLeadId');
var modalClose      = document.getElementById('modalClose');
var modalCancelBtn  = document.getElementById('modalCancelBtn');

var btnAddLead      = document.getElementById('btnAddLead');
var emptyAddBtn     = document.getElementById('emptyAddBtn');
var viewToggle      = document.getElementById('viewToggle');
var toastEl         = document.getElementById('toast');


/* ══════════════════════════════════════════════════════════════
   3. FILTER STATE
══════════════════════════════════════════════════════════════ */

var currentBranch   = 'all';
var currentSearch   = '';
var currentStatus   = 'all';
var currentSource   = 'all';
var currentView     = 'kanban'; // 'kanban' | 'list'
var activePanelId   = null;     // ID of the currently open details panel


/* ══════════════════════════════════════════════════════════════
   4. HELPERS
══════════════════════════════════════════════════════════════ */

/**
 * Maps a lead status to a badge CSS class.
 */
function getStatusBadgeClass(status) {
  var map = {
    'New':              'badge-new',
    'Contacted':        'badge-contacted',
    'Follow-up':        'badge-followup',
    'Viewing Scheduled':'badge-viewing',
    'Offer Made':       'badge-offer',
    'Closed Won':       'badge-won',
    'Closed Lost':      'badge-lost'
  };
  return map[status] || 'badge-new';
}

/**
 * Maps a lead source to a source badge CSS class.
 */
function getSourceClass(source) {
  var map = {
    'Website':    'src-website',
    'WhatsApp':   'src-whatsapp',
    'Phone Call': 'src-phone',
    'Facebook':   'src-facebook',
    'Referral':   'src-referral',
    'Walk-in':    'src-walkin'
  };
  return map[source] || 'src-website';
}

/**
 * Maps a lead status to the Kanban column it belongs to.
 * Several statuses map to the "Closed" Kanban column.
 */
function getKanbanColumn(status) {
  if (status === 'New') return 'New';
  if (status === 'Contacted') return 'Contacted';
  if (status === 'Follow-up' || status === 'Viewing Scheduled' || status === 'Offer Made') return 'Follow-up';
  if (status === 'Closed Won' || status === 'Closed Lost') return 'Closed';
  return 'New';
}

/**
 * Returns the first initial(s) of a name for the avatar.
 */
function getInitials(name) {
  var parts = name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s*/i, '').split(' ');
  return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
}

/**
 * Returns a chip label and CSS class for follow-up dates.
 */
function getFollowupChip(dateStr) {
  if (!dateStr) return null;
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  var diff = Math.round((date - today) / (1000 * 60 * 60 * 24));
  if (diff < 0)  return { label: 'Overdue',  cls: 'overdue' };
  if (diff <= 2) return { label: 'Due soon', cls: 'due-soon' };
  return { label: 'Follow-up ' + formatDate(dateStr), cls: 'upcoming' };
}

/**
 * Formats a date string (YYYY-MM-DD) to a readable label.
 */
function formatDate(dateStr) {
  if (!dateStr) return '—';
  var d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Current timestamp string for log entries.
 */
function nowTimestamp() {
  var d = new Date();
  return d.toISOString().slice(0, 16).replace('T', ' ');
}


/* ══════════════════════════════════════════════════════════════
   5. FILTER LEADS
   // Later: replace with Supabase query filters.
══════════════════════════════════════════════════════════════ */

function getFilteredLeads() {
  return leads.filter(function(l) {
    if (currentBranch !== 'all' && l.branch.toLowerCase() !== currentBranch) return false;
    if (currentStatus !== 'all' && l.status !== currentStatus) return false;
    if (currentSource !== 'all' && l.source !== currentSource) return false;
    if (currentSearch) {
      var q = currentSearch.toLowerCase();
      var match = l.name.toLowerCase().includes(q)
               || l.phone.toLowerCase().includes(q)
               || l.property.toLowerCase().includes(q)
               || l.agent.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });
}


/* ══════════════════════════════════════════════════════════════
   6. UPDATE STATS
   // Later: these counts can come from Supabase aggregate queries.
══════════════════════════════════════════════════════════════ */

function updateStats(filtered) {
  statNew.textContent       = filtered.filter(function(l){ return l.status === 'New'; }).length;
  statContacted.textContent = filtered.filter(function(l){ return l.status === 'Contacted'; }).length;
  statFollowup.textContent  = filtered.filter(function(l){
    return l.status === 'Follow-up' || l.status === 'Viewing Scheduled' || l.status === 'Offer Made';
  }).length;
  statClosed.textContent    = filtered.filter(function(l){
    return l.status === 'Closed Won' || l.status === 'Closed Lost';
  }).length;
}


/* ══════════════════════════════════════════════════════════════
   7. BUILD A KANBAN LEAD CARD (HTML string)
══════════════════════════════════════════════════════════════ */

function buildLeadCard(lead) {
  var badgeClass  = getStatusBadgeClass(lead.status);
  var srcClass    = getSourceClass(lead.source);
  var initials    = getInitials(lead.name);
  var chip        = getFollowupChip(lead.followupDate);

  var chipHtml = '';
  if (chip) {
    chipHtml = '<span class="followup-chip ' + chip.cls + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
      chip.label +
      '</span>';
  }

  // Status move menu options (all statuses except current)
  var allStatuses = ['New', 'Contacted', 'Follow-up', 'Viewing Scheduled', 'Offer Made', 'Closed Won', 'Closed Lost'];
  var menuOptions = allStatuses
    .filter(function(s){ return s !== lead.status; })
    .map(function(s){
      return '<button class="card-move-option" data-leadid="' + lead.id + '" data-newstatus="' + s + '">' + s + '</button>';
    }).join('');

  return [
    '<div class="lead-card" data-id="' + lead.id + '">',
      '<div class="lead-card-top">',
        '<div>',
          '<div class="lead-card-name">' + lead.name + '</div>',
          '<div class="lead-card-phone">' + lead.phone + '</div>',
        '</div>',
        '<div class="lead-card-actions">',
          '<button class="card-action-btn btn-view" data-id="' + lead.id + '" title="View details">',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
          '</button>',
          '<button class="card-action-btn delete btn-delete" data-id="' + lead.id + '" title="Delete lead">',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>',
          '</button>',
        '</div>',
      '</div>',
      '<div class="lead-card-body">',
        '<div class="lead-card-row">',
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>',
          '<span>' + (lead.property || 'No property specified') + '</span>',
        '</div>',
        '<div class="lead-card-row">',
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
          '<span>' + lead.branch + '</span>',
          '<span class="source-badge ' + srcClass + '">' + lead.source + '</span>',
        '</div>',
      '</div>',
      '<div class="lead-card-footer">',
        '<div class="lead-card-agent">',
          '<div class="agent-avatar-sm">' + initials + '</div>',
          lead.agent,
        '</div>',
        '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">',
          chipHtml,
          '<div class="card-status-move">',
            '<button class="card-move-btn" data-leadid="' + lead.id + '" title="Move to stage">',
              'Move',
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>',
            '</button>',
            '<div class="card-move-menu" id="moveMenu-' + lead.id + '">',
              menuOptions,
            '</div>',
          '</div>',
        '</div>',
      '</div>',
    '</div>'
  ].join('');
}


/* ══════════════════════════════════════════════════════════════
   8. RENDER KANBAN BOARD
══════════════════════════════════════════════════════════════ */

function renderKanban(filtered) {
  var cols = {
    'New':       { el: colNew,       countEl: colCountNew },
    'Contacted': { el: colContacted, countEl: colCountContacted },
    'Follow-up': { el: colFollowup,  countEl: colCountFollowup },
    'Closed':    { el: colClosed,    countEl: colCountClosed }
  };

  // Clear
  Object.keys(cols).forEach(function(key) { cols[key].el.innerHTML = ''; });

  // Distribute
  filtered.forEach(function(lead) {
    var colKey = getKanbanColumn(lead.status);
    var col    = cols[colKey];
    if (!col) return;
    col.el.innerHTML += buildLeadCard(lead);
  });

  // Counts + empty states
  Object.keys(cols).forEach(function(key) {
    var col     = cols[key];
    var count   = col.el.children.length;
    col.countEl.textContent = count;
    if (count === 0) {
      col.el.innerHTML = '<div class="kanban-empty">No leads in this stage.</div>';
    }
  });
}


/* ══════════════════════════════════════════════════════════════
   9. RENDER LIST VIEW
══════════════════════════════════════════════════════════════ */

function renderList(filtered) {
  leadTableBody.innerHTML = '';

  if (filtered.length === 0) {
    document.querySelector('.lead-table-wrap').style.display = 'none';
    emptyState.style.display = 'flex';
    return;
  }

  document.querySelector('.lead-table-wrap').style.display = 'block';
  emptyState.style.display = 'none';

  filtered.forEach(function(lead) {
    var badgeClass = getStatusBadgeClass(lead.status);
    var srcClass   = getSourceClass(lead.source);
    var chip       = getFollowupChip(lead.followupDate);

    var chipHtml = chip
      ? '<span class="followup-chip ' + chip.cls + '" style="font-size:10px;">' + chip.label + '</span>'
      : '<span style="color:var(--text-light);font-size:12px;">—</span>';

    var row = document.createElement('tr');
    row.dataset.id = lead.id;
    row.innerHTML = [
      '<td>',
        '<div class="table-client-name">' + lead.name + '</div>',
        '<div class="table-client-phone">' + lead.phone + '</div>',
      '</td>',
      '<td>' + (lead.email ? lead.email : '<span style="color:var(--text-light);">—</span>') + '</td>',
      '<td><span class="source-badge ' + srcClass + '">' + lead.source + '</span></td>',
      '<td style="font-size:12px;max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="' + lead.property + '">' + (lead.property || '—') + '</td>',
      '<td>' + lead.branch + '</td>',
      '<td>' + lead.agent + '</td>',
      '<td>' + chipHtml + '</td>',
      '<td><span class="badge ' + badgeClass + '">' + lead.status + '</span></td>',
      '<td>',
        '<div class="table-actions">',
          '<button class="btn-view" data-id="' + lead.id + '" title="View">',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
          '</button>',
          '<button class="btn-edit" data-id="' + lead.id + '" title="Edit">',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
          '</button>',
          '<button class="btn-delete" data-id="' + lead.id + '" title="Delete">',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>',
          '</button>',
        '</div>',
      '</td>'
    ].join('');

    leadTableBody.appendChild(row);
  });
}


/* ══════════════════════════════════════════════════════════════
   10. MASTER RENDER FUNCTION
══════════════════════════════════════════════════════════════ */

function renderAll() {
  var filtered = getFilteredLeads();
  updateStats(filtered);

  if (currentView === 'kanban') {
    kanbanBoard.style.display     = 'grid';
    leadListSection.style.display = 'none';
    renderKanban(filtered);
  } else {
    kanbanBoard.style.display     = 'none';
    leadListSection.style.display = 'block';
    renderList(filtered);
  }
}


/* ══════════════════════════════════════════════════════════════
   11. BRANCH FILTER
══════════════════════════════════════════════════════════════ */

document.querySelectorAll('.branch-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.branch-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    currentBranch = btn.dataset.branch;
    renderAll();
  });
});


/* ══════════════════════════════════════════════════════════════
   12. SEARCH & FILTER LISTENERS
══════════════════════════════════════════════════════════════ */

searchInput.addEventListener('input', function() {
  currentSearch = searchInput.value.trim();
  renderAll();
});

statusFilter.addEventListener('change', function() {
  currentStatus = statusFilter.value;
  renderAll();
});

sourceFilter.addEventListener('change', function() {
  currentSource = sourceFilter.value;
  renderAll();
});


/* ══════════════════════════════════════════════════════════════
   13. VIEW TOGGLE (Kanban / List)
══════════════════════════════════════════════════════════════ */

document.querySelectorAll('.view-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.view-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    currentView = btn.dataset.view;
    renderAll();
  });
});


/* ══════════════════════════════════════════════════════════════
   14. EVENT DELEGATION — KANBAN & LIST ACTIONS
══════════════════════════════════════════════════════════════ */

// Kanban board
kanbanBoard.addEventListener('click', function(e) {
  handleLeadAction(e);
});

// List table
leadTableBody.addEventListener('click', function(e) {
  handleLeadAction(e);
});

function handleLeadAction(e) {
  var target = e.target;

  // View button
  if (target.closest('.btn-view')) {
    var id = parseInt(target.closest('.btn-view').dataset.id);
    openDetailsPanel(id);
    return;
  }

  // Edit button
  if (target.closest('.btn-edit')) {
    var id = parseInt(target.closest('.btn-edit').dataset.id);
    openLeadModal('edit', id);
    return;
  }

  // Delete button
  if (target.closest('.btn-delete')) {
    var id = parseInt(target.closest('.btn-delete').dataset.id);
    deleteLead(id);
    return;
  }

  // "Move" status dropdown button toggle
  if (target.closest('.card-move-btn')) {
    e.stopPropagation();
    var btn = target.closest('.card-move-btn');
    var leadId = btn.dataset.leadid;
    var menu = document.getElementById('moveMenu-' + leadId);
    // Close all other open menus first
    document.querySelectorAll('.card-move-menu.open').forEach(function(m) {
      if (m !== menu) m.classList.remove('open');
    });
    if (menu) menu.classList.toggle('open');
    return;
  }

  // Status move option
  if (target.classList.contains('card-move-option')) {
    var leadId    = parseInt(target.dataset.leadid);
    var newStatus = target.dataset.newstatus;
    changeLeadStatus(leadId, newStatus);
    // Close the menu
    document.querySelectorAll('.card-move-menu.open').forEach(function(m){ m.classList.remove('open'); });
    return;
  }

  // Click on card body (not action buttons) → open details
  if (target.closest('.lead-card') &&
      !target.closest('.card-action-btn') &&
      !target.closest('.card-move-btn') &&
      !target.closest('.card-move-menu')) {
    var card = target.closest('.lead-card');
    if (card && card.dataset.id) {
      openDetailsPanel(parseInt(card.dataset.id));
    }
  }
}

// Close move menus when clicking elsewhere
document.addEventListener('click', function(e) {
  if (!e.target.closest('.card-status-move')) {
    document.querySelectorAll('.card-move-menu.open').forEach(function(m){ m.classList.remove('open'); });
  }
});


/* ══════════════════════════════════════════════════════════════
   15. DELETE LEAD
   // Later: replace with Supabase delete call.
══════════════════════════════════════════════════════════════ */

function deleteLead(id) {
  var lead = leads.find(function(l){ return l.id === id; });
  if (!lead) return;
  if (!confirm('Delete lead for "' + lead.name + '"? This cannot be undone.')) return;

  leads = leads.filter(function(l){ return l.id !== id; });
  if (activePanelId === id) closeDetailsPanel();
  renderAll();
  showToast('Lead deleted', 'success');
}


/* ══════════════════════════════════════════════════════════════
   16. CHANGE LEAD STATUS
   // Later: replace with Supabase update call.
══════════════════════════════════════════════════════════════ */

function changeLeadStatus(id, newStatus) {
  var lead = leads.find(function(l){ return l.id === id; });
  if (!lead) return;
  var oldStatus = lead.status;
  lead.status = newStatus;

  // Auto-log the status change
  lead.log.push({
    text: 'Status changed from "' + oldStatus + '" to "' + newStatus + '".',
    time: nowTimestamp()
  });

  // If details panel is open for this lead, refresh it
  if (activePanelId === id) openDetailsPanel(id);

  renderAll();
  showToast('Moved to ' + newStatus, 'success');
}


/* ══════════════════════════════════════════════════════════════
   17. LEAD DETAILS PANEL
══════════════════════════════════════════════════════════════ */

function openDetailsPanel(id) {
  var lead = leads.find(function(l){ return l.id === id; });
  if (!lead) return;

  activePanelId = id;

  detailsPanelTitle.textContent = lead.name;
  btnEditFromPanel.onclick = function() { openLeadModal('edit', id); };

  var badgeClass = getStatusBadgeClass(lead.status);
  var srcClass   = getSourceClass(lead.source);
  var chip       = getFollowupChip(lead.followupDate);

  var chipHtml = chip
    ? '<span class="followup-chip ' + chip.cls + '">' + chip.label + '</span>'
    : '';

  // Build log HTML
  var logHtml = lead.log.length === 0
    ? '<p style="font-size:13px;color:var(--text-light);">No log entries yet.</p>'
    : lead.log.map(function(entry) {
        return [
          '<div class="comm-entry">',
            '<div class="comm-dot"></div>',
            '<div class="comm-content">',
              '<div class="comm-text">' + entry.text + '</div>',
              '<div class="comm-time">' + entry.time + '</div>',
            '</div>',
          '</div>'
        ].join('');
      }).join('');

  detailsBody.innerHTML = [
    // Status + source row
    '<div>',
      '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">',
        '<span class="badge ' + badgeClass + '">' + lead.status + '</span>',
        '<span class="source-badge ' + srcClass + '">' + lead.source + '</span>',
        chipHtml,
      '</div>',
    '</div>',

    // Info grid
    '<div>',
      '<div class="details-section-title">Client &amp; Enquiry</div>',
      '<div class="details-info-grid">',
        '<div class="details-info-item"><div class="details-info-label">Phone</div><div class="details-info-value">' + lead.phone + '</div></div>',
        '<div class="details-info-item"><div class="details-info-label">Email</div><div class="details-info-value">' + (lead.email || '—') + '</div></div>',
        '<div class="details-info-item"><div class="details-info-label">Branch</div><div class="details-info-value">' + lead.branch + '</div></div>',
        '<div class="details-info-item"><div class="details-info-label">Assigned Agent</div><div class="details-info-value">' + lead.agent + '</div></div>',
        '<div class="details-info-item"><div class="details-info-label">Date of Enquiry</div><div class="details-info-value">' + formatDate(lead.dateEnquiry) + '</div></div>',
        '<div class="details-info-item"><div class="details-info-label">Next Follow-up</div><div class="details-info-value">' + (lead.followupDate ? formatDate(lead.followupDate) : '—') + '</div></div>',
        '<div class="details-info-item" style="grid-column:1/-1;"><div class="details-info-label">Property Enquired</div><div class="details-info-value">' + (lead.property || '—') + '</div></div>',
      '</div>',
    '</div>',

    // Follow-up note
    (lead.followupNote ? [
      '<div>',
        '<div class="details-section-title">Follow-up Note</div>',
        '<div class="details-notes">' + lead.followupNote + '</div>',
      '</div>'
    ].join('') : ''),

    // General notes
    '<div>',
      '<div class="details-section-title">Notes</div>',
      '<div class="details-notes">' + (lead.notes || 'No notes added.') + '</div>',
    '</div>',

    // Communication log
    '<div>',
      '<div class="details-section-title">Communication Log</div>',
      '<div class="comm-log" id="commLog">' + logHtml + '</div>',
      '<div class="add-log-wrap" style="margin-top:14px;">',
        '<input type="text" class="log-input" id="logInput" placeholder="Add a log entry… e.g. Called client at 14:00" />',
        '<button class="action-btn primary small" id="btnAddLog" data-leadid="' + lead.id + '">Add</button>',
      '</div>',
    '</div>',

    // Quick status change from panel
    '<div>',
      '<div class="details-section-title">Quick Status Update</div>',
      '<div style="display:flex;gap:8px;flex-wrap:wrap;">',
        buildQuickStatusButtons(lead),
      '</div>',
    '</div>',

  ].join('');

  // Bind log add button
  document.getElementById('btnAddLog').addEventListener('click', function() {
    addLogEntry(lead.id);
  });
  document.getElementById('logInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') addLogEntry(lead.id);
  });

  // Show panel
  detailsPanel.style.display = 'flex';
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      detailsPanel.classList.add('open');
    });
  });
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function buildQuickStatusButtons(lead) {
  var statuses = ['New', 'Contacted', 'Follow-up', 'Viewing Scheduled', 'Offer Made', 'Closed Won', 'Closed Lost'];
  return statuses.map(function(s) {
    var active = s === lead.status;
    return '<button class="action-btn ' + (active ? 'primary' : 'outline') + ' small" style="font-size:11px;padding:5px 11px;" ' +
           (active ? 'disabled' : 'data-quickstatus="' + s + '" data-leadid="' + lead.id + '"') +
           '>' + s + '</button>';
  }).join('');
}

detailsBody.addEventListener('click', function(e) {
  if (e.target.dataset.quickstatus) {
    changeLeadStatus(parseInt(e.target.dataset.leadid), e.target.dataset.quickstatus);
  }
});

function closeDetailsPanel() {
  detailsPanel.classList.remove('open');
  activePanelId = null;
  // Only remove overlay if modal is also closed
  if (!leadModal.classList.contains('open')) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  setTimeout(function() { detailsPanel.style.display = 'none'; }, 300);
}

detailsClose.addEventListener('click', closeDetailsPanel);


/* ══════════════════════════════════════════════════════════════
   18. COMMUNICATION LOG — ADD ENTRY
   // Later: replace with Supabase insert into lead_log table.
══════════════════════════════════════════════════════════════ */

function addLogEntry(leadId) {
  var input  = document.getElementById('logInput');
  var text   = input ? input.value.trim() : '';
  if (!text) { showToast('Please enter a log message', 'error'); return; }

  var lead = leads.find(function(l){ return l.id === leadId; });
  if (!lead) return;

  lead.log.push({ text: text, time: nowTimestamp() });
  input.value = '';

  // Refresh log section in panel without full re-open
  var commLog = document.getElementById('commLog');
  if (commLog) {
    commLog.innerHTML = lead.log.map(function(entry) {
      return [
        '<div class="comm-entry">',
          '<div class="comm-dot"></div>',
          '<div class="comm-content">',
            '<div class="comm-text">' + entry.text + '</div>',
            '<div class="comm-time">' + entry.time + '</div>',
          '</div>',
        '</div>'
      ].join('');
    }).join('');
    commLog.lastElementChild.scrollIntoView({ behavior: 'smooth' });
  }

  showToast('Log entry added', 'success');
}


/* ══════════════════════════════════════════════════════════════
   19. ADD / EDIT LEAD MODAL
══════════════════════════════════════════════════════════════ */

function openLeadModal(mode, id) {
  mode = mode || 'add';

  // Switch to first tab
  switchModalTab('client');

  if (mode === 'edit' && id) {
    var lead = leads.find(function(l){ return l.id === id; });
    if (!lead) return;

    leadModalTitle.textContent = 'Edit Lead';
    editLeadIdField.value = lead.id;

    document.getElementById('fName').value         = lead.name;
    document.getElementById('fPhone').value        = lead.phone;
    document.getElementById('fEmail').value        = lead.email;
    document.getElementById('fProperty').value     = lead.property;
    document.getElementById('fSource').value       = lead.source;
    document.getElementById('fBranch').value       = lead.branch;
    document.getElementById('fAgent').value        = lead.agent;
    document.getElementById('fStatus').value       = lead.status;
    document.getElementById('fFollowupDate').value = lead.followupDate;
    document.getElementById('fFollowupNote').value = lead.followupNote;
    document.getElementById('fNotes').value        = lead.notes;

  } else {
    leadModalTitle.textContent = 'Add New Lead';
    editLeadIdField.value = '';
    leadForm.reset();
    // Set default date to today
    var today = new Date().toISOString().slice(0, 10);
    document.getElementById('fFollowupDate').value = today;
  }

  // Show modal
  leadModal.style.display = 'flex';
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      leadModal.classList.add('open');
    });
  });
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLeadModal() {
  leadModal.classList.remove('open');
  if (!detailsPanel.classList.contains('open')) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  setTimeout(function() { leadModal.style.display = 'none'; }, 300);
}

btnAddLead.addEventListener('click', function() { openLeadModal('add'); });
if (emptyAddBtn) {
  emptyAddBtn.addEventListener('click', function() { openLeadModal('add'); });
}
modalClose.addEventListener('click', closeLeadModal);
modalCancelBtn.addEventListener('click', closeLeadModal);

// Overlay click — closes whichever is topmost
modalOverlay.addEventListener('click', function() {
  if (leadModal.classList.contains('open')) {
    closeLeadModal();
  } else if (detailsPanel.classList.contains('open')) {
    closeDetailsPanel();
  } else {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Modal tabs
document.querySelectorAll('.modal-tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    switchModalTab(tab.dataset.tab);
  });
});

function switchModalTab(tabName) {
  document.querySelectorAll('.modal-tab').forEach(function(t) {
    t.classList.toggle('active', t.dataset.tab === tabName);
  });
  document.querySelectorAll('#leadModal .tab-panel').forEach(function(p) {
    p.classList.toggle('active', p.id === 'tab-' + tabName);
  });
}


/* ══════════════════════════════════════════════════════════════
   20. FORM SAVE (ADD OR EDIT)
   // Later: replace the array push/update with Supabase upsert:
   // await supabase.from('leads').upsert(formData);
══════════════════════════════════════════════════════════════ */

leadForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Validate required fields
  var requiredFields = ['fName', 'fPhone', 'fSource', 'fBranch', 'fAgent', 'fStatus'];
  var valid = true;
  requiredFields.forEach(function(fieldId) {
    var el = document.getElementById(fieldId);
    if (!el.value.trim()) {
      el.classList.add('error');
      valid = false;
    } else {
      el.classList.remove('error');
    }
  });

  if (!valid) {
    switchModalTab('client');
    showToast('Please fill in all required fields', 'error');
    return;
  }

  var formData = {
    name:         document.getElementById('fName').value.trim(),
    phone:        document.getElementById('fPhone').value.trim(),
    email:        document.getElementById('fEmail').value.trim(),
    property:     document.getElementById('fProperty').value.trim(),
    source:       document.getElementById('fSource').value,
    branch:       document.getElementById('fBranch').value,
    agent:        document.getElementById('fAgent').value,
    status:       document.getElementById('fStatus').value,
    followupDate: document.getElementById('fFollowupDate').value,
    followupNote: document.getElementById('fFollowupNote').value.trim(),
    notes:        document.getElementById('fNotes').value.trim(),
    dateEnquiry:  new Date().toISOString().slice(0, 10)
  };

  var editId = editLeadIdField.value;

  if (editId) {
    // EDIT existing lead
    var idx = leads.findIndex(function(l){ return l.id === parseInt(editId); });
    if (idx > -1) {
      var existingLog = leads[idx].log || [];
      formData.id  = parseInt(editId);
      formData.dateEnquiry = leads[idx].dateEnquiry;
      formData.log = existingLog;
      // Log the edit
      formData.log.push({ text: 'Lead details updated.', time: nowTimestamp() });
      leads[idx] = formData;
      showToast('Lead updated successfully', 'success');
    }
  } else {
    // ADD new lead
    formData.id  = nextLeadId++;
    formData.log = [{ text: 'Lead created.', time: nowTimestamp() }];
    leads.push(formData);
    showToast('Lead added successfully', 'success');
  }

  closeLeadModal();
  // If panel was open for the edited lead, refresh it
  if (editId && activePanelId === parseInt(editId)) {
    openDetailsPanel(parseInt(editId));
  }
  renderAll();
});


/* ══════════════════════════════════════════════════════════════
   21. MOBILE SIDEBAR TOGGLE
══════════════════════════════════════════════════════════════ */

if (hamburgerBtn && sidebar && sidebarOverlay) {
  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    if (!leadModal.classList.contains('open') && !detailsPanel.classList.contains('open')) {
      document.body.style.overflow = '';
    }
  }
  hamburgerBtn.addEventListener('click', function() {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  sidebarOverlay.addEventListener('click', function() {
    if (sidebar.classList.contains('open')) closeSidebar();
  });
}


/* ══════════════════════════════════════════════════════════════
   22. TOAST NOTIFICATIONS
══════════════════════════════════════════════════════════════ */

var toastTimer;
function showToast(message, type) {
  type = type || 'success';
  toastEl.textContent = message;
  toastEl.className   = 'toast ' + type;
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      toastEl.classList.add('show');
    });
  });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() {
    toastEl.classList.remove('show');
  }, 3000);
}


/* ══════════════════════════════════════════════════════════════
   23. INITIAL RENDER
══════════════════════════════════════════════════════════════ */

renderAll();
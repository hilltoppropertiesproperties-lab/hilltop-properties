/* ============================================================
   HILLTOP PROPERTIES ZAMBIA — ADMIN DASHBOARD
   script.js
   ============================================================ */


/* ── 1. SAMPLE DATA ──────────────────────────────────────────── */

// Stats data for each branch option
const statsData = {
  all: {
    activeProperties: 48,
    newLeads:         17,
    sold:              9,
    rented:           14
  },
  lusaka: {
    activeProperties: 30,
    newLeads:         11,
    sold:              6,
    rented:            8
  },
  livingstone: {
    activeProperties: 18,
    newLeads:          6,
    sold:              3,
    rented:            6
  }
};

// Activity feed data for each branch option
// type values: 'enquiry' | 'property' | 'followup' | 'status'
const activityData = {
  all: [
    {
      type:    'enquiry',
      text:    'New enquiry received for 3-bed house in Lusaka',
      time:    '10 minutes ago',
      branch:  'Lusaka'
    },
    {
      type:    'status',
      text:    'Agent John updated property status to Sold — HT-LSK-011',
      time:    '42 minutes ago',
      branch:  'Lusaka'
    },
    {
      type:    'property',
      text:    'Livingstone Branch added a new rental apartment — HT-LVN-007',
      time:    '1 hour ago',
      branch:  'Livingstone'
    },
    {
      type:    'followup',
      text:    'Follow-up scheduled for client Mary Banda (Viewing, Fri 10AM)',
      time:    '2 hours ago',
      branch:  'Lusaka'
    },
    {
      type:    'status',
      text:    'Property HT-LSK-004 marked as Under Offer',
      time:    '3 hours ago',
      branch:  'Lusaka'
    },
    {
      type:    'enquiry',
      text:    'New enquiry for 2-bed apartment in Livingstone Central',
      time:    '4 hours ago',
      branch:  'Livingstone'
    },
    {
      type:    'property',
      text:    'Lusaka Branch updated listing photos for HT-LSK-019',
      time:    'Yesterday, 5:30 PM',
      branch:  'Lusaka'
    }
  ],
  lusaka: [
    {
      type:    'enquiry',
      text:    'New enquiry received for 3-bed house in Lusaka',
      time:    '10 minutes ago',
      branch:  'Lusaka'
    },
    {
      type:    'status',
      text:    'Agent John updated property status to Sold — HT-LSK-011',
      time:    '42 minutes ago',
      branch:  'Lusaka'
    },
    {
      type:    'followup',
      text:    'Follow-up scheduled for client Mary Banda (Viewing, Fri 10AM)',
      time:    '2 hours ago',
      branch:  'Lusaka'
    },
    {
      type:    'status',
      text:    'Property HT-LSK-004 marked as Under Offer',
      time:    '3 hours ago',
      branch:  'Lusaka'
    },
    {
      type:    'property',
      text:    'Lusaka Branch updated listing photos for HT-LSK-019',
      time:    'Yesterday, 5:30 PM',
      branch:  'Lusaka'
    }
  ],
  livingstone: [
    {
      type:    'property',
      text:    'Livingstone Branch added a new rental apartment — HT-LVN-007',
      time:    '1 hour ago',
      branch:  'Livingstone'
    },
    {
      type:    'enquiry',
      text:    'New enquiry for 2-bed apartment in Livingstone Central',
      time:    '4 hours ago',
      branch:  'Livingstone'
    },
    {
      type:    'followup',
      text:    'Follow-up booked for client David Mwale — Saturday morning',
      time:    'Yesterday, 2:15 PM',
      branch:  'Livingstone'
    },
    {
      type:    'status',
      text:    'Property HT-LVN-003 status changed to Available',
      time:    'Yesterday, 11:00 AM',
      branch:  'Livingstone'
    }
  ]
};

// Display labels for each branch key
const branchLabels = {
  all:         'All Branches',
  lusaka:      'Lusaka Branch',
  livingstone: 'Livingstone Branch'
};

// Tag labels for each activity type
const tagLabels = {
  enquiry:  'Enquiry',
  property: 'Property',
  followup: 'Follow-up',
  status:   'Status Update'
};

// SVG icons per activity type (small inline SVGs)
const activityIcons = {
  enquiry: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>`,
  property: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>`,
  followup: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>`,
  status: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polyline points="9 11 12 14 22 4"/>
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
  </svg>`
};


/* ── 2. DOM REFERENCES ───────────────────────────────────────── */

const sidebar          = document.getElementById('sidebar');
const sidebarOverlay   = document.getElementById('sidebarOverlay');
const hamburgerBtn     = document.getElementById('hamburger');
const branchButtons    = document.querySelectorAll('.branch-btn');
const activityFeed     = document.getElementById('activityFeed');
const activityBadge    = document.getElementById('activityBranch');
const statActiveProps  = document.getElementById('statActiveProperties');
const statNewLeads     = document.getElementById('statNewLeads');
const statSold         = document.getElementById('statSold');
const statRented       = document.getElementById('statRented');
const btnAddProperty   = document.getElementById('btnAddProperty');
const btnAddLead       = document.getElementById('btnAddLead');


/* ── 3. UPDATE STAT CARDS ────────────────────────────────────── */

/**
 * Animates a stat number element to a new value.
 * Adds/removes a CSS class to trigger the CSS keyframe.
 */
function animateStat(el, newValue) {
  el.classList.remove('updating');
  // Trigger reflow to restart animation
  void el.offsetWidth;
  el.textContent = newValue;
  el.classList.add('updating');
}

/**
 * Updates all four stat cards for the given branch key.
 * @param {string} branch - 'all' | 'lusaka' | 'livingstone'
 */
function updateStats(branch) {
  const data = statsData[branch];
  animateStat(statActiveProps, data.activeProperties);
  animateStat(statNewLeads,    data.newLeads);
  animateStat(statSold,        data.sold);
  animateStat(statRented,      data.rented);
}


/* ── 4. RENDER ACTIVITY FEED ─────────────────────────────────── */

/**
 * Builds and inserts activity items for the given branch key.
 * @param {string} branch - 'all' | 'lusaka' | 'livingstone'
 */
function renderActivity(branch) {
  const items = activityData[branch];

  // Clear old items
  activityFeed.innerHTML = '';

  // Update the badge label in the section header
  activityBadge.textContent = branchLabels[branch];

  // Build each activity item
  items.forEach(function(item) {
    const div = document.createElement('div');
    div.className = 'activity-item';

    div.innerHTML = `
      <div class="activity-dot dot-${item.type}">
        ${activityIcons[item.type]}
      </div>
      <div class="activity-content">
        <p class="activity-text">${item.text}</p>
        <div class="activity-meta">
          <span class="activity-time">${item.time}</span>
          <span class="activity-branch">${item.branch}</span>
        </div>
      </div>
      <div class="activity-tag-col">
        <span class="activity-tag tag-${item.type}">${tagLabels[item.type]}</span>
      </div>
    `;

    activityFeed.appendChild(div);
  });
}


/* ── 5. BRANCH FILTER ────────────────────────────────────────── */

/**
 * Handles clicking on a branch filter button.
 * Switches the active state, then refreshes stats and activity.
 */
branchButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    // Remove active from all buttons
    branchButtons.forEach(function(b) { b.classList.remove('active'); });
    // Mark clicked button as active
    btn.classList.add('active');

    const branch = btn.dataset.branch; // 'all' | 'lusaka' | 'livingstone'
    updateStats(branch);
    renderActivity(branch);
  });
});


/* ── 6. QUICK ACTION BUTTONS ─────────────────────────────────── */

btnAddProperty.addEventListener('click', function() {
  alert('Add New Property clicked');
});

btnAddLead.addEventListener('click', function() {
  alert('Add New Lead clicked');
});


/* ── 7. SIDEBAR TOGGLE (mobile) ──────────────────────────────── */

function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', function() {
  if (sidebar.classList.contains('open')) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

// Close sidebar if overlay is tapped
sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar when a nav item is tapped on mobile
document.querySelectorAll('.nav-item').forEach(function(item) {
  item.addEventListener('click', function() {
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  });
});


/* ── 8. INITIAL RENDER ───────────────────────────────────────── */

// Load All Branches data on first page load
updateStats('all');
renderActivity('all');
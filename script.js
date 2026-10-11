/**
 * DAMPING PERSONALIZED LEARNING MARKETPLACE
 * Pure Vanilla JavaScript Application Logic
 */

(function () {
  'use strict';

  // 1. Initial State & Storage Persistence
  const STORAGE_KEY = 'damping_static_v1';

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure essential arrays exist
        if (parsed && parsed.outdoorActivities && parsed.outdoorTickets) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('LocalStorage not available, fallback to defaults:', e);
    }
    // Deep clone from window.DAMPING_DATA
    return {
      activeTab: 'home', // 'home' | 'marketplace' | 'tutor-dashboard'
      mobileView: 'list', // 'list' | 'map'
      filters: {
        category: 'all',
        location: 'Tebet',
        subject: '',
        topic: '',
        level: '',
        method: '',
        learningGoal: '',
        maxRate: 250000,
        sortBy: 'distance'
      },
      tutors: JSON.parse(JSON.stringify(window.DAMPING_DATA.TUTORS)),
      bimbels: JSON.parse(JSON.stringify(window.DAMPING_DATA.BIMBELS)),
      programs: JSON.parse(JSON.stringify(window.DAMPING_DATA.PROGRAMS)),
      outdoorActivities: JSON.parse(JSON.stringify(window.DAMPING_DATA.OUTDOOR_ACTIVITIES)),
      outdoorTickets: JSON.parse(JSON.stringify(window.DAMPING_DATA.INITIAL_TICKETS)),
      portfolios: JSON.parse(JSON.stringify(window.DAMPING_DATA.STUDENT_PORTFOLIOS)),
      requests: JSON.parse(JSON.stringify(window.DAMPING_DATA.INITIAL_REQUESTS)),
      activeStudentSession: null
    };
  }

  const state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed saving to localStorage:', e);
    }
  }

  // Helper: Format Rupiah
  function formatRupiah(num) {
    if (num == null) return 'Rp 0';
    return 'Rp ' + Number(num).toLocaleString('id-ID');
  }

  // Helper: Distance calculation (Haversine km)
  function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return 2.5;
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Number((R * c).toFixed(1));
  }

  function getSelectedLocationCoords() {
    const loc = window.DAMPING_DATA.PRESET_LOCATIONS.find((l) => l.name === state.filters.location);
    return loc ? { lat: loc.lat, lng: loc.lng } : { lat: -6.2383, lng: 106.8530 };
  }

  // 2. DOM Elements Cache
  const el = {
    homeView: document.getElementById('home-view'),
    marketplaceView: document.getElementById('marketplace-view'),
    tutorDashboardView: document.getElementById('tutor-dashboard-view'),
    btnTabHome: document.getElementById('tab-btn-home'),
    btnTabMarketplace: document.getElementById('tab-btn-marketplace'),
    btnTabTutorMode: document.getElementById('btn-tutor-mode'),
    btnTabParentMode: document.getElementById('btn-parent-mode'),
    locationSelect: document.getElementById('location-select'),
    filterCategoryBtns: document.querySelectorAll('.cat-btn'),
    filterSubject: document.getElementById('filter-subject'),
    filterTopic: document.getElementById('filter-topic'),
    filterLevel: document.getElementById('filter-level'),
    filterMethod: document.getElementById('filter-method'),
    filterGoal: document.getElementById('filter-goal'),
    filterRateRange: document.getElementById('filter-rate-range'),
    rateValueLabel: document.getElementById('rate-val-label'),
    filterSort: document.getElementById('filter-sort'),
    btnResetFilters: document.getElementById('btn-reset-filters'),
    resultsTitle: document.getElementById('results-title'),
    resultsCountDesc: document.getElementById('results-count-desc'),
    cardsContainer: document.getElementById('cards-container'),
    emptyState: document.getElementById('empty-state'),
    mobileListBtn: document.getElementById('mobile-list-btn'),
    mobileMapBtn: document.getElementById('mobile-map-btn'),
    leftColumn: document.querySelector('.catalog-left-column'),
    rightColumn: document.querySelector('.catalog-right-column'),
    mapCanvas: document.getElementById('map-canvas'),
    mapPinsList: document.getElementById('map-pins-list'),
    ticketCountBadge: document.getElementById('nav-ticket-count'),
    requestCountBadge: document.getElementById('nav-req-count')
  };

  // 3. Navigation & Views Switching
  function switchTab(target) {
    state.activeTab = target;
    saveState();

    if (target === 'home') {
      el.homeView.classList.remove('hidden');
      el.marketplaceView.classList.add('hidden');
      el.tutorDashboardView.classList.add('hidden');
      el.btnTabHome.classList.add('active');
      el.btnTabMarketplace.classList.remove('active');
      el.btnTabParentMode.classList.add('active-primary');
      el.btnTabTutorMode.classList.remove('active-primary');
    } else if (target === 'marketplace') {
      el.homeView.classList.add('hidden');
      el.marketplaceView.classList.remove('hidden');
      el.tutorDashboardView.classList.add('hidden');
      el.btnTabHome.classList.remove('active');
      el.btnTabMarketplace.classList.add('active');
      el.btnTabParentMode.classList.add('active-primary');
      el.btnTabTutorMode.classList.remove('active-primary');
      renderMarketplace();
    } else if (target === 'tutor-dashboard') {
      el.homeView.classList.add('hidden');
      el.marketplaceView.classList.add('hidden');
      el.tutorDashboardView.classList.remove('hidden');
      el.btnTabHome.classList.remove('active');
      el.btnTabMarketplace.classList.remove('active');
      el.btnTabParentMode.classList.remove('active-primary');
      el.btnTabTutorMode.classList.add('active-primary');
      renderTutorDashboard();
    }
    updateNavBadges();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateNavBadges() {
    const validTickets = state.outdoorTickets.filter((t) => t.status !== 'dibatalkan').length;
    if (el.ticketCountBadge) {
      el.ticketCountBadge.textContent = validTickets;
      el.ticketCountBadge.style.display = validTickets > 0 ? 'inline-flex' : 'none';
    }
    const reqCount = state.requests.length;
    if (el.requestCountBadge) {
      el.requestCountBadge.textContent = reqCount;
      el.requestCountBadge.style.display = reqCount > 0 ? 'inline-flex' : 'none';
    }
  }

  // 4. Filtering & Sorting Logic
  function getFilteredItems() {
    const locCoords = getSelectedLocationCoords();
    const cat = state.filters.category;
    const subj = state.filters.subject.toLowerCase();
    const top = state.filters.topic.toLowerCase();
    const lvl = state.filters.level.toLowerCase();
    const met = state.filters.method;
    const goal = state.filters.learningGoal;
    const maxR = Number(state.filters.maxRate);

    // 1. Tutors
    let tutors = state.tutors.map((t) => ({
      ...t,
      distanceKm: calculateDistanceKm(locCoords.lat, locCoords.lng, t.lat, t.lng)
    })).filter((t) => {
      if (subj && !t.subjects.some((s) => s.toLowerCase().includes(subj))) return false;
      if (top && !t.topicsMastered.some((tp) => tp.toLowerCase().includes(top))) return false;
      if (lvl && !t.levels.some((l) => l.toLowerCase().includes(lvl))) return false;
      if (met && !t.teachingMethods.includes(met)) return false;
      if (t.hourlyRate > maxR) return false;
      return true;
    });

    // 2. Bimbels
    let bimbels = state.bimbels.map((b) => ({
      ...b,
      distanceKm: calculateDistanceKm(locCoords.lat, locCoords.lng, b.lat, b.lng)
    })).filter((b) => {
      if (subj && !b.subjects.some((s) => s.toLowerCase().includes(subj))) return false;
      if (lvl && !b.levels.some((l) => l.toLowerCase().includes(lvl))) return false;
      if (met && !b.teachingMethods.includes(met)) return false;
      return true;
    });

    // 3. Programs
    let programs = state.programs.map((p) => ({
      ...p,
      distanceKm: calculateDistanceKm(locCoords.lat, locCoords.lng, p.lat, p.lng)
    })).filter((p) => {
      if (subj && !p.subject.toLowerCase().includes(subj)) return false;
      if (top && !p.topic.toLowerCase().includes(top)) return false;
      if (lvl && !p.level.toLowerCase().includes(lvl)) return false;
      if (met && p.method !== met) return false;
      if (goal && p.learningGoalCategory !== goal) return false;
      return true;
    });

    // 4. Outdoors
    let outdoors = state.outdoorActivities.map((o) => ({
      ...o,
      distanceKm: calculateDistanceKm(locCoords.lat, locCoords.lng, o.lat, o.lng)
    })).filter((o) => {
      if (subj && !o.subject.toLowerCase().includes(subj)) return false;
      return true;
    });

    // Sorting
    const sort = state.filters.sortBy;
    if (sort === 'distance') {
      tutors.sort((a, b) => a.distanceKm - b.distanceKm);
      bimbels.sort((a, b) => a.distanceKm - b.distanceKm);
      programs.sort((a, b) => a.distanceKm - b.distanceKm);
      outdoors.sort((a, b) => a.distanceKm - b.distanceKm);
    } else if (sort === 'rate_asc') {
      tutors.sort((a, b) => a.hourlyRate - b.hourlyRate);
      programs.sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (sort === 'rate_desc') {
      tutors.sort((a, b) => b.hourlyRate - a.hourlyRate);
      programs.sort((a, b) => b.totalPrice - a.totalPrice);
    } else if (sort === 'experience') {
      tutors.sort((a, b) => b.experienceYears - a.experienceYears);
    }

    return { tutors, bimbels, programs, outdoors };
  }

  // 5. Render Marketplace UI
  function renderMarketplace() {
    const { tutors, bimbels, programs, outdoors } = getFilteredItems();
    const cat = state.filters.category;

    // Titles
    if (cat === 'guru_privat') {
      el.resultsTitle.textContent = 'Guru Privat Mandiri Terdekat';
      el.resultsCountDesc.innerHTML = `Ditemukan <strong class="text-sage">${tutors.length} Guru Privat</strong> di sekitar ${state.filters.location}`;
    } else if (cat === 'lembaga_bimbel') {
      el.resultsTitle.textContent = 'Lembaga Bimbel Resmi Terdekat';
      el.resultsCountDesc.innerHTML = `Ditemukan <strong class="text-navy">${bimbels.length} Lembaga Bimbel</strong> di sekitar ${state.filters.location}`;
    } else if (cat === 'program_belajar') {
      el.resultsTitle.textContent = 'Program Belajar Berbasis Topik & Tujuan';
      el.resultsCountDesc.innerHTML = `Ditemukan <strong class="text-gold">${programs.length} Paket Program Belajar</strong>`;
    } else if (cat === 'kegiatan_outdoor') {
      el.resultsTitle.textContent = 'Kegiatan Outdoor & Ekspedisi Eksplorasi';
      el.resultsCountDesc.innerHTML = `Ditemukan <strong class="text-sage">${outdoors.length} Kegiatan Outdoor</strong>`;
    } else {
      el.resultsTitle.textContent = 'Katalog Pembelajaran Personalized di Sekitar Anda';
      el.resultsCountDesc.innerHTML = `Ditemukan <strong>${outdoors.length} Outdoor</strong>, <strong>${programs.length} Program</strong>, <strong>${tutors.length} Guru</strong>, dan <strong>${bimbels.length} Bimbel</strong>`;
    }

    // Build Cards HTML
    let html = '';

    // A. Outdoor Section
    if ((cat === 'all' || cat === 'kegiatan_outdoor') && outdoors.length > 0) {
      html += `
        <div class="section-block">
          <div class="section-header">
            <div class="section-title-wrap">
              <div class="section-icon-box" style="background:#E8F0E8; color:#3F6B4E;">🌿</div>
              <h3 class="font-serif">Kegiatan Outdoor & Ekspedisi Sains (${outdoors.length})</h3>
            </div>
            <span class="section-subtitle">Pembelajaran aktif berbasis alam • 2 Pendamping</span>
          </div>
          <div class="cards-grid">
            ${outdoors.map(renderOutdoorCardHtml).join('')}
          </div>
        </div>
      `;
    }

    // B. Program Belajar Section
    if ((cat === 'all' || cat === 'program_belajar') && programs.length > 0) {
      html += `
        <div class="section-block">
          <div class="section-header">
            <div class="section-title-wrap">
              <div class="section-icon-box" style="background:#FAF2DC; color:#9A7016;">🎯</div>
              <h3 class="font-serif">Program Belajar Berbasis Topik (${programs.length})</h3>
            </div>
            <span class="section-subtitle">Paket terstruktur fokus submateri & target spesifik</span>
          </div>
          <div class="cards-grid">
            ${programs.map(renderProgramCardHtml).join('')}
          </div>
        </div>
      `;
    }

    // C. Guru Privat Section
    if ((cat === 'all' || cat === 'guru_privat') && tutors.length > 0) {
      html += `
        <div class="section-block">
          <div class="section-header">
            <div class="section-title-wrap">
              <div class="section-icon-box" style="background:#E8F0E8; color:#3F6B4E;">🎓</div>
              <h3 class="font-serif">Guru Privat Mandiri (${tutors.length})</h3>
            </div>
            <span class="section-subtitle">Personalized • Ragam metode belajar aktif</span>
          </div>
          <div class="cards-grid">
            ${tutors.map(renderTutorCardHtml).join('')}
          </div>
        </div>
      `;
    }

    // D. Lembaga Bimbel Section
    if ((cat === 'all' || cat === 'lembaga_bimbel') && bimbels.length > 0) {
      html += `
        <div class="section-block">
          <div class="section-header">
            <div class="section-title-wrap">
              <div class="section-icon-box" style="background:#EBF1F7; color:#2A3A52;">🏢</div>
              <h3 class="font-serif">Lembaga Bimbingan Belajar (${bimbels.length})</h3>
            </div>
            <span class="section-subtitle">Entitas resmi • Tim tutor terhubung</span>
          </div>
          <div class="cards-grid">
            ${bimbels.map(renderBimbelCardHtml).join('')}
          </div>
        </div>
      `;
    }

    if (!html.trim()) {
      el.cardsContainer.innerHTML = '';
      el.emptyState.classList.remove('hidden');
    } else {
      el.emptyState.classList.add('hidden');
      el.cardsContainer.innerHTML = html;
    }

    // Render Companion Interactive Map
    renderCompanionMap(tutors, bimbels, programs, outdoors);
  }

  // Card HTML Templates
  function renderOutdoorCardHtml(act) {
    const seatsRemaining = act.capacityTotal - act.capacityBooked;
    const isSoldOut = seatsRemaining <= 0;
    const seatClass = isSoldOut ? 'seat-soldout' : seatsRemaining <= 3 ? 'seat-warning' : 'seat-available';

    return `
      <div class="d-card outdoor-card" data-id="${act.id}">
        <div class="outdoor-card-img-wrap">
          <img src="${act.coverPhotoUrl}" alt="${act.title}" class="outdoor-card-img" onerror="this.src='assets/images/outdoor-ragunan.jpg'"/>
          <div class="outdoor-badge-overlay">
            <span class="pill pill-cream">🌿 Kegiatan Outdoor</span>
            <span class="seat-badge ${seatClass}">
              ${isSoldOut ? 'Penuh' : 'Sisa ' + seatsRemaining + ' Kursi'}
            </span>
          </div>
        </div>
        <div class="outdoor-body">
          <div>
            <h4 class="font-serif" style="font-size:1.05rem; margin-bottom:0.35rem;">${act.title}</h4>
            <div style="font-size:0.75rem; color:var(--mid-c); margin-bottom:0.6rem;">
              📍 ${act.locationName} • <span style="color:var(--sage-deep); font-weight:700;">${act.distanceKm} km</span><br/>
              🗓️ ${act.date} • ${act.timeSlot}
            </div>
            <p style="font-size:0.75rem; color:#4A4031; line-height:1.45; margin-bottom:0.75rem; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
              ${act.targetAudience}
            </p>
            <div style="display:flex; align-items:center; gap:0.4rem; font-size:0.7rem; color:var(--mid-c); background:var(--cream); padding:5px 8px; border-radius:var(--radius-sm); margin-bottom:0.85rem;">
              <span>👥 2 Pendamping:</span>
              <strong>${act.coordinators[0].name.split(',')[0]}</strong> &amp; <strong>${act.coordinators[1].name.split(',')[0]}</strong>
            </div>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; padding-top:0.75rem; border-top:1px solid var(--border-c); margin-top:auto;">
            <div>
              <div style="font-size:0.95rem; font-weight:700; color:var(--sage-deep);">${formatRupiah(act.pricePerChild)}</div>
              <div style="font-size:0.68rem; color:var(--mid-c);">per anak • tiket demo</div>
            </div>
            <div style="display:flex; gap:0.35rem;">
              <button class="btn btn-outline btn-sm" onclick="window.dampingApp.openOutdoorDetail('${act.id}')">Detail</button>
              <button class="btn btn-primary btn-sm" ${isSoldOut ? 'disabled style="opacity:0.5;"' : ''} onclick="window.dampingApp.openOutdoorBooking('${act.id}')">
                ${isSoldOut ? 'Penuh' : 'Pesan'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderProgramCardHtml(prog) {
    const isBimbel = prog.providerType === 'lembaga_bimbel';
    return `
      <div class="d-card" data-id="${prog.id}">
        <div>
          <div class="prog-card-header">
            <span class="pill pill-gold">🎯 Paket Topik</span>
            <span class="pill pill-cream">${prog.level}</span>
          </div>
          <h4 class="font-serif prog-title">${prog.title}</h4>
          <div style="font-size:0.75rem; color:var(--mid-c); margin-bottom:0.5rem;">
            Penyelenggara: <strong>${prog.providerName}</strong>
          </div>
          <div class="prog-approach-badge">
            💡 Pendekatan: ${prog.teachingApproach}
          </div>
          <div style="font-size:0.75rem; color:#4A4031; margin-bottom:0.75rem;">
            ⏱️ ${prog.sessionCount} Sesi Intensif • ${prog.targetGoal}
          </div>
        </div>
        <div style="display:flex; align-items:center; justify-content:space-between; padding-top:0.75rem; border-top:1px solid var(--border-c); margin-top:auto;">
          <div>
            <div style="font-size:0.95rem; font-weight:700; color:var(--gold-dark);">${formatRupiah(prog.totalPrice)}</div>
            <div style="font-size:0.68rem; color:var(--mid-c);">total paket program</div>
          </div>
          <div style="display:flex; gap:0.35rem;">
            <button class="btn btn-outline btn-sm" onclick="window.dampingApp.openProgramDetail('${prog.id}')">Silabus</button>
            <button class="btn btn-primary btn-sm" onclick="window.dampingApp.inquireProgram('${prog.id}')">Daftar</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderTutorCardHtml(tutor) {
    return `
      <div class="d-card" data-id="${tutor.id}">
        <div>
          <div class="tutor-card-head">
            <img src="${tutor.photoUrl}" alt="${tutor.name}" class="tutor-avatar" onerror="this.src='assets/images/tutor-nadia.jpg'"/>
            <div class="tutor-info">
              <div style="display:flex; align-items:center; gap:4px; margin-bottom:2px;">
                <span class="pill pill-sage" style="font-size:0.65rem;">★ ${tutor.ratingAverage}</span>
                <span style="font-size:0.68rem; color:var(--mid-c);">${tutor.totalSessionsCompleted} sesi</span>
              </div>
              <h4 class="font-serif" style="font-size:1.05rem; line-height:1.2;">${tutor.name}</h4>
              <p class="tutor-headline">${tutor.headline}</p>
            </div>
          </div>
          <p class="tutor-bio-snippet">${tutor.bio}</p>
          <div class="tutor-tags">
            ${tutor.subjects.map((s) => `<span class="pill pill-cream">${s}</span>`).join('')}
            ${tutor.levels.map((l) => `<span class="pill pill-cream">${l}</span>`).join('')}
          </div>
          <div style="font-size:0.72rem; color:var(--mid-c); margin-bottom:0.75rem;">
            📍 Area: ${tutor.serviceAreaName} • <strong style="color:var(--sage-deep);">${tutor.distanceKm} km</strong>
          </div>
        </div>
        <div class="tutor-footer">
          <div>
            <span class="rate-text">${formatRupiah(tutor.hourlyRate)}</span>
            <span class="rate-unit">/ 90 mnt</span>
          </div>
          <div style="display:flex; gap:0.35rem;">
            <button class="btn btn-outline btn-sm" onclick="window.dampingApp.openTutorProfile('${tutor.id}')">Profil</button>
            <button class="btn btn-primary btn-sm" onclick="window.dampingApp.openBookingModal('${tutor.id}')">Ajukan Les</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderBimbelCardHtml(bimbel) {
    return `
      <div class="d-card" data-id="${bimbel.id}">
        <div>
          <div class="bimbel-card-head">
            <img src="${bimbel.logoUrl}" alt="${bimbel.name}" class="bimbel-logo" onerror="this.src='assets/images/bimbel-nf.jpg'"/>
            <div>
              <div style="display:flex; align-items:center; gap:4px; margin-bottom:2px;">
                <span class="pill pill-navy" style="font-size:0.65rem;">🏢 Bimbel Resmi</span>
                <span style="font-size:0.68rem; color:var(--mid-c);">${bimbel.accreditation}</span>
              </div>
              <h4 class="font-serif" style="font-size:1.05rem; line-height:1.2;">${bimbel.name}</h4>
              <p style="font-size:0.72rem; color:var(--mid-c); margin-top:2px;">${bimbel.tagline}</p>
            </div>
          </div>
          <p style="font-size:0.785rem; color:#4A4031; line-height:1.45; margin-bottom:0.75rem; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
            ${bimbel.description}
          </p>
          <div style="font-size:0.72rem; color:var(--mid-c); margin-bottom:0.65rem;">
            📍 ${bimbel.districtName} • <strong style="color:var(--navy);">${bimbel.distanceKm} km</strong><br/>
            👨‍🏫 Tim Tutor Terikat: <strong>${bimbel.tutorIds.length} Pengajar Resmi</strong>
          </div>
        </div>
        <div class="tutor-footer">
          <div>
            <div style="font-size:0.85rem; font-weight:700; color:var(--navy);">${bimbel.priceRangeText}</div>
            <div style="font-size:0.68rem; color:var(--mid-c);">biaya per bulan</div>
          </div>
          <div style="display:flex; gap:0.35rem;">
            <button class="btn btn-outline btn-sm" onclick="window.dampingApp.openBimbelProfile('${bimbel.id}')">Info Cabang</button>
            <button class="btn btn-primary btn-sm" onclick="window.dampingApp.openBimbelInquiry('${bimbel.id}')">Konsultasi</button>
          </div>
        </div>
      </div>
    `;
  }

  // 6. Interactive Companion Map (Simulated Canvas with Interactive Pins)
  function renderCompanionMap(tutors, bimbels, programs, outdoors) {
    if (!el.mapCanvas) return;

    // Build pins list
    let pins = [];
    outdoors.forEach((o) => pins.push({ id: o.id, type: 'outdoor', name: o.title, dist: o.distanceKm, icon: '🌿' }));
    programs.forEach((p) => pins.push({ id: p.id, type: 'program', name: p.title, dist: p.distanceKm, icon: '🎯' }));
    tutors.forEach((t) => pins.push({ id: t.id, type: 'tutor', name: t.name, dist: t.distanceKm, icon: '🎓' }));
    bimbels.forEach((b) => pins.push({ id: b.id, type: 'bimbel', name: b.name, dist: b.distanceKm, icon: '🏢' }));

    // Sort by distance
    pins.sort((a, b) => a.dist - b.dist);

    // Render list below canvas
    if (el.mapPinsList) {
      el.mapPinsList.innerHTML = pins
        .slice(0, 8)
        .map(
          (p) => `
          <div class="map-point-row" onclick="window.dampingApp.handlePinClick('${p.type}', '${p.id}')">
            <span style="display:flex; align-items:center; gap:6px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
              <span>${p.icon}</span>
              <strong style="color:var(--dark-c);">${p.name}</strong>
            </span>
            <span style="color:var(--sage-deep); font-weight:700; font-size:0.7rem; white-space:nowrap;">${p.dist} km</span>
          </div>
        `
        )
        .join('');
    }

    // Interactive Canvas Art
    el.mapCanvas.innerHTML = `
      <div style="position:relative; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background: radial-gradient(circle at 50% 50%, #FAF6EF 0%, #E2DDD3 100%); overflow:hidden;">
        <!-- Simulated Map Grid & Streets -->
        <svg style="position:absolute; inset:0; width:100%; height:100%; opacity:0.35;" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6B5E4C" stroke-width="0.7"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <path d="M -50 120 Q 150 180 450 140" fill="none" stroke="#5C8A6B" stroke-width="4" stroke-opacity="0.4"/>
          <path d="M 120 -50 Q 180 150 140 450" fill="none" stroke="#2A3A52" stroke-width="3" stroke-opacity="0.3"/>
        </svg>

        <!-- Center Point: User Search Location -->
        <div style="position:absolute; top:48%; left:48%; transform:translate(-50%,-50%); z-index:10; display:flex; flex-direction:column; align-items:center;">
          <div style="width:20px; height:20px; border-radius:50%; background:#C4623A; border:3px solid #fff; box-shadow:0 0 10px rgba(196,98,58,0.6); animation:pulse 2s infinite;"></div>
          <span style="font-size:0.65rem; font-weight:700; background:#fff; padding:2px 6px; border-radius:4px; border:1px solid #C4623A; margin-top:2px;">📍 Anda: ${state.filters.location}</span>
        </div>

        <!-- Scattered Pins -->
        ${pins.slice(0, 6).map((p, idx) => {
          const positions = [
            { top: '25%', left: '30%' },
            { top: '30%', left: '72%' },
            { top: '68%', left: '26%' },
            { top: '75%', left: '68%' },
            { top: '18%', left: '55%' },
            { top: '82%', left: '46%' }
          ];
          const pos = positions[idx] || { top: '50%', left: '50%' };
          return `
            <div style="position:absolute; top:${pos.top}; left:${pos.left}; transform:translate(-50%,-50%); z-index:8; cursor:pointer;" onclick="window.dampingApp.handlePinClick('${p.type}', '${p.id}')">
              <div style="background:#fff; border:1.5px solid var(--border-hover); border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 8px rgba(0,0,0,0.12); font-size:16px;">
                ${p.icon}
              </div>
            </div>
          `;
        }).join('')}

        <div style="position:absolute; bottom:8px; right:8px; background:rgba(255,255,255,0.85); backdrop-filter:blur(3px); border:1px solid var(--border-c); border-radius:6px; padding:3px 8px; font-size:0.65rem; color:var(--mid-c);">
          Simulasi Peta Wilayah • ${state.filters.location}
        </div>
      </div>
    `;
  }

  // 7. Modals Open / Close Helpers
  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Global handler to close modal when clicking overlay background
  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // 8. Specific Modal Workflows

  // A. Tutor Profile Modal
  function openTutorProfile(tutorId) {
    const tutor = state.tutors.find((t) => t.id === tutorId);
    if (!tutor) return;

    document.getElementById('m-tutor-name').textContent = tutor.name;
    document.getElementById('m-tutor-headline').textContent = tutor.headline;
    document.getElementById('m-tutor-avatar').src = tutor.photoUrl;
    document.getElementById('m-tutor-education').textContent = tutor.education;
    document.getElementById('m-tutor-bio').textContent = tutor.bio;
    document.getElementById('m-tutor-rate').textContent = formatRupiah(tutor.hourlyRate) + ' / 90 menit';
    document.getElementById('m-tutor-area').textContent = tutor.serviceAreaName + ' (Radius: ' + tutor.serviceRadiusKm + ' km)';

    // Personalized Teaching Approaches
    const appContainer = document.getElementById('m-tutor-approaches');
    appContainer.innerHTML = tutor.teachingApproaches
      .map((a) => `<li style="margin-bottom:4px;">✨ ${a}</li>`)
      .join('');

    // Concrete Topic Approach Example
    const exBox = document.getElementById('m-tutor-example');
    if (tutor.topicApproachExample) {
      exBox.innerHTML = `
        <div style="background:var(--cream); border:1px solid var(--border-c); border-radius:var(--radius-md); padding:10px 14px; margin-top:8px;">
          <div style="font-weight:700; color:var(--sage-deep); font-size:0.8rem; margin-bottom:2px;">
            Contoh Pendekatan: ${tutor.topicApproachExample.topic}
          </div>
          <div style="font-size:0.75rem; font-weight:600; color:var(--dark-c); margin-bottom:4px;">
            Metode: ${tutor.topicApproachExample.approach}
          </div>
          <div style="font-size:0.75rem; color:#4A4031; line-height:1.45;">
            ${tutor.topicApproachExample.description}
          </div>
        </div>
      `;
    } else {
      exBox.innerHTML = '';
    }

    // Child Preference Fit
    const fitList = document.getElementById('m-tutor-fit');
    if (tutor.childPreferenceFit) {
      fitList.innerHTML = tutor.childPreferenceFit
        .map((f) => `<span class="pill pill-sage" style="margin-right:4px; margin-bottom:4px;">✓ ${f}</span>`)
        .join('');
    } else {
      fitList.innerHTML = '';
    }

    // Set CTA button
    const ctaBtn = document.getElementById('m-tutor-cta-book');
    ctaBtn.onclick = () => {
      closeModal('modal-tutor-profile');
      openBookingModal(tutor.id);
    };

    openModal('modal-tutor-profile');
  }

  // B. Tutor Booking Modal (Ajukan Les)
  function openBookingModal(tutorId) {
    const tutor = state.tutors.find((t) => t.id === tutorId) || state.tutors[0];
    document.getElementById('book-tutor-name').textContent = tutor.name;
    document.getElementById('book-tutor-rate').textContent = formatRupiah(tutor.hourlyRate) + ' / sesi 90 mnt';
    document.getElementById('book-tutor-photo').src = tutor.photoUrl;

    // Hidden or target ref
    const form = document.getElementById('form-booking-tutor');
    form.dataset.tutorId = tutor.id;

    openModal('modal-booking-tutor');
  }

  function handleBookingSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('form-booking-tutor');
    const tutorId = form.dataset.tutorId;
    const tutor = state.tutors.find((t) => t.id === tutorId) || state.tutors[0];

    const studentName = document.getElementById('book-student-name').value || 'Farel Pratama';
    const parentName = document.getElementById('book-parent-name').value || 'Ibu Ratna Wardani';
    const parentPhone = document.getElementById('book-parent-phone').value || '0812-3456-7890';
    const subject = document.getElementById('book-subject').value || 'Matematika';
    const method = document.getElementById('book-method').value || 'tatap_muka';
    const preferredDay = document.getElementById('book-day').value || 'Rabu';
    const notes = document.getElementById('book-notes').value || 'Mohon dibantu penguatan pemahaman konsep dasar.';

    const newReq = {
      id: 'req-' + Date.now(),
      targetType: 'guru_privat',
      targetId: tutor.id,
      targetName: tutor.name,
      targetPhoto: tutor.photoUrl,
      studentName,
      parentName,
      parentPhone,
      subject,
      level: 'SD / SMP',
      method,
      preferredDay,
      preferredTimeSlot: '16:00 - 17:30',
      parentLocationName: state.filters.location,
      meetingNotes: notes,
      totalFee: tutor.hourlyRate,
      createdAt: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      status: 'MENUNGGU',
      studentAccessCode: 'Z5C78E'
    };

    state.requests.unshift(newReq);
    saveState();
    updateNavBadges();

    closeModal('modal-booking-tutor');
    alert('Permintaan les berhasil dikirimkan ke ' + tutor.name + '!\nAnda dapat memantau status persetujuan di menu Permintaan Les Saya.');
    openRequestsModal();
  }

  // C. Bimbel Profile Modal
  function openBimbelProfile(bimbelId) {
    const bimbel = state.bimbels.find((b) => b.id === bimbelId);
    if (!bimbel) return;

    document.getElementById('m-bimbel-name').textContent = bimbel.name;
    document.getElementById('m-bimbel-tagline').textContent = bimbel.tagline;
    document.getElementById('m-bimbel-logo').src = bimbel.logoUrl;
    document.getElementById('m-bimbel-desc').textContent = bimbel.description;
    document.getElementById('m-bimbel-address').textContent = bimbel.branchAddress;
    document.getElementById('m-bimbel-phone').textContent = bimbel.phone;
    document.getElementById('m-bimbel-price').textContent = bimbel.priceRangeText;

    // Official Tutors
    const tutorBox = document.getElementById('m-bimbel-tutors');
    const linkedTutors = state.tutors.filter((t) => bimbel.tutorIds.includes(t.id));
    if (linkedTutors.length > 0) {
      tutorBox.innerHTML = linkedTutors
        .map(
          (t) => `
          <div style="display:flex; align-items:center; gap:8px; padding:6px; background:var(--cream); border-radius:var(--radius-sm); margin-bottom:4px;">
            <img src="${t.photoUrl}" style="width:36px; height:36px; border-radius:50%; object-fit:cover;" onerror="this.src='assets/images/tutor-dimas.jpg'"/>
            <div>
              <strong style="font-size:0.785rem; color:var(--dark-c);">${t.name}</strong>
              <div style="font-size:0.68rem; color:var(--mid-c);">${t.headline}</div>
            </div>
          </div>
        `
        )
        .join('');
    } else {
      tutorBox.innerHTML = '<span style="font-size:0.75rem; color:var(--mid-c);">Tim pengajar resmi cabang terverifikasi.</span>';
    }

    // Facilities
    const facBox = document.getElementById('m-bimbel-facilities');
    facBox.innerHTML = bimbel.facilities
      .map((f) => `<span class="pill pill-navy" style="margin-right:4px; margin-bottom:4px;">✓ ${f}</span>`)
      .join('');

    // Programs
    const progBox = document.getElementById('m-bimbel-programs');
    progBox.innerHTML = bimbel.programs
      .map(
        (p) => `
        <div style="background:#fff; border:1px solid var(--border-c); border-radius:var(--radius-sm); padding:8px 10px; margin-bottom:6px;">
          <div style="font-weight:700; font-size:0.8rem; color:var(--navy);">${p.name}</div>
          <div style="font-size:0.72rem; color:var(--mid-c); margin-top:2px;">${p.description}</div>
          <div style="font-size:0.72rem; font-weight:700; color:var(--sage-deep); margin-top:4px;">${p.priceRange}</div>
        </div>
      `
      )
      .join('');

    document.getElementById('m-bimbel-cta').onclick = () => {
      closeModal('modal-bimbel-profile');
      openBimbelInquiry(bimbel.id);
    };

    openModal('modal-bimbel-profile');
  }

  function openBimbelInquiry(bimbelId) {
    const bimbel = state.bimbels.find((b) => b.id === bimbelId) || state.bimbels[0];
    document.getElementById('inq-bimbel-name').textContent = bimbel.name;
    document.getElementById('inq-bimbel-logo').src = bimbel.logoUrl;
    document.getElementById('form-inquiry-bimbel').dataset.bimbelId = bimbel.id;
    openModal('modal-inquiry-bimbel');
  }

  function handleBimbelInquirySubmit(e) {
    e.preventDefault();
    const form = document.getElementById('form-inquiry-bimbel');
    const bimbelId = form.dataset.bimbelId;
    const bimbel = state.bimbels.find((b) => b.id === bimbelId) || state.bimbels[0];

    const studentName = document.getElementById('inq-student-name').value || 'Farel Pratama';
    const parentName = document.getElementById('inq-parent-name').value || 'Ibu Ratna Wardani';
    const parentPhone = document.getElementById('inq-parent-phone').value || '0812-3456-7890';
    const level = document.getElementById('inq-level').value || 'SMP';
    const notes = document.getElementById('inq-notes').value || 'Konsultasi kelas reguler';

    const newReq = {
      id: 'req-' + Date.now(),
      targetType: 'lembaga_bimbel',
      targetId: bimbel.id,
      targetName: bimbel.name,
      targetPhoto: bimbel.logoUrl,
      studentName,
      parentName,
      parentPhone,
      subject: 'Konsultasi Program Bimbel',
      level,
      method: 'tatap_muka',
      preferredDay: 'Fleksibel',
      preferredTimeSlot: 'Jam Operasional Cabang',
      parentLocationName: state.filters.location,
      meetingNotes: notes,
      totalFee: bimbel.minMonthlyFee,
      createdAt: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      status: 'MENUNGGU',
      studentAccessCode: 'Z5C78E'
    };

    state.requests.unshift(newReq);
    saveState();
    updateNavBadges();

    closeModal('modal-inquiry-bimbel');
    alert('Permintaan konsultasi berhasil dikirimkan ke ' + bimbel.name + '!');
    openRequestsModal();
  }

  // D. Program Detail Modal
  function openProgramDetail(programId) {
    const prog = state.programs.find((p) => p.id === programId);
    if (!prog) return;

    document.getElementById('m-prog-title').textContent = prog.title;
    document.getElementById('m-prog-provider').textContent = prog.providerName;
    document.getElementById('m-prog-target').textContent = prog.targetGoal;
    document.getElementById('m-prog-approach').textContent = prog.teachingApproach;
    document.getElementById('m-prog-duration').textContent = prog.sessionCount + ' Sesi Intensif (@ 90 menit)';
    document.getElementById('m-prog-price').textContent = formatRupiah(prog.totalPrice);

    // Syllabus
    const sylBox = document.getElementById('m-prog-syllabus');
    sylBox.innerHTML = prog.activities
      .map((act) => `<li style="margin-bottom:6px; font-size:0.775rem;">📌 ${act}</li>`)
      .join('');

    // Outcomes
    const outBox = document.getElementById('m-prog-outcomes');
    outBox.innerHTML = prog.expectedOutcomes
      .map((o) => `<li style="margin-bottom:4px; font-size:0.775rem;">✓ ${o}</li>`)
      .join('');

    document.getElementById('m-prog-cta').onclick = () => {
      closeModal('modal-program-detail');
      inquireProgram(prog.id);
    };

    openModal('modal-program-detail');
  }

  function inquireProgram(programId) {
    const prog = state.programs.find((p) => p.id === programId);
    if (!prog) return;

    const newReq = {
      id: 'req-' + Date.now(),
      targetType: prog.providerType,
      targetId: prog.providerId,
      targetName: prog.providerName,
      targetPhoto: prog.providerPhotoOrLogo,
      studentName: 'Farel Pratama',
      parentName: 'Ibu Ratna Wardani',
      parentPhone: '0812-3456-7890',
      subject: prog.subject,
      level: prog.level,
      programName: prog.title,
      method: prog.method === 'outdoor' ? 'tatap_muka' : prog.method,
      preferredDay: 'Sabtu / Fleksibel',
      preferredTimeSlot: '15:30 - 17:00',
      parentLocationName: prog.districtName,
      meetingNotes: 'Berminat mendaftar paket program: ' + prog.title,
      totalFee: prog.totalPrice,
      createdAt: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      status: 'MENUNGGU',
      studentAccessCode: 'Z5C78E'
    };

    state.requests.unshift(newReq);
    saveState();
    updateNavBadges();
    alert('Pendaftaran program "' + prog.title + '" berhasil diajukan!');
    openRequestsModal();
  }

  // E. Outdoor Detail Modal
  function openOutdoorDetail(activityId) {
    const act = state.outdoorActivities.find((a) => a.id === activityId);
    if (!act) return;

    const seatsRemaining = act.capacityTotal - act.capacityBooked;
    const isSoldOut = seatsRemaining <= 0;

    document.getElementById('m-out-img').src = act.coverPhotoUrl;
    document.getElementById('m-out-title').textContent = act.title;
    document.getElementById('m-out-location').textContent = act.locationName;
    document.getElementById('m-out-meeting').textContent = act.meetingPoint;
    document.getElementById('m-out-schedule').textContent = act.date + ' • ' + act.timeSlot + ' (' + act.durationMinutes + ' menit)';
    document.getElementById('m-out-capacity').innerHTML = `
      Kapasitas Total: <strong>${act.capacityTotal} anak</strong> • Terisi: <strong>${act.capacityBooked} anak</strong> • 
      <span class="seat-badge ${isSoldOut ? 'seat-soldout' : seatsRemaining <= 3 ? 'seat-warning' : 'seat-available'}">
        ${isSoldOut ? 'Tiket Habis' : 'Sisa ' + seatsRemaining + ' Kursi'}
      </span>
    `;
    document.getElementById('m-out-price').textContent = formatRupiah(act.pricePerChild) + ' / anak';
    document.getElementById('m-out-curriculum').textContent = act.curriculumCompetency;
    document.getElementById('m-out-target').textContent = act.targetAudience;
    document.getElementById('m-out-safety').textContent = act.safetyInfo;

    // Coordinators (2 roles)
    const coordBox = document.getElementById('m-out-coordinators');
    coordBox.innerHTML = act.coordinators
      .map(
        (c) => `
        <div class="coordinator-card">
          <img src="${c.photoUrl}" alt="${c.name}" class="coordinator-photo" onerror="this.src='assets/images/tutor-nadia.jpg'"/>
          <div>
            <div style="font-weight:700; font-size:0.85rem; color:var(--dark-c);">${c.name}</div>
            <div style="font-size:0.72rem; font-weight:700; color:var(--sage-deep); margin-bottom:2px;">${c.role}</div>
            <div style="font-size:0.7rem; color:var(--mid-c);">${c.background}</div>
          </div>
        </div>
      `
      )
      .join('');

    // Activities List
    const actList = document.getElementById('m-out-activities');
    actList.innerHTML = act.activitiesList
      .map((a) => `<li style="margin-bottom:4px; font-size:0.775rem;">• ${a}</li>`)
      .join('');

    // Fee Includes
    const feeList = document.getElementById('m-out-fee-includes');
    feeList.innerHTML = act.feeIncludes
      .map((f) => `<span class="pill pill-sage" style="margin-right:4px; margin-bottom:4px;">✓ ${f}</span>`)
      .join('');

    // Equipment To Bring
    const eqList = document.getElementById('m-out-equipment');
    eqList.innerHTML = act.equipmentToBring
      .map((eq) => `<span class="pill pill-cream" style="margin-right:4px; margin-bottom:4px;">🎒 ${eq}</span>`)
      .join('');

    // Refund Policy Table
    const refTable = document.getElementById('m-out-refund-table');
    refTable.innerHTML = `
      <table class="refund-table">
        <thead>
          <tr>
            <th>Kondisi Pembatalan</th>
            <th>Pengembalian Dana</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          ${act.cancellationPolicy.parentCancellationTiers
            .map(
              (tier) => `
            <tr>
              <td><strong>${tier.timeframe}</strong></td>
              <td style="color:${tier.refundPercentage > 0 ? 'var(--sage-deep)' : 'var(--terra)'}; font-weight:700;">
                ${tier.refundPercentage}% Refund
              </td>
              <td style="font-size:0.72rem; color:var(--mid-c);">${tier.notes}</td>
            </tr>
          `
            )
            .join('')}
          <tr>
            <td><strong>Pembatalan oleh Penyelenggara</strong></td>
            <td style="color:var(--sage-deep); font-weight:700;">100% Refund</td>
            <td style="font-size:0.72rem; color:var(--mid-c);">${act.cancellationPolicy.organizerCancellationPolicy}</td>
          </tr>
          <tr>
            <td><strong>Peserta Tidak Hadir (No-Show)</strong></td>
            <td style="color:var(--terra); font-weight:700;">0% Refund</td>
            <td style="font-size:0.72rem; color:var(--mid-c);">${act.cancellationPolicy.noShowPolicy}</td>
          </tr>
        </tbody>
      </table>
    `;

    // Book Button
    const btnBook = document.getElementById('m-out-cta-book');
    btnBook.disabled = isSoldOut;
    btnBook.textContent = isSoldOut ? 'Tiket Sudah Habis' : 'Pesan Tiket Sekarang';
    btnBook.onclick = () => {
      closeModal('modal-outdoor-detail');
      openOutdoorBooking(act.id);
    };

    openModal('modal-outdoor-detail');
  }

  // F. Outdoor Train-Style Ticket Booking Modal
  function openOutdoorBooking(activityId) {
    const act = state.outdoorActivities.find((a) => a.id === activityId);
    if (!act) return;

    const seatsRemaining = act.capacityTotal - act.capacityBooked;
    if (seatsRemaining <= 0) {
      alert('Maaf, kuota kursi untuk kegiatan ini sudah habis!');
      return;
    }

    document.getElementById('book-out-title').textContent = act.title;
    document.getElementById('book-out-schedule').textContent = act.date + ' • ' + act.timeSlot;
    document.getElementById('book-out-location').textContent = act.locationName;
    document.getElementById('book-out-seats-left').textContent = seatsRemaining;
    document.getElementById('book-out-price-per').textContent = formatRupiah(act.pricePerChild);

    const countInput = document.getElementById('book-out-count');
    countInput.max = seatsRemaining;
    countInput.value = 1;

    function updateTotal() {
      const cnt = Math.min(Math.max(1, parseInt(countInput.value) || 1), seatsRemaining);
      countInput.value = cnt;
      const total = cnt * act.pricePerChild;
      document.getElementById('book-out-total').textContent = formatRupiah(total);
    }

    countInput.onchange = updateTotal;
    countInput.oninput = updateTotal;
    updateTotal();

    const form = document.getElementById('form-booking-outdoor');
    form.dataset.actId = act.id;

    openModal('modal-booking-outdoor');
  }

  function handleOutdoorBookingSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('form-booking-outdoor');
    const actId = form.dataset.actId;
    const act = state.outdoorActivities.find((a) => a.id === actId);
    if (!act) return;

    const seatsRemaining = act.capacityTotal - act.capacityBooked;
    const countInput = document.getElementById('book-out-count');
    const childCount = parseInt(countInput.value) || 1;

    // Strict Seat Quota Validation (Prevent Overbooking)
    if (childCount > seatsRemaining) {
      alert('Gagal! Jumlah peserta (' + childCount + ' anak) melebihi sisa kursi yang tersedia (' + seatsRemaining + ' kursi).');
      return;
    }

    const parentName = document.getElementById('book-out-parent-name').value || 'Ibu Ratna Wardani';
    const parentPhone = document.getElementById('book-out-parent-phone').value || '0812-3456-7890';
    const childrenNamesRaw = document.getElementById('book-out-children-names').value || 'Farel Pratama (Kelas 5 SD)';
    const childrenNames = childrenNamesRaw.split(',').map((s) => s.trim()).filter(Boolean);

    // Update Activity Quota
    act.capacityBooked += childCount;

    // Issue New Demo Ticket
    const ticketId = 'ticket-' + Date.now();
    const bookingCode = 'DMP-' + act.id.slice(-3).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
    const totalFee = childCount * act.pricePerChild;

    const newTicket = {
      id: ticketId,
      bookingCode,
      activityId: act.id,
      activityTitle: act.title,
      activityDate: act.date,
      activityTime: act.timeSlot,
      activityLocation: act.locationName,
      meetingPoint: act.meetingPoint,
      parentName,
      parentPhone,
      childrenNames: childrenNames.length ? childrenNames : ['Anak ' + parentName],
      childCount,
      pricePerChild: act.pricePerChild,
      totalFee,
      status: 'terdaftar',
      bookingDate: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      qrCodeDemo: 'QR-' + bookingCode,
      paymentSimulatedAt: 'Simulasi Terverifikasi'
    };

    state.outdoorTickets.unshift(newTicket);
    saveState();
    updateNavBadges();
    renderMarketplace();

    closeModal('modal-booking-outdoor');
    alert('Tiket berhasil dipesan!\nKode Booking: ' + bookingCode + '\nKuota kursi berhasil diperbarui.');
    openOutdoorTicketsModal();
  }

  // G. Outdoor Tickets Modal ("Tiket Saya")
  function openOutdoorTicketsModal() {
    const listContainer = document.getElementById('m-tickets-list');
    if (!listContainer) return;

    if (state.outdoorTickets.length === 0) {
      listContainer.innerHTML = '<div style="text-align:center; padding:2rem; color:var(--mid-c);">Belum ada tiket kegiatan outdoor yang dipesan.</div>';
    } else {
      listContainer.innerHTML = state.outdoorTickets.map(renderTicketCardHtml).join('');
    }

    openModal('modal-outdoor-tickets');
  }

  function renderTicketCardHtml(ticket) {
    const isCancelled = ticket.status === 'dibatalkan';
    const isCompleted = ticket.status === 'selesai';

    let statusPill = `<span class="pill pill-sage">✓ Terdaftar</span>`;
    if (isCancelled) {
      statusPill = `<span class="pill pill-terra">✗ Dibatalkan</span>`;
    } else if (isCompleted) {
      statusPill = `<span class="pill pill-navy">★ Kegiatan Selesai</span>`;
    } else if (ticket.status === 'menunggu_pembayaran') {
      statusPill = `<span class="pill pill-gold">⏳ Menunggu Pembayaran</span>`;
    }

    return `
      <div class="ticket-card ${isCancelled ? 'dibatalkan' : ''}">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
          <div>
            <span style="font-size:0.7rem; font-weight:700; color:var(--mid-c); text-transform:uppercase;">KODE BOOKING</span>
            <div style="font-family:monospace; font-size:1.1rem; font-weight:700; color:var(--dark-c);">${ticket.bookingCode}</div>
          </div>
          ${statusPill}
        </div>
        <h4 class="font-serif" style="font-size:1.1rem; margin-bottom:0.25rem;">${ticket.activityTitle}</h4>
        <div style="font-size:0.75rem; color:var(--mid-c); line-height:1.5; margin-bottom:0.75rem;">
          📍 ${ticket.activityLocation}<br/>
          🗓️ ${ticket.activityDate} • ${ticket.activityTime}<br/>
          🚩 Titik Kumpul: ${ticket.meetingPoint}<br/>
          👥 Peserta: <strong>${ticket.childrenNames.join(', ')}</strong> (${ticket.childCount} anak)
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; background:var(--cream); padding:8px 12px; border-radius:var(--radius-md); font-size:0.775rem; margin-bottom:0.75rem;">
          <span>Total Biaya: <strong style="color:var(--sage-deep); font-size:0.9rem;">${formatRupiah(ticket.totalFee)}</strong></span>
          <span style="font-size:0.7rem; color:var(--mid-c);">Status: ${ticket.paymentSimulatedAt || 'Simulasi'}</span>
        </div>

        ${
          isCancelled
            ? `
          <div style="background:#FFF0ED; border:1px solid #F5C6B7; padding:8px 12px; border-radius:var(--radius-sm); font-size:0.72rem; color:var(--terra);">
            <strong>Pengembalian Dana (Simulasi):</strong> ${formatRupiah(ticket.refundAmount || ticket.totalFee * 0.8)} (80% Refund)<br/>
            Alasan: ${ticket.cancellationReason || 'Pembatalan orang tua'}<br/>
            <em>*Kuota kursi telah dikembalikan ke sistem.</em>
          </div>
        `
            : `
          <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
            ${
              isCompleted
                ? `
              <button class="btn btn-outline btn-sm" onclick="window.dampingApp.openPortfolioDetail('port-farel-ragunan')">
                📖 Lihat Portofolio Pembelajaran
              </button>
            `
                : `
              <button class="btn btn-danger btn-sm" onclick="window.dampingApp.cancelOutdoorTicket('${ticket.id}')">
                Batalkan Tiket (Simulasi Refund)
              </button>
            `
            }
          </div>
        `
        }
      </div>
    `;
  }

  // Cancel Outdoor Ticket & Restore Seat Capacity
  function cancelOutdoorTicket(ticketId) {
    const ticket = state.outdoorTickets.find((t) => t.id === ticketId);
    if (!ticket) return;

    const reason = prompt('Masukkan alasan pembatalan tiket (Simulasi Demo):', 'Jadwal keluarga bertabrakan');
    if (reason === null) return; // User clicked Cancel

    const act = state.outdoorActivities.find((a) => a.id === ticket.activityId);

    // Calculate 80% refund (H-3 policy)
    const refundPct = 80;
    const refundAmount = Math.round((ticket.totalFee * refundPct) / 100);

    // Restore Capacity Booked
    if (act) {
      act.capacityBooked = Math.max(0, act.capacityBooked - ticket.childCount);
    }

    ticket.status = 'dibatalkan';
    ticket.cancellationReason = reason || 'Pembatalan oleh orang tua';
    ticket.refundAmount = refundAmount;

    saveState();
    updateNavBadges();
    renderMarketplace();
    openOutdoorTicketsModal();

    alert(
      'Tiket ' +
        ticket.bookingCode +
        ' berhasil dibatalkan!\n' +
        'Kebijakan Refund H-3: ' +
        refundPct +
        '%\n' +
        'Estimasi Simulasi Pengembalian: ' +
        formatRupiah(refundAmount) +
        '\n\n' +
        'Kuota ' +
        ticket.childCount +
        ' kursi telah dipulihkan kembali ke kegiatan.'
    );
  }

  // H. Student Learning Portfolio Modal & Tutoring Continuity
  function openPortfolioDetail(portfolioId) {
    const port = state.portfolios.find((p) => p.id === portfolioId) || state.portfolios[0];
    if (!port) return;

    document.getElementById('m-port-student').textContent = port.studentName;
    document.getElementById('m-port-code').textContent = port.studentAccessCode;
    document.getElementById('m-port-activity').textContent = port.activityTitle;
    document.getElementById('m-port-date').textContent = port.completionDate;

    // Competencies
    const compBox = document.getElementById('m-port-competencies');
    compBox.innerHTML = port.competencyAchievements
      .map((c) => `<li style="margin-bottom:4px; font-size:0.775rem;">✓ ${c}</li>`)
      .join('');

    // Coordinator Observations
    const obsBox = document.getElementById('m-port-observations');
    obsBox.innerHTML = port.observationNotes
      .map(
        (obs) => `
        <div style="background:#fff; border:1px solid var(--border-c); border-radius:var(--radius-md); padding:10px 12px; margin-bottom:8px;">
          <div style="font-weight:700; font-size:0.8rem; color:var(--dark-c);">${obs.coordinatorName}</div>
          <div style="font-size:0.7rem; font-weight:600; color:var(--sage-deep); margin-bottom:4px;">${obs.role}</div>
          <p style="font-size:0.75rem; color:#4A4031; line-height:1.5;">"${obs.notes}"</p>
        </div>
      `
      )
      .join('');

    // Strengths
    const strBox = document.getElementById('m-port-strengths');
    strBox.innerHTML = port.strengths
      .map((s) => `<li style="margin-bottom:3px; font-size:0.75rem;">✨ ${s}</li>`)
      .join('');

    // Areas to develop
    const devBox = document.getElementById('m-port-develop');
    devBox.innerHTML = port.areasToDevelop
      .map((d) => `<li style="margin-bottom:3px; font-size:0.75rem;">🎯 ${d}</li>`)
      .join('');

    // Next step & Tutoring Continuity Button
    document.getElementById('m-port-recommendation').textContent = port.nextStepRecommendation;

    const recTutor = state.tutors.find((t) => t.id === port.recommendedTutorId) || state.tutors[0];
    const btnContinue = document.getElementById('m-port-cta-continue');
    btnContinue.textContent = `Lanjutkan Les dengan Guru Ini (${recTutor.name})`;
    btnContinue.onclick = () => {
      closeModal('modal-student-portfolio');
      closeModal('modal-parent-portal');
      openBookingModal(recTutor.id);
    };

    openModal('modal-student-portfolio');
  }

  // I. Parent Portal Modal (6-Digit Access Code)
  function openParentPortalWithCode(inputCode) {
    const code = (inputCode || '').trim().toUpperCase();
    const session = window.DAMPING_DATA.STUDENT_CODES[code];

    if (!session) {
      alert('Kode akses "' + code + '" tidak ditemukan!\nSilakan gunakan demo kode: Z5C78E (Farel Pratama) atau NF8821 (Aisyah Putri).');
      return;
    }

    state.activeStudentSession = session;
    saveState();

    document.getElementById('portal-student-name').textContent = session.studentName;
    document.getElementById('portal-student-grade').textContent = session.grade + ' • ' + session.school;
    document.getElementById('portal-code-badge').textContent = session.code;
    document.getElementById('portal-tutor-name').textContent = session.activeTutorName;
    document.getElementById('portal-schedule').textContent = session.upcomingSchedule;
    document.getElementById('portal-attendance').textContent = session.attendanceRate;
    document.getElementById('portal-summary').textContent = session.learningSummary;

    // Portfolio Button inside Portal
    const btnPort = document.getElementById('portal-btn-open-portfolio');
    if (session.recentActivityPortfolioId) {
      btnPort.style.display = 'inline-flex';
      btnPort.onclick = () => {
        openPortfolioDetail(session.recentActivityPortfolioId);
      };
    } else {
      btnPort.style.display = 'none';
    }

    openModal('modal-parent-portal');
  }

  // J. Parent Requests Tracking Modal
  function openRequestsModal() {
    const list = document.getElementById('m-requests-list');
    if (!list) return;

    if (state.requests.length === 0) {
      list.innerHTML = '<div style="text-align:center; padding:2rem; color:var(--mid-c);">Belum ada permintaan les atau konsultasi yang diajukan.</div>';
    } else {
      list.innerHTML = state.requests
        .map(
          (r) => `
        <div style="background:#fff; border:1px solid var(--border-c); border-radius:var(--radius-lg); padding:1rem; margin-bottom:0.75rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.35rem;">
            <div>
              <span class="pill ${r.targetType === 'lembaga_bimbel' ? 'pill-navy' : 'pill-sage'}" style="font-size:0.65rem;">
                ${r.targetType === 'lembaga_bimbel' ? 'Lembaga Bimbel' : 'Guru Privat'}
              </span>
              <h4 class="font-serif" style="font-size:1.05rem; margin-top:2px;">${r.targetName}</h4>
            </div>
            <span class="pill ${r.status === 'DITERIMA' ? 'pill-sage' : r.status === 'DITOLAK' ? 'pill-terra' : 'pill-gold'}">
              ${r.status}
            </span>
          </div>
          <div style="font-size:0.75rem; color:var(--mid-c); line-height:1.5;">
            Murid: <strong>${r.studentName}</strong> • Mata Pelajaran: <strong>${r.subject}</strong><br/>
            Jadwal Diusulkan: ${r.preferredDay} (${r.preferredTimeSlot || '16:00 - 17:30'}) • Metode: ${r.method}<br/>
            Lokasi: ${r.parentLocationName}<br/>
            Catatan: "${r.meetingNotes || '-'}"
          </div>
          ${
            r.tutorResponseNote
              ? `
            <div style="background:var(--sage-pale); border:1px solid rgba(92,138,107,0.3); border-radius:var(--radius-sm); padding:6px 10px; margin-top:0.5rem; font-size:0.72rem; color:var(--sage-deep);">
              <strong>Respon Pengajar:</strong> "${r.tutorResponseNote}"
            </div>
          `
              : ''
          }
        </div>
      `
        )
        .join('');
    }

    openModal('modal-parent-requests');
  }

  // K. Tutor Dashboard View (Mode Guru)
  function renderTutorDashboard() {
    const container = document.getElementById('tutor-dashboard-requests');
    if (!container) return;

    const pendingRequests = state.requests.filter((r) => r.status === 'MENUNGGU');

    if (pendingRequests.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:3rem 1rem; background:#fff; border:1px solid var(--border-c); border-radius:var(--radius-xl);">
          <div style="font-size:2rem; margin-bottom:0.5rem;">🎉</div>
          <h3 class="font-serif">Semua Permintaan Les Sudah Ditanggapi</h3>
          <p style="font-size:0.8rem; color:var(--mid-c); margin-top:4px;">Belum ada pengajuan les baru yang menunggu persetujuan Anda.</p>
        </div>
      `;
    } else {
      container.innerHTML = pendingRequests
        .map(
          (r) => `
        <div style="background:#fff; border:1.5px solid var(--border-c); border-radius:var(--radius-xl); padding:1.25rem; margin-bottom:1rem; box-shadow:var(--shadow-sm);">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <span class="pill pill-gold">⏳ Menunggu Respon</span>
              <h4 class="font-serif" style="font-size:1.15rem; margin-top:4px;">Permintaan Les dari ${r.parentName}</h4>
              <div style="font-size:0.75rem; color:var(--mid-c);">Diajukan pada: ${r.createdAt}</div>
            </div>
            <div style="font-size:1.1rem; font-weight:700; color:var(--sage-deep);">${formatRupiah(r.totalFee)}</div>
          </div>
          <div style="background:var(--cream); padding:10px 14px; border-radius:var(--radius-md); margin:0.85rem 0; font-size:0.785rem; line-height:1.6;">
            👤 Nama Murid: <strong>${r.studentName}</strong> (${r.level})<br/>
            📚 Mata Pelajaran: <strong>${r.subject}</strong><br/>
            🗓️ Hari & Jam: <strong>${r.preferredDay} (${r.preferredTimeSlot})</strong> • Metode: <strong>${r.method}</strong><br/>
            📍 Alamat/Area: <strong>${r.parentLocationName}</strong><br/>
            💬 Catatan Orang Tua: <em>"${r.meetingNotes}"</em>
          </div>
          <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
            <button class="btn btn-danger btn-sm" onclick="window.dampingApp.respondRequest('${r.id}', 'DITOLAK')">Tolak</button>
            <button class="btn btn-primary btn-sm" onclick="window.dampingApp.respondRequest('${r.id}', 'DITERIMA')">Terima Permintaan</button>
          </div>
        </div>
      `
        )
        .join('');
    }
  }

  function respondRequest(requestId, status) {
    const req = state.requests.find((r) => r.id === requestId);
    if (!req) return;

    const note = prompt('Catatan untuk orang tua (opsional):', status === 'DITERIMA' ? 'Saya bersedia mengajar sesuai jadwal yang diajukan.' : 'Mohon maaf jadwal pada hari tersebut telah terisi.');
    req.status = status;
    req.tutorResponseNote = note || '';
    req.respondedAt = 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    saveState();
    renderTutorDashboard();
    updateNavBadges();
    alert('Permintaan les telah ' + (status === 'DITERIMA' ? 'DITERIMA' : 'DITOLAK') + '!');
  }

  // Pin Click from Map
  function handlePinClick(type, id) {
    if (type === 'tutor') openTutorProfile(id);
    else if (type === 'bimbel') openBimbelProfile(id);
    else if (type === 'program') openProgramDetail(id);
    else if (type === 'outdoor') openOutdoorDetail(id);
  }

  // 9. Event Listeners Setup
  function initEventListeners() {
    // Navigation tabs
    el.btnTabHome.addEventListener('click', () => switchTab('home'));
    el.btnTabMarketplace.addEventListener('click', () => switchTab('marketplace'));
    el.btnTabParentMode.addEventListener('click', () => switchTab('home'));
    el.btnTabTutorMode.addEventListener('click', () => switchTab('tutor-dashboard'));

    // Gateway A & B actions
    const btnGatewayExplore = document.getElementById('btn-gateway-explore');
    if (btnGatewayExplore) btnGatewayExplore.addEventListener('click', () => switchTab('marketplace'));
    const btnExploreHero = document.getElementById('btn-explore-catalog-hero');
    if (btnExploreHero) btnExploreHero.addEventListener('click', () => switchTab('marketplace'));

    // Gateway A Code submit
    const btnGatewayLogin = document.getElementById('btn-gateway-login');
    const inputGatewayCode = document.getElementById('input-gateway-code');
    btnGatewayLogin.addEventListener('click', () => {
      openParentPortalWithCode(inputGatewayCode.value);
    });
    inputGatewayCode.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') openParentPortalWithCode(inputGatewayCode.value);
    });

    // Preset location change
    el.locationSelect.value = state.filters.location;
    el.locationSelect.addEventListener('change', (e) => {
      state.filters.location = e.target.value;
      saveState();
      renderMarketplace();
    });

    // Category Buttons
    el.filterCategoryBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        el.filterCategoryBtns.forEach((b) => b.classList.remove('active', 'cat-guru', 'cat-bimbel', 'cat-program', 'cat-outdoor'));
        btn.classList.add('active');
        const cat = btn.dataset.category;
        if (cat === 'guru_privat') btn.classList.add('cat-guru');
        else if (cat === 'lembaga_bimbel') btn.classList.add('cat-bimbel');
        else if (cat === 'program_belajar') btn.classList.add('cat-program');
        else if (cat === 'kegiatan_outdoor') btn.classList.add('cat-outdoor');

        state.filters.category = cat;
        saveState();
        renderMarketplace();
      });
    });

    // Filter Dropdowns
    el.filterSubject.addEventListener('change', (e) => {
      state.filters.subject = e.target.value;
      saveState();
      renderMarketplace();
    });
    el.filterTopic.addEventListener('change', (e) => {
      state.filters.topic = e.target.value;
      saveState();
      renderMarketplace();
    });
    el.filterLevel.addEventListener('change', (e) => {
      state.filters.level = e.target.value;
      saveState();
      renderMarketplace();
    });
    el.filterMethod.addEventListener('change', (e) => {
      state.filters.method = e.target.value;
      saveState();
      renderMarketplace();
    });
    el.filterGoal.addEventListener('change', (e) => {
      state.filters.learningGoal = e.target.value;
      saveState();
      renderMarketplace();
    });
    el.filterRateRange.addEventListener('input', (e) => {
      state.filters.maxRate = Number(e.target.value);
      el.rateValueLabel.textContent = formatRupiah(state.filters.maxRate);
      saveState();
      renderMarketplace();
    });
    el.filterSort.addEventListener('change', (e) => {
      state.filters.sortBy = e.target.value;
      saveState();
      renderMarketplace();
    });

    // Reset filters
    el.btnResetFilters.addEventListener('click', () => {
      state.filters = {
        category: 'all',
        location: 'Tebet',
        subject: '',
        topic: '',
        level: '',
        method: '',
        learningGoal: '',
        maxRate: 250000,
        sortBy: 'distance'
      };
      el.locationSelect.value = 'Tebet';
      el.filterSubject.value = '';
      el.filterTopic.value = '';
      el.filterLevel.value = '';
      el.filterMethod.value = '';
      el.filterGoal.value = '';
      el.filterRateRange.value = 250000;
      el.rateValueLabel.textContent = formatRupiah(250000);
      el.filterSort.value = 'distance';
      el.filterCategoryBtns.forEach((b) => b.classList.remove('active', 'cat-guru', 'cat-bimbel', 'cat-program', 'cat-outdoor'));
      el.filterCategoryBtns[0].classList.add('active');
      saveState();
      renderMarketplace();
    });

    // Mobile list vs map toggles
    el.mobileListBtn.addEventListener('click', () => {
      el.mobileListBtn.classList.add('active');
      el.mobileMapBtn.classList.remove('active');
      el.leftColumn.classList.remove('hidden');
      el.rightColumn.classList.add('hidden');
    });
    el.mobileMapBtn.addEventListener('click', () => {
      el.mobileMapBtn.classList.add('active');
      el.mobileListBtn.classList.remove('active');
      el.leftColumn.classList.add('hidden');
      el.rightColumn.classList.remove('hidden');
    });

    // Navbar Quick Triggers
    document.getElementById('nav-btn-tickets').addEventListener('click', openOutdoorTicketsModal);
    document.getElementById('nav-btn-requests').addEventListener('click', openRequestsModal);
    document.getElementById('nav-btn-portal').addEventListener('click', () => openModal('modal-parent-login'));

    // Forms submission
    document.getElementById('form-booking-tutor').addEventListener('submit', handleBookingSubmit);
    document.getElementById('form-inquiry-bimbel').addEventListener('submit', handleBimbelInquirySubmit);
    document.getElementById('form-booking-outdoor').addEventListener('submit', handleOutdoorBookingSubmit);
  }

  // 10. Expose API to window for inline HTML onclick handlers
  window.dampingApp = {
    switchTab,
    openModal,
    closeModal,
    openTutorProfile,
    openBookingModal,
    openBimbelProfile,
    openBimbelInquiry,
    openProgramDetail,
    inquireProgram,
    openOutdoorDetail,
    openOutdoorBooking,
    openOutdoorTicketsModal,
    cancelOutdoorTicket,
    openPortfolioDetail,
    openParentPortalWithCode,
    openRequestsModal,
    respondRequest,
    handlePinClick
  };

  // 11. Initial Application Boot
  document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    switchTab(state.activeTab || 'home');
  });
})();

/**
 * netflix.js - Interactive Netflix Streaming Experience for Shreyas's Portfolio
 * Features:
 * - Web Audio API synthesizer for the iconic Netflix "Ta-Dum" chime
 * - Interactive Project Details Modal with backdrop, specs & live links
 * - Real-time project search and filtering
 * - Smooth horizontal carousel row scroll controls
 * - Dynamic hero banner rotation & sound toggle
 * - "My List" interactive bookmarking
 */

(function () {
  'use strict';

  // =========================================================================
  // PROJECT CATALOG DATABASE
  // =========================================================================
  const PROJECTS_DB = {
    'ccj': {
      id: 'ccj',
      title: 'CouponCodeJunction',
      badge: 'TOP 10 #1',
      match: '99% Match',
      year: '2024',
      rating: 'ALL',
      duration: 'Full-Stack Web App',
      heroImage: './img/ccj.png',
      thumbImage: './img/ccj.png',
      liveUrl: 'https://shreyas002-6.github.io/CCJ/',
      githubUrl: 'https://github.com/Shreyas002-6/CCJ',
      tags: ['Coupon Aggregator', 'Vanilla JS', 'Responsive UI', 'Search Algorithms'],
      logline: 'An intelligent real-time deal discovery and coupon verification platform engineered to optimize consumer savings across hundreds of digital storefronts.',
      description: 'CouponCodeJunction solves the hassle of broken and expired promo codes by curating and algorithmically validating coupons in real time. Designed with a lightweight, ultra-responsive frontend and intuitive categorized navigation.',
      specs: {
        frontend: 'HTML5, CSS3, JavaScript (ES6+)',
        backend: 'Client-side Search & Cache Engine',
        highlights: 'Instant live search, categorized store filters, zero-dependency fast load'
      }
    },
    'la': {
      id: 'la',
      title: 'LightAlgo',
      badge: 'TOP 10 #2',
      match: '98% Match',
      year: '2024',
      rating: 'PG-13',
      duration: 'Interactive Suite',
      heroImage: './img/LA.png',
      thumbImage: './img/LA.png',
      liveUrl: 'https://shreyas002-6.github.io/LightAlgo/',
      githubUrl: 'https://github.com/Shreyas002-6/LightAlgo',
      tags: ['Algorithm Visualizer', 'Data Structures', 'Canvas / DOM', 'EdTech'],
      logline: 'An educational visualizer bringing complex algorithms and graph traversals to life through dynamic step-by-step animations.',
      description: 'LightAlgo bridges theoretical computer science and intuitive learning. Users can generate custom data arrays, adjust execution speeds in real time, and visually observe sorting algorithms (Bubble, Quick, Merge) and pathfinding.',
      specs: {
        frontend: 'HTML5 Canvas, Vanilla JavaScript, CSS Keyframes',
        backend: 'Pure Algorithmic Logic',
        highlights: 'Variable execution speed control, real-time comparison counters, audio-visual feedback'
      }
    },
    'kg': {
      id: 'kg',
      title: 'KiloGram',
      badge: 'TOP 10 #3',
      match: '97% Match',
      year: '2023',
      rating: '16+',
      duration: 'Social Media Platform',
      heroImage: './img/KG.png',
      thumbImage: './img/KG.png',
      liveUrl: 'https://github.com/Shreyas002-6/socialApp',
      githubUrl: 'https://github.com/Shreyas002-6/socialApp',
      tags: ['Social Network', 'Full Stack', 'REST API', 'Authentication'],
      logline: 'A modern social media application featuring media sharing, engagement feeds, user profiles, and interactive post reactions.',
      description: 'KiloGram is a comprehensive full-stack social networking application modeled after Instagram. It features user authentication, secure image uploads, real-time feed updates, likes, and community discussions.',
      specs: {
        frontend: 'Modern Responsive Web UI',
        backend: 'Node.js, Express, REST APIs',
        highlights: 'User authorization, image management, dynamic social feed'
      }
    },
    'wi': {
      id: 'wi',
      title: 'WatchIt',
      badge: 'POPULAR',
      match: '95% Match',
      year: '2023',
      rating: 'ALL',
      duration: 'Entertainment Portal',
      heroImage: './img/WI.png',
      thumbImage: './img/WI.png',
      liveUrl: 'https://github.com/Shreyas002-6',
      githubUrl: 'https://github.com/Shreyas002-6',
      tags: ['Streaming UI', 'Media Player', 'JavaScript'],
      logline: 'A sleek streaming and video catalog concept providing seamless content browsing and playback control.',
      description: 'WatchIt provides an intuitive interface for discovering and cataloging media releases. Built with a focus on fluid transitions, responsive carousels, and minimal loading states.',
      specs: {
        frontend: 'HTML5, CSS3, JavaScript',
        backend: 'Movie / Media Metadata API',
        highlights: 'Responsive video container, category filters'
      }
    },
    'fc': {
      id: 'fc',
      title: 'FarmConnect',
      badge: 'INNOVATION',
      match: '96% Match',
      year: '2023',
      rating: 'ALL',
      duration: 'Agri-Tech Platform',
      heroImage: './img/FC.jpg',
      thumbImage: './img/FC.jpg',
      liveUrl: 'https://github.com/Shreyas002-6',
      githubUrl: 'https://github.com/Shreyas002-6',
      tags: ['AgriTech', 'Marketplace', 'Social Impact'],
      logline: 'Connecting farmers directly with consumers and local markets to eliminate middleman markups and ensure fair agricultural pricing.',
      description: 'FarmConnect is an initiative focused on digital empowerment in agriculture. Farmers can list crops, check prevailing market rates, and communicate directly with buyers.',
      specs: {
        frontend: 'Mobile-first Web Interface',
        backend: 'PHP / Node.js Backend',
        highlights: 'Direct buyer-farmer marketplace, localized pricing index'
      }
    },
    'cr': {
      id: 'cr',
      title: 'CodeRadar',
      badge: 'DEV TOOLS',
      match: '94% Match',
      year: '2023',
      rating: 'ALL',
      duration: 'Developer Utility',
      heroImage: './img/CR.png',
      thumbImage: './img/CR.png',
      liveUrl: 'https://github.com/Shreyas002-6',
      githubUrl: 'https://github.com/Shreyas002-6',
      tags: ['Code Analysis', 'Developer Tool', 'Productivity'],
      logline: 'A code intelligence utility designed to monitor repository metrics, track coding velocity, and visualize syntax structures.',
      description: 'CodeRadar analyzes code complexity and tracks development trends across projects, helping developers maintain clean architecture.',
      specs: {
        frontend: 'Dashboard Analytics UI',
        backend: 'Code Parsing Scripts',
        highlights: 'Repository statistics, visual syntax inspector'
      }
    },
    'cm': {
      id: 'cm',
      title: 'Canteen Management System',
      badge: 'ENTERPRISE',
      match: '93% Match',
      year: '2022',
      rating: 'ALL',
      duration: 'POS & Order Management',
      heroImage: './img/CM.png',
      thumbImage: './img/CM.png',
      liveUrl: 'https://github.com/Shreyas002-6',
      githubUrl: 'https://github.com/Shreyas002-6',
      tags: ['POS', 'Order Processing', 'Inventory', 'SQL'],
      logline: 'A digital order placement and inventory tracking system streamlining institutional cafeteria workflows.',
      description: 'Built to replace paper tokens in college cafeterias, this system allows students to view daily menus, place advance orders, and lets administrators track food inventory in real time.',
      specs: {
        frontend: 'Interactive Menu UI',
        backend: 'PHP & MySQL Database',
        highlights: 'Real-time billing, kitchen token queue, inventory warnings'
      }
    },
    'ccjn': {
      id: 'ccjn',
      title: 'CCJN Portal',
      badge: 'COLLEGE #1',
      match: '94% Match',
      year: '2023',
      rating: 'ALL',
      duration: 'Campus Network',
      heroImage: './img/ccjn.png',
      thumbImage: './img/ccjn.png',
      liveUrl: 'https://github.com/Shreyas002-6',
      githubUrl: 'https://github.com/Shreyas002-6',
      tags: ['Campus Portal', 'Student Hub', 'Database'],
      logline: 'A centralized portal for academic notices, study materials, and peer communication for engineering students.',
      description: 'CCJN provides a unified dashboard for college announcements, lecture notes, timetable updates, and departmental communication.',
      specs: {
        frontend: 'Bootstrap UI, JavaScript',
        backend: 'Relational Database Management System',
        highlights: 'Role-based access (Faculty / Student), document distribution'
      }
    },
    'mk': {
      id: 'mk',
      title: 'MediKart',
      badge: 'HEALTHCARE',
      match: '95% Match',
      year: '2022',
      rating: 'ALL',
      duration: 'E-Pharmacy Solution',
      heroImage: './img/MK.png',
      thumbImage: './img/MK.png',
      liveUrl: 'https://github.com/Shreyas002-6',
      githubUrl: 'https://github.com/Shreyas002-6',
      tags: ['Healthcare', 'E-Commerce', 'Prescription Verification'],
      logline: 'An online healthcare pharmacy portal enabling prescription uploads and doorstep medical supplies delivery.',
      description: 'MediKart simplifies emergency medication delivery with prescription validation, categorized medicine search, and order tracking.',
      specs: {
        frontend: 'Responsive Clean UI',
        backend: 'Database & Inventory Logic',
        highlights: 'Prescription upload system, categorized medical supplies'
      }
    },
    'ps': {
      id: 'ps',
      title: 'PizzaShop',
      badge: 'FOOD & BEV',
      match: '92% Match',
      year: '2022',
      rating: 'ALL',
      duration: 'Food Ordering App',
      heroImage: './img/PS.png',
      thumbImage: './img/PS.png',
      liveUrl: 'https://github.com/Shreyas002-6',
      githubUrl: 'https://github.com/Shreyas002-6',
      tags: ['E-Commerce', 'Cart System', 'Interactive Ordering'],
      logline: 'An interactive pizza ordering platform with customized toppings selector, live cart calculation, and delivery checkout.',
      description: 'PizzaShop offers an appetite-inducing ordering experience where users can customize pizza crusts, sauces, and toppings with instant price recalculation.',
      specs: {
        frontend: 'HTML5, CSS3, DOM Cart Logic',
        backend: 'Order Session Management',
        highlights: 'Live dynamic cart total, interactive topping builder'
      }
    }
  };

  // =========================================================================
  // AUDIO SYNTHESIZER: ICONIC NETFLIX "TA-DUM"
  // =========================================================================
  let audioCtx = null;
  let isSoundMuted = false;

  function playNetflixSound() {
    if (isSoundMuted) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!audioCtx) {
        audioCtx = new AudioContext();
      }

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;

      // 1. Deep cinematic bass strike (D2 ~ 73.4Hz)
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(73.4, now);
      osc1.frequency.exponentialRampToValueAtTime(36.7, now + 1.2);

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.35, now + 0.08);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

      // Low pass filter
      const filter1 = audioCtx.createBiquadFilter();
      filter1.type = 'lowpass';
      filter1.frequency.setValueAtTime(260, now);
      filter1.frequency.exponentialRampToValueAtTime(60, now + 1.4);

      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(audioCtx.destination);

      osc1.start(now);
      osc1.stop(now + 1.5);

      // 2. The second "Dum" hit (D3 ~ 146.8Hz) - slightly offset
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(146.8, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime(73.4, now + 1.4);

      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.setValueAtTime(0.001, now + 0.12);
      gain2.gain.linearRampToValueAtTime(0.45, now + 0.22);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      const filter2 = audioCtx.createBiquadFilter();
      filter2.type = 'lowpass';
      filter2.frequency.setValueAtTime(450, now + 0.12);
      filter2.frequency.exponentialRampToValueAtTime(90, now + 1.6);

      osc2.connect(filter2);
      filter2.connect(gain2);
      gain2.connect(audioCtx.destination);

      osc2.start(now + 0.12);
      osc2.stop(now + 1.8);

      // 3. Subtle harmonic shimmer
      const osc3 = audioCtx.createOscillator();
      const gain3 = audioCtx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(293.66, now + 0.15); // D4
      gain3.gain.setValueAtTime(0.001, now + 0.15);
      gain3.gain.linearRampToValueAtTime(0.12, now + 0.25);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc3.connect(gain3);
      gain3.connect(audioCtx.destination);

      osc3.start(now + 0.15);
      osc3.stop(now + 1.2);

    } catch (e) {
      console.warn('Audio synthesis not supported or blocked:', e);
    }
  }

  // =========================================================================
  // MODAL MANAGER
  // =========================================================================
  const NetflixApp = {
    modalEl: null,
    currentHeroId: 'ccj',

    init: function () {
      this.modalEl = document.getElementById('netflixModal');
      this.bindNavbarScroll();
      this.bindHeroControls();
      this.bindCarouselControls();
      this.bindCardInteractions();
      this.bindSearch();
      this.bindModalEvents();
      this.bindSoundToggle();
    },

    bindNavbarScroll: function () {
      const header = document.querySelector('header');
      if (!header) return;

      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          header.classList.add('nav-scrolled');
        } else {
          header.classList.remove('nav-scrolled');
        }
      });
    },

    bindHeroControls: function () {
      const playBtn = document.getElementById('heroPlayBtn');
      const infoBtn = document.getElementById('heroInfoBtn');

      if (playBtn) {
        playBtn.addEventListener('click', () => {
          playNetflixSound();
          const p = PROJECTS_DB[this.currentHeroId];
          if (p && p.liveUrl) {
            window.open(p.liveUrl, '_blank');
          }
        });
      }

      if (infoBtn) {
        infoBtn.addEventListener('click', () => {
          playNetflixSound();
          this.openModal(this.currentHeroId);
        });
      }
    },

    bindSoundToggle: function () {
      const soundBtn = document.getElementById('heroSoundBtn');
      if (!soundBtn) return;

      soundBtn.addEventListener('click', () => {
        isSoundMuted = !isSoundMuted;
        if (isSoundMuted) {
          soundBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
          soundBtn.setAttribute('title', 'Sound: Muted');
        } else {
          soundBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
          soundBtn.setAttribute('title', 'Sound: Enabled');
          playNetflixSound();
        }
      });
    },

    bindCarouselControls: function () {
      const rows = document.querySelectorAll('.project-row');
      rows.forEach(row => {
        const slider = row.querySelector('.row-slider');
        const prevBtn = row.querySelector('.slider-handle.prev');
        const nextBtn = row.querySelector('.slider-handle.next');

        if (!slider) return;

        if (prevBtn) {
          prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -slider.clientWidth * 0.75, behavior: 'smooth' });
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: slider.clientWidth * 0.75, behavior: 'smooth' });
          });
        }
      });
    },

    bindCardInteractions: function () {
      const cards = document.querySelectorAll('.card-netflix');
      cards.forEach(card => {
        const id = card.getAttribute('data-project-id');

        card.addEventListener('click', (e) => {
          // If clicked on quick-link or action inside
          if (e.target.closest('.card-btn-play')) {
            e.stopPropagation();
            playNetflixSound();
            const p = PROJECTS_DB[id];
            if (p && p.liveUrl) window.open(p.liveUrl, '_blank');
            return;
          }

          if (e.target.closest('.card-btn-list')) {
            e.stopPropagation();
            const btn = e.target.closest('.card-btn-list');
            btn.classList.toggle('in-list');
            btn.innerHTML = btn.classList.contains('in-list') ? '<i class="fas fa-check"></i>' : '<i class="fas fa-plus"></i>';
            return;
          }

          e.preventDefault();
          playNetflixSound();
          this.openModal(id);
        });
      });
    },

    openModal: function (projectId) {
      const p = PROJECTS_DB[projectId] || PROJECTS_DB['ccj'];
      if (!this.modalEl) return;

      // Populate Modal Fields
      document.getElementById('modalTitle').textContent = p.title;
      document.getElementById('modalMatch').textContent = p.match;
      document.getElementById('modalYear').textContent = p.year;
      document.getElementById('modalRating').textContent = p.rating;
      document.getElementById('modalDuration').textContent = p.duration;
      document.getElementById('modalLogline').textContent = p.logline;
      document.getElementById('modalDescription').textContent = p.description;

      // Backdrop Image
      const backdrop = document.getElementById('modalBackdrop');
      if (backdrop) {
        backdrop.style.backgroundImage = `url('${p.heroImage}')`;
      }

      // Tech Tags
      const tagsContainer = document.getElementById('modalTags');
      if (tagsContainer) {
        tagsContainer.innerHTML = p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
      }

      // Specs
      const specsContainer = document.getElementById('modalSpecs');
      if (specsContainer && p.specs) {
        specsContainer.innerHTML = `
          <div><strong>Frontend:</strong> ${p.specs.frontend}</div>
          <div><strong>Architecture:</strong> ${p.specs.backend}</div>
          <div><strong>Key Highlights:</strong> ${p.specs.highlights}</div>
        `;
      }

      // Buttons
      const modalPlay = document.getElementById('modalPlayBtn');
      if (modalPlay) {
        modalPlay.onclick = () => window.open(p.liveUrl || p.githubUrl, '_blank');
      }

      const modalGithub = document.getElementById('modalGithubBtn');
      if (modalGithub) {
        modalGithub.onclick = () => window.open(p.githubUrl, '_blank');
      }

      // Show Modal
      this.modalEl.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    },

    closeModal: function () {
      if (!this.modalEl) return;
      this.modalEl.classList.remove('is-open');
      document.body.style.overflow = '';
    },

    bindModalEvents: function () {
      const closeBtn = document.getElementById('modalCloseBtn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.closeModal());
      }

      if (this.modalEl) {
        this.modalEl.addEventListener('click', (e) => {
          if (e.target === this.modalEl || e.target.classList.contains('modal-backdrop-layer')) {
            this.closeModal();
          }
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modalEl && this.modalEl.classList.contains('is-open')) {
          this.closeModal();
        }
      });
    },

    bindSearch: function () {
      const searchBtn = document.getElementById('searchToggleBtn');
      const searchBox = document.getElementById('searchBox');
      const searchInput = document.getElementById('searchInput');

      if (!searchBtn || !searchBox || !searchInput) return;

      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
          searchInput.focus();
        } else {
          searchInput.value = '';
          this.filterCards('');
        }
      });

      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        this.filterCards(query);
      });
    },

    filterCards: function (query) {
      const cards = document.querySelectorAll('.card-netflix');
      cards.forEach(card => {
        const id = card.getAttribute('data-project-id');
        const p = PROJECTS_DB[id];
        if (!query) {
          card.style.display = '';
          return;
        }

        if (p) {
          const matchTitle = p.title.toLowerCase().includes(query);
          const matchTags = p.tags.some(t => t.toLowerCase().includes(query));
          const matchLogline = p.logline.toLowerCase().includes(query);

          if (matchTitle || matchTags || matchLogline) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        }
      });
    }
  };

  // Expose to window and run on DOM ready
  window.NetflixPortfolio = NetflixApp;
  document.addEventListener('DOMContentLoaded', () => NetflixApp.init());
})();

/* ----------------------------------------------------------------------
   ✅ Animated Counter on Scroll
---------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateCounters() {
    if (animated) return;
    const section = document.getElementById('stats');
    if (!section) return;

    const sectionPos = section.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos) {
      counters.forEach(counter => {
        let target = +counter.getAttribute('data-count');
        let count = 0;
        let speed = target / 60;

        let update = setInterval(() => {
          count += speed;
          if (count >= target) {
            counter.innerText = target.toLocaleString();
            clearInterval(update);
          } else {
            counter.innerText = Math.floor(count).toLocaleString();
          }
        }, 20);
      });
      animated = true;
    }
  }

  window.addEventListener('scroll', animateCounters);
}

/* ----------------------------------------------------------------------
   🌍 Reach Map Script (India-first; left hover box)
---------------------------------------------------------------------- */
function initReachMap() {
  const mapArea     = document.getElementById('mapArea');
  const mapTypeBtns = document.querySelectorAll('.map-type-btn');
  const filterBtns  = document.querySelectorAll('.reach-filter-btn');
  const hoverBox    = document.getElementById('hoverBox');
  const hoverName   = document.getElementById('hoverName');

  if (!mapArea) return;

  let currentMap = 'india'; // default
  let currentFilter = 'b2b';

  // Your presence sets
  const data = {
    india: {
      b2b:   ['IN-KA','IN-TN','IN-AP','IN-TG','IN-MH','IN-UP','IN-WB','IN-AS'],
      sales: ['IN-TN','IN-KA','IN-MH']
    },
    world: {
      b2b:   ['IN','AE','AU'],
      sales: ['US','FR']
    }
  };

  // Colors
  const COLOR_B2B   = '#F07235';
  const COLOR_SALES = '#2E8B57';
  const BASE_FILL   = '#ffffff';

  // Load SVG
  async function loadMap(type) {
    const mapPath = type === 'world' ? 'assets/maps/world.svg' : 'assets/maps/india.svg';
    try {
      const res = await fetch(mapPath);
      if (!res.ok) throw new Error('⚠️ Map not found or blocked');
      const svgText = await res.text();
      mapArea.innerHTML = svgText;
      applyHighlights();
      wireHover();
    } catch (e) {
      console.error(e);
      mapArea.innerHTML = `<p style="color:red;font-weight:600;">${e.message}</p>`;
    }
  }

  // Reset all shapes to base white and default classes
  function resetMap(svg) {
    svg.querySelectorAll('path,polygon,rect').forEach(s => {
      s.style.fill = BASE_FILL;               // ensure previous colored shapes reset
      s.classList.remove('highlight-b2b','highlight-sales','hovered','region');
      s.classList.add('region');
    });
    // also clear classes on groups
    svg.querySelectorAll('g').forEach(g => {
      g.classList.remove('highlight-b2b','highlight-sales','hovered','region');
      g.classList.add('region');
    });
  }

  // Color one node (group or single shape)
  function colorNode(node, color) {
    const shapes = node.matches('path,polygon,rect')
      ? [node]
      : node.querySelectorAll('path,polygon,rect');
    shapes.forEach(s => {
      s.style.fill = color;
      s.classList.add('region');
    });
  }

  // Apply highlights according to current filter
  function applyHighlights() {
    const svg = mapArea.querySelector('svg');
    if (!svg) return;

    resetMap(svg);

    const ids = data[currentMap][currentFilter];
    const color = currentFilter === 'b2b' ? COLOR_B2B : COLOR_SALES;

    ids.forEach(id => {
      const owner = svg.getElementById(id);
      if (!owner) return;

      owner.classList.add(currentFilter === 'b2b' ? 'highlight-b2b' : 'highlight-sales');
      colorNode(owner, color);
    });
  }

  // Get readable name from ID (owner with id preferred)
  function getRegionNameFrom(el) {
    const owner = el.closest('[id]') || el;
    const id = owner.id || el.id || '';
    const names = {
      'IN-KA':'Karnataka','IN-TN':'Tamil Nadu','IN-AP':'Andhra Pradesh','IN-TG':'Telangana',
      'IN-MH':'Maharashtra','IN-UP':'Uttar Pradesh','IN-WB':'West Bengal','IN-AS':'Assam',
      'IN':'India','AE':'UAE','AU':'Australia','US':'United States','FR':'France'
    };
    return names[id] || id || 'Region';
  }

  // Add/remove hovered to all shapes of the owner with id
  function setHovered(el, on=true) {
    const owner = el.closest('[id]') || el;
    const shapes = owner.matches('path,polygon,rect')
      ? [owner]
      : owner.querySelectorAll('path,polygon,rect');
    shapes.forEach(s => s.classList.toggle('hovered', on));
  }

  // Hover behavior (left box)
  function wireHover() {
    const svg = mapArea.querySelector('svg');
    if (!svg) return;

    svg.addEventListener('mouseover', e => {
      const target = e.target.closest('.region');
      if (!target) return;

      const owner = target.closest('[id]') || target;
      // only react if this owner (or its shapes) are highlighted
      const isHighlighted =
        owner.classList.contains('highlight-b2b') ||
        owner.classList.contains('highlight-sales') ||
        target.classList.contains('highlight-b2b') ||
        target.classList.contains('highlight-sales');

      if (!isHighlighted) return;

      setHovered(target, true);
      if (hoverBox && hoverName) {
        hoverName.textContent = getRegionNameFrom(target);
        hoverBox.classList.remove('hidden');
        // allow layout to apply before animating
        requestAnimationFrame(() => hoverBox.classList.add('show'));
      }
    });

    svg.addEventListener('mouseout', e => {
      const target = e.target.closest('.region');
      if (!target) return;
      setHovered(target, false);

      if (hoverBox && hoverName) {
        hoverBox.classList.remove('show');
        setTimeout(() => {
          // hide completely after fade-out
          if (!hoverBox.classList.contains('show')) {
            hoverBox.classList.add('hidden');
            hoverName.textContent = '';
          }
        }, 250);
      }
    });
  }

  // Toggles
  mapTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mapTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMap = btn.dataset.map;
      loadMap(currentMap);
    });
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      applyHighlights();
    });
  });

  // Initial
  loadMap(currentMap);
}

/* ----------------------------------------------------------------------
   🏆 Awards Carousel
---------------------------------------------------------------------- */
function initAwardsCarousel() {
  const track = document.querySelector('.awards-track');
  const nextBtn = document.getElementById('awardNext');
  const prevBtn = document.getElementById('awardPrev');

  if (!track || !nextBtn || !prevBtn) return;

  let index = 0;
  const cards = document.querySelectorAll('.award-card');
  const totalCards = cards.length;

  cards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  function moveNext() {
    index++;
    if (index > totalCards) {
      index = 0;
      track.style.transition = 'none';
      track.style.transform = `translateX(0)`;
      setTimeout(() => (track.style.transition = 'transform 0.6s ease'), 20);
    } else {
      track.style.transform = `translateX(-${index * (cards[0].offsetWidth + 30)}px)`;
    }
  }

  function movePrev() {
    if (index === 0) {
      index = totalCards;
      track.style.transition = 'none';
      track.style.transform = `translateX(-${index * (cards[0].offsetWidth + 30)}px)`;
      setTimeout(() => (track.style.transition = 'transform 0.6s ease'), 20);
    } else {
      index--;
      track.style.transform = `translateX(-${index * (cards[0].offsetWidth + 30)}px)`;
    }
  }

  let autoSlide = setInterval(() => moveNext(), 4000);

  nextBtn.addEventListener('click', () => {
    clearInterval(autoSlide);
    moveNext();
    autoSlide = setInterval(() => moveNext(), 4000);
  });

  prevBtn.addEventListener('click', () => {
    clearInterval(autoSlide);
    movePrev();
    autoSlide = setInterval(() => moveNext(), 4000);
  });

  track.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.addEventListener('mouseleave', () => (autoSlide = setInterval(() => moveNext(), 4000)));
}

/* ----------------------------------------------------------------------
   🚀 Initialize Everything
---------------------------------------------------------------------- */
function init() {
  initCounters();
  initReachMap();
  initAwardsCarousel();
  console.log('✅ All scripts initialized successfully');
}

document.addEventListener('DOMContentLoaded', init);

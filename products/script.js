let slideInterval, currentSlide = 0, imgs = [], dots = [];

/* ===== Crop Slider Scroll + Activation ===== */
const cropSlider = document.getElementById("cropSlider");
const scrollLeftBtn = document.getElementById("scrollLeft");
const scrollRightBtn = document.getElementById("scrollRight");

if (cropSlider && scrollLeftBtn && scrollRightBtn) {
  scrollLeftBtn.addEventListener("click", () => {
    cropSlider.scrollBy({ left: -220, behavior: "smooth" });
  });
  scrollRightBtn.addEventListener("click", () => {
    cropSlider.scrollBy({ left: 220, behavior: "smooth" });
  });

  // Click crop circle to switch section
  document.querySelectorAll(".crop-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".crop-item").forEach(c => c.classList.remove("active"));
      item.classList.add("active");
      const crop = item.dataset.crop;
      document.querySelectorAll(".hybrid-section").forEach(sec => {
        sec.classList.toggle("active", sec.id === crop);
      });
      // Scroll to section
      const activeSec = document.getElementById(crop);
      if (activeSec) activeSec.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ===== Hybrid Data (match card titles exactly) ===== */
const hybridData = {
  "Chilli|Bullet Chilli Trishul": {
    images: [
      "images/chilli/Bullet Chilli Trishul/Bullet Chilli Trishul1.jpg",
      "images/chilli/Bullet Chilli Trishul/Bullet Chilli Trishul2.jpg",
      "images/chilli/Bullet Chilli Trishul/Bullet Chilli Trishul3.jpg"
    ],
    desc: [
      "High-yielding hybrid with shiny dark-green pods.",
      "Resistant to leaf curl & fruit rot.",
      "Strong plant vigor with uniform fruiting.",
      "Suitable for fresh and dry markets.",
      "Performs reliably in tropical climates."
    ],
    regions: ["Karnataka", "Telangana", "Andhra Pradesh", "Tamil Nadu"],
    youtube: "https://www.youtube.com/watch?v=EXAMPLE1"
  },

  "Chilli|Chilli hpt-1047-Green Fruits": {
    images: [
      "images/chilli/Chilli hpt-1047-Green Fruits/Chilli hpt-1047-Green Fruits1.jpg",
      "images/chilli/Chilli hpt-1047-Green Fruits/Chilli hpt-1047-Green Fruits2.jpg",
      "images/chilli/Chilli hpt-1047-Green Fruits/Chilli hpt-1047-Green Fruits3.jpg"
    ],
    desc: [
      "Bright red fruits with high pungency.",
      "Excellent for dry chilli & export.",
      "Early maturity with consistent yield.",
      "Uniform fruit length and thickness.",
      "Good adaptability across seasons."
    ],
    regions: ["Maharashtra", "Karnataka", "Gujarat", "Madhya Pradesh"],
    youtube: "https://www.youtube.com/watch?v=EXAMPLE2"
  },

  "Chilli|Chilli Trisha": {
    images: [
      "images/chilli/Chilli Trisha/Chilli Trisha1.jpg",
      "images/chilli/Chilli Trisha/Chilli Trisha2.jpg",
      "images/chilli/Chilli Trisha/Chilli Trisha3.jpg"
    ],
    desc: [
      "Bright red fruits with high pungency.",
      "Excellent for dry chilli & export.",
      "Early maturity with consistent yield.",
      "Uniform fruit length and thickness.",
      "Good adaptability across seasons."
    ],
    regions: ["Maharashtra", "Karnataka", "Gujarat", "Madhya Pradesh"],
    youtube: "https://www.youtube.com/watch?v=EXAMPLE2"
  },

  "Chilli|Chilli vs 1053-p": {
    images: [
      "images/chilli/Chilli vs 1053-p/Chilli vs 1053-p1.jpg",
      "images/chilli/Chilli vs 1053-p/Chilli vs 1053-p2.jpg",
      "images/chilli/Chilli vs 1053-p/Chilli vs 1053-p3.jpg"
    ],
    desc: [
      "Bright red fruits with high pungency.",
      "Excellent for dry chilli & export.",
      "Early maturity with consistent yield.",
      "Uniform fruit length and thickness.",
      "Good adaptability across seasons."
    ],
    regions: ["Maharashtra", "Karnataka", "Gujarat", "Madhya Pradesh"],
    youtube: "https://www.youtube.com/watch?v=EXAMPLE2"
  },

  "Chilli|Chilli vs 9955": {
    images: [
      "images/chilli/Chilli vs 9955/Chilli vs 9955.1.jpg",
      "images/chilli/Chilli vs 9955/Chilli vs 9955.2.jpg",
      "images/chilli/Chilli vs 9955/Chilli vs 9955.3.jpg"
    ],
    desc: [
      "Bright red fruits with high pungency.",
      "Excellent for dry chilli & export.",
      "Early maturity with consistent yield.",
      "Uniform fruit length and thickness.",
      "Good adaptability across seasons."
    ],
    regions: ["Maharashtra", "Karnataka", "Gujarat", "Madhya Pradesh"],
    youtube: "https://www.youtube.com/watch?v=EXAMPLE2"
  },

  "Chilli|Chilli-hpt-1014-Dark Green Fruits": {
    images: [
      "images/chilli/Chilli-hpt-1014-Dark Green Fruits/Chilli-hpt-1014-Dark Green Fruits1.jpg",
      "images/chilli/Chilli-hpt-1014-Dark Green Fruits/Chilli-hpt-1014-Dark Green Fruits2.jpg",
      "images/chilli/Chilli-hpt-1014-Dark Green Fruits/Chilli-hpt-1014-Dark Green Fruits3.jpg"
    ],
    desc: [
      "Dark green fruits with glossy appearance.",
      "Good disease tolerance under field conditions.",
      "Strong canopy with uniform setting.",
      "Suitable for both fresh and dry markets.",
      "Performs across multiple regions."
    ],
    regions: ["Maharashtra", "Karnataka", "Gujarat", "Madhya Pradesh"],
    youtube: "https://www.youtube.com/watch?v=EXAMPLE2"
  },

  "Chilli|Chilli-hpt-1056-Green Fruits": {
    images: [
      "images/chilli/Chilli-hpt-1056-Green Fruits/Chilli-hpt-1056-Green Fruits1.jpg",
      "images/chilli/Chilli-hpt-1056-Green Fruits/Chilli-hpt-1056-Green Fruits2.jpg",
      "images/chilli/Chilli-hpt-1056-Green Fruits/Chilli-hpt-1056-Green Fruits3.jpg"
    ],
    desc: [
      "Deep green fruits with attractive sheen.",
      "Stable yield with good shelf life.",
      "Early and uniform maturity.",
      "Good tolerance to foliar issues.",
      "Widely adaptable."
    ],
    regions: ["Maharashtra", "Karnataka", "Gujarat", "Madhya Pradesh"],
    youtube: "https://www.youtube.com/watch?v=EXAMPLE2"
  },

  "Chilli|Chilli-vs 9966": {
    images: [
      "images/chilli/Chilli-vs 9966/Chilli-vs 9966.1.jpg",
      "images/chilli/Chilli-vs 9966/Chilli-vs 9966.2.jpg",
      "images/chilli/Chilli-vs 9966/Chilli-vs 9966.3.jpg"
    ],
    desc: [
      "Strong plant vigor; heat stress tolerant.",
      "Continuous fruit setting for longer harvest.",
      "Glossy fruits with good shelf life.",
      "Tolerant to common foliar diseases.",
      "Performs well under tropical humidity."
    ],
    regions: ["Andhra Pradesh", "Odisha", "West Bengal"],
    youtube: "https://www.youtube.com/watch?v=EXAMPLE3"
  },

  "Chilli|Tarak": {
    images: [
      "images/chilli/Tarak/Tarak1.jpg",
      "images/chilli/Tarak/Tarak2.jpg",
      "images/chilli/Tarak/Tarak3.jpg"
    ],
    desc: [
      "High pungency with attractive color.",
      "Early picking and consistent setting.",
      "Strong branching habit.",
      "Uniform fruit length.",
      "Great for both fresh & dry markets."
    ],
    regions: ["Maharashtra", "Karnataka", "Gujarat", "Madhya Pradesh"],
    youtube: "https://www.youtube.com/watch?v=EXAMPLE2"
  },

  "Chilli|Tarini": {
    images: [
      "images/chilli/Tarini/Tarini1.jpg",
      "images/chilli/Tarini/Tarini2.jpg",
      "images/chilli/Tarini/Tarini3.jpg"
    ],
    desc: [
      "Attractive fruit color with good yield.",
      "Tolerant to common field stress.",
      "Uniform fruiting with long picking window.",
      "Keeps quality in transport.",
      "Performs well in multiple geographies."
    ],
    regions: ["Maharashtra", "Karnataka", "Gujarat", "Madhya Pradesh"],
    youtube: "https://www.youtube.com/watch?v=EXAMPLE2"
  },

  "Chilli|Tiger": {
    images: [
      "images/chilli/Tiger/Tiger1.jpg",
      "images/chilli/Tiger/Tiger2.jpg",
      "images/chilli/Tiger/Tiger3.jpg"
    ],
    desc: [
      "Strong vigor with bold fruits.",
      "Good tolerance to foliar issues.",
      "Stable yield across seasons.",
      "Attractive color and sheen.",
      "Ideal for fresh market."
    ],
    regions: ["Maharashtra", "Karnataka", "Gujarat", "Madhya Pradesh"],
    youtube: "https://www.youtube.com/watch?v=EXAMPLE2"
  },

  "Chilli|Toofan": {
    images: [
      "images/chilli/Toofan/Toofan1.jpg",
      "images/chilli/Toofan/Toofan2.jpg",
      "images/chilli/Toofan/Toofan3.jpg"
    ],
    desc: [
      "High-yield hybrid with uniform fruits.",
      "Performs well under heat stress.",
      "Suitable for both green & dry use.",
      "Good transport tolerance.",
      "Long harvest window."
    ],
    regions: ["Maharashtra", "Karnataka", "Gujarat", "Madhya Pradesh"],
    youtube: "https://www.youtube.com/watch?v=EXAMPLE2"
  },

  "Chilli|Tulasi": {
    images: [
      "images/chilli/Tulasi/Tulasi1.jpg",
      "images/chilli/Tulasi/Tulasi2.jpg",
      "images/chilli/Tulasi/Tulasi3.jpg"
    ],
    desc: [
      "Attractive fruits with good pungency.",
      "Strong plant vigor and branching.",
      "Uniform size and shape.",
      "Performs in multiple soils.",
      "Great keeping quality."
    ],
    regions: ["Maharashtra", "Karnataka", "Gujarat", "Madhya Pradesh"],
    youtube: "https://www.youtube.com/watch?v=EXAMPLE2"
  }
};

/* ===== Modal Open ===== */
function openModal(crop, hybrid) {
  const key = `${crop}|${hybrid}`;
  const data = hybridData[key];
  if (!data) return;

  const modal = document.getElementById("modal");
  const slideshow = document.getElementById("slideshow");
  const dotsContainer = document.getElementById("dots");

  // Title
  document.getElementById("modal-title").innerText = hybrid;

  // Clear old content
  slideshow.innerHTML = "";
  dotsContainer.innerHTML = "";

  // Load images (centered, contained)
  data.images.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    if (i === 0) img.classList.add("active");
    slideshow.appendChild(img);
  });

  imgs = slideshow.querySelectorAll("img");
  currentSlide = 0;

  // Dots
  data.images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      showSlide(i);
      resetSlideTimer();
    });
    dotsContainer.appendChild(dot);
  });
  dots = dotsContainer.querySelectorAll(".dot");

  // Auto-slide
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);

  // Description bullets
  const descHTML = `<ul>${data.desc.map(d => `<li>${d}</li>`).join("")}</ul>`;
  document.getElementById("modal-desc").innerHTML = descHTML;

  // Regions (comma-separated)
  document.getElementById("modal-regions").innerHTML =
    `<p><strong>Regions:</strong> ${data.regions.join(", ")}</p>`;

  // YouTube link
  document.getElementById("youtube-link").href = data.youtube;

  // Show modal
  modal.classList.add("active");
}

/* ===== Slideshow Control ===== */
function showSlide(index) {
  if (!imgs.length) return;
  imgs[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");
  currentSlide = index;
  imgs[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}
function nextSlide() {
  if (!imgs.length) return;
  showSlide((currentSlide + 1) % imgs.length);
}
function prevSlide() {
  if (!imgs.length) return;
  showSlide((currentSlide - 1 + imgs.length) % imgs.length);
}
function resetSlideTimer() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

/* ===== Close Modal ===== */
function closeModal() {
  document.getElementById("modal").classList.remove("active");
  clearInterval(slideInterval);
}

/* Outside click closes */
window.addEventListener("click", e => {
  const modal = document.getElementById("modal");
  if (e.target === modal) closeModal();
});

/* Keyboard nav */
window.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

/* Expose for inline handlers */
window.openModal = openModal;
window.closeModal = closeModal;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;

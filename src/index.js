import './style.css';

// Import image assets for Webpack bundling
import heroImg from './assets/hero.jpg';
import weddingImg from './assets/wedding.jpg';
import architectureImg from './assets/architecture.jpg';
import bioImg from './assets/bio.jpg';
import natureImg from './assets/nature.jpg';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Image Data Array for Lightbox Navigation
  const galleryItemsData = [
    { src: heroImg, title: "Aura of Sunset", category: "Editorial Portrait", location: "Amalfi Coast, Italy", camera: "Leica SL2 | 50mm f/0.95" },
    { src: weddingImg, title: "Whispers in Tuscan Olive Groves", category: "Weddings", location: "Florence, Italy", camera: "Hasselblad H6D | 80mm f/2.2" },
    { src: architectureImg, title: "Symmetry & Twilight", category: "Architecture", location: "Zurich, Switzerland", camera: "Sony A1 | 16-35mm f/2.8" },
    { src: natureImg, title: "The Silent Dawn Fjord", category: "Nature & Fine Art", location: "Lofoten Islands, Norway", camera: "Leica SL2 | 35mm Summilux" },
    { src: bioImg, title: "The Artist in Motion", category: "Portraits", location: "Paris Studio, France", camera: "Medium Format Film 120" },
    { src: heroImg, title: "Veil of Golden Sunlight", category: "Weddings", location: "Lake Como, Italy", camera: "Hasselblad H6D | 100mm f/2.2" }
  ];

  // Update dynamic image sources if needed
  const galleryImgs = document.querySelectorAll('.gallery-card img');
  galleryImgs.forEach((img, idx) => {
    if (galleryItemsData[idx]) {
      img.src = galleryItemsData[idx].src;
    }
  });

  const heroBg = document.querySelector('.hero-bg-slide');
  if (heroBg) heroBg.style.backgroundImage = `url('${heroImg}')`;

  const aboutImg = document.querySelector('.about-img');
  if (aboutImg) aboutImg.src = bioImg;

  const afterImg = document.querySelector('.img-after');
  const beforeImg = document.querySelector('.img-before');
  if (afterImg) afterImg.style.backgroundImage = `url('${heroImg}')`;
  if (beforeImg) beforeImg.style.backgroundImage = `url('${heroImg}')`;

  // 2. Announcement Bar & Sticky Header
  const announcementBar = document.querySelector('.announcement-bar');
  const closeAnnouncement = document.getElementById('closeAnnouncement');
  const mainHeader = id('header');

  if (closeAnnouncement && announcementBar) {
    closeAnnouncement.addEventListener('click', () => {
      announcementBar.style.display = 'none';
      if (mainHeader) mainHeader.style.top = '0';
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });

  // 3. Theme Toggle (Dark / Light)
  const themeToggle = id('themeToggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      if (document.body.classList.contains('light-theme')) {
        themeIcon.className = 'fa-solid fa-sun';
      } else {
        themeIcon.className = 'fa-solid fa-moon';
      }
    });
  }

  // 4. Hamburger Drawer Navigation
  const hamburgerMenu = id('hamburgerMenu');
  const navMenu = id('navMenu');

  if (hamburgerMenu && navMenu) {
    hamburgerMenu.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 5. Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hide');
          item.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  // 6. Lightbox Modal
  const lightboxModal = id('lightboxModal');
  const lightboxImg = id('lightboxImg');
  const lightboxTitle = id('lightboxTitle');
  const lightboxMeta = id('lightboxMeta');
  const lightboxClose = id('lightboxClose');
  const lightboxPrev = id('lightboxPrev');
  const lightboxNext = id('lightboxNext');

  let currentImageIdx = 0;

  function openLightbox(idx) {
    currentImageIdx = idx;
    const item = galleryItemsData[idx];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxTitle.textContent = item.title;
    lightboxMeta.innerHTML = `<i class="fa-solid fa-camera"></i> ${item.camera} &nbsp;|&nbsp; <i class="fa-solid fa-location-dot"></i> ${item.location}`;
    lightboxModal.classList.add('active');
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
  }

  document.querySelectorAll('.card-expand-btn').forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(idx);
    });
  });

  document.querySelectorAll('.gallery-card').forEach((card, idx) => {
    card.addEventListener('click', () => {
      openLightbox(idx);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      currentImageIdx = (currentImageIdx - 1 + galleryItemsData.length) % galleryItemsData.length;
      openLightbox(currentImageIdx);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      currentImageIdx = (currentImageIdx + 1) % galleryItemsData.length;
      openLightbox(currentImageIdx);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
    if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
  });

  // 7. Before & After Image Comparison Slider
  const comparisonSlider = id('comparisonSlider');
  const sliderHandle = id('sliderHandle');
  const imgBefore = id('imgBefore');

  if (comparisonSlider && sliderHandle && imgBefore) {
    let isDragging = false;

    function updateSlider(xPos) {
      const rect = comparisonSlider.getBoundingClientRect();
      let x = xPos - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;

      const percent = (x / rect.width) * 100;
      imgBefore.style.width = `${percent}%`;
      sliderHandle.style.left = `${percent}%`;
    }

    comparisonSlider.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    comparisonSlider.addEventListener('touchstart', (e) => {
      isDragging = true;
      updateSlider(e.touches[0].clientX);
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      updateSlider(e.touches[0].clientX);
    });

    window.addEventListener('touchend', () => { isDragging = false; });
  }

  // 8. Photographer About Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.dataset.tab;
      const targetContent = id(targetId);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // 9. Pricing Customizer Calculator
  let currentBasePrice = 4800; // Default Featured package base
  const calculatedTotal = id('calculatedTotal');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
  const selectPackageBtns = document.querySelectorAll('.select-package-btn');

  function calculateTotal() {
    let total = currentBasePrice;
    addonCheckboxes.forEach(chk => {
      if (chk.checked) {
        total += parseInt(chk.dataset.price, 10);
      }
    });

    if (calculatedTotal) {
      calculatedTotal.textContent = `$${total.toLocaleString()}`;
    }
  }

  selectPackageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentBasePrice = parseInt(btn.dataset.base, 10);
      calculateTotal();

      // Highlight selected pricing card
      document.querySelectorAll('.pricing-card').forEach(c => c.classList.remove('featured'));
      btn.closest('.pricing-card').classList.add('featured');

      // Scroll smoothly to customizer box
      const customizer = document.querySelector('.customizer-box');
      if (customizer) customizer.scrollIntoView({ behavior: 'smooth' });

      showToast(`Selected "${btn.dataset.package}" package ($${currentBasePrice.toLocaleString()})`);
    });
  });

  addonCheckboxes.forEach(chk => {
    chk.addEventListener('change', calculateTotal);
  });

  const openCustomizerBooking = id('openCustomizerBooking');
  if (openCustomizerBooking) {
    openCustomizerBooking.addEventListener('click', () => {
      const contactSection = id('contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 10. Testimonials Slider
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = id('prevTestimonial');
  const nextBtn = id('nextTestimonial');

  let currentSlide = 0;
  let slideTimer = null;

  function showSlide(idx) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    currentSlide = (idx + testimonialCards.length) % testimonialCards.length;
    testimonialCards[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function startAutoSlide() {
    slideTimer = setInterval(nextSlide, 6000);
  }

  function stopAutoSlide() {
    if (slideTimer) clearInterval(slideTimer);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoSlide();
      showSlide(currentSlide - 1);
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoSlide();
      showSlide(currentSlide + 1);
      startAutoSlide();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      showSlide(idx);
      startAutoSlide();
    });
  });

  startAutoSlide();

  // 11. Form Submissions & Toast Feedback
  const bookingForm = id('bookingForm');
  const newsletterForm = id('newsletterForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = id('fullName').value;
      showToast(`Thank you, ${name}! Your Atelier inquiry has been transmitted. We will reply within 24 hours.`, 'success');
      bookingForm.reset();
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Successfully subscribed to Atelier Dispatch updates.', 'success');
      newsletterForm.reset();
    });
  }

  // Helper Toast Function
  function showToast(msg, type = 'info') {
    const toastContainer = id('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${msg}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.4s ease forwards';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // Current year in footer
  const currentYearSpan = id('currentYear');
  if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

  function id(name) {
    return document.getElementById(name);
  }
});

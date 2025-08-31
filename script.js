document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu
    const hamburger = document.getElementById('hamburger-icon');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const worksDropdownToggle = document.querySelector('.works-dropdown-toggle');
    const worksDropdownMenu = document.querySelector('.works-dropdown-menu');
    const worksLink = document.querySelector('.dropdown-toggle');

    // Toggle hamburger menu
    hamburger.addEventListener('click', () => {
        console.log('Hamburger clicked'); // Debug
        navMenu.classList.toggle('open');
        worksDropdownMenu.classList.remove('show');
    });

    // Handle Works link click for navigation
    worksLink.addEventListener('click', (e) => {
        if (!worksDropdownMenu.classList.contains('show')) {
            window.location.href = worksLink.getAttribute('href');
        } else {
            e.preventDefault();
        }
        worksDropdownMenu.classList.toggle('show');
        console.log('Works dropdown toggled'); // Debug
    });

    // Close menu and dropdown when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link !== worksLink && !link.closest('.works-dropdown-menu')) {
                navMenu.classList.remove('open');
                worksDropdownMenu.classList.remove('show');
                console.log('Nav link clicked:', link.textContent); // Debug
            }
            if (link.closest('.works-dropdown-menu')) {
                navMenu.classList.remove('open');
                worksDropdownMenu.classList.remove('show');
                console.log('Dropdown link clicked:', link.textContent); // Debug
            }
        });
    });

    // Close menu and dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && !worksDropdownToggle.contains(e.target)) {
            navMenu.classList.remove('open');
            worksDropdownMenu.classList.remove('show');
            console.log('Clicked outside menu'); // Debug
        }
    });

    // About Section Carousel
    const aboutCarousel = document.querySelector('.about-carousel-inner');
    const aboutPages = document.querySelectorAll('.about-page');
    const aboutDotsContainer = document.querySelector('.about-section .carousel-dots');
    let currentIndex = 0;

    aboutPages.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            console.log('About carousel dot clicked:', index); // Debug
            currentIndex = index;
            updateAboutCarousel();
        });
        aboutDotsContainer.appendChild(dot);
    });

    function updateAboutCarousel() {
        const offset = -currentIndex * 100;
        aboutCarousel.style.transform = `translateX(${offset}%)`;
        document.querySelectorAll('.about-section .dot').forEach(dot => dot.classList.remove('active'));
        document.querySelectorAll('.about-section .dot')[currentIndex].classList.add('active');
    }

    // Swipe functionality for About Section
    let startX = 0;
    aboutCarousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    aboutCarousel.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        if (diffX > 50 && currentIndex < aboutPages.length - 1) {
            currentIndex++;
        } else if (diffX < -50 && currentIndex > 0) {
            currentIndex--;
        }
        updateAboutCarousel();
    });

    // Skill Card Flip
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('click', () => {
            console.log('Skill card clicked'); // Debug
            card.classList.toggle('flipped');
        });
    });

    // Works Tabs and Gallery Carousel
    const worksTabs = document.querySelectorAll('.works-tab');
    const worksGalleries = document.querySelectorAll('.works-gallery-grid');
    let activeTimer = null;
    let currentGalleryIndex = {}; // Store current index per gallery

    worksGalleries.forEach(gallery => {
        currentGalleryIndex[gallery.id] = 0;
        // Initialize all items as hidden except the first
        const items = gallery.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            item.style.opacity = index === 0 ? '1' : '0';
            item.style.transform = index === 0 ? 'translateX(0)' : 'translateX(100%)';
            if (index === 0) item.classList.add('active');
        });
    });

    worksTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            console.log('Works tab clicked:', tab.dataset.category); // Debug
            worksTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.dataset.category;
            worksGalleries.forEach(gallery => {
                if (gallery.id === `${category}-creatives` || gallery.id === `${category}-designs` || gallery.id === category) {
                    gallery.classList.remove('hidden');
                    startAutoSlide(gallery);
                } else {
                    gallery.classList.add('hidden');
                    // Reset transform and opacity for hidden galleries
                    const items = gallery.querySelectorAll('.gallery-item');
                    items.forEach(item => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(100%)';
                        item.classList.remove('active');
                    });
                    currentGalleryIndex[gallery.id] = 0;
                }
            });
        });
    });

    // Function to update gallery carousel
    function updateGalleryCarousel(gallery) {
        const items = gallery.querySelectorAll('.gallery-item');
        const index = currentGalleryIndex[gallery.id];
        items.forEach((item, i) => {
            item.classList.remove('active');
            item.style.opacity = '0';
            item.style.transform = 'translateX(100%)';
            if (i === index) {
                item.classList.add('active');
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }
        });
    }

    // Function to start auto-slide for a gallery
    function startAutoSlide(gallery) {
        if (activeTimer) clearInterval(activeTimer);
        const items = gallery.querySelectorAll('.gallery-item');
        if (items.length > 1) {
            activeTimer = setInterval(() => {
                currentGalleryIndex[gallery.id] = (currentGalleryIndex[gallery.id] + 1) % items.length;
                updateGalleryCarousel(gallery);
                console.log('Auto-slide:', gallery.id, currentGalleryIndex[gallery.id]); // Debug
            }, 3000); // Change every 3 seconds
        }
    }

    // Initialize the first gallery
    const initialGallery = document.querySelector('.works-gallery-grid:not(.hidden)');
    if (initialGallery) startAutoSlide(initialGallery);

    // Swipe functionality for Works Galleries
    worksGalleries.forEach(gallery => {
        let swipeStartX = 0;
        gallery.addEventListener('touchstart', (e) => {
            swipeStartX = e.touches[0].clientX;
        });

        gallery.addEventListener('touchend', (e) => {
            const swipeEndX = e.changedTouches[0].clientX;
            const diffX = swipeStartX - swipeEndX;
            const items = gallery.querySelectorAll('.gallery-item');
            if (diffX > 50 && currentGalleryIndex[gallery.id] < items.length - 1) {
                currentGalleryIndex[gallery.id]++;
                updateGalleryCarousel(gallery);
            } else if (diffX < -50 && currentGalleryIndex[gallery.id] > 0) {
                currentGalleryIndex[gallery.id]--;
                updateGalleryCarousel(gallery);
            }
            console.log('Swipe detected in gallery:', gallery.id, 'New index:', currentGalleryIndex[gallery.id]); // Debug
        });
    });

    // Navigation Arrows for Works Gallery
    const galleryPrev = document.createElement('button');
    galleryPrev.classList.add('gallery-prev');
    galleryPrev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
    const galleryNext = document.createElement('button');
    galleryNext.classList.add('gallery-next');
    galleryNext.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
    document.querySelector('.works-gallery-container').appendChild(galleryPrev);
    document.querySelector('.works-gallery-container').appendChild(galleryNext);

    galleryPrev.addEventListener('click', () => {
        const activeGallery = document.querySelector('.works-gallery-grid:not(.hidden)');
        if (activeGallery) {
            currentGalleryIndex[activeGallery.id] = (currentGalleryIndex[activeGallery.id] - 1 + activeGallery.querySelectorAll('.gallery-item').length) % activeGallery.querySelectorAll('.gallery-item').length;
            updateGalleryCarousel(activeGallery);
            console.log('Previous arrow clicked:', activeGallery.id, 'New index:', currentGalleryIndex[activeGallery.id]); // Debug
        }
    });

    galleryNext.addEventListener('click', () => {
        const activeGallery = document.querySelector('.works-gallery-grid:not(.hidden)');
        if (activeGallery) {
            currentGalleryIndex[activeGallery.id] = (currentGalleryIndex[activeGallery.id] + 1) % activeGallery.querySelectorAll('.gallery-item').length;
            updateGalleryCarousel(activeGallery);
            console.log('Next arrow clicked:', activeGallery.id, 'New index:', currentGalleryIndex[activeGallery.id]); // Debug
        }
    });

    // Lightbox Modal for Works Gallery
    const modal = document.createElement('div');
    modal.classList.add('lightbox-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <img src="" alt="">
            <div class="modal-caption"></div>
            <button class="close-modal">Close</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.querySelectorAll('.works-gallery-grid .gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            const item = img.closest('.gallery-item');
            const caption = item.querySelector('.gallery-caption').textContent;
            modal.querySelector('img').src = img.src;
            modal.querySelector('img').alt = img.alt;
            modal.querySelector('.modal-caption').textContent = caption;
            modal.classList.add('show');
            console.log('Gallery item clicked:', img.alt); // Debug
            if (activeTimer) clearInterval(activeTimer); // Pause auto-slide when modal is open
        });
    });

    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('show');
        console.log('Modal closed'); // Debug
        // Resume auto-slide for the active gallery
        const activeGallery = document.querySelector('.works-gallery-grid:not(.hidden)');
        if (activeGallery) startAutoSlide(activeGallery);
    });

    // Click outside modal to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            console.log('Modal closed by clicking outside'); // Debug
            // Resume auto-slide for the active gallery
            const activeGallery = document.querySelector('.works-gallery-grid:not(.hidden)');
            if (activeGallery) startAutoSlide(activeGallery);
        }
    });

    // Testimonials Carousel
    const testimonialsCarousel = document.querySelector('.testimonials-carousel-inner');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialsDotsContainer = document.querySelector('.testimonials-section .carousel-dots');
    let testimonialIndex = 0;

    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            console.log('Testimonial dot clicked:', index); // Debug
            testimonialIndex = index;
            updateTestimonialsCarousel();
        });
        testimonialsDotsContainer.appendChild(dot);
    });

    function updateTestimonialsCarousel() {
        const offset = -testimonialIndex * 100;
        testimonialsCarousel.style.transform = `translateX(${offset}%)`;
        document.querySelectorAll('.testimonials-section .dot').forEach(dot => dot.classList.remove('active'));
        document.querySelectorAll('.testimonials-section .dot')[testimonialIndex].classList.add('active');
    }

    // Swipe functionality for Testimonials
    let startXTest = 0;
    testimonialsCarousel.addEventListener('touchstart', (e) => {
        startXTest = e.touches[0].clientX;
    });

    testimonialsCarousel.addEventListener('touchend', (e) => {
        const endXTest = e.changedTouches[0].clientX;
        const diffXTest = startXTest - endXTest;
        if (diffXTest > 50 && testimonialIndex < testimonialCards.length - 1) {
            testimonialIndex++;
        } else if (diffXTest < -50 && testimonialIndex > 0) {
            testimonialIndex--;
        }
        updateTestimonialsCarousel();
    });

    // Free Resources Toggle
    document.querySelectorAll('.resource-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('.read-more-button')) return;
            console.log('Resource item clicked'); // Debug
            const details = item.querySelector('.resource-details');
            if (details) details.classList.toggle('hidden');
        });
    });

    // Contact Form Submission
    const contactForm = document.querySelector('.fs-form');
    const formMessage = document.createElement('div');
    formMessage.classList.add('form-message');
    contactForm.appendChild(formMessage);

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submitted'); // Debug
        console.log('Form action:', contactForm.action); // Debug endpoint
        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();
            console.log('Formspree response:', result); // Debug response
            if (response.ok) {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.classList.add('success');
                formMessage.classList.remove('error');
                contactForm.reset();
            } else {
                throw new Error(result.error || `Form submission failed with status ${response.status}`);
            }
        } catch (error) {
            console.error('Form submission error:', error.message); // Debug
            if (error.message.includes('429')) {
                formMessage.textContent = 'Formspree storage quota exceeded. Please clear submissions in Formspree or upgrade your plan.';
            } else if (error.message.includes('403')) {
                formMessage.textContent = 'Form not activated. Please check your email for a Formspree confirmation link.';
            } else {
                formMessage.textContent = 'Error sending message: ' + error.message + '. Please try again or contact Formspree support.';
            }
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
        }

        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.classList.remove('success', 'error');
        }, 5000);
    });
});

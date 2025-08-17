document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu
    const hamburger = document.getElementById('hamburger-icon');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const worksDropdownToggle = document.querySelector('.works-dropdown-toggle');
    const worksDropdownMenu = document.querySelector('.works-dropdown-menu');

    // Toggle hamburger menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('open');
        }
    });

    // Mobile dropdown toggle for Works
    worksDropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth < 768) {
            e.preventDefault();
            worksDropdownMenu.classList.toggle('show');
        }
    });

    // Desktop dropdown for Works
    worksDropdownToggle.addEventListener('mouseover', () => {
        if (window.innerWidth >= 768) {
            worksDropdownMenu.classList.add('show');
        }
    });

    worksDropdownToggle.addEventListener('mouseout', () => {
        if (window.innerWidth >= 768) {
            worksDropdownMenu.classList.remove('show');
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
            card.classList.toggle('flipped');
        });
    });

    // Works Tabs
    const worksTabs = document.querySelectorAll('.works-tab');
    const worksGalleries = document.querySelectorAll('.works-gallery');
    worksTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            worksTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.dataset.category;
            worksGalleries.forEach(gallery => {
                if (gallery.id === `${category}-creatives` || gallery.id === `${category}-designs` || gallery.id === category) {
                    gallery.classList.remove('hidden');
                } else {
                    gallery.classList.add('hidden');
                }
            });
        });
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
            if (e.target.closest('.download-button')) return; // Prevent toggle when clicking download button
            const details = item.querySelector('.resource-details');
            details.classList.toggle('hidden');
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Placeholder for form submission (e.g., send to a server)
        console.log('Form submitted:', { name, email, message });

        // Display success message
        formMessage.textContent = 'Message sent successfully!';
        formMessage.classList.add('success');
        formMessage.classList.remove('error');

        // Reset form
        contactForm.reset();

        // Clear message after 3 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.classList.remove('success');
        }, 3000);
    });
});
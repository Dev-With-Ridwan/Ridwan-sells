// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Slideshow for Works Gallery
const worksGallery = document.getElementById('worksGallery');
const workItems = worksGallery.getElementsByClassName('work-item');
let currentIndex = 0;

function showNextItem() {
    for (let i = 0; i < workItems.length; i++) {
        workItems[i].style.display = 'none'; // Hide all items
    }
    workItems[currentIndex].style.display = 'block'; // Show current item
    currentIndex = (currentIndex + 1) % workItems.length;
}

showNextItem(); // Show the first item immediately
setInterval(showNextItem, 3000); // Change every 3 seconds

// Auto-scroll for Tools
const toolsTicker = document.getElementById('toolsTicker');
let toolsScrollAmount = 0;
const scrollSpeed = 1;

function autoScrollTools() {
    toolsScrollAmount += scrollSpeed;
    if (toolsScrollAmount >= toolsTicker.scrollWidth / 2) {
        toolsScrollAmount = 0;
    }
    toolsTicker.style.transform = `translateX(-${toolsScrollAmount}px)`;
}

setInterval(autoScrollTools, 50);

// Auto-scroll for Testimonials Carousel with Pause
let testimonialScrollAmount = 0;
let isTestimonialScrolling = true;
const testimonialCarousel = document.getElementById('testimonialCarousel');

function autoScrollTestimonials() {
    if (isTestimonialScrolling) {
        testimonialScrollAmount += scrollSpeed;
        if (testimonialScrollAmount >= testimonialCarousel.scrollWidth - testimonialCarousel.clientWidth) {
            testimonialScrollAmount = 0;
        }
        testimonialCarousel.scrollLeft = testimonialScrollAmount;
    }
}

setInterval(autoScrollTestimonials, 50);

// Testimonial Case Study Toggle with Scroll Pause
document.querySelectorAll('.view-case').forEach(button => {
    button.addEventListener('click', () => {
        const caseStudy = button.nextElementSibling;
        isTestimonialScrolling = !isTestimonialScrolling; // Toggle scroll state
        caseStudy.style.display = caseStudy.style.display === 'block' ? 'none' : 'block';
        if (caseStudy.style.display === 'none') {
            isTestimonialScrolling = true; // Resume scroll when closed
        }
    });
});

// FAQ Dropdown Handler
function showAnswer(select) {
    const answers = document.querySelectorAll('.faq-answer');
    answers.forEach(answer => answer.style.display = 'none');
    const selectedId = select.value;
    if (selectedId) {
        document.getElementById(selectedId).style.display = 'block';
    }
}

// Initialize FAQ
document.getElementById('faqSelect').addEventListener('change', (e) => {
    showAnswer(e.target);
});

// Initialize first FAQ answer
showAnswer(document.getElementById('faqSelect'));

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Work Item Click Handler
document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('click', () => {
        alert(`View details for: ${item.querySelector('img').alt}`);
        // Replace with modal or detailed view logic
    });
});

// Form Submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault(); // Keep this to handle submission manually

  const form = e.target;
  const submitButton = form.querySelector('button');
  submitButton.textContent = 'Submitting...';
  submitButton.disabled = true;

  // Collect form data
  const formData = new FormData(form);

  // Send to Formspree
  fetch('https://formspree.io/f/mldyka', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Form submission failed');
    }
    return response.json();
  })
  .then(() => {
    setTimeout(() => {
      alert('Form submitted successfully!');
      form.reset();
      submitButton.textContent = 'Send Message';
      submitButton.disabled = false;
    }, 1000);
  })
  .catch(error => {
    setTimeout(() => {
      alert('Error submitting form. Please try again.');
      submitButton.textContent = 'Send Message';
      submitButton.disabled = false;
    }, 1000);
  });
});
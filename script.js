// Hero Slider
document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Preload images to prevent white screen
    slides.forEach((slide) => {
        const img = slide.querySelector("img");
        if (img) {
            img.onerror = () => {
                img.src = "fallback.jpg"; // Fallback image if loading fails
            };
        }
    });

    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Initial slide
    showSlide(currentSlide);
});

// Progress Bar Animation with Intersection Observer
document.addEventListener("DOMContentLoaded", function () {
    const progressContainer = document.querySelector(".progress-container");
    const progressFills = document.querySelectorAll(".progress-fill");

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                progressFills.forEach((fill) => {
                    const targetWidth = fill.getAttribute("data-width");
                    fill.style.width = `${targetWidth}%`;
                });
                observer.disconnect(); // Run once
            }
        },
        { threshold: 0.5 }
    );

    if (progressContainer) {
        observer.observe(progressContainer);
    }
});

// Gallery Infinite Scroll
document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".gallery-track");
    if (track) {
        track.innerHTML += track.innerHTML; // Clone images for infinite scroll
    }
});

// Smooth Scroll for Navigation Links
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("#navlinks a");

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            // Only apply smooth scroll for hash links (e.g., #home)
            if (href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 120, // Adjust for navbar height
                        behavior: "smooth",
                    });
                    // Close mobile menu if open
                    const navlinks = document.getElementById("navlinks");
                    const hamburgerIcon = document.querySelector(".hamburger i");
                    if (navlinks.classList.contains("active")) {
                        navlinks.classList.remove("active");
                        hamburgerIcon.classList.remove("fa-times");
                        hamburgerIcon.classList.add("fa-bars");
                    }
                }
            }
            // Allow default navigation for file links (e.g., about.html)
        });
    });
});

// Hamburger Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navlinks = document.getElementById("navlinks");
    const hamburgerIcon = hamburger.querySelector("i");

    hamburger.addEventListener("click", () => {
        navlinks.classList.toggle("active");
        hamburgerIcon.classList.toggle("fa-bars");
        hamburgerIcon.classList.toggle("fa-times");
    });
});

// Form Submission to WhatsApp
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inspection-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const phone = form.querySelector('input[name="phone"]').value;

        const message = `Free Inspection Request:%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}`;
        const whatsappUrl = `https://wa.me/9490908787?text=${message}`;

        window.open(whatsappUrl, "_blank");
        form.reset(); // Clear form
    });
});
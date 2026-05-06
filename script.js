// Mobile Menu Toggle
let mobileMenuOpen = false;

function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (mobileMenuOpen) {
        mobileMenu.classList.add('active');
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        mobileMenu.classList.remove('active');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

// Smooth Scroll to Section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Close mobile menu if open
        if (mobileMenuOpen) {
            toggleMobileMenu();
        }
    }
}

// Set Current Year in Footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Center scroll position of organizational structure image
    const orgContainer = document.querySelector('.organization-image-container');
    if (orgContainer) {
        setTimeout(function() {
            const scrollWidth = orgContainer.scrollWidth;
            const clientWidth = orgContainer.clientWidth;
            const centerScroll = (scrollWidth - clientWidth) / 2;
            orgContainer.scrollLeft = centerScroll;
        }, 100);
    }

    function setupAutoSlide(slider) {
        if (!slider) return;

        const slides = slider.querySelectorAll('.slider-slide');
        if (!slides.length) return;

        let slideIndex = 0;
        const slideCount = slides.length;
        const intervalMs = 2000;

        function goToSlide(index) {
            const slide = slides[index];
            if (!slide) return;
            const slideRect = slide.getBoundingClientRect();
            const containerRect = slider.getBoundingClientRect();
            const scrollLeft = slider.scrollLeft + (slideRect.left - containerRect.left);
            slider.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }

        setInterval(function() {
            slideIndex = (slideIndex + 1) % slideCount;
            goToSlide(slideIndex);
        }, intervalMs);
    }

    document.querySelectorAll('.auto-slider').forEach(function(slider) {
        setupAutoSlide(slider);
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.getElementById('mobile-menu-btn');
    
    if (mobileMenuOpen && 
        mobileMenu &&
        menuButton &&
        !mobileMenu.contains(event.target) && 
        !menuButton.contains(event.target)) {
        toggleMobileMenu();
    }
});

// Handle window resize - close mobile menu on desktop
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768 && mobileMenuOpen) {
        toggleMobileMenu();
    }
});

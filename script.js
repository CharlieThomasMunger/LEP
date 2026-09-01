// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Anchor Links
const policyTargetIds = ['privacy', 'legal', 'cookies'];

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const hash = this.getAttribute('href');
        const hashId = hash && hash.startsWith('#') ? hash.substring(1) : '';

        if (policyTargetIds.includes(hashId)) {
            e.preventDefault();
            const dialog = document.getElementById(hashId);
            if (dialog) {
                if (typeof dialog.showModal === 'function') {
                    if (!dialog.open) {
                        dialog.showModal();
                    }
                } else {
                    dialog.setAttribute('open', 'open');
                }
            }
            return;
        }

        const targetSelector = this.dataset.scrollTarget || hash;
        const targetId = targetSelector && targetSelector.startsWith('#') ? targetSelector.substring(1) : '';

        if (targetSelector && targetSelector.length > 1) {
            const target = document.querySelector(targetSelector);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                if (targetId) {
                    history.replaceState(null, '', `#${targetId}`);
                }
            }
        }
    });
});

// Contact Links Handling
document.addEventListener('DOMContentLoaded', function() {
    // Add click tracking for contact links if needed
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    const policyDialogs = document.querySelectorAll('.policy-dialog');
    const policyCloseButtons = document.querySelectorAll('[data-policy-close]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Optional: Add analytics tracking here
            console.log('Email link clicked');
        });
    });
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Optional: Add analytics tracking here
            console.log('Phone link clicked');
        });
    });

    policyCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dialog = this.closest('.policy-dialog');
            if (dialog) {
                if (typeof dialog.close === 'function') {
                    dialog.close();
                } else {
                    dialog.removeAttribute('open');
                }
            }
        });
    });

    policyDialogs.forEach(dialog => {
        dialog.addEventListener('cancel', function(event) {
            // Ensure consistent closing behaviour
            event.preventDefault();
            if (typeof dialog.close === 'function') {
                dialog.close();
            } else {
                dialog.removeAttribute('open');
            }
        });

        dialog.addEventListener('click', function(event) {
            if (event.target === dialog) {
                if (typeof dialog.close === 'function') {
                    dialog.close();
                } else {
                    dialog.removeAttribute('open');
                }
            }
        });
    });
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation to sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', function() {
    const navSections = document.querySelectorAll('[data-nav-section]');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const triggerPoint = header ? header.offsetHeight + 20 : 120;

    let currentId = '';

    navSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
            currentId = section.getAttribute('id');
        }
    });

    if (!currentId && navSections.length) {
        const lastSection = navSections[navSections.length - 1];
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) {
            currentId = lastSection.getAttribute('id');
        }
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        const activeMatch = link.dataset.activeSection || (link.getAttribute('href').startsWith('#') ? link.getAttribute('href').substring(1) : '');
        if (currentId && activeMatch === currentId) {
            link.classList.add('active');
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

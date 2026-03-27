document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const icon = hamburger.querySelector('i');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active Navigation Link based on Scroll Position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Output animation repeatedly or only once
            }
        });
    }, observerOptions);

    // Apply animation class to elements
    const elementsToAnimate = [
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.section-subtitle'),
        ...document.querySelectorAll('.about-text'),
        ...document.querySelectorAll('.skill-card'),
        ...document.querySelectorAll('.timeline-item'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.contact-item-box'),
        document.querySelector('.contact-form'),
        document.querySelector('.cta-footer')
    ];

    elementsToAnimate.forEach(el => {
        if (el) {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        }
    });

    // Advanced Mouse Effect (Dot, Outline, Glow and Particles)
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor-outline');
    document.body.appendChild(cursorOutline);

    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow-effect');
    document.body.appendChild(cursorGlow);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;
    let isMouseMoving = false;

    // Particles array
    const particles = [];

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

        if (!isMouseMoving) {
            cursorGlow.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            cursorDot.style.opacity = '1';
            isMouseMoving = true;
        }

        // Create particles randomly on move
        if (Math.random() > 0.6) {
            createParticle(mouseX, mouseY);
        }
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
        cursorOutline.style.opacity = '0';
        cursorDot.style.opacity = '0';
        isMouseMoving = false;
    });

    // Hover effect on interactable elements
    const interactables = document.querySelectorAll('a, button, input, textarea, .contact-item-box, .project-card, .skill-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '45px';
            cursorOutline.style.height = '45px';
            cursorOutline.style.backgroundColor = 'rgba(139, 92, 246, 0.15)';
            cursorOutline.style.borderColor = 'var(--accent-primary)';
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(1.5)`;
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '25px';
            cursorOutline.style.height = '25px';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.borderColor = 'var(--accent-glow)';
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(1)`;
        });
    });

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'mouse-particle';
        document.body.appendChild(particle);

        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const destinationX = x + (Math.random() - 0.5) * 100;
        const destinationY = y + (Math.random() - 0.5) * 100;

        const animation = particle.animate([
            { transform: `translate3d(${x}px, ${y}px, 0)`, opacity: 0.8 },
            { transform: `translate3d(${destinationX}px, ${destinationY}px, 0)`, opacity: 0 }
        ], {
            duration: Math.random() * 800 + 400,
            easing: 'cubic-bezier(0, .9, .57, 1)',
            delay: Math.random() * 20
        });

        animation.onfinish = () => {
            particle.remove();
        };
    }

    function animateCursor() {
        // Smooth follow for outline
        outlineX += (mouseX - outlineX) * 0.25;
        outlineY += (mouseY - outlineY) * 0.25;
        cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;

        // Smooth follow for glow
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        // Offset by 150px because the glow element is 300x300
        cursorGlow.style.transform = `translate3d(${glowX - 150}px, ${glowY - 150}px, 0)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();
});


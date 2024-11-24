document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.project-card, section h2, .skills li');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial animation setup
    const setupAnimations = () => {
        const elements = document.querySelectorAll('.project-card, section h2, .skills li');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease';
        });
    };

    setupAnimations();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Interactive hover effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Contact form submission handler
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const nameInput = contactForm.querySelector('input[type="text"]');
        const emailInput = contactForm.querySelector('input[type="email"]');
        const messageInput = contactForm.querySelector('textarea');
        
        if (nameInput.value.trim() === '' || 
            emailInput.value.trim() === '' || 
            messageInput.value.trim() === '') {
            alert('Please fill out all fields');
            return;
        }
        
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        alert('Message sent successfully! I will get back to you soon.');
        contactForm.reset();
    });

    // Responsive navigation
    const hamburger = document.createElement('div');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '☰';
    
    const nav = document.querySelector('nav');
    const navMenu = nav.querySelector('ul');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Add media query for mobile responsiveness
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleMediaQuery(e) {
        if (e.matches) {
            nav.insertBefore(hamburger, navMenu);
            navMenu.classList.add('mobile-menu');
        } else {
            if (hamburger.parentNode) {
                hamburger.remove();
            }
            navMenu.classList.remove('mobile-menu', 'active');
        }
    }
    
    mediaQuery.addListener(handleMediaQuery);
    handleMediaQuery(mediaQuery);

    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let charIndex = 0;
    function typeText() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100);
        }
    }
    
    setTimeout(typeText, 500);

    // Gallery Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(button => button.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Music Player
    const playBtn = document.querySelector('.play-btn');
    const trackItems = document.querySelectorAll('.track-item');
    let isPlaying = false;

    playBtn?.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    });

    trackItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all tracks
            trackItems.forEach(track => track.classList.remove('active'));
            // Add active class to clicked track
            item.classList.add('active');
            
            // Update now playing info
            const trackTitle = item.querySelector('h3').textContent;
            const artistName = item.querySelector('p').textContent;
            const albumCover = item.querySelector('img').src;
            
            document.querySelector('.now-playing h2').textContent = trackTitle;
            document.querySelector('.now-playing p').textContent = artistName;
            document.querySelector('.album-cover').src = albumCover;
        });
    });

    // Active Navigation
    function setActiveNavigation() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('nav ul li a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Get the href path and compare with current path
            const linkPath = link.getAttribute('href').split('#')[0]; // Remove hash if exists
            
            if (currentPath.endsWith(linkPath) || 
                (currentPath.endsWith('/') && linkPath === 'index.html') ||
                (currentPath.endsWith('index.html') && linkPath === 'index.html')) {
                link.classList.add('active');
            }
            
            // Handle hash links when on index page
            if ((currentPath.endsWith('/') || currentPath.endsWith('index.html')) && 
                link.getAttribute('href').includes('#') && 
                window.location.hash === link.getAttribute('href').split('index.html')[1]) {
                link.classList.add('active');
            }
        });
    }

    // Call on page load
    setActiveNavigation();

    // Call when hash changes (for single page navigation)
    window.addEventListener('hashchange', setActiveNavigation);
});

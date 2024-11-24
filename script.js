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
            const targetId = link.getAttribute('href');
            
            // Если это внутренняя ссылка (начинается с #), используем плавную прокрутку
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            // Для внешних ссылок (других страниц) позволяем браузеру обработать клик по умолчанию
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
    const initMusicPlayer = () => {
        const mainPlayButton = document.getElementById('play');
        const controlPlayButton = document.getElementById('main-play');
        const playlistButtons = document.querySelectorAll('.track-btn.play-stop');
        const audio = new Audio();
        let isPlaying = false;
        let currentTrack = null;

        function togglePlay(button, isMainPlayer = false) {
            const icon = button.querySelector('i');
            const controlIcon = controlPlayButton.querySelector('i');
            
            if (!isPlaying || (currentTrack && currentTrack !== button)) {
                // Stop previous track if exists
                if (currentTrack && currentTrack !== button) {
                    const prevIcon = currentTrack.querySelector('i');
                    prevIcon.classList.remove('fa-pause');
                    prevIcon.classList.add('fa-play');
                }
                
                // Start new track
                audio.play();
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                
                // Update control button
                controlIcon.classList.remove('fa-play');
                controlIcon.classList.add('fa-pause');
                
                isPlaying = true;
                currentTrack = button;
            } else {
                // Pause current track
                audio.pause();
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                
                // Update control button
                controlIcon.classList.remove('fa-pause');
                controlIcon.classList.add('fa-play');
                
                isPlaying = false;
            }
        }

        // Main player buttons
        if (mainPlayButton) {
            mainPlayButton.addEventListener('click', () => {
                togglePlay(mainPlayButton, true);
            });
        }
        
        if (controlPlayButton) {
            controlPlayButton.addEventListener('click', () => {
                if (currentTrack) {
                    togglePlay(currentTrack);
                } else if (mainPlayButton) {
                    togglePlay(mainPlayButton, true);
                }
            });
        }

        // Playlist buttons
        playlistButtons.forEach(button => {
            button.addEventListener('click', () => {
                togglePlay(button);
            });
        });

        // Update main player when track ends
        audio.addEventListener('ended', () => {
            if (currentTrack) {
                const icon = currentTrack.querySelector('i');
                const controlIcon = controlPlayButton.querySelector('i');
                
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                
                controlIcon.classList.remove('fa-pause');
                controlIcon.classList.add('fa-play');
                
                isPlaying = false;
            }
        });
    };

    // Initialize music player when on music page
    if (document.querySelector('.music-player')) {
        initMusicPlayer();
    }

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

    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].classList.toggle('rotate-45');
            spans[1].classList.toggle('opacity-0');
            spans[2].classList.toggle('rotate-negative-45');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].classList.remove('rotate-45');
            spans[1].classList.remove('opacity-0');
            spans[2].classList.remove('rotate-negative-45');
        }
    });

});

// Gallery Filters
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Interactive Background
function initInteractiveBackground() {
    const animatedBg = document.querySelector('.animated-bg');
    if (!animatedBg) return;

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const gradientX = 45 + (x * 30);
        const gradientY = 45 + (y * 30);
        const scale = 1 + (x * 0.2);

        animatedBg.style.background = `linear-gradient(${gradientX}deg, rgba(138, 43, 226, ${0.2 + y * 0.1}), rgba(0, 0, 0, ${0.2 + x * 0.1}))`;
        animatedBg.style.transform = `scale(${scale})`;
        animatedBg.style.filter = `blur(${80 + y * 40}px)`;
    });
}

// Background Music
function initBackgroundMusic() {
    const bgMusicToggle = document.getElementById('bgMusicToggle');
    if (!bgMusicToggle) return;

    const bgMusic = new Audio('https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.1;
    let isPlaying = false;

    bgMusicToggle.addEventListener('click', () => {
        try {
            if (isPlaying) {
                bgMusic.pause();
                bgMusicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                bgMusicToggle.classList.remove('playing');
            } else {
                const playPromise = bgMusic.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        bgMusicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                        bgMusicToggle.classList.add('playing');
                    }).catch(error => {
                        console.error("Error playing background music:", error);
                    });
                }
            }
            isPlaying = !isPlaying;
        } catch (error) {
            console.error("Error toggling background music:", error);
        }
    });

    // Stop music when leaving the page
    window.addEventListener('beforeunload', () => {
        if (isPlaying) {
            bgMusic.pause();
        }
    });
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    initInteractiveBackground();
    initBackgroundMusic();
    initMusicPlayer();
    setActiveNavigation();
});

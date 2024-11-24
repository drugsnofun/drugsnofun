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

// Music Player
class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.isPlaying = false;
        this.currentTrack = 0;
        this.tracks = Array.from(document.querySelectorAll('.track-item')).map(item => ({
            src: item.getAttribute('data-src'),
            title: item.querySelector('h3').textContent,
            artist: item.querySelector('p').textContent,
            image: item.querySelector('img').src,
            element: item
        }));

        this.initializePlayer();
        this.setupEventListeners();
    }

    initializePlayer() {
        this.playBtn = document.getElementById('play');
        this.prevBtn = document.getElementById('prev');
        this.nextBtn = document.getElementById('next');
        this.progress = document.querySelector('.progress');
        this.progressContainer = document.querySelector('.progress-container');
        this.currentTimeEl = document.querySelector('.current-time');
        this.durationEl = document.querySelector('.duration');
        this.songTitle = document.querySelector('.song-title');
        this.artistName = document.querySelector('.artist-name');
        this.artwork = document.querySelector('.track-artwork img');

        if (this.tracks.length > 0) {
            this.loadTrack(0);
        }
    }

    loadTrack(index) {
        this.currentTrack = index;
        const track = this.tracks[index];
        
        this.audio.src = track.src;
        this.songTitle.textContent = track.title;
        this.artistName.textContent = track.artist;
        this.artwork.src = track.image;

        // Обновляем активный трек в плейлисте
        this.tracks.forEach(t => {
            t.element.classList.remove('active');
            const btn = t.element.querySelector('.track-btn.play-stop');
            btn.innerHTML = '<i class="fas fa-play"></i>';
            btn.classList.remove('playing');
        });

        track.element.classList.add('active');
        const currentBtn = track.element.querySelector('.track-btn.play-stop');
        currentBtn.innerHTML = this.isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        currentBtn.classList.toggle('playing', this.isPlaying);
        
        // Сброс прогресса
        this.progress.style.width = '0%';
        this.currentTimeEl.textContent = '0:00';
        this.durationEl.textContent = '0:00';
        
        // Предзагрузка аудио
        this.audio.load();
    }

    play() {
        this.isPlaying = true;
        this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        this.playBtn.classList.add('playing');
        
        // Анимация кнопки
        this.playBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.playBtn.style.transform = 'scale(1)';
        }, 200);
        
        // Воспроизведение аудио
        this.audio.play().catch(error => {
            console.error('Error playing audio:', error);
            this.pause();
        });

        // Обновление кнопки в плейлисте
        const currentTrackBtn = this.tracks[this.currentTrack].element.querySelector('.track-btn.play-stop');
        currentTrackBtn.innerHTML = '<i class="fas fa-pause"></i>';
        currentTrackBtn.classList.add('playing');
    }

    pause() {
        this.isPlaying = false;
        this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
        this.playBtn.classList.remove('playing');
        
        // Анимация кнопки
        this.playBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.playBtn.style.transform = 'scale(1)';
        }, 200);
        
        this.audio.pause();

        // Обновление кнопки в плейлисте
        const currentTrackBtn = this.tracks[this.currentTrack].element.querySelector('.track-btn.play-stop');
        currentTrackBtn.innerHTML = '<i class="fas fa-play"></i>';
        currentTrackBtn.classList.remove('playing');
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    setupEventListeners() {
        // Основные элементы управления
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.prevTrack());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        
        // Прогресс-бар
        this.progressContainer.addEventListener('click', (e) => this.setProgress(e));
        
        // События аудио
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.nextTrack());

        // Обработчики для треков в плейлисте
        this.tracks.forEach((track, index) => {
            const playBtn = track.element.querySelector('.track-btn.play-stop');
            
            // Клик по кнопке воспроизведения
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.currentTrack === index && this.isPlaying) {
                    this.pause();
                } else {
                    this.loadTrack(index);
                    this.play();
                }
            });

            // Клик по элементу трека
            track.element.addEventListener('click', () => {
                if (this.currentTrack === index && this.isPlaying) {
                    this.pause();
                } else {
                    this.loadTrack(index);
                    this.play();
                }
            });
        });

        // Обработка ошибок аудио
        this.audio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            this.handleAudioError();
        });
    }

    setProgress(e) {
        const width = this.progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;
        
        if (duration) {
            this.audio.currentTime = (clickX / width) * duration;
        }
    }

    updateProgress() {
        if (this.audio.duration) {
            const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
            this.progress.style.width = `${progressPercent}%`;
            
            this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
            this.durationEl.textContent = this.formatTime(this.audio.duration);
        }
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }

    handleAudioError() {
        this.pause();
        alert('Ошибка воспроизведения аудио. Пожалуйста, попробуйте другой трек.');
    }

    prevTrack() {
        this.currentTrack = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
        this.loadTrack(this.currentTrack);
        if (this.isPlaying) {
            this.play();
        }
    }

    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
        this.loadTrack(this.currentTrack);
        if (this.isPlaying) {
            this.play();
        }
    }
}

// Initialize music player when on music page
if (document.querySelector('.music-player')) {
    new MusicPlayer();
}

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
    // Initialize other components here...
});

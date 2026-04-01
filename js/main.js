/**
 * ============================================
 * الأهرام للصناعات والتشكيلات المعدنية
 * ملف JavaScript الرئيسي
 * ============================================
 */

// ============================================
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        menuToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
    });
}

// ============================================
// Contact Form Submission & Validation
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const formStatus = document.getElementById('formStatus');

        // Reset status
        formStatus.style.display = 'none';
        formStatus.textContent = '';

        // Validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name.length < 3) {
            showStatus('الرجاء إدخال الاسم الكامل بشكل صحيح', 'error');
            return;
        }

        // Simple email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showStatus('الرجاء إدخال بريد إلكتروني صحيح', 'error');
            return;
        }

        // Show loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        submitBtn.disabled = true;

        try {
            // Simulated submission (since we don't have a real backend)
            // In a real project, you would use fetch() here
            await new Promise(resolve => setTimeout(resolve, 1500));

            showStatus('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.', 'success');
            contactForm.reset();
        } catch (error) {
            showStatus('تعذر إرسال الطلب، يرجى المحاولة مرة أخرى.', 'error');
        } finally {
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        }
    });

    function showStatus(message, type) {
        const formStatus = document.getElementById('formStatus');
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        formStatus.style.backgroundColor = type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)';
        formStatus.style.color = type === 'success' ? '#10b981' : '#ef4444';
        formStatus.style.border = `1px solid ${type === 'success' ? '#10b981' : '#ef4444'}`;
    }
}

// ============================================
// Mobile Dropdown Toggle (for Services submenu)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    // Function to close mobile menu
    function closeMobileMenu() {
        if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            if (menuToggle) {
                menuToggle.textContent = '☰';
            }
        }
        dropdowns.forEach(d => d.classList.remove('active'));
    }

    // ============================================
    // Bottom Nav Hide/Show on Scroll
    // ============================================
    const bottomNav = document.querySelector('.bottom-nav');
    let lastScrollTop = 0;

    if (bottomNav) {
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                bottomNav.classList.add('nav-hidden');
            } else {
                bottomNav.classList.remove('nav-hidden');
            }
            lastScrollTop = scrollTop;
        }, { passive: true });
    }

    // ============================================
    // Scroll Reveal Animation
    // ============================================
    const revealElements = document.querySelectorAll('.reveal, .tech-card, .why-card, .specialty-item, .modular-card, .service-feature, .about-image, .feature-image, .quality-card, .contact-form, .contact-info, .quote-wrapper, .quote-info');

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Lower threshold for better reliability
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback or just show all
        revealElements.forEach(el => el.classList.add('active'));
    }

    // ============================================
    // Swipe to Close Menu (Touch Gesture)
    // ============================================
    if (mainNav) {
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 80; // Minimum swipe distance in pixels

        mainNav.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        mainNav.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            // Swipe right to close (for RTL layout)
            if (swipeDistance > swipeThreshold) {
                closeMobileMenu();
            }
        }

        // Also close when tapping outside the menu (on overlay area)
        document.addEventListener('touchstart', (e) => {
            if (mainNav.classList.contains('active') &&
                !mainNav.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }, { passive: true });
    }



    dropdowns.forEach(dropdown => {
        const mainLink = dropdown.querySelector(':scope > a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        if (mainLink && dropdownContent) {
            mainLink.addEventListener('click', function (e) {
                // Check if we're on mobile (nav is in mobile mode)
                const isMobile = window.innerWidth <= 992;

                if (isMobile) {
                    // On mobile: toggle submenu instead of navigating
                    if (!dropdown.classList.contains('active')) {
                        // Close other dropdowns
                        dropdowns.forEach(d => d.classList.remove('active'));
                        // Open this dropdown
                        dropdown.classList.add('active');
                        e.preventDefault();
                    }
                    // If already open and clicking again, allow navigation
                }
            });

            // Close menu when clicking submenu items
            const submenuLinks = dropdownContent.querySelectorAll('a');
            submenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    closeMobileMenu();
                });
            });
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown') && !e.target.closest('.menu-toggle')) {
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });

    // Close menu when clicking regular nav links
    const navLinks = document.querySelectorAll('nav#mainNav > ul > li > a:not(.dropdown > a)');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu after clicking
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (menuToggle) {
                    menuToggle.textContent = '☰';
                }
            }
        }
    });
});


// ============================================
// Quote Form Submission
// ============================================
const quoteForm = document.getElementById('quoteForm');

if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show loading state or success
        const btn = quoteForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'جاري الإرسال...';
        btn.disabled = true;

        setTimeout(() => {
            alert('تم استلام طلب التسعيرة بنجاح! سيقوم فريقنا الفني بالرد عليك خلال 24 ساعة.');
            btn.textContent = originalText;
            btn.disabled = false;
            quoteForm.reset();
        }, 1500);
    });
}

// ============================================
// Add scroll effect to header
// ============================================
let lastScroll = 0;
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 8px 24px rgba(30, 41, 59, 0.5)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 4px 20px rgba(30, 41, 59, 0.4)';
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// Intersection Observer for Scroll Animations
// ============================================
const observerOptions = {
    threshold: 0.1, // Trigger earlier
    rootMargin: '0px 0px -20px 0px' // Less restrictive margin
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
        }
    });
}, observerOptions);

// ============================================
// Auto-Sliding Project Gallery
// ============================================
function initGallerySlider() {
    const track = document.querySelector('.slider-track');
    const items = document.querySelectorAll('.gallery-item');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!track || items.length === 0) return;

    let currentIndex = 0;
    const slideCount = items.length;

    // Create dots
    items.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(${currentIndex * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        goToSlide(currentIndex);
    }

    // Auto-slide every 4 seconds
    let slideInterval = setInterval(nextSlide, 4000);

    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 4000);
        });
    }
}

// ============================================
// Hero Background Slider with Lazy Loading
// ============================================
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const heroDynamicBtn = document.getElementById('heroHeroDynamicBtn');
    const heroTitle = document.getElementById('heroTitle');
    const heroTagline = document.getElementById('heroTagline');

    if (slides.length === 0) return;

    // Preload next slide's background image
    function preloadSlideBackground(slideIndex) {
        const slide = slides[slideIndex];
        const bgUrl = slide.getAttribute('data-bg');
        if (bgUrl && !slide.style.backgroundImage) {
            // Create a new image to preload
            const img = new Image();
            img.onload = function () {
                slide.style.backgroundImage = `url('${bgUrl}')`;
            };
            img.src = bgUrl;
        }
    }

    // Preload the next 2 slides on init (after first paint)
    setTimeout(() => {
        preloadSlideBackground(1);
        setTimeout(() => preloadSlideBackground(2), 2000);
    }, 1000);

    // Data for each hero slide - Matched to images in index.html
    const heroSlideData = [
        {
            title: "لحام احترافي لجميع المعادن",
            tagline: "نستخدم أحدث تقنيات اللحام (TIG/MIG) لضمان متانة أبدية ودقة عالية في جميع الوصلات المعدنية.",
            text: "عرض خدمات اللحام",
            link: "services.html#welding"
        },
        {
            title: "قص بالليزر فائق الدقة",
            tagline: "تكنولوجيا القص بالألياف البصرية (Fiber Laser) لقطع الأشكال الهندسية المعقدة بسماكة تصل إلى 25 مم.",
            text: "حلول القص بالليزر",
            link: "services.html#forming"
        },
        {
            title: "ثني المعادن بالتحكم الرقمي",
            tagline: "نمتلك مكابس CNC بقوة ضغط تصل إلى 400 طن لتشكيل الزوايا والقطاعات المختصة بدقة ميكرونية.",
            text: "خدمات ثني المعادن (CNC)",
            link: "services.html#forming"
        },
        {
            title: "درفلة الألواح والمواسير",
            tagline: "تصنيع الخزانات وصوامع الغلال والأنابيب بجميع الأقطار والأطوال المطلوبة باستخدام رولات هيدروليكية ضخمة.",
            text: "درفلة الألواح والمواسير",
            link: "services.html#forming"
        },
        {
            title: "قص طولي هيدروليكي",
            tagline: "ماكينات قص متطورة تضمن حوافاً مستوية ودقة تامة في الأبعاد لجميع أنواع الألواح المعدنية.",
            text: "معدات القص الهيدروليكي",
            link: "services.html#forming"
        },
        {
            title: "خراطة وتصنيع قطع الغيار",
            tagline: "تصنيع المحاور والتروس والقطع الميكانيكية المعقدة باستخدام مخارط CNC عالية الدقة والاحترافية.",
            text: "خدمات الخراطة (CNC)",
            link: "services.html#machining"
        },
        {
            title: "المكابس وتشكيل المعادن",
            tagline: "حلول متكاملة لكبس وتشكيل المعادن بقوى هيدروليكية هائلة لتلبية احتياجات الصناعات الثقيلة.",
            text: "المكابس والتشكيل",
            link: "services.html#forming"
        },
        {
            title: "الإنشاءات المعدنية الضخمة",
            tagline: "تصميم وتنفيذ الهياكل المعدنية المعقدة للمصانع والجسور والمباني الصناعية الكبرى بأمان تام.",
            text: "الإنشاءات المعدنية",
            link: "services.html#construction"
        },
        {
            title: "تشكيل الأقماع والأسطح",
            tagline: "خبرة واسعة في تنفيذ التصاميم الهندسية الخاصة والأسطح المنحنية والمعقدة بدقة ميكرونية عالية.",
            text: "تشكيل الأقماع والأسطح",
            link: "services.html#forming"
        }
    ];

    let currentHeroSlide = 0;

    function nextHeroSlide() {
        // Remove active class from current slide
        slides[currentHeroSlide].classList.remove('active');

        // Dynamic Elements Transition Out
        [heroDynamicBtn, heroTitle, heroTagline].forEach(el => {
            if (el) el.classList.add('fade-out');
        });

        currentHeroSlide = (currentHeroSlide + 1) % slides.length;

        // Preload background for next slide if using data-bg
        preloadSlideBackground(currentHeroSlide);

        // Also preload the slide after next
        const nextNextSlide = (currentHeroSlide + 1) % slides.length;
        preloadSlideBackground(nextNextSlide);

        // Add active class to next slide
        slides[currentHeroSlide].classList.add('active');

        // Update Elements Content after a short delay
        setTimeout(() => {
            const data = heroSlideData[currentHeroSlide];
            if (data) {
                if (heroTitle) heroTitle.innerHTML = data.title;
                if (heroTagline) heroTagline.innerHTML = data.tagline;
                if (heroDynamicBtn) {
                    heroDynamicBtn.href = data.link;
                    heroDynamicBtn.innerHTML = data.text;
                }
            }

            // Restore elements with fade-in
            [heroDynamicBtn, heroTitle, heroTagline].forEach(el => {
                if (el) {
                    el.classList.remove('fade-out');
                    el.classList.add('fade-in');
                    setTimeout(() => el.classList.remove('fade-in'), 600);
                }
            });
        }, 500); // Wait for fade-out to complete
    }

    // Change slide every 3 seconds as requested
    setInterval(nextHeroSlide, 3000);
}

// ============================================
// Back to Top Logic
// ============================================
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Preloader Logic - Optimized for faster FCP
// ============================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Remove preloader immediately on load - no artificial delay
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';

            // Trigger reveal for elements already in viewport after preloader
            document.querySelectorAll('.reveal').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.classList.add('reveal-active');
                }
            });
        }, 400); // Reduced from 600ms
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // Mouse Tracking for Modular Cards (Radial Glow)
    // ============================================
    document.addEventListener('mousemove', e => {
        const cards = document.querySelectorAll('.modular-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    initHeroSlider();


});

// --- INTERACTIVE DEEP DIVE LOGIC ---
const serviceDetails = {
    'arc-structures': {
        title: 'الهياكل الإنشائية والجسور',
        desc: 'نحن متخصصون في تشييد الهياكل المعدنية المعقدة للمصانع والجسور. نستخدم تقنيات لحام تضمن تغلغل المادة المنصهرة لعمق يصل إلى 20 ملم، مما يوفر متانة أبدية.',
        specs: ['تحمل أحمال تصل إلى 500 طن', 'مطابقة لمعايير السلامة ISO 9001', 'دهانات مقاومة للصدأ والظروف الجوية'],
        tableData: [
            ['التحمل الأقصى', '500 طن متري'],
            ['معايير السلامة', 'ISO 9001:2015'],
            ['نوع الحماية', 'دهانات إيبوكسي حرارية'],
            ['عمر الخدمة المتوقع', '50+ سنة']
        ],
        image: 'images3/An_industrial_scene_depicting_the_rolling_and_asse-1767034160779.webp'
    },
    'arc-heavy-plates': {
        title: 'اللحام العميق للألواح السميكة',
        desc: 'تقنيات متقدمة للحام الصفائح الفولاذية التي تتراوح سماكتها بين 10 ملم و 50 ملم. نستخدم آلات لحام أوتوماتيكية وشبه أوتوماتيكية لضمان اتساق الوصلة اللحامية.',
        specs: ['كشف بالأشعة للتأكد من خلو الفقاعات', 'لحام متعدد الطبقات للقوة القصوى', 'تجهيز حواف (Beveling) احترافي'],
        tableData: [
            ['نطاق السماكة', '10 - 50 ملم'],
            ['طرق الفحص', 'أشعة X / فوق صوتية'],
            ['تقنية اللحام', 'SAW / SMAW متعدد الطبقات'],
            ['تجهيز الحواف', 'تجهيز آلي (Beveling)']
        ],
        image: 'images3/A_hyper-realistic_industrial_scene_of_a_powerful_w-1767032910113.webp'
    },
    'tig-stainless': {
        title: 'لحام الستانلس ستيل الصحي',
        desc: 'خدمة مخصصة للصناعات الغذائية والدوائية. نستخدم غاز الأرجون عالي النتاج لضمان عدم حدوث تلوث أو أكسدة في منطقة اللحام.',
        specs: ['لحام (Back-purging) لضمان النظافة داخلياً', 'تشطيب سطحي مرآتي (Mirror Finish)', 'وصلات خالية من الثقوب المجهرية'],
        tableData: [
            ['درجة المعدن', '304L / 316L (Food Grade)'],
            ['نوع الغاز', 'أرجون نقي 99.99%'],
            ['التشطيب السطحي', 'صقل مرآتي (Ra < 0.4)'],
            ['اختبار التسريب', 'اختبار ضغط هيدروليكي']
        ],
        image: 'images/service-welding.jpg'
    },
    'mig-aluminum': {
        title: 'لحام الألمنيوم والأعمال الدقيقة',
        desc: 'اللحام بالغاز الخامل (MIG) للألمنيوم يتطلب مهارة عالية للتحكم في الحرارة. نحن نوفر تشطيباً ناعماً وقوة وصل عالية للهياكل الخفيفة.',
        specs: ['تقنية Pulse MIG للتحكم الحراري', 'سرعة تنفيذ عالية للأوزان الخفيفة', 'مثالي للديكورات والهياكل المعمارية'],
        tableData: [
            ['درجة الألمنيوم', 'سلاسل 5000 / 6000'],
            ['التقنية', 'Pulse MIG / TIG AC'],
            ['معدل التشوه', 'أدنى مستويات التشوه الحراري'],
            ['الاستخدام الأساسي', 'صناعات بحرية / معمارية']
        ],
        image: 'images/service-tig-welding.png'
    },
    'laser-precision': {
        title: 'قص الأشكال الهندسية المعقدة',
        desc: 'بفضل الحزمة الليزرية الدقيقة، يمكننا تحويل أي رسم هندسي AutoCAD إلى قطعة معدنية واقعية مهما بلغت درجة تعقيدها.',
        specs: ['دقة ميكرونية فائقة', 'خلو تام من النفايات والزوائد الحادة', 'إمكانية الحفر (Engraving) على المعدن'],
        tableData: [
            ['دقة القص', '± 0.05 ملم'],
            ['برمجيات التوافق', 'AutoCAD / SolidWorks / DXF'],
            ['جودة الحواف', 'Grade 1 (لا تحتاج تنعيم)'],
            ['خيارات إضافية', 'حفر ليزري (Marking)']
        ],
        image: 'images3/A_photorealistic_depiction_of_a_dramatic_laser_cut-1767032925979.webp'
    },
    'laser-thick': {
        title: 'قص الألواح عالية السماكة',
        desc: 'لدينا ماكينات ليزر بقدرات عالية (6000W+) قادرة على اختراق ألواح الفولاذ الكربوني والستانلس ستيل بسماكات تصل إلى 25 مم.',
        specs: ['قص الحديد الأسود حتى 25 ملم', 'قص الستانلس ستيل حتى 16 ملم', 'حواف قص مستوية لا تحتاج لصنفرة'],
        tableData: [
            ['قدرة الليزر', '6000 وات (Fiber Laser)'],
            ['سمك الحديد الأسود', 'حتى 25 ملم'],
            ['سمك الستانلس ستيل', 'حتى 16 ملم'],
            ['غاز المساعدة', 'أكسجين / نيتروجين عالي الضغط']
        ],
        image: 'images/service-laser-cutting.png'
    },
    'forming-rolls': {
        title: 'لف الأنابيب والخزانات الضخمة',
        desc: 'عملية الدرفلة (Rolling) للألواح المعدنية للحصول على أشكال أسطوانية أو مخروطية. مثالية لتصنيع صوامع الغلال وخزانات الوقود الكبيرة.',
        specs: ['لف أقطار تصل إلى 4 أمتار', 'دقة عالية في الدائرة (Roundness)', 'لحام طولي أوتوماتيكي متين'],
        tableData: [
            ['القطر الأقصى', '4000 ملم'],
            ['نظام الدرفلة', '3 رولات هيدروليكية'],
            ['قدرة الثني', 'حتى سمك 20 ملم'],
            ['تطبيقات', 'صوامع / خزانات ضغط']
        ],
        image: 'images3/A_powerful_industrial_plate_rolling_machine_in_a_f-1767034143051.webp'
    },
    'forming-angles': {
        title: 'ثني الزوايا والقطاعات المختصة',
        desc: 'تجهيز القطاعات المعدنية (Angles, Channels, Beams) بدقة عالية لدعم المنشآت الهندسية.',
        specs: ['ثني زوايا حتى 90 درجة بدقة متناهية', 'استخدام مكابس CNC هيدروليكية', 'تشكيل قطاعات مخصصة للعملاء'],
        tableData: [
            ['زاوية الثني القصوى', '135 درجة'],
            ['طول الثنية', 'حتى 4000 ملم'],
            ['القوة الضاغطة', '400 طن هيدروليكي'],
            ['نوع التحكم', 'CNC كامل']
        ],
        image: 'images3/A_CNC_bending_machine_Ermaksan_3100_standing_pro-1767034490452.webp'
    },
    'cnc-gears': {
        title: 'تصنيع محاور وتروس مخصصة',
        desc: 'نحن نصنع التروس (Gears) والمحاور (Axes) حسب الطلب باستخدام مخارط CNC دقيقة. نضمن توافقاً تاماً مع الماكينات الصناعية الدولية.',
        specs: ['إنتاج تروس مسننة وحلزونية', 'موازنة حركية (Dynamic Balancing)', 'تصلح للآلات الثقيلة وخطوط الإنتاج'],
        tableData: [
            ['دقة الخراطة', 'IT6 - IT7'],
            ['أقصى قطر تشغيل', '500 ملم'],
            ['أنواع التروس', 'Spur / Helical / Worm'],
            ['المعالجة الحرارية', 'حسب متطلبات العميل']
        ],
        image: 'images3/A_dynamic_industrial_scene_focused_on_a_powerful_h-1767034479176.webp'
    },
    'mechanical-repair': {
        title: 'تعديل وخرط القطع التالفة',
        desc: 'بدلاً من شراء قطع غيار مكلفة، نقوم بترميم وتجديد الأجزاء الميكانيكية المتآكلة وإعادتها لحالتها الأصلية بدقة تصنيعية.',
        specs: ['بناء الأسطح المتآكلة باللحام ثم خرطها', 'استعادة الأبعاد الأصلية (Standard Size)', 'توفير تكاليف شراء قطع الغيار بنسبة 60%'],
        tableData: [
            ['توفير التكاليف', '40% - 60% من سعر الجديد'],
            ['طريقة التعمير', 'بناء باللحام + خراطة دقيقة'],
            ['الضمان', 'ضمان تشغيل كامل'],
            ['السرعة', 'إصلاح عاجل لتقليل التوقف']
        ],
        image: 'images/project-machining.png'
    },
    'food-tanks': {
        title: 'خزانات الحليب والمواد السائلة',
        desc: 'خزانات مصنوعة من الستانلس ستيل 316L المقاوم للأحماض. تصميم هندسي يمنع ركود السوائل ويضمن سهولة التنظيف الآلي (CIP).',
        specs: ['عزل حراري مزدوج', 'قواعد صلبة مقاومة للاهتزاز', 'وصلات وتوصيلات صحية معتمدة'],
        tableData: [
            ['السعات المتاحة', '500 لتر - 50,000 لتر'],
            ['العزل', 'فوم بولي يوريثان عالي الكثافة'],
            ['نظام التنظيف', 'كرات رش CIP مدمجة'],
            ['نوع المعدن', 'SS316L']
        ],
        image: 'images/service-tanks.jpg'
    },
    'pharma-sterile': {
        title: 'معدات التعقيم والخلط الدوائي',
        desc: 'تصنيع منظومات دوائية مطابقة لمعايير GMP العالمية. نستخدم الستانلس ستيل فئة 316L مع تشطيب سطحي فائق النعومة (Elecro-polishing) لمنع تراكم البكتيريا.',
        specs: ['مطابق لمعايير GMP و FDA', 'لحام أرجون نقي 100%', 'معدل نعومة سطح RA < 0.4'],
        tableData: [
            ['الشهادات', 'مطابق لمعايير FDA / GMP'],
            ['تشطيب السطح', 'Electropolished (Ra<0.4µm)'],
            ['نوع اللحام', 'Ar-Orbital Welding'],
            ['الاختبارات', 'DQ/IQ/OQ Validation Support']
        ],
        image: 'images/project-tanks.png'
    },
    'construction-hangars': {
        title: 'تصميم وتوريد الهناجر المتكاملة',
        desc: 'نقوم ببناء الهناجر المعدنية للمصانع والورش بأحدث أنظمة التثبيت. هياكلنا مصممة لتتحمل سرعات رياح عالية وأحمال ثلجية، مع توفير عزل حراري متطور.',
        specs: ['فتحات واسعة بدون أعمدة داخلية', 'أسقف معزولة (Sandwich Panels)', 'سرعة فائقة في التركيب الميداني'],
        tableData: [
            ['الفتحات (Span)', 'حتى 40 متر بدون أعمدة'],
            ['مقاومة الرياح', 'حتى 120 كم/ساعة'],
            ['نوع الطلاء', 'جلفنة حرارية / بولي يوريثان'],
            ['وقت التركيب', 'سريع (Prefabricated Structures)']
        ],
        image: 'images/hero-1.jpg'
    },
    'construction-fences': {
        title: 'الأسوار المعدنية والمنشآت الأمنية',
        desc: 'تصنيع وتركيب أسوار أمنية عالية التحمل للمنشآت الحيوية. نستخدم شبكات معدنية مقوات ودهانات حرارية مقاومة للتآكل.',
        specs: ['تصاميم أمنية متدرجة القوة', 'مقاومة عالية لمحاولات الاقتراق', 'تشطيبات جمالية تناسب المباني الإدارية'],
        tableData: [
            ['الارتفاعات', '1.5 متر - 4 متر'],
            ['الحماية', 'أسلاك شائكة / حساسات اهتزاز'],
            ['المتانة', 'مقاوم للصدأ 15+ سنة'],
            ['التصميم', 'أمني حديث / زخرفي']
        ],
        image: 'images/service-hangars.png'
    },
    'maintenance-preventive': {
        title: 'برامج الصيانة الدورية والوقائية',
        desc: 'نقدم عقود صيانة سنوية تضمن بقاء خطوط إنتاجكم في أفضل حالاتها. نقوم بفحص الوصلات والتروس واللحامات بشكل دوري لتجنب التوقف المفاجئ.',
        specs: ['فحص هيكلي شامل كل 6 أشهر', 'تزييت وتشحيم الأجزاء المتحركة', 'تقرير فني مفصل بعد كل زيارة'],
        tableData: [
            ['نوع العقد', 'سنوي / نصف سنوي'],
            ['الخدمات', 'تشحيم / فحص لحامات / معايرة'],
            ['التقارير', 'سجل صيانة رقمي متكامل'],
            ['الأولوية', 'أولوية قصوى لقطع الغيار']
        ],
        image: 'images/service-machining.jpg'
    },
    'maintenance-emergency': {
        title: 'فرق الطوارئ للإصلاح الفني السريع',
        desc: 'نتفهم مدى أهمية استمرارية الإنتاج، لذا نوفر فرق طوارئ مجهزة بأحدث أدوات اللحام والخرط المحمولة للتعامل مع الأعطال في موقع العميل.',
        specs: ['استجابة سريعة خلال ساعات قليلة', 'إصلاح ميداني لأعطال الهياكل', 'إمكانية توفير قطع غيار مؤقتة'],
        tableData: [
            ['وقت الاستجابة', 'خلال 4-8 ساعات'],
            ['نطاق الحركة', 'جميع أنحاء اليمن'],
            ['المعدات', 'معدات ورشة محمولة متكاملة'],
            ['الدعم', 'دعم فني 24/7']
        ],
        image: 'images/service-maintenance.png'
    }
};

const modal = document.getElementById('serviceModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementById('closeModal');
const triggers = document.querySelectorAll('.deep-dive-trigger');

function openModal(serviceKey) {
    if (!modal || !modalContent) {
        console.warn('Modal components not found in this page');
        return;
    }

    const data = serviceDetails[serviceKey];
    if (!data) return;

    modalContent.innerHTML = `
        <div class="modal-detail-view">
            <div class="modal-image">
                <img src="${data.image}" alt="${data.title}">
            </div>
            <div class="modal-info">
                <h2>${data.title}</h2>
                <div class="modal-body-section">
                    <h4>الوصف:</h4>
                    <p>${data.desc}</p>
                </div>
                <div class="tech-specs">
                    <h4>المواصفات الفنية المتقدمة:</h4>
                    <div class="specs-table-container">
                        <table class="specs-table">
                            <tbody>
                                ${data.tableData.map(row => `
                                    <tr>
                                        <td class="spec-label">${row[0]}</td>
                                        <td class="spec-value">${row[1]}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-cta">
                    <a href="https://wa.me/967736499765" target="_blank" class="cta-button primary">طلب عرض سعر مباشر</a>
                </div>
            </div>
        </div>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer initialization
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Deep Dive Modal Triggers (Static)
    const staticTriggers = document.querySelectorAll('.deep-dive-trigger');
    staticTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const key = trigger.getAttribute('data-service');
            openModal(key);
        });
    });

    // Close Modal Logic
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Hover effect for cards
    document.querySelectorAll('.service-item, .why-card, .quality-card, .specialty-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

function handleServiceRouting() {
    // التحقق مما إذا كنا في صفحة الخدمات
    const servicesPage = document.body.classList.contains('services-page');
    if (!servicesPage) return;

    // CRITICAL: Prevent browser's default hash scrolling behavior
    // This must happen BEFORE any layout calculations
    const hasHash = window.location.hash;
    if (hasHash) {
        // Store the hash before removing it
        const targetHash = window.location.hash.substring(1).toLowerCase();

        // Temporarily remove hash to prevent browser auto-scroll
        history.replaceState(null, null, window.location.pathname);

        // Force scroll to top immediately
        window.scrollTo(0, 0);

        // Restore hash after a tiny delay
        setTimeout(() => {
            history.replaceState(null, null, '#' + targetHash);
        }, 50);
    }

    const hash = hasHash ? hasHash.substring(1).toLowerCase() : '';
    const detailSection = document.getElementById('services-detail-section');
    const contentWrapper = document.getElementById('services-content-wrapper');
    const serviceItems = document.querySelectorAll('.service-detail-item');
    const pageTitle = document.getElementById('service-page-title');
    const pageDesc = document.getElementById('service-page-desc');
    const serviceTabs = document.querySelectorAll('#servicesCategoryTabs .category-tab');

    // Default to 'all' if no hash
    const currentCategory = hash || 'all';

    // Toggle Grid Layout Class
    if (contentWrapper) {
        if (currentCategory === 'all') {
            contentWrapper.classList.add('grid-layout');
        } else {
            contentWrapper.classList.remove('grid-layout');
        }
    }

    // Update Tabs UI
    serviceTabs.forEach(tab => {
        const category = tab.getAttribute('data-category');
        tab.classList.toggle('active', category === currentCategory);
    });

    if (currentCategory === 'all') {
        // Show all services
        if (detailSection) detailSection.style.display = 'block';

        // CRITICAL: Force show the wrapper immediately
        if (contentWrapper) {
            contentWrapper.classList.add('reveal-active');
            contentWrapper.style.opacity = '1';
            contentWrapper.style.visibility = 'visible';
            contentWrapper.style.transform = 'translateY(0)';
        }

        serviceItems.forEach(item => {
            item.style.display = 'block';
            item.classList.add('reveal-active'); // Force visible immediately
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.visibility = 'visible';
        });
        if (pageTitle) pageTitle.textContent = 'خدماتنا الشاملة';
        if (pageDesc) pageDesc.textContent = 'نقدم حلولاً صناعية متكاملة تلبي جميع احتياجاتكم بآحدث التقنيات';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Show specific category or sub-feature
        let found = false;

        // CRITICAL: Force show the wrapper immediately
        if (contentWrapper) {
            contentWrapper.classList.add('reveal-active');
            contentWrapper.style.opacity = '1';
            contentWrapper.style.visibility = 'visible';
            contentWrapper.style.transform = 'translateY(0)';
        }

        serviceItems.forEach(item => {
            const targetEl = document.getElementById(currentCategory);
            // Match main category ID or sub-feature ID inside the card
            if (item.id === currentCategory || (targetEl && item.contains(targetEl))) {
                item.style.display = 'block';
                item.classList.add('reveal-active'); // Bypass observer for deep links
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                item.style.visibility = 'visible';

                // Update page title if it's a main category match
                if (item.id === currentCategory) {
                    const h2 = item.querySelector('h2');
                    if (h2 && pageTitle) pageTitle.textContent = h2.textContent;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (targetEl) {
                    // Precision scroll to sub-feature
                    // Increase delay and use requestAnimationFrame to ensure layout is fully settled
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            const headerHeight = 100; // Account for fixed header
                            const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;

                            // Increase offset to 750px to ensure the element is lower on the screen (more space above)
                            const offsetPosition = elementPosition - headerHeight - 350;

                            window.scrollTo({
                                top: Math.max(0, offsetPosition),
                                behavior: 'smooth'
                            });

                            // Add a more prominent highlight effect
                            targetEl.style.transition = 'all 0.5s ease';
                            targetEl.style.outline = '4px solid rgba(255,138,0,0.5)';
                            targetEl.style.outlineOffset = '10px';
                            targetEl.style.borderRadius = '8px';

                            setTimeout(() => {
                                targetEl.style.outline = 'none';
                            }, 3000);
                        });
                    }, 250);
                }

                found = true;
            } else {
                item.style.display = 'none';
            }
        });

        if (!found) {
            window.location.hash = 'all';
            return;
        }
    }
}

// Add event listeners for the new navigation tabs
document.addEventListener('DOMContentLoaded', () => {
    // Index page navigation cards logic (legacy but preserved if needed)
    const navCards = document.querySelectorAll('.service-nav-card');
    navCards.forEach(card => {
        card.addEventListener('click', () => {
            const service = card.getAttribute('data-service');
            window.location.hash = service;
        });
    });

    // Services page ribbon tabs logic
    const serviceRibbonTabs = document.querySelectorAll('#servicesCategoryTabs .category-tab');
    serviceRibbonTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            window.location.hash = category;
        });
    });
});

// تشغيل الوظيفة عند تحميل الصفحة وعند تغير الهاش
window.addEventListener('load', handleServiceRouting);
window.addEventListener('hashchange', handleServiceRouting);

// ============================================
// Console welcome message
// ============================================
console.log('%c الأهرام للصناعات والتشكيلات المعدنية ', 'background: linear-gradient(135deg, #0f4c75, #1b6ca8); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
console.log('%c خبراء في لحام وتشكيل جميع أنواع المعادن ', 'color: #f59e0b; font-size: 14px; font-weight: bold;');

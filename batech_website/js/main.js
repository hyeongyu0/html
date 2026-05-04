/**
 * B-A-Tech Corporate Website Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Sticky Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Adjust scroll position for fixed header
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Scroll Animation (Fade-in up) with Intersection Observer
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you only want it to animate once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Trigger initial check for elements already in viewport
    setTimeout(() => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);

    // 5. Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const resetFormBtn = document.getElementById('resetFormBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic Validation
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !phone || !message) {
                alert('필수 항목(* 표시)을 모두 입력해주세요.');
                return;
            }

            // In a real application, you would send data to a server via fetch/XHR here.
            // Simulating API call with timeout
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '전송 중...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.style.display = 'none';
                successMessage.classList.remove('hidden');
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 1000);
        });
    }

    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', () => {
            successMessage.classList.add('hidden');
            contactForm.style.display = 'block';
        });
    }
});

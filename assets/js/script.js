document.addEventListener('DOMContentLoaded', function() {

    /* ===============================
        FOOTER FUNCTIONALITY
    =============================== */
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    const existingBackToTop = document.querySelector('.back-to-top');
    if (existingBackToTop) existingBackToTop.remove();

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) newsletterForm.remove();



    /* ===============================
        TESTIMONIAL SLIDER
    =============================== */
    class TestimonialSlider {
        constructor() {
            this.slides = document.querySelectorAll('.testimonial-slide');
            this.dots = document.querySelectorAll('.dot');
            this.prevBtn = document.querySelector('.slider-prev');
            this.nextBtn = document.querySelector('.slider-next');
            this.currentIndex = 0;
            this.autoSlideInterval = null;
            this.autoSlideDelay = 5000;

            this.init();
        }

        init() {
            if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
            if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());

            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });

            this.startAutoSlide();

            const sliderContainer = document.querySelector('.slider-container');
            if (sliderContainer) {
                sliderContainer.addEventListener('mouseenter', () => this.stopAutoSlide());
                sliderContainer.addEventListener('mouseleave', () => this.startAutoSlide());
            }
        }

        showSlide(index) {
            this.slides.forEach(slide => slide.classList.remove('active'));
            this.dots.forEach(dot => dot.classList.remove('active'));

            this.slides[index].classList.add('active');
            this.dots[index].classList.add('active');
            this.currentIndex = index;
        }

        nextSlide() {
            let nextIndex = this.currentIndex + 1;
            if (nextIndex >= this.slides.length) nextIndex = 0;
            this.showSlide(nextIndex);
        }

        prevSlide() {
            let prevIndex = this.currentIndex - 1;
            if (prevIndex < 0) prevIndex = this.slides.length - 1;
            this.showSlide(prevIndex);
        }

        goToSlide(index) {
            this.showSlide(index);
        }

        startAutoSlide() {
            this.stopAutoSlide();
            this.autoSlideInterval = setInterval(() => this.nextSlide(), this.autoSlideDelay);
        }

        stopAutoSlide() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
                this.autoSlideInterval = null;
            }
        }
    }

    if (document.querySelector('.testimonial-slider')) {
        new TestimonialSlider();
    }



    /* ===============================
        MOBILE MENU TOGGLE
    =============================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

});
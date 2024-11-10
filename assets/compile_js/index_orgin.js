document.addEventListener('DOMContentLoaded', () => {
    const landingContentEl = document.getElementById('landing_content');
    if (!landingContentEl) {
        return false;
    }
    const swiperEls = document.getElementsByClassName('main_swiper');
    if (swiperEls.length) {
        const swiperMain = new Swiper('.main_swiper', {
            loop: true,
            centeredSlides: true,
            slidesPerView: 1.16,
            speed: 2000,
            spaceBetween: 5,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                hideOnClick: false,
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {},
            },
        });
    }
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.css-section').forEach(section => {
            const sectionEl = section;
            const height = sectionEl.offsetHeight +
                parseInt(getComputedStyle(sectionEl).marginTop) +
                parseInt(getComputedStyle(sectionEl).marginBottom) +
                parseInt(getComputedStyle(sectionEl).paddingTop);
            const calcHeight = `-${height * 100 / 1000}vh`;
            sectionEl.style.top = calcHeight;
        });
    }
    const target = landingContentEl.querySelectorAll('.js-fadeIn,.js-zoom,.js-clip,.js-width,.js-fadeInBottom,.js-fadeInLeft,.js-fadeInRightBottom,.js-fadeInTopLeft,.js-fadeInTopRight');
    const observer = new IntersectionObserver((entries) => {
        for (const value of entries) {
            const element = value.target;
            if (value.isIntersecting === true) {
                classFindActive(element, 'js-fadeIn');
                classFindActive(element, 'js-width');
                classFindActive(element, 'js-zoom');
                classFindActive(element, 'js-clip');
                classFindActive(element, 'js-fadeInBottom');
                classFindActive(element, 'js-fadeInLeft');
                classFindActive(element, 'js-fadeInRightBottom');
                classFindActive(element, 'js-fadeInTopRight');
                classFindActive(element, 'js-fadeInTopLeft');
            }
        }
    }, {
        rootMargin: '-20% 0px',
        threshold: [0]
    });
    target.forEach((tgt) => {
        observer.observe(tgt);
    });
    const headerElement = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            headerElement === null || headerElement === void 0 ? void 0 : headerElement.classList.add("off");
        }
        else {
            headerElement === null || headerElement === void 0 ? void 0 : headerElement.classList.remove("off");
        }
    });
});
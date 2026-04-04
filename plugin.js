/**
 * ===================================================================
 * ФАЙЛ: plugin.js
 * ОПИСАНИЕ: JavaScript функционал для сайта Elitium Studios (Адаптивная версия)
 * АВТОР: XopeRiys
 * ===================================================================
 */

(function($) {
    "use strict";
    
    // ========== БЛОК 1: ПРЕЛОАДЕР (ЭКРАН ЗАГРУЗКИ) ==========
    setTimeout(function() { 
        $('#preloader').addClass('hidden'); 
    }, 1500);
    
    setTimeout(function() {
        $('.logo, .menu-trigger, .under-construction').removeClass('top-position');
        $('.social-icons-wrapper').removeClass('bottom-position');
        $('.line-right').removeClass('right-position');
    }, 200);
    
    // ========== БЛОК 2: НАВИГАЦИЯ МЕЖДУ СТРАНИЦАМИ ==========
    const pages = {
        home: $('#home-page'),
        packs: $('#packs-page'),
        content: $('#content-page'),
        contact: $('#contact-page')
    };
    
    function updateScrollOverflow(pageId) {
        if (pageId === 'home') {
            $('.scroll-area').addClass('home-active');
        } else {
            $('.scroll-area').removeClass('home-active');
        }
    }
    
    function switchToPage(pageId) {
        $('.page-content').removeClass('active-page');
        pages[pageId].addClass('active-page');
        updateScrollOverflow(pageId);
        $('#scrollArea').scrollTop(0);
    }
    
    let hoverTimeout = null;
    
    $('#nav-menu a').on('mouseenter touchstart', function(e) {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        
        hoverTimeout = setTimeout(() => {
            let page = $(this).data('page');
            if(page && pages[page]) {
                $('#nav-menu a').removeClass('active');
                $(this).addClass('active');
                switchToPage(page);
            }
        }, 150);
    });
    
    $('#nav-menu').on('mouseleave', function() {
        if (hoverTimeout) clearTimeout(hoverTimeout);
    });
    
    switchToPage('home');
    
    // ========== БЛОК 3: КАРУСЕЛЬ ДЛЯ ДОНАТОВ ==========
    let donateSlides = $('.donate-slide');
    let donateCurrent = 0;
    let donateTotal = donateSlides.length;
    
    function updateDonateCarousel() {
        donateSlides.removeClass('active');
        donateSlides.eq(donateCurrent).addClass('active');
    }
    
    if(donateTotal > 0) {
        updateDonateCarousel();
        let donateInterval = setInterval(function() {
            donateCurrent = (donateCurrent + 1) % donateTotal;
            updateDonateCarousel();
        }, 4000);
        
        $('#donateCarousel').on('mouseenter touchstart', function() { 
            clearInterval(donateInterval); 
        });
        $('#donateCarousel').on('mouseleave touchend', function() {
            donateInterval = setInterval(function() {
                donateCurrent = (donateCurrent + 1) % donateTotal;
                updateDonateCarousel();
            }, 4000);
        });
    }
    
    // ========== БЛОК 4: КАРУСЕЛЬ ДЛЯ СКРИНШОТОВ (PACKS) ==========
    let currentSlide = 0;
    const slides = $('#carouselSlides .carousel-slide');
    const totalSlides = slides.length;
    
    function updateCarousel() {
        slides.removeClass('active').eq(currentSlide).addClass('active');
        $('.dot').removeClass('active').eq(currentSlide).addClass('active');
    }
    
    $('#packsPrevBtn').on('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
    
    $('#packsNextBtn').on('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });
    
    let dotsContainer = $('#packsCarouselDots');
    for(let i = 0; i < totalSlides; i++) {
        dotsContainer.append('<span class="dot"></span>');
    }
    
    $('.dot').on('click', function() {
        currentSlide = $(this).index();
        updateCarousel();
    });
    
    updateCarousel();
    
    let autoInterval = setInterval(function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000);
    
    $('#packs-carousel-container').on('mouseenter touchstart', function() { 
        clearInterval(autoInterval); 
    });
    $('#packs-carousel-container').on('mouseleave touchend', function() {
        autoInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    });
    
    // ========== БЛОК 5: ВЫДВИЖНОЕ МЕНЮ ==========
    let menu = $('#menu');
    let menuWrapper = $('#menu-wrapper');
    let mainMenu = $('#main-menu');
    let closeTimeout = null;
    
    menu.on('mouseenter touchstart', function() {
        if(closeTimeout) clearTimeout(closeTimeout);
        mainMenu.addClass('activated');
        $('.lines-button .lines, #main-menu-caller1, .menu-label').addClass('lines-close');
        menuWrapper.show();
    });
    
    menuWrapper.on('mouseleave touchend', function() {
        closeTimeout = setTimeout(function() {
            mainMenu.removeClass('activated');
            $('.lines-button .lines, #main-menu-caller1, .menu-label').removeClass('lines-close');
            menuWrapper.hide();
        }, 150);
    });
    
    menuWrapper.on('mouseenter touchstart', function() {
        if(closeTimeout) clearTimeout(closeTimeout);
    });
    
    // ========== БЛОК 6: КЕНБЁРНС ЭФФЕКТ ДЛЯ ФОНА ==========
    let bgSlides = $('.kenburnsy .slide');
    let bgIndex = 0;
    
    setInterval(function() {
        bgSlides.css('opacity', '0');
        bgSlides.eq(bgIndex).css('opacity', '1');
        bgIndex = (bgIndex + 1) % bgSlides.length;
    }, 6000);
    
    // ========== БЛОК 7: ДИНАМИЧЕСКАЯ АДАПТАЦИЯ ДЛЯ МОБИЛЬНЫХ ==========
    function adjustForMobile() {
        const width = $(window).width();
        const warning = $('.under-construction');
        
        if (width <= 880) {
            if (!warning.hasClass('mobile-optimized')) {
                warning.addClass('mobile-optimized');
            }
            if (width <= 640) {
                warning.css({
                    'font-size': '0.65rem',
                    'padding': '5px 10px',
                    'top': '8px'
                });
            }
        } else {
            if (warning.hasClass('mobile-optimized')) {
                warning.removeClass('mobile-optimized');
            }
            warning.css({
                'font-size': '',
                'padding': '',
                'top': ''
            });
        }
    }
    
    $(window).on('load resize orientationchange', function() {
        adjustForMobile();
    });
    
    function checkOverlap() {
        const warning = $('.under-construction')[0];
        const menu = $('.menu-trigger')[0];
        
        if (warning && menu) {
            const warningRect = warning.getBoundingClientRect();
            const menuRect = menu.getBoundingClientRect();
            
            if (!(warningRect.right < menuRect.left || 
                  warningRect.left > menuRect.right || 
                  warningRect.bottom < menuRect.top || 
                  warningRect.top > menuRect.bottom)) {
                if ($(window).width() <= 640) {
                    $('.under-construction').css('top', '5px');
                }
            }
        }
    }
    
    setInterval(checkOverlap, 100);
    
    // ========== БЛОК 8: ОБРАБОТКА СЕНСОРНОГО ВВОДА ==========
    if('ontouchstart' in window) {
        $('.btn-download-all, .carousel-prev, .carousel-next, .lang-item, .social-icons a, .menu-trigger').on('touchstart', function() {
            $(this).addClass('touch-active');
        }).on('touchend', function() {
            setTimeout(() => $(this).removeClass('touch-active'), 150);
        });
    }
    
})(jQuery);

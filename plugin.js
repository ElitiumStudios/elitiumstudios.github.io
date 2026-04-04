(function($) {
    "use strict";
    
    // ПРЕЛОАДЕР
    setTimeout(function() { 
        $('#preloader').addClass('hidden'); 
    }, 1500);
    
    setTimeout(function() {
        $('.logo, .menu-trigger, .under-construction').removeClass('top-position');
        $('.social-icons-wrapper').removeClass('bottom-position');
        $('.line-right').removeClass('right-position');
    }, 200);
    
    // НАВИГАЦИЯ
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
    
    // КАРУСЕЛЬ ДОНАТОВ
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
    
    // КАРУСЕЛЬ СКРИНШОТОВ
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
    
    // ========== МЕНЮ: ДЕСКТОП - ПО НАВЕДЕНИЮ, МОБИЛЬНЫЕ - ПО КЛИКУ ==========
    let menu = $('#menu');
    let menuWrapper = $('#menu-wrapper');
    let mainMenu = $('#main-menu');
    let menuOverlay = $('#menu-overlay');
    let closeTimeout = null;
    
    // Проверка на мобильное устройство
    function checkIsMobile() {
        return window.innerWidth <= 880;
    }
    
    // Функция открытия меню
    function openMenu() {
        if (closeTimeout) clearTimeout(closeTimeout);
        mainMenu.addClass('activated');
        $('.lines-button .lines, #main-menu-caller1, .menu-label').addClass('lines-close');
        menuWrapper.show();
        if (menuOverlay.length) menuOverlay.show();
        document.body.style.overflow = 'hidden';
    }
    
    // Функция закрытия меню
    function closeMenu() {
        mainMenu.removeClass('activated');
        $('.lines-button .lines, #main-menu-caller1, .menu-label').removeClass('lines-close');
        menuWrapper.hide();
        if (menuOverlay.length) menuOverlay.hide();
        document.body.style.overflow = '';
    }
    
    // ДЕСКТОП: открытие по наведению
    menu.on('mouseenter', function() {
        if (!checkIsMobile()) {
            openMenu();
        }
    });
    
    // МОБИЛЬНЫЕ: открытие/закрытие по клику
    menu.on('click', function(e) {
        e.stopPropagation();
        if (checkIsMobile()) {
            if (mainMenu.hasClass('activated')) {
                closeMenu();
            } else {
                openMenu();
            }
        }
    });
    
    // Закрытие при уходе мыши (только для десктопа)
    menuWrapper.on('mouseleave', function() {
        if (!checkIsMobile()) {
            closeTimeout = setTimeout(function() {
                closeMenu();
            }, 150);
        }
    });
    
    menuWrapper.on('mouseenter', function() {
        if (closeTimeout) clearTimeout(closeTimeout);
    });
    
    // КНОПКА ЗАКРЫТИЯ (КРЕСТИК) - работает на всех устройствах
    $('#menuCloseBtn').on('click', function(e) {
        e.stopPropagation();
        closeMenu();
    });
    
    // Закрытие по клику на оверлей
    if (menuOverlay.length) {
        menuOverlay.on('click', function(e) {
            e.stopPropagation();
            closeMenu();
        });
    }
    
    // Закрытие по нажатию на пункт меню (на мобильных)
    $('#nav-menu a').on('click', function() {
        if (checkIsMobile()) {
            setTimeout(function() {
                closeMenu();
            }, 300);
        }
    });
    
    // Закрытие по кнопке ESC
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && mainMenu.hasClass('activated')) {
            closeMenu();
        }
    });
    
    // Обновление при изменении размера окна
    $(window).on('resize', function() {
        if (!checkIsMobile() && mainMenu.hasClass('activated')) {
            // Если стали десктопом с открытым меню - оставляем открытым
        } else if (checkIsMobile() && mainMenu.hasClass('activated')) {
            // На мобильных оставляем как есть
        }
    });
    
    // ФОНОВЫЙ СЛАЙДЕР
    let bgSlides = $('.kenburnsy .slide');
    let bgIndex = 0;
    
    setInterval(function() {
        bgSlides.css('opacity', '0');
        bgSlides.eq(bgIndex).css('opacity', '1');
        bgIndex = (bgIndex + 1) % bgSlides.length;
    }, 6000);
    
    // АДАПТАЦИЯ ДЛЯ МОБИЛЬНЫХ
    function adjustForMobile() {
        const width = $(window).width();
        const warning = $('.under-construction');
        const logo = $('.logo');
        const menuTrigger = $('.menu-trigger');
        
        if (width <= 880) {
            warning.css({ 'top': '8px', 'padding': '4px 12px' });
            if (width <= 640) {
                logo.css('top', '10px');
                menuTrigger.css('top', '8px');
            } else {
                logo.css('top', '12px');
                menuTrigger.css('top', '10px');
            }
        } else {
            warning.css({ 'top': '', 'padding': '' });
            logo.css('top', '');
            menuTrigger.css('top', '');
        }
    }
    
    $(window).on('load resize orientationchange', function() {
        adjustForMobile();
    });
    
    // ПРОВЕРКА ПЕРЕКРЫТИЯ
    function checkOverlap() {
        const warning = $('.under-construction')[0];
        const menuBtn = $('.menu-trigger')[0];
        const logo = $('.logo')[0];
        
        if (warning && menuBtn && logo) {
            const warningRect = warning.getBoundingClientRect();
            const menuRect = menuBtn.getBoundingClientRect();
            const logoRect = logo.getBoundingClientRect();
            
            const overlapsMenu = !(warningRect.right < menuRect.left || 
                                   warningRect.left > menuRect.right || 
                                   warningRect.bottom < menuRect.top || 
                                   warningRect.top > menuRect.bottom);
            
            const overlapsLogo = !(warningRect.right < logoRect.left || 
                                   warningRect.left > logoRect.right || 
                                   warningRect.bottom < logoRect.top || 
                                   warningRect.top > logoRect.bottom);
            
            if (overlapsMenu || overlapsLogo) {
                $('.under-construction').css('top', '5px');
                if ($(window).width() <= 640) {
                    $('.under-construction .warning-text').css('font-size', '0.5rem');
                }
            }
        }
    }
    
    setInterval(checkOverlap, 100);
    
    // СЕНСОРНОЕ УПРАВЛЕНИЕ
    if('ontouchstart' in window) {
        $('.btn-download-all, .carousel-prev, .carousel-next, .lang-item, .social-icons a, .menu-trigger').on('touchstart', function() {
            $(this).addClass('touch-active');
        }).on('touchend', function() {
            setTimeout(() => $(this).removeClass('touch-active'), 150);
        });
    }
    
})(jQuery);

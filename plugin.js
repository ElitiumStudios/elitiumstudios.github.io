/**
 * ===================================================================
 * ФАЙЛ: plugin.js
 * ОПИСАНИЕ: JavaScript функционал для сайта Elitium Studios
 * АВТОР: XopeRiys
 * ===================================================================
 */

(function($) {
    "use strict";
    
    // ========== БЛОК 1: ПРЕЛОАДЕР (ЭКРАН ЗАГРУЗКИ) ==========
    // Скрываем прелоадер через 1.5 секунды после загрузки страницы
    setTimeout(function() { 
        $('#preloader').addClass('hidden'); 
    }, 1500);
    
    // Анимация появления элементов после загрузки
    setTimeout(function() {
        $('.logo, .menu-trigger, .under-construction').removeClass('top-position');
        $('.social-icons-wrapper').removeClass('bottom-position');
        $('.line-right').removeClass('right-position');
    }, 200);
    
// ========== БЛОК 2: НАВИГАЦИЯ МЕЖДУ СТРАНИЦАМИ (ПРИ НАВЕДЕНИИ) ==========
// Объект со всеми страницами
const pages = {
    home: $('#home-page'),
    packs: $('#packs-page'),
    content: $('#content-page'),
    contact: $('#contact-page')
};

// Функция обновления прокрутки
function updateScrollOverflow(pageId) {
    if (pageId === 'home') {
        $('.scroll-area').addClass('home-active');
    } else {
        $('.scroll-area').removeClass('home-active');
    }
}

// Функция переключения страниц
function switchToPage(pageId) {
    // Убираем класс active-page у всех страниц
    $('.page-content').removeClass('active-page');
    // Добавляем класс активной странице
    pages[pageId].addClass('active-page');
    // Обновляем прокрутку
    updateScrollOverflow(pageId);
    // Прокручиваем вверх
    $('#scrollArea').scrollTop(0);
}

// Переменная для debounce (чтобы не переключалось слишком часто)
let hoverTimeout = null;

// Обработчик наведения на пункты меню
$('#nav-menu a').on('mouseenter', function(e) {
    // Очищаем предыдущий таймер
    if (hoverTimeout) clearTimeout(hoverTimeout);
    
    // Небольшая задержка перед переключением (чтобы случайное наведение не переключало)
    hoverTimeout = setTimeout(() => {
        let page = $(this).data('page');
        if(page && pages[page]) {
            // Обновляем активный пункт меню
            $('#nav-menu a').removeClass('active');
            $(this).addClass('active');
            // Переключаем страницу
            switchToPage(page);
        }
    }, 150);
});

// Если мышь уходит с меню - отменяем переключение
$('#nav-menu').on('mouseleave', function() {
    if (hoverTimeout) clearTimeout(hoverTimeout);
});

// При загрузке страницы - главная активна
switchToPage('home');
    // ========== БЛОК 3: КАРУСЕЛЬ ДЛЯ ДОНАТОВ ==========
    let donateSlides = $('.donate-slide');
    let donateCurrent = 0;
    let donateTotal = donateSlides.length;
    
    // Функция обновления активного слайда
    function updateDonateCarousel() {
        donateSlides.removeClass('active');
        donateSlides.eq(donateCurrent).addClass('active');
    }
    
    // Запускаем карусель, если есть слайды
    if(donateTotal > 0) {
        updateDonateCarousel();
        // Автоматическая смена слайдов каждые 4 секунды
        let donateInterval = setInterval(function() {
            donateCurrent = (donateCurrent + 1) % donateTotal;
            updateDonateCarousel();
        }, 4000);
        
        // Останавливаем автопрокрутку при наведении мыши
        $('#donateCarousel').on('mouseenter', function() { 
            clearInterval(donateInterval); 
        });
        // Возобновляем автопрокрутку при уходе мыши
        $('#donateCarousel').on('mouseleave', function() {
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
    
    // Функция обновления активного слайда в галерее
    function updateCarousel() {
        slides.removeClass('active').eq(currentSlide).addClass('active');
        $('.dot').removeClass('active').eq(currentSlide).addClass('active');
    }
    
    // Кнопки навигации
    $('#packsPrevBtn').on('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
    
    $('#packsNextBtn').on('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });
    
    // Создание точек (dots) для навигации
    let dotsContainer = $('#packsCarouselDots');
    for(let i = 0; i < totalSlides; i++) {
        dotsContainer.append('<span class="dot"></span>');
    }
    
    // Обработчик клика по точкам
    $('.dot').on('click', function() {
        currentSlide = $(this).index();
        updateCarousel();
    });
    
    // Инициализация карусели
    updateCarousel();
    
    // Автоматическая смена слайдов каждые 5 секунд
    let autoInterval = setInterval(function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000);
    
    // Останавливаем автопрокрутку при наведении на галерею
    $('#packs-carousel-container').on('mouseenter', function() { 
        clearInterval(autoInterval); 
    });
    // Возобновляем автопрокрутку при уходе мыши
    $('#packs-carousel-container').on('mouseleave', function() {
        autoInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    });
    
    // ========== БЛОК 5: ВЫДВИЖНОЕ МЕНЮ (ПРИ НАВЕДЕНИИ) ==========
    let menu = $('#menu');
    let menuWrapper = $('#menu-wrapper');
    let mainMenu = $('#main-menu');
    let closeTimeout = null;
    
    // Открытие меню при наведении на кнопку
    menu.on('mouseenter', function() {
        if(closeTimeout) clearTimeout(closeTimeout);
        mainMenu.addClass('activated');
        $('.lines-button .lines, #main-menu-caller1, .menu-label').addClass('lines-close');
        menuWrapper.show();
    });
    
    // Закрытие меню при уходе мыши с области меню
    menuWrapper.on('mouseleave', function() {
        closeTimeout = setTimeout(function() {
            mainMenu.removeClass('activated');
            $('.lines-button .lines, #main-menu-caller1, .menu-label').removeClass('lines-close');
            menuWrapper.hide();
        }, 150);
    });
    
    // Отмена закрытия, если мышь вернулась на меню
    menuWrapper.on('mouseenter', function() {
        if(closeTimeout) clearTimeout(closeTimeout);
    });
    
    // ========== БЛОК 6: КЕНБЁРНС ЭФФЕКТ ДЛЯ ФОНА ==========
    let bgSlides = $('.kenburnsy .slide');
    let bgIndex = 0;
    
    // Смена фоновых слайдов каждые 6 секунд
    setInterval(function() {
        bgSlides.css('opacity', '0');
        bgSlides.eq(bgIndex).css('opacity', '1');
        bgIndex = (bgIndex + 1) % bgSlides.length;
    }, 6000);
    
})(jQuery);
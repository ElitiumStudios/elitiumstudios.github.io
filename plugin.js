(function($){"use strict";
setTimeout(function(){$('#preloader').addClass('hidden')},1500);
setTimeout(function(){$('.logo, .menu-trigger, .under-construction').removeClass('top-position');$('.social-icons-wrapper').removeClass('bottom-position');$('.line-right').removeClass('right-position')},200);

const pages={home:$('#home-page'),packs:$('#packs-page'),content:$('#content-page'),contact:$('#contact-page')};
function updateScrollOverflow(pageId){if(pageId==='home')$('.scroll-area').addClass('home-active');else $('.scroll-area').removeClass('home-active')}
function switchToPage(pageId){$('.page-content').removeClass('active-page');pages[pageId].addClass('active-page');updateScrollOverflow(pageId);$('#scrollArea').scrollTop(0)}
let hoverTimeout=null;
$('#nav-menu a').on('mouseenter touchstart',function(e){if(hoverTimeout)clearTimeout(hoverTimeout);hoverTimeout=setTimeout(()=>{let page=$(this).data('page');if(page&&pages[page]){$('#nav-menu a').removeClass('active');$(this).addClass('active');switchToPage(page)}},150)});
$('#nav-menu').on('mouseleave',function(){if(hoverTimeout)clearTimeout(hoverTimeout)});
switchToPage('home');

let donateSlides=$('.donate-slide'),donateCurrent=0,donateTotal=donateSlides.length;
function updateDonateCarousel(){donateSlides.removeClass('active');donateSlides.eq(donateCurrent).addClass('active')}
if(donateTotal>0){updateDonateCarousel();let donateInterval=setInterval(function(){donateCurrent=(donateCurrent+1)%donateTotal;updateDonateCarousel()},4000);
$('#donateCarousel').on('mouseenter touchstart',function(){clearInterval(donateInterval)});
$('#donateCarousel').on('mouseleave touchend',function(){donateInterval=setInterval(function(){donateCurrent=(donateCurrent+1)%donateTotal;updateDonateCarousel()},4000)})}

let currentSlide=0,slides=$('#carouselSlides .carousel-slide'),totalSlides=slides.length;
function updateCarousel(){slides.removeClass('active').eq(currentSlide).addClass('active');$('.dot').removeClass('active').eq(currentSlide).addClass('active')}
$('#packsPrevBtn').on('click',function(){currentSlide=(currentSlide-1+totalSlides)%totalSlides;updateCarousel()});
$('#packsNextBtn').on('click',function(){currentSlide=(currentSlide+1)%totalSlides;updateCarousel()});
let dotsContainer=$('#packsCarouselDots');
for(let i=0;i<totalSlides;i++)dotsContainer.append('<span class="dot"></span>');
$('.dot').on('click',function(){currentSlide=$(this).index();updateCarousel()});
updateCarousel();
let autoInterval=setInterval(function(){currentSlide=(currentSlide+1)%totalSlides;updateCarousel()},5000);
$('#packs-carousel-container').on('mouseenter touchstart',function(){clearInterval(autoInterval)});
$('#packs-carousel-container').on('mouseleave touchend',function(){autoInterval=setInterval(function(){currentSlide=(currentSlide+1)%totalSlides;updateCarousel()},5000)});

let menu=$('#menu'),menuWrapper=$('#menu-wrapper'),mainMenu=$('#main-menu'),menuOverlay=$('#menu-overlay'),closeTimeout=null;
function checkIsMobile(){return window.innerWidth<=880}
function openMenu(){if(closeTimeout)clearTimeout(closeTimeout);mainMenu.addClass('activated');$('.lines-button .lines, #main-menu-caller1, .menu-label').addClass('lines-close');menuWrapper.show();menuOverlay.show();document.body.style.overflow='hidden'}
function closeMenu(){mainMenu.removeClass('activated');$('.lines-button .lines, #main-menu-caller1, .menu-label').removeClass('lines-close');menuWrapper.hide();menuOverlay.hide();document.body.style.overflow=''}
menu.on('mouseenter',function(){if(!checkIsMobile())openMenu()});
menu.on('click',function(e){e.stopPropagation();if(checkIsMobile()){if(mainMenu.hasClass('activated'))closeMenu();else openMenu()}});
menuWrapper.on('mouseleave',function(){if(!checkIsMobile()){closeTimeout=setTimeout(function(){closeMenu()},150)}});
menuWrapper.on('mouseenter',function(){if(closeTimeout)clearTimeout(closeTimeout)});
$('#menuCloseBtn').off('click').on('click',function(e){e.preventDefault();e.stopPropagation();closeMenu();return false});
menuOverlay.off('click').on('click',function(e){e.stopPropagation();closeMenu()});
$('#nav-menu a').on('click',function(e){let href=$(this).attr('href');if(href!=='#')e.preventDefault();closeMenu();setTimeout(function(){let page=$(this).data('page');if(page&&pages[page]){$('#nav-menu a').removeClass('active');$(this).addClass('active');switchToPage(page)}}.bind(this),100)});
$(document).on('keydown',function(e){if(e.key==='Escape'&&mainMenu.hasClass('activated'))closeMenu()});

let bgSlides=$('.kenburnsy .slide'),bgIndex=0;
setInterval(function(){bgSlides.css('opacity','0');bgSlides.eq(bgIndex).css('opacity','1');bgIndex=(bgIndex+1)%bgSlides.length},6000);

function adjustForMobile(){const width=$(window).width();if(width<=880){$('.under-construction').css({'top':'8px','padding':'4px 12px'});if(width<=640){$('.logo').css('top','10px');$('.menu-trigger').css('top','8px')}else{$('.logo').css('top','12px');$('.menu-trigger').css('top','10px')}}else{$('.under-construction').css({'top':'','padding':''});$('.logo').css('top','');$('.menu-trigger').css('top','')}}
$(window).on('load resize orientationchange',adjustForMobile);

function checkOverlap(){const warning=$('.under-construction')[0],menuBtn=$('.menu-trigger')[0],logo=$('.logo')[0];if(warning&&menuBtn&&logo){const warningRect=warning.getBoundingClientRect(),menuRect=menuBtn.getBoundingClientRect(),logoRect=logo.getBoundingClientRect();const overlapsMenu=!(warningRect.right<menuRect.left||warningRect.left>menuRect.right||warningRect.bottom<menuRect.top||warningRect.top>menuRect.bottom);const overlapsLogo=!(warningRect.right<logoRect.left||warningRect.left>logoRect.right||warningRect.bottom<logoRect.top||warningRect.top>logoRect.bottom);if(overlapsMenu||overlapsLogo){$('.under-construction').css('top','5px');if($(window).width()<=640)$('.under-construction .warning-text').css('font-size','0.5rem')}}}
setInterval(checkOverlap,100);

if('ontouchstart' in window){$('.btn-download-all, .carousel-prev, .carousel-next, .lang-item, .social-icons a, .menu-trigger').on('touchstart',function(){$(this).addClass('touch-active')}).on('touchend',function(){setTimeout(()=>$(this).removeClass('touch-active'),150)})}

const blocksFiles=[];for(let i=1;i<=25;i++)blocksFiles.push(`${i}.png`);
const sceneFiles=['1.png','2-1.png','2-2.png','2-3.png','2-4.png','2-5.png','2-6.png','2-7.png','2-8.png','2-9.png','3-1.png','3-2.png','4-1.png','4-5.png','4-6.png','4-7.png','4-8.png','4-9.png','4-10.png','4-11.png','5-1.png','5-2.png','5-3.png','6.png'];
function createGallery(containerId,files,folder){const container=$(containerId);if(!container.length)return;container.empty();files.forEach(file=>{const imgPath=`img/photos/${folder}/${file}`;const photoDiv=$('<div class="gallery-item"></div>');const photoLink=$('<a href="#" class="popup-photo"></a>');const img=$('<img>',{src:imgPath,alt:file,loading:'lazy'});photoLink.attr('data-img',imgPath);img.on('error',function(){$(this).attr('src',`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='100%25' height='100%25' fill='%232a2a3e'/%3E%3Ctext x='50%25' y='50%25' fill='%2334c5ba' text-anchor='middle' dy='.3em' font-family='monospace' font-size='14'%3E${file}%3C/text%3E%3C/svg%3E`)});photoLink.append(img);photoDiv.append(photoLink);container.append(photoDiv)})}
createGallery('#blocksGrid',blocksFiles,'block');createGallery('#sceneGrid',sceneFiles,'scene');
$('.tab-btn').on('click',function(){const tabId=$(this).data('tab');$('.tab-btn').removeClass('active');$(this).addClass('active');$('.gallery-tab').hide();$(`#gallery-${tabId}`).show()});

let currentImages=[],currentIdx=0;
const lightbox=$(`
<div id="custom-lightbox" style="display:none;">
    <div class="lightbox-overlay"></div>
    <div class="lightbox-container">
        <button class="lightbox-close"><i class="fas fa-times"></i></button>
        <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
        <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
        <img class="lightbox-img" src="">
        <div class="lightbox-caption"></div>
    </div>
</div>`);
$('body').append(lightbox);
function openLightbox(images,index){currentImages=images;currentIdx=index;$('.lightbox-img').attr('src',currentImages[currentIdx]);$('.lightbox-caption').text(currentImages[currentIdx].split('/').pop());$('#custom-lightbox').fadeIn(200);$('body').css('overflow','hidden')}
function closeLightbox(){$('#custom-lightbox').fadeOut(200);$('body').css('overflow','')}
function prevImage(){if(currentIdx>0){currentIdx--;$('.lightbox-img').attr('src',currentImages[currentIdx]);$('.lightbox-caption').text(currentImages[currentIdx].split('/').pop())}}
function nextImage(){if(currentIdx<currentImages.length-1){currentIdx++;$('.lightbox-img').attr('src',currentImages[currentIdx]);$('.lightbox-caption').text(currentImages[currentIdx].split('/').pop())}}
$('.lightbox-overlay, .lightbox-close').on('click',closeLightbox);
$('.lightbox-prev').on('click',prevImage);$('.lightbox-next').on('click',nextImage);
$(document).on('keydown',function(e){if(!$('#custom-lightbox').is(':visible'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')prevImage();if(e.key==='ArrowRight')nextImage()});
function initGalleryClicks(){const blocksImages=[];$('#blocksGrid .popup-photo').each(function(){const imgPath=$(this).data('img');if(imgPath)blocksImages.push(imgPath)});$('#blocksGrid .popup-photo').off('click').on('click',function(e){e.preventDefault();const index=$('#blocksGrid .popup-photo').index(this);if(blocksImages[index])openLightbox(blocksImages,index)});const sceneImages=[];$('#sceneGrid .popup-photo').each(function(){const imgPath=$(this).data('img');if(imgPath)sceneImages.push(imgPath)});$('#sceneGrid .popup-photo').off('click').on('click',function(e){e.preventDefault();const index=$('#sceneGrid .popup-photo').index(this);if(sceneImages[index])openLightbox(sceneImages,index)})}
setTimeout(initGalleryClicks,500);
})(jQuery);

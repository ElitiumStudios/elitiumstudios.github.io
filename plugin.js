/* plugin.js */
(function($){"use strict";
var preloaderFinished=false,pendingAnimations=[],contentRevealed=false,borderAnimationStarted=false;
function waitForPreloader(cb){preloaderFinished?cb():pendingAnimations.push(cb);}
function revealUIElements(){if(contentRevealed)return;contentRevealed=true;
$('.logo, .menu-trigger, .under-construction, .social-icons-wrapper, .lang, .line-right').removeClass('top-position bottom-position right-position initial-hidden').addClass('reveal-animate');
$('.scroll-area').addClass('content-loaded');
$('.page-content.active-page').addClass('content-visible');}
function startBorderAnimation(){if(borderAnimationStarted)return;borderAnimationStarted=true;
$('.transparent-borders').removeClass('preloader-hidden').addClass('border-animate');}
$(window).on('load',function(){setTimeout(function(){startBorderAnimation();
setTimeout(function(){var p=document.getElementById('preloader');if(p){p.classList.add('hidden');
setTimeout(function(){if(p&&p.parentNode)p.style.display='none';
preloaderFinished=true;for(var i=0;i<pendingAnimations.length;i++)pendingAnimations[i]();
revealUIElements();},900);}},2800);},100);});
waitForPreloader(function(){$('.logo, .menu-trigger, .under-construction, .social-icons-wrapper, .lang, .line-right').removeClass('top-position bottom-position right-position initial-hidden');});
var pages={home:$('#home-page'),packs:$('#packs-page'),content:$('#content-page'),contact:$('#contact-page')};
function updateScrollOverflow(pageId){pageId==='home'?$('.scroll-area').addClass('home-active'):$('.scroll-area').removeClass('home-active');}
function switchToPage(pageId){$('.page-content').removeClass('active-page');pages[pageId].addClass('active-page');updateScrollOverflow(pageId);$('#scrollArea').scrollTop(0);if(contentRevealed)$('.page-content.active-page').addClass('content-visible');}
var hoverTimeout=null;
$('#nav-menu a').on('mouseenter touchstart',function(e){if(hoverTimeout)clearTimeout(hoverTimeout);hoverTimeout=setTimeout(function(){var page=$(this).data('page');if(page&&pages[page]){$('#nav-menu a').removeClass('active');$(this).addClass('active');switchToPage(page);}}.bind(this),150);});
$('#nav-menu').on('mouseleave',function(){if(hoverTimeout)clearTimeout(hoverTimeout);});
switchToPage('home');
$('#ourWorksBtn').on('click',function(e){e.preventDefault();$('#nav-menu a[data-page="packs"]').addClass('active');$('#nav-menu a').not('[data-page="packs"]').removeClass('active');switchToPage('packs');closeMenu();});
var donateSlides=$('.donate-slide'),donateCurrent=0,donateTotal=donateSlides.length;
function updateDonateCarousel(){donateSlides.removeClass('active');donateSlides.eq(donateCurrent).addClass('active');}
if(donateTotal>0){waitForPreloader(function(){updateDonateCarousel();var donateInterval=setInterval(function(){donateCurrent=(donateCurrent+1)%donateTotal;updateDonateCarousel();},4000);
$('#donateCarousel').on('mouseenter touchstart',function(){clearInterval(donateInterval);});
$('#donateCarousel').on('mouseleave touchend',function(){donateInterval=setInterval(function(){donateCurrent=(donateCurrent+1)%donateTotal;updateDonateCarousel();},4000);});});}
var currentSlide=0,slides=$('#carouselSlides .carousel-slide'),totalSlides=slides.length;
function updateCarousel(){slides.removeClass('active').eq(currentSlide).addClass('active');$('.dot').removeClass('active').eq(currentSlide).addClass('active');}
$('#packsPrevBtn').on('click',function(){currentSlide=(currentSlide-1+totalSlides)%totalSlides;updateCarousel();});
$('#packsNextBtn').on('click',function(){currentSlide=(currentSlide+1)%totalSlides;updateCarousel();});
var dotsContainer=$('#packsCarouselDots');for(var i=0;i<totalSlides;i++)dotsContainer.append('<span class="dot"></span>');
$('.dot').on('click',function(){currentSlide=$(this).index();updateCarousel();});
waitForPreloader(function(){updateCarousel();var autoInterval=setInterval(function(){currentSlide=(currentSlide+1)%totalSlides;updateCarousel();},5000);
$('#packs-carousel-container').on('mouseenter touchstart',function(){clearInterval(autoInterval);});
$('#packs-carousel-container').on('mouseleave touchend',function(){autoInterval=setInterval(function(){currentSlide=(currentSlide+1)%totalSlides;updateCarousel();},5000);});});
var menu=$('#menu'),menuWrapper=$('#menu-wrapper'),mainMenu=$('#main-menu'),menuOverlay=$('#menu-overlay'),closeTimeout=null;
function checkIsMobile(){return window.innerWidth<=880;}
function openMenu(){if(closeTimeout)clearTimeout(closeTimeout);mainMenu.addClass('activated');$('.lines-button .lines, #main-menu-caller1, .menu-label').addClass('lines-close');menuWrapper.show();if(menuOverlay.length)menuOverlay.show();document.body.style.overflow='hidden';}
function closeMenu(){mainMenu.removeClass('activated');$('.lines-button .lines, #main-menu-caller1, .menu-label').removeClass('lines-close');menuWrapper.hide();if(menuOverlay.length)menuOverlay.hide();document.body.style.overflow='';}
waitForPreloader(function(){menu.on('mouseenter',function(){if(!checkIsMobile())openMenu();});
menu.on('click',function(e){e.stopPropagation();if(checkIsMobile()){mainMenu.hasClass('activated')?closeMenu():openMenu();}});
menuWrapper.on('mouseleave',function(){if(!checkIsMobile())closeTimeout=setTimeout(function(){closeMenu();},150);});
menuWrapper.on('mouseenter',function(){if(closeTimeout)clearTimeout(closeTimeout);});
$('#menuCloseBtn').off('click').on('click',function(e){e.preventDefault();e.stopPropagation();closeMenu();return false;});
if(menuOverlay.length){menuOverlay.off('click').on('click',function(e){e.stopPropagation();closeMenu();});}
$('#nav-menu a').on('click',function(e){var href=$(this).attr('href');if(href!=='#')e.preventDefault();closeMenu();setTimeout(function(){var page=$(this).data('page');if(page&&pages[page]){$('#nav-menu a').removeClass('active');$(this).addClass('active');switchToPage(page);}}.bind(this),100);});
$(document).on('keydown',function(e){if(e.key==='Escape'&&mainMenu.hasClass('activated'))closeMenu();});});
var bgSlides=$('.kenburnsy .slide'),bgIndex=0,bgTotal=bgSlides.length,isTransitioning=false;
function activateBackgroundSlide(index){if(isTransitioning)return;isTransitioning=true;
var currentActive=bgSlides.filter('.active'),nextSlide=bgSlides.eq(index);
nextSlide.addClass('active');setTimeout(function(){nextSlide.addClass('animate-kenburns');},50);
setTimeout(function(){currentActive.removeClass('active');currentActive.removeClass('animate-kenburns');isTransitioning=false;},1800);}
waitForPreloader(function(){bgSlides.first().addClass('active');setTimeout(function(){bgSlides.first().addClass('animate-kenburns');},100);
setInterval(function(){bgIndex=(bgIndex+1)%bgTotal;activateBackgroundSlide(bgIndex);},7000);});
function adjustForMobile(){var w=$(window).width(),warning=$('.under-construction'),logo=$('.logo'),menuTrigger=$('.menu-trigger');
if(w<=880){warning.css({'top':'8px','padding':'4px 12px'});if(w<=640){logo.css('top','10px');menuTrigger.css('top','8px');}else{logo.css('top','12px');menuTrigger.css('top','10px');}}else{warning.css({'top':'','padding':''});logo.css('top','');menuTrigger.css('top','');}}
$(window).on('load resize orientationchange',adjustForMobile);
function checkOverlap(){var warning=$('.under-construction')[0],menuBtn=$('.menu-trigger')[0],logo=$('.logo')[0];
if(warning&&menuBtn&&logo){var wr=warning.getBoundingClientRect(),mr=menuBtn.getBoundingClientRect(),lr=logo.getBoundingClientRect();
var overlapsMenu=!(wr.right<mr.left||wr.left>mr.right||wr.bottom<mr.top||wr.top>mr.bottom);
var overlapsLogo=!(wr.right<lr.left||wr.left>lr.right||wr.bottom<lr.top||wr.top>lr.bottom);
if(overlapsMenu||overlapsLogo){$('.under-construction').css('top','5px');if($(window).width()<=640)$('.under-construction .warning-text').css('font-size','0.5rem');}}}
setInterval(checkOverlap,100);
if('ontouchstart' in window){waitForPreloader(function(){$('.btn-download-all, .carousel-prev, .carousel-next, .lang-item, .social-icons a, .menu-trigger').on('touchstart',function(){$(this).addClass('touch-active');}).on('touchend',function(){setTimeout(function(){$(this).removeClass('touch-active');}.bind(this),150);});});}
var blocksFiles=[];for(var i=1;i<=25;i++)blocksFiles.push(i+'.png');
var sceneFiles=['1.png','2-1.png','2-2.png','2-3.png','2-4.png','2-5.png','2-6.png','2-7.png','2-8.png','2-9.png','3-1.png','3-2.png','4-1.png','4-5.png','4-6.png','4-7.png','4-8.png','4-9.png','4-10.png','4-11.png','5-1.png','5-2.png','5-3.png','6.png'];
function createGallery(containerId,files,folder){var container=$(containerId);if(!container.length)return;container.empty();
files.forEach(function(file){var imgPath='img/photos/'+folder+'/'+file;var photoDiv=$('<div class="gallery-item"></div>');var photoLink=$('<a href="#" class="popup-photo"></a>');var img=$('<img>',{src:imgPath,alt:file,loading:'lazy'});
photoLink.attr('data-img',imgPath).attr('data-file',file);
img.on('error',function(){$(this).attr('src','data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 300 200\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'%232a2a3e\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' fill=\'%2334c5ba\' text-anchor=\'middle\' dy=\'.3em\' font-family=\'monospace\' font-size=\'14\'%3E'+file+'%3C/text%3E%3C/svg%3E');});
photoLink.append(img);photoDiv.append(photoLink);container.append(photoDiv);});}
createGallery('#blocksGrid',blocksFiles,'block');createGallery('#sceneGrid',sceneFiles,'scene');
$('.tab-btn').on('click',function(){var tabId=$(this).data('tab');$('.tab-btn').removeClass('active');$(this).addClass('active');$('.gallery-tab').hide();$('#gallery-'+tabId).show();});
var currentImages=[],currentIdx=0,lightbox=$('<div id="custom-lightbox" style="display:none;"><div class="lightbox-overlay"></div><div class="lightbox-container"><button class="lightbox-close"><i class="fas fa-times"></i></button><button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button><button class="lightbox-next"><i class="fas fa-chevron-right"></i></button><img class="lightbox-img" src=""><div class="lightbox-caption"></div></div></div>');
$('body').append(lightbox);
function openLightbox(images,index){currentImages=images;currentIdx=index;$('.lightbox-img').attr('src',currentImages[currentIdx]);$('.lightbox-caption').text(currentImages[currentIdx].split('/').pop());$('#custom-lightbox').fadeIn(200);$('body').css('overflow','hidden');}
function closeLightbox(){$('#custom-lightbox').fadeOut(200);$('body').css('overflow','');}
function prevImage(){if(currentIdx>0){currentIdx--;$('.lightbox-img').attr('src',currentImages[currentIdx]);$('.lightbox-caption').text(currentImages[currentIdx].split('/').pop());}}
function nextImage(){if(currentIdx<currentImages.length-1){currentIdx++;$('.lightbox-img').attr('src',currentImages[currentIdx]);$('.lightbox-caption').text(currentImages[currentIdx].split('/').pop());}}
$('.lightbox-overlay, .lightbox-close').on('click',closeLightbox);$('.lightbox-prev').on('click',prevImage);$('.lightbox-next').on('click',nextImage);
$(document).on('keydown',function(e){if(!$('#custom-lightbox').is(':visible'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')prevImage();if(e.key==='ArrowRight')nextImage();});
function initGalleryClicks(){var blocksImages=[];$('#blocksGrid .popup-photo').each(function(){var ip=$(this).data('img');if(ip)blocksImages.push(ip);});
$('#blocksGrid .popup-photo').off('click').on('click',function(e){e.preventDefault();var idx=$('#blocksGrid .popup-photo').index(this);if(blocksImages[idx])openLightbox(blocksImages,idx);});
var sceneImages=[];$('#sceneGrid .popup-photo').each(function(){var ip=$(this).data('img');if(ip)sceneImages.push(ip);});
$('#sceneGrid .popup-photo').off('click').on('click',function(e){e.preventDefault();var idx=$('#sceneGrid .popup-photo').index(this);if(sceneImages[idx])openLightbox(sceneImages,idx);});}
waitForPreloader(function(){setTimeout(initGalleryClicks,500);});
(function(){var COUNT=12,flyStarts=[],shadowStarts=[],i;
for(i=0;i<COUNT;i++){flyStarts.push({x:(Math.random()*1200)-600,y:(Math.random()*1200)-600,rotStart:(Math.random()*720)-360,rotMid:(Math.random()*100)-50});shadowStarts.push({x:(Math.random()*1200)-600,y:(Math.random()*1200)-600,rotStart:(Math.random()*720)-360,rotMid:(Math.random()*100)-50});}
var styleSheet=document.createElement("style");document.head.appendChild(styleSheet);var css="";
for(i=1;i<=COUNT;i++){var f=flyStarts[i-1],midX=f.x*0.12,midY=f.y*0.12;css+="@keyframes preloaderFly"+i+"{0%{transform:translate("+f.x+"vw,"+f.y+"vw) rotate("+f.rotStart+"deg);opacity:0}20%{opacity:0.2}45%{transform:translate("+midX+"vw,"+midY+"vw) rotate("+f.rotMid+"deg);opacity:0.55}70%{transform:translate(0vw,0vw) rotate(0deg);opacity:0.85}100%{transform:translate(0,0) rotate(0deg);opacity:1}}";}
for(i=1;i<=COUNT;i++){var s=shadowStarts[i-1],midX=s.x*0.1,midY=s.y*0.1;css+="@keyframes preloaderShadow"+i+"{0%{transform:translate("+s.x+"vw,"+s.y+"vw) rotate("+s.rotStart+"deg);opacity:0}18%{opacity:0.1}42%{transform:translate("+midX+"vw,"+midY+"vw) rotate("+s.rotMid+"deg);opacity:0.4}68%{transform:translate(0vw,0vw) rotate(0deg);opacity:0.7}100%{transform:translate(0,0) rotate(0deg);opacity:0.6}}";}
for(i=1;i<=COUNT;i++){css+=".preloaderFly"+i+"{animation:preloaderFly"+i+" 2.4s cubic-bezier(0.2,1.02,0.3,1) forwards}.preloaderShadow"+i+"{animation:preloaderShadow"+i+" 2.5s cubic-bezier(0.2,1,0.3,1) forwards}";}
styleSheet.textContent=css;var group=document.getElementById('preloaderGroup');if(!group)return;
var rings=[{r:58,ow:6.8,iw:4},{r:53,ow:6.3,iw:3.7},{r:48,ow:5.8,iw:3.5},{r:43,ow:5.4,iw:3.3},{r:38,ow:5.1,iw:3.1},{r:33,ow:4.8,iw:2.9},{r:28,ow:4.6,iw:2.7},{r:23,ow:4.4,iw:2.6},{r:18,ow:4.2,iw:2.5},{r:13,ow:4,iw:2.4},{r:8,ow:3.8,iw:2.3},{r:4,ow:3.5,iw:2.2}],itemsData=[];
for(i=0;i<COUNT;i++){var dir=Math.random()>0.5?1:-1,dur=2.2+Math.random()*4.5,dashLen1=35+Math.floor(Math.random()*55),gapLen1=280-dashLen1+(Math.random()*30-15),dashLen2=28+Math.floor(Math.random()*50),gapLen2=290-dashLen2+(Math.random()*25-12),offsetBase=Math.random()*180;
itemsData.push({direction:dir,duration:dur.toFixed(2)+'s',durNum:dur,dashOuter:dashLen1+" "+Math.max(20,Math.floor(gapLen1)),dashInner:dashLen2+" "+Math.max(18,Math.floor(gapLen2)),offsetOuter:offsetBase+i*7,offsetInner:offsetBase+i*13+11,offsetMain:offsetBase+i*5+4});}
for(var idx=0;idx<COUNT;idx++){var n=idx+1,ring=rings[idx],data=itemsData[idx],startRotate=(idx/COUNT)*360+Math.random()*45;
var shadowGroup=document.createElementNS("http://www.w3.org/2000/svg","g");shadowGroup.setAttribute("class","preloaderShadow"+n+" shadow-item");
var shadowRotContainer=document.createElementNS("http://www.w3.org/2000/svg","g");
var shadowRotAnim=document.createElementNS("http://www.w3.org/2000/svg","animateTransform");shadowRotAnim.setAttribute("attributeName","transform");shadowRotAnim.setAttribute("type","rotate");shadowRotAnim.setAttribute("from",startRotate+" 50 50");shadowRotAnim.setAttribute("to",(startRotate+(data.direction===1?360:-360))+" 50 50");shadowRotAnim.setAttribute("dur",data.duration);shadowRotAnim.setAttribute("repeatCount","indefinite");shadowRotContainer.appendChild(shadowRotAnim);
var sOuter=document.createElementNS("http://www.w3.org/2000/svg","circle");sOuter.setAttribute("cx","50");sOuter.setAttribute("cy","50");sOuter.setAttribute("r",ring.r);sOuter.setAttribute("fill","none");sOuter.setAttribute("stroke","url(#ps"+n+")");sOuter.setAttribute("stroke-width",ring.ow);sOuter.setAttribute("stroke-dasharray",data.dashOuter);sOuter.setAttribute("stroke-dashoffset",data.offsetOuter);sOuter.setAttribute("opacity","0.55");
var partsOuter=data.dashOuter.split(' ').reduce(function(a,b){return a+parseInt(b);},0);
var sDashAnim=document.createElementNS("http://www.w3.org/2000/svg","animate");sDashAnim.setAttribute("attributeName","stroke-dashoffset");sDashAnim.setAttribute("values",data.offsetOuter+";"+(data.offsetOuter-partsOuter));sDashAnim.setAttribute("dur",data.duration);sDashAnim.setAttribute("repeatCount","indefinite");sOuter.appendChild(sDashAnim);shadowRotContainer.appendChild(sOuter);
var sInner=document.createElementNS("http://www.w3.org/2000/svg","circle");sInner.setAttribute("cx","50");sInner.setAttribute("cy","50");sInner.setAttribute("r",ring.r);sInner.setAttribute("fill","none");sInner.setAttribute("stroke","url(#ps"+n+")");sInner.setAttribute("stroke-width",ring.iw);sInner.setAttribute("stroke-dasharray",data.dashInner);sInner.setAttribute("stroke-dashoffset",data.offsetInner);sInner.setAttribute("opacity","0.4");sInner.setAttribute("filter","url(#pgl)");
var partsInner=data.dashInner.split(' ').reduce(function(a,b){return a+parseInt(b);},0);
var sInnerDashAnim=document.createElementNS("http://www.w3.org/2000/svg","animate");sInnerDashAnim.setAttribute("attributeName","stroke-dashoffset");sInnerDashAnim.setAttribute("values",data.offsetInner+";"+(data.offsetInner-partsInner));sInnerDashAnim.setAttribute("dur",data.duration);sInnerDashAnim.setAttribute("repeatCount","indefinite");sInner.appendChild(sInnerDashAnim);shadowRotContainer.appendChild(sInner);shadowGroup.appendChild(shadowRotContainer);group.appendChild(shadowGroup);
var mainGroup=document.createElementNS("http://www.w3.org/2000/svg","g");mainGroup.setAttribute("class","preloaderFly"+n+" fly-item");
var mainRotContainer=document.createElementNS("http://www.w3.org/2000/svg","g");
var mainRotAnim=document.createElementNS("http://www.w3.org/2000/svg","animateTransform");mainRotAnim.setAttribute("attributeName","transform");mainRotAnim.setAttribute("type","rotate");var mainFromAngle=startRotate+18;mainRotAnim.setAttribute("from",mainFromAngle+" 50 50");mainRotAnim.setAttribute("to",(mainFromAngle+(data.direction===1?360:-360))+" 50 50");mainRotAnim.setAttribute("dur",data.duration);mainRotAnim.setAttribute("repeatCount","indefinite");mainRotContainer.appendChild(mainRotAnim);
var mCircle=document.createElementNS("http://www.w3.org/2000/svg","circle");mCircle.setAttribute("cx","50");mCircle.setAttribute("cy","50");mCircle.setAttribute("r",ring.r);mCircle.setAttribute("fill","none");mCircle.setAttribute("stroke","url(#pg"+n+")");mCircle.setAttribute("stroke-width",(ring.iw-0.4));mCircle.setAttribute("stroke-dasharray",data.dashOuter);mCircle.setAttribute("stroke-dashoffset",data.offsetMain);mCircle.setAttribute("filter",idx<3?"url(#pgl)":"url(#pgls)");
var mainPartsTotal=data.dashOuter.split(' ').reduce(function(a,b){return a+parseInt(b);},0);
var mDashAnim=document.createElementNS("http://www.w3.org/2000/svg","animate");mDashAnim.setAttribute("attributeName","stroke-dashoffset");mDashAnim.setAttribute("values",data.offsetMain+";"+(data.offsetMain-mainPartsTotal));mDashAnim.setAttribute("dur",data.duration);mDashAnim.setAttribute("repeatCount","indefinite");mCircle.appendChild(mDashAnim);mainRotContainer.appendChild(mCircle);mainGroup.appendChild(mainRotContainer);group.appendChild(mainGroup);}})();
})(jQuery);

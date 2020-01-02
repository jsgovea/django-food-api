$(window).on('load',function(){
	$('#page-build').remove();
	setTimeout(function(){$("#preloader").addClass('hide-preloader');},450);// will fade out the white DIV that covers the website.
    //Adding Meta Tags
    $('head').prepend('<meta name="theme-color" content="#000000">');
    $('head').append('<link rel="apple-touch-icon" sizes="180x180" href="app/icons/icon-192x192.png">');
    $('head').append('<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="app/splash/iphonexs.png"> ')
    $('head').append('<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" href="app/splash/iphonexsmax.png">')
    $('head').append('<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" href="app/splash/iphoneplus.png"> ')
    $('head').append('<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="app/splash/iphoneregular.png">')
});



$(document).ready(function(){      
    'use strict'	
    			
    var isPWA = true; //pwa custom settings in scripts/pwa.js & _service-worker.js

	function init_template(){	
			
		//Demo Purposes.
		$('a').on('click', function(){var attrs = $(this).attr('href');	if(attrs === '#'){return false;}});

        //FastClick
        $(function() {FastClick.attach(document.body);});
                
        //Preload Image
        $(function() {$(".preload-image").lazyload({threshold : 500});});
        
        //Activate Menus After Load
        setTimeout(function(){$('.menu, .menu-hider').css({'display':'block'});});
        
        //Adding Elements to make sure page loads smoothly.
        setTimeout(function(){$('.page-hider').fadeOut(100);},250)
                
        //Adding Menu Hider
        if(!$('#page-transitions .menu-hider').length){$('#page-transitions').append('<div class="menu-hider"></div>')}        
            
        //Color Switcher
        setTimeout(function(){
            $('[data-toggle-theme]').on('click',function(){
                $('[data-toggle-theme]').addClass('no-click');
                $('body').toggleClass('theme-dark theme-light');
                $('body').addClass('no-transition');
                setTimeout(function(){
                    $('body').removeClass('no-transition');
                    $('.header, .menu, body, #page, .page-content').css('transition',"");
                    $('[data-toggle-theme]').removeClass('no-click');
                },500)
                if($('body').hasClass('theme-light')){eraseCookie('Bars_dark_mode'); createCookie('Bars_light_mode', true, 1);}  
                if($('body').hasClass('theme-dark')){ eraseCookie('Bars_light_mode'); createCookie('Bars_dark_mode', true, 1);}
                return false;
            });  
        },1100);
        if (readCookie('Bars_dark_mode')) {$('body').removeClass('theme-light').addClass('theme-dark');}
        if (readCookie('Bars_light_mode')) {$('body').removeClass('theme-dark').addClass('theme-light');}

        //Loading External Menus
        $('.menu, .footer').each(function(){
            var menuLoad = $(this).data('menu-load');
            var footerLoad = $(this).data('footer-load');
            if($(this).data('menu-load')){$(this).load(menuLoad);}
            if($(this).data('footer-load')){$(this).load(footerLoad);}
        });  
        
        setTimeout(function(){
            $('a[data-menu-active]').each(function(){
                var menuActive = $(this).data('menu-active');
                $('body').find('#'+menuActive).addClass('menu-item-active');
            });
        },1000);           
        
        //Menu Settings
        var menuDeployer = $('a[data-menu]');
        menuDeployer.on('click',function(){            
            var menuData = $(this).data('menu');
            var menuHider = $('.menu-hider');
            var menuID = $('#'+menuData);
            var pageContent = $('.page-content');
            var pageHeader = $('.header');
            var menuSidebarRight = $('#'+ menuData).hasClass('sidebar-right');
            var menuSidebarLeft = $('#'+ menuData).hasClass('sidebar-left');
            var menuTop = $('#'+ menuData).hasClass('menu-top');
            var menuTopActive = $('#'+ menuData).hasClass('menu-top-active');
            var menuBottom = $('#'+ menuData).hasClass('menu-bottom');
            var menuBottomActive = $('#'+ menuData).hasClass('menu-bottom-active');
            var menuHeight = menuID.data('menu-height');
            var moveElements = $('.page-content, .header');
            var pageContentMove = (menuHeight * 35)/100;
                        
            pageContent.css({'min-height': $(window).height()})
            menuID.css({"height":menuHeight});
            menuHider.toggleClass('menu-hider-active');

            if (menuSidebarRight){menuID.toggleClass('sidebar-active');}// moveElements.css({"transform": "translateX(-100%)"});}     
            if (menuSidebarLeft){menuID.toggleClass('sidebar-active');} //moveElements.css({"transform": "translateX(100%)"}); }        
            if (menuTop){menuID.addClass('menu-top-active'); moveElements.css({"transform": "translateY("+pageContentMove+"px)"}); }  
            if (menuTopActive){menuID.removeClass('menu-top-active');}         
            if (menuBottom){menuID.addClass('menu-bottom-active'); moveElements.css({"transform": "translateY("+pageContentMove*(-1)+"px)"});}  
            if (menuBottomActive){menuID.removeClass('menu-bottom-active');}
        });    
        $('.menu-top').each(function(){var menuDistanceTop = $(this).data('menu-height'); $(this).css({"transform": "translateY("+menuDistanceTop*(-1)+"px)"});});
        
        //Close Menu
        function close_menu(){
            $('.menu, .header, .page-content, .menu-hider, .menu-top, .menu-bottom').removeClass('sidebar-active menu-top-active menu-bottom-active menu-hider-active');
            $('.page-content, .header').css({"transform": "translateY(0px)"});
        }
        
        $('.close-menu, .menu-hider').on('click',function(){close_menu();});
        $('body').on('click', '.close-menu, .menu-hider', function(){close_menu();});
        

		//Copyright Year 
        setTimeout(function(){
        var dteNow = new Date();
        var intYear = dteNow.getFullYear();
        $('#copyright-year, .copyright-year').html(intYear);
        },1500);
		
		//Back Button
		$('.back-button').on('click', function(){
			$('#page-transitions').addClass('back-button-clicked');
			$('#page-transitions').removeClass('back-button-not-clicked');
			window.history.go(-1);
			return false;
		});
		
        //Back to top Badge
        
        
        setTimeout(function(){
        $('.back-to-top-badge, .back-to-top').on( "click", function(e){
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 350);
			return false;
        });
        },1500);
		
		function header_card(){
			if ($(".header-card").length){
				$('.header').addClass('hide-header-card');
			} else {
				$('.header').removeClass('hide-header-card');
			}
		}
		header_card();
		
		//Accordion
		$('a[data-accordion]').on( "click", function(){
			console.log('test');
			var accordion_number = $(this).data('accordion');
			$('.accordion-content').slideUp(200);
			$('.accordion i').removeClass('rotate-180');			
			if($('#'+accordion_number).is(":visible")){
				$('#'+accordion_number).slideUp(200); 
				$(this).find('i:last-child').removeClass('rotate-180');
			}else{
				$('#'+accordion_number).slideDown(200); 
				$(this).find('i:last-child').addClass('rotate-180');
  			}
		});	
		
		//Mobile Ads
		setTimeout(function(){
			$('.ad-300x50-fixed').fadeIn(350);
		},2500);
		$('.close-ad-button').on('click', function(){
			$('.ad-300x50-fixed').fadeOut(250);
		});
		
        //Show Back To Home When Scrolling
        $(window).on('scroll', function () {
            var total_scroll_height = document.body.scrollHeight
            var inside_header = ($(this).scrollTop() <= 200);
            var passed_header = ($(this).scrollTop() >= 0); //250
            var passed_header2 = ($(this).scrollTop() >= 150); //250
            var footer_reached = ($(this).scrollTop() >= (total_scroll_height - ($(window).height() + 300 )));
			
            if (inside_header === true) {
				$('.back-to-top-badge').removeClass('back-to-top-badge-visible');
				header_card();
			}
			else if(passed_header === true){
				$('.header').removeClass('hide-header-card');
				$('.back-to-top-badge').addClass('back-to-top-badge-visible');
			} 
            if (footer_reached == true){
				$('.back-to-top-badge').removeClass('back-to-top-badge-visible');
			}
        });
		
		//Owl Carousel Sliders
		setTimeout(function(){
			$('.single-slider').owlCarousel({loop:true, margin:0, nav:false, autoHeight:true, lazyLoad:true, items:1, autoplay: true, autoplayTimeout:3500});		
			$('.menu-fixed-slider').owlCarousel({loop:false, margin:0, nav:false, items:5});	
			$('.double-slider').owlCarousel({loop:true, margin:20, nav:false, autoHeight:true, lazyLoad:true, items:2, autoplay: true, autoplayTimeout:3500});	
			$('.thumb-slider').owlCarousel({loop:true, margin:10, nav:false, autoHeight:true, lazyLoad:true, items:3, autoplay: true, autoplayTimeout:3500});	
			$('.cover-slider').owlCarousel({loop:true, nav:false, lazyLoad:true, items:1, autoplay: true, autoplayTimeout:3500});		
			$('.cover-walkthrough-slider').owlCarousel({loop:false, nav:false, lazyLoad:true, items:1, autoplay: false, autoplayTimeout:3500});		
			$('.cover-slider-full').owlCarousel({loop:false, nav:false, dots:false, mouseDrag:false, touchDrag:false, pullDrag:false, lazyLoad:true, items:1, autoplay: true, autoplayTimeout:3500});		
			$('.timeline-slider').owlCarousel({loop:true, lazyLoad:true, nav:false, items:1, autoplay: true, autoplayTimeout:3500});
			$('.next-slide, .next-slide-arrow, .next-slide-text, .next-slide-custom').on('click',function(){$(this).parent().find('.owl-carousel').trigger('next.owl.carousel');});		
			$('.prev-slide, .prev-slide-arrow, .prev-slide-text, .prev-slide-custom').on('click',function(){$(this).parent().find('.owl-carousel').trigger('prev.owl.carousel');});		
		},100);
		
		//Coverpage
		setTimeout(function(){resize_coverpage();},250);
		$(window).on('resize', function(){resize_coverpage();})
		
		function resize_coverpage(){
			var cover_height = $(window).height();
			var cover_width = $(window).width();
			if($('.page-content-full').length > 0){
				var header_height = "0";
				$('.page-content, #page-transitions').css({"min-height": cover_height});
			} else{
				var header_height = "55";
				$('.page-content, #page-transitions').css({"min-height": cover_height});
			}			
			$('.cover-item').css({"height":(cover_height - header_height), "width":cover_width})			
			$('.cover-item-full').css({"margin-top": header_height * (-1), "height":cover_height, "width":cover_width})
			$('.coverpage-full .cover-item').css({"height":cover_height, "width":cover_width});
			$('.coverpage-full').css({"margin-top": header_height * (-1)});

			$('.cover-content-center').each(function(){
				var cover_content_center_height = $(this).innerHeight();
				var cover_content_center_width = $(this).innerWidth();
				$(this).css({"margin-left": (cover_content_center_width/2)*(-1), 	"margin-top": ((cover_content_center_height/2)*(-1)) })
			});			
			$('.cover-content-center-full').each(function(){
				var cover_content_center_height = $(this).innerHeight();
				$(this).css({"margin-top": (cover_content_center_height/2)*(-1)})
			});
		}
		
		//Galleries
        if($('.gallery-filter').length > 0){$('.gallery-filter').filterizr();}		
        $('.gallery-filter-controls li').on('click',function(){
            $('.gallery-filter-controls li').removeClass('gallery-filter-active color-highlight');	
            $(this).addClass('gallery-filter-active color-highlight');	
        });
        lightbox.option({alwaysShowNavOnTouchDevices:true, 'resizeDuration': 200, 'wrapAround': false})
        $('#lightbox').hammer().on("swipe", function (event) {
            if (event.gesture.direction === 4) {
                $('#lightbox a.lb-prev').trigger('click');
            } else if (event.gesture.direction === 2) {
                $('#lightbox a.lb-next').trigger('click');
            }
        });
		
		if($('.gallery-filter').length > 0){$('.gallery-filter').filterizr();}		
		$('.gallery-filter-controls li').on('click',function(){
			$('.gallery-filter-controls li').removeClass('gallery-filter-active color-highlight');	
			$(this).addClass('gallery-filter-active color-highlight');	
		})

		//Contact Form
        setTimeout(function(){    
            var formSubmitted="false";jQuery(document).ready(function(i){function t(a){i(".formValidationError").hide(),i(".fieldHasError").removeClass("fieldHasError"),i("#"+a+" .requiredField").each(function(t){if(""==i(this).val()||i(this).val()==i(this).attr("data-dummy"))return i(this).val(i(this).attr("data-dummy")),i(this).focus(),i(this).addClass("fieldHasError"),i("#"+i(this).attr("id")+"Error").fadeIn(300),!1;if(i(this).hasClass("requiredEmailField")){var r="#"+i(this).attr("id");if(!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(i(r).val()))return i(r).focus(),i(r).addClass("fieldHasError"),i(r+"Error2").fadeIn(300),!1}"false"==formSubmitted&&t==i("#"+a+" .requiredField").length-1&&function(r){formSubmitted="true";var t=i("#"+r).serialize();i.post(i("#"+r).attr("action"),t,function(t){i("#"+r).hide(),i("#formSuccessMessageWrap").fadeIn(500)})}(a)})}i("#formSuccessMessageWrap").hide(0),i(".formValidationError").fadeOut(0),i('input[type="text"], input[type="password"], textarea').focus(function(){i(this).val()==i(this).attr("data-dummy")&&i(this).val("")}),i("input, textarea").blur(function(){""==i(this).val()&&i(this).val(i(this).attr("data-dummy"))}),i("#contactSubmitButton").click(function(){return t(i(this).attr("data-formId")),!1})});
        },800);
        
        //Generate Hover Effect for Buttons
        var button = $('.button');
        var darkColor = '-dark';
        var lightColor = '-light';
        
        button.on('mouseenter touchstart',function(){this.className = this.className.replace(darkColor, lightColor);});
        button.on('mouseleave touchend',function(){this.className = this.className.replace(lightColor, darkColor);});

        
//		//Universal Transition Time
//		var universalTransitionTime = 350; 
//		$('.header, .footer, .header-card, #menu-hider, .menu-hider-active, .menu-sidebar, .menu-flyin, .active-flyin, .page-content, .menu-sidebar-3d-wrapper, .menu-sidebar, .menu-sidebar-shadow, .content-push-left, .content-push-right, .content-parallax-left, .content-parallax-right, .fake-shadow-right, .fake-shadow-left, .menu-sidebar-push').css({
//			WebkitTransition : 'all ' + universalTransitionTime + 'ms ease',
//			MozTransition    : 'all ' + universalTransitionTime + 'ms ease',
//			MsTransition     : 'all ' + universalTransitionTime + 'ms ease',
//			OTransition      : 'all ' + universalTransitionTime + 'ms ease',
//			transition       : 'all ' + universalTransitionTime + 'ms ease'
//		});
		
        //Add To Home
        var simulateAndroid = $('.simulate-android');
        var simulateiPhones = $('.simulate-iphones');
        var addToHome = $('.add-to-home');
        var addToHomeIOS = 'add-to-home-ios';
        var addToHomeAndroid = 'add-to-home-android';
        var addToHomeVisible = 'add-to-home-visible';
        
        
        simulateAndroid.on('click',function(){
            addToHome.addClass(addToHomeVisible).addClass(addToHomeAndroid).removeClass(addToHomeIOS);
        });
        simulateiPhones.on('click',function(){
            addToHome.addClass(addToHomeVisible).addClass(addToHomeIOS).removeClass(addToHomeAndroid);
        });
                
        //Detect Mobile OS//
        var isMobile = {
            Android: function() {return navigator.userAgent.match(/Android/i);},
            iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
            Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
            any: function() {return (isMobile.Android() || isMobile.iOS() || isMobile.Windows());}
        };
        if (!isMobile.any()) {
            $('body').addClass('is-not-ios');
            $('.show-ios, .show-android').addClass('disabled');
            $('.show-no-device').removeClass('disabled');
        }
        if (isMobile.Android()) {
            function isRunningStandalone() {
                return (window.matchMedia('(display-mode: standalone)').matches);
            }
            if (isRunningStandalone()) {
                $('.add-to-home').remove();
            }
            $('body').addClass('is-not-ios');
            $('.show-android').removeClass('disabled');
            $('.show-ios, .show-no-device, .simulate-android, .simulate-iphones').addClass('disabled');
            setTimeout(function(){addToHome.addClass(addToHomeVisible).addClass(addToHomeAndroid)},1000);
        }
        if (isMobile.iOS()) {
            //Detecting the Notch
            function notch(){
                $('body').addClass('has-notch');
            }
            var ratio = window.devicePixelRatio || 1;
            var screen = {
                width : window.screen.width * ratio,
                height : window.screen.height * ratio
            };
            if (window.navigator.standalone === true) {
                $('.add-to-home').remove();
                if (screen.width == 1125 && screen.height === 2436) {notch();}       
                if (screen.width == 828 && screen.height === 1792) {notch();}
                if (screen.width == 1242 && screen.height === 2688) {notch();}
            };            
            $('body').addClass('is-ios');
            $('.show-ios').removeClass('disabled');
            $('.show-android, .show-no-device, .simulate-android, .simulate-iphones').addClass('disabled');
            setTimeout(function(){addToHome.addClass(addToHomeVisible).addClass(addToHomeIOS)},1000);
        }

        
        $('.set-today').addClass('mobile-date-correction');
                        
        //Adding added-to-homescreen class to be targeted when used as PWA.
        function ath(){
            (function(a, b, c) {
                if (c in b && b[c]) {
                    var d, e = a.location,
                        f = /^(a|html)$/i;
                    a.addEventListener("click", function(a) {
                        d = a.target;
                        while (!f.test(d.nodeName)) d = d.parentNode;
                        "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
                    }, !1);
                    $('.add-to-home').addClass('disabled');
                    $('body').addClass('is-on-homescreen');
                }
            })(document, window.navigator, "standalone")
        }
        ath();
        
        if($('.addtohome-install').length){
            //Install Button
            //Add To Home Screen Android
            var deferredPrompt;
            window.addEventListener('beforeinstallprompt', function (e) {
              e.preventDefault();
              deferredPrompt = e;
              showAddToHomeScreen();
            });
            function addToHomeScreen() {  
                var a2hsBtn = document.querySelector(".addtohome-install");  // hide our user interface that shows our A2HS button
                a2hsBtn.style.display = 'none';  // Show the prompt
                deferredPrompt.prompt();  // Wait for the user to respond to the prompt
                deferredPrompt.userChoice
                .then(function(choiceResult){if (choiceResult.outcome === 'accepted') {} else {}deferredPrompt = null;});
            }
            function showAddToHomeScreen() {
              var a2hsBtn = document.querySelector(".addtohome-install");
              a2hsBtn.style.display = "block";
              a2hsBtn.addEventListener("click", addToHomeScreen);
            }
        }
 
		
		//Dropdowns
		$('.inner-link-list').on('click',function(){
			$(this).parent().find('.link-list').slideToggle(250);
		});
		
		//Font Awesome
		window.FontAwesomeConfig = {
			searchPseudoElements: true
		}
		
		//Notifications
		$('.close-notification').on('click',function(){
			$(this).parent().hide(250);
		});

		//Charts
		if($('.chart').length > 0){
			var loadJS = function(url, implementationCode, location){
				var scriptTag = document.createElement('script');
				scriptTag.src = url;
				scriptTag.onload = implementationCode;
				scriptTag.onreadystatechange = implementationCode;
				location.appendChild(scriptTag);
			};
			var call_charts_to_page = function(){
				new Chart(document.getElementById("pie-chart"), {
					type: 'pie',
					data: {
					  labels: ["Facebook", "Twitter", "Google Plus", "Pinterest", "WhatsApp"],
					  datasets: [{
						backgroundColor: ["#4A89DC", "#4FC1E9", "#FC6E51", "#ED5565", "#A0D468"],
						borderColor:"rgba(255,255,255,1)",
						data: [7000,3000,1000,2000,2000]
					  }]
					},
					options: {
						legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
						tooltips:{enabled:true}, animation:{duration:1500}
					}
				});		

				new Chart(document.getElementById("doughnut-chart"), {
					type: 'doughnut',
					data: {
					  labels: ["Apple Inc.", "Samsung", "Google", "One Plus", "Huawei"],
					  datasets: [{
						backgroundColor: ["#CCD1D9", "#5D9CEC","#FC6E51", "#434A54", "#4FC1E9"],
						borderColor:"rgba(255,255,255,1)",
						data: [5500,4000,2000,3000,1000]
					  }]
					},
					options: {
						legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
						tooltips:{enabled:true}, animation:{duration:1500}, layout:{ padding: {bottom: 30}}
					}
				});		

				new Chart(document.getElementById("polar-chart"), {
					type: 'polarArea',
					data: {
					  labels: ["Windows", "Mac", "Linux"],
					  datasets: [{
						backgroundColor: ["#CCD1D9", "#5D9CEC","#FC6E51"],
						borderColor:"rgba(255,255,255,1)",
						data: [7000,10000,5000]
					  }]
					},
					options: {
						legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
						tooltips:{enabled:true}, animation:{duration:1500}, layout:{ padding: {bottom: 30}}
					}
				});			

				new Chart(document.getElementById("vertical-chart"), {
					type: 'bar',
					data: {
					  labels: ["2010", "2015", "2020", "2025"],
					  datasets: [
						{
						  label: "iOS",
						  backgroundColor: "#A0D468",
						  data: [900,1000,1200,1400]
						}, {
						  label: "Android",
						  backgroundColor: "#4A89DC",
						  data: [890,950,1100,1300]
						}
					  ]
					},
					options: {
						legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
						title: {display: false}
					}
				});	

				new Chart(document.getElementById("horizontal-chart"), {
					type: 'horizontalBar',
					data: {
					  labels: ["2010", "2013", "2016", "2020"],
					  datasets: [
						{
						  label: "Mobile",
						  backgroundColor: "#BF263C",
						  data: [330,400,580,590]
						}, {
						  label: "Responsive",
						  backgroundColor: "#EC87C0",
						  data: [390,450,550,570]
						}
					  ]
					},
					options: {
						legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
						title: {display: false}
					}
				});	

				new Chart(document.getElementById("line-chart"), {
				  type: 'line',
				  data: {
					labels: [2000,2005,2010,2015,2010],
					datasets: [{ 
						data: [500,400,300,200,300],
						label: "Desktop Web",
						borderColor: "#D8334A"
					  }, { 
						data: [0,100,300,400,500],
						label: "Mobile Web",
						borderColor: "#4A89DC"
					  }
					]
				  },
				  options: {
					legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
					title: {display: false}
				  }
				});
			}
			loadJS('scripts/charts.js', call_charts_to_page, document.body);
		}

		//Cookie Box
		function createCookie(e,t,n){if(n){var o=new Date;o.setTime(o.getTime()+48*n*60*60*1e3);var r="; expires="+o.toGMTString()}else var r="";document.cookie=e+"="+t+r+"; path=/"}
        function readCookie(e){for(var t=e+"=",n=document.cookie.split(";"),o=0;o<n.length;o++){for(var r=n[o];" "==r.charAt(0);)r=r.substring(1,r.length);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return null}
        function eraseCookie(e){createCookie(e,"",-1)}
        
        if (!readCookie('enabled_cookie_themeforest_Bars')) {
            $('[data-cookie-activate]').addClass('menu-active');
            $('.add-to-home').removeClass('disabled');
        }
        if (readCookie('enabled_cookie_themeforest_Bars')) {
            $('[data-cookie-activate]').removeClass('menu-active');
            $('.add-to-home').remove();
        }
        $('.hide-cookie').on('click', function() {
           $('[data-cookie-activate]').removeClass('menu-active');
            createCookie('enabled_cookie_themeforest_101', true, 1)
        });  
        $('.hide-add-to-home').on('click', function() {
           $('.add-to-home').addClass('disabled').remove();
            $('.add-to-home').removeClass('add-to-home-visible');
            createCookie('enabled_cookie_themeforest_Bars', true, 1)
        });

		if (!readCookie('enabled_cookie_themeforest_ultramobile1')) {setTimeout(function(){$('.cookie-policy').fadeIn(300);},1500);}
		if (readCookie('enabled_cookie_themeforest_ultramobile1')) {$('.cookie-policy').fadeOut(300);}
		$('.hide-cookie').click(function() {$('.cookie-policy').fadeOut(300); createCookie('enabled_cookie_themeforest_ultramobile1', true, 1)});					
		
		//Reading Time
		$(window).scroll(function() {
			var wintop = $(window).scrollTop(), docheight = $('.page-content').height(), winheight = $(window).height();
			var totalScroll = (wintop/(docheight-winheight))*100;
			$(".reading-line").css("width",totalScroll+"%");
		});		
		$(function() {
			var $article = $('.reading-time-box');
			$article.readingTime({
				readingTimeAsNumber: true,
				readingTimeTarget: $article.find('.reading-time'),
				wordCountTarget: $article.find('.reading-words'),
				wordsPerMinute: 1075,
				round: false,
				lang: 'en',
			});
		});
		
		//Snackbars
		$('a[data-deploy-snack]').on( "click", function(){
			var snack_number = $(this).data('deploy-snack');
			$('#'+snack_number).addClass('active-snack');
			setTimeout(function(){$('#'+snack_number).removeClass('active-snack');},5000);
		});
		$('.snackbar a').on('click', function(){$(this).parent().removeClass('active-snack');});
		$('.snb').on( "click", function(){var snb_height = $('.notification-bar').height(); $('.notification-bar').toggleClass('toggle-notification-bar');});

		//Sortable List
		if( $('#sortable').length ){var list = document.getElementById("sortable"); Sortable.create(list);}

		//Search List
		$('[data-search]').on('keyup', function() {
			var searchVal = $(this).val();
			var filterItems = $(this).parent().parent().find('[data-filter-item]');
			if ( searchVal != '' ) {
				$(this).parent().parent().find('.search-results').removeClass('disabled-search-list');
				$(this).parent().parent().find('[data-filter-item]').addClass('disabled-search');
				$(this).parent().parent().find('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').removeClass('disabled-search');
			} else {
				$(this).parent().parent().find('.search-results').addClass('disabled-search-list');
				$(this).parent().parent().find('[data-filter-item]').removeClass('disabled-search');
			}	
            var filterItemsFixed = $('.search-fixed').find('[data-filter-item]');
			if ( searchVal != '' ) {
				$('.search-fixed .search-results').removeClass('disabled-search-list');
				$('.search-fixed .search-results').find('[data-filter-item]').addClass('disabled-search');
				$('.search-fixed .search-results').find('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').removeClass('disabled-search');
			} else {
				$('.search-fixed .search-results').addClass('disabled-search-list');
				$('.search-fixed .search-results').find('[data-filter-item]').removeClass('disabled-search');
			}
		});
		$('.open-search').on('click',function(){
           $('.search-header').addClass('show-fixed-search'); 
        });
        $('.close-search').on('click',function(){
            $('.search-fixed .search-results').addClass('disabled-search-list');
           $('.search-fixed .search-results').find('[data-filter-item]').addClass('disabled-search');
           $('.search-header').removeClass('show-fixed-search'); 
        });
        
        
		//Tabs
		$('.active-tab').slideDown(0);
		$('a[data-tab]').on( "click", function(){
			var tab_number = $(this).data('tab'); 
			$(this).parent().find('[data-tab]').removeClass('active-tab-button');
			$(this).parent().parent().find('.tab-titles a').removeClass('active-tab-button'); 
			$(this).addClass('active-tab-button'); 
			$(this).parent().parent().find('.tab-item').slideUp(200); 
			$('#'+tab_number).slideDown(200);
		});		
		
		$('a[data-tab-pill]').on( "click", function(){
			var tab_number = $(this).data('tab-pill'); 
			var tab_bg = $(this).parent().parent().find('.tab-pill-titles').data('active-tab-pill-background');
			$(this).parent().find('[data-tab-pill]').removeClass('active-tab-pill-button ' + tab_bg);
			$(this).parent().parent().find('.tab-titles a').removeClass('active-tab-pill-button ' + tab_bg); 
			$(this).addClass('active-tab-pill-button ' + tab_bg); 
			$(this).parent().parent().find('.tab-item').slideUp(200); 
			$('#'+tab_number).slideDown(200);
		});	
		
		//Toast Boxes
		$('a[data-toast]').on( "click", function(){
			$('.toast').removeClass('show-toast');
			var toast_number = $(this).data('toast');
			$('#'+toast_number).addClass('show-toast');
			setTimeout(function(){$('#'+toast_number).removeClass('show-toast');},3000);
		});
		
		//Toggles
		$('.toggle-trigger, .toggle-title').on('click', function(){
			$(this).parent().toggleClass('toggle-active'); 
			$(this).parent().find('.toggle-content').slideToggle(250);
		});
		
		//FAQ 
		$('.faq-question').on('click', function(){
			$(this).parent().find('.faq-answer').slideToggle(300);	
			$(this).find('.fa-plus').toggleClass('rotate-45');
			$(this).find('.fa-chevron-down').toggleClass('rotate-180');
			$(this).find('.fa-arrow-down').toggleClass('rotate-180');
		})
				
		//Article Card
        $('[data-deploy-card]').on('click',function(){
           var article_data = $(this).data('deploy-card');
            $('#'+article_data).addClass('article-visible');
        });
        $('.close-article').on('click',function(){
            $('.article-content').removeClass('article-visible');
        })
        
		//Progress Bar
		if($('.progress-bar').length > 0){
			$('.progress-bar-wrapper').each(function(){
				var progress_height = $(this).data('progress-height');
				var progress_border = $(this).data('progress-border');
				var progress_round = $(this).attr('data-progress-round');
				var progress_color = $(this).data('progress-bar-color');
				var progress_bg = $(this).data('progress-bar-background');
				var progress_complete = $(this).data('progress-complete');
				var progress_text_visible = $(this).attr('data-progress-text-visible');
				var progress_text_color = $(this).attr('data-progress-text-color');
				var progress_text_size = $(this).attr('data-progress-text-size');
				var progress_text_position = $(this).attr('data-progress-text-position');
				var progress_text_before= $(this).attr('data-progress-text-before');
				var progress_text_after= $(this).attr('data-progress-text-after');
					
				if (progress_round ==='true'){			
					$(this).find('.progress-bar').css({'border-radius':progress_height})
					$(this).css({'border-radius':progress_height})				  
				}
				
				if( progress_text_visible === 'true'){
					$(this).append('<em>'+ progress_text_before + progress_complete +'%' + progress_text_after + '</em>')
					$(this).find('em').css({
						"color":progress_text_color,
						"text-align":progress_text_position,
						"font-size":progress_text_size + 'px',
						"height": progress_height +'px',
						"line-height":progress_height + progress_border +'px'
					});
				} 
				
				$(this).css({
					"height": progress_height + progress_border,
					"background-color": progress_bg,
				})

				$(this).find('.progress-bar').css({
					"width":progress_complete + '%',
					"height": progress_height - progress_border,
					"background-color": progress_color,
					"border-left-color":progress_bg,
					"border-right-color":progress_bg,
					"border-left-width":progress_border,
					"border-right-width":progress_border,
					"margin-top":progress_border,
				})
			});
		}

		//Countdown
		function countdown(dateEnd) {
		  var timer, years, days, hours, minutes, seconds;
		  dateEnd = new Date(dateEnd);
		  dateEnd = dateEnd.getTime();
		  if ( isNaN(dateEnd) ) {return;}
		  timer = setInterval(calculate, 1);
		  function calculate() {
			var dateStart = new Date();
			var dateStart = new Date(dateStart.getUTCFullYear(), dateStart.getUTCMonth(), dateStart.getUTCDate(), dateStart.getUTCHours(), dateStart.getUTCMinutes(), dateStart.getUTCSeconds());
			var timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000)

			if ( timeRemaining >= 0 ) {
			  years    = parseInt(timeRemaining / 31536000);
			  timeRemaining   = (timeRemaining % 31536000);		
			  days    = parseInt(timeRemaining / 86400);
			  timeRemaining   = (timeRemaining % 86400);
			  hours   = parseInt(timeRemaining / 3600);
			  timeRemaining   = (timeRemaining % 3600);
			  minutes = parseInt(timeRemaining / 60);
			  timeRemaining   = (timeRemaining % 60);
			  seconds = parseInt(timeRemaining);

				if($('.countdown').length > 0){
				  $(".countdown #years")[0].innerHTML    = parseInt(years, 10);
				  $(".countdown #days")[0].innerHTML    = parseInt(days, 10);
				  $(".countdown #hours")[0].innerHTML   = ("0" + hours).slice(-2);
				  $(".countdown #minutes")[0].innerHTML = ("0" + minutes).slice(-2);
				  $(".countdown #seconds")[0].innerHTML = ("0" + seconds).slice(-2);
				}
			} else { return; }}
		  function display(days, hours, minutes, seconds) {}
		}
		countdown('01/19/2030 03:14:07 AM');	

		//Show Map
		$('.show-map, .hide-map').on('click',function(){
			$('.map-full .cover-content').toggleClass('deactivate-map');
			$('.map-full .cover-overlay').toggleClass('deactivate-map');
			$('.map-but-1, .map-but-2').toggleClass('deactivate-map');
			$('.map-full .hide-map').toggleClass('activate-map');
		});
		
		//Toggle Box
		$('[data-toggle-box]').on('click',function(){
			var toggle_box = $(this).data('toggle-box');
			if($('#'+toggle_box).is(":visible")){
				$('#'+toggle_box).slideUp(250);
			}else{
				$("[id^='box']").slideUp(250);
				$('#'+toggle_box).slideDown(250);
			}
		});
		
		//Read More Box
		$('.read-more-show').on('click',function(){
			$(this).hide();
			$(this).parent().parent().find('.read-more-box').show();
		});
		
        setTimeout(function(){
		var share_link = window.location.href;
		$('.shareToFacebook').prop("href", "https://www.facebook.com/sharer/sharer.php?u="+share_link)
        $('.shareToTwitter').prop("href", "https://twitter.com/intent/tweet?text="+share_link)
		$('.shareToPinterest').prop("href", "https://pinterest.com/pin/create/button/?url=" + share_link)
		$('.shareToWhatsApp').prop("href", "whatsapp://send?text=" + share_link)
		$('.shareToMail').prop("href", "mailto:?body=" + share_link)
        },1500);
	}
    
	setTimeout(init_template, 0);//Activating all the plugins
    $(function(){
		'use strict';
		var options = {
			prefetch: true,
			prefetchOn: 'mouseover',
			cacheLength: 100,
			scroll: true, 
			blacklist: '.default-link',
			forms: 'contactForm',
			onStart: {
				duration:350, // Duration of our animation
				render: function ($container) {
				$container.addClass('is-exiting');// Add your CSS animation reversing class
					$('.page-change-preloader').addClass('show-change-preloader');
                    $('.menu, .header, .page-content, .menu-hider, .menu-top, .menu-bottom').removeClass('sidebar-active menu-top-active menu-bottom-active menu-hider-active');
                    $('.page-content, .header').css({"transform": "translateY(0px)"});
					return false;
				}
			},
			onReady: {
				duration: 50,
				render: function ($container, $newContent) {
					$container.removeClass('is-exiting');// Remove your CSS animation reversing class
					$container.html($newContent);// Inject the new content
					$('#page-build').remove();
					$('.page-change-preloader').addClass('show-change-preloader');		
				}
			},
			onAfter: function($container, $newContent) {
				setTimeout(init_template, 0)//Timeout required to properly initiate all JS Functions. 
				setTimeout(function(){
				    $('.page-change-preloader').removeClass('show-change-preloader');	
				},150);
			}
      	};
      var smoothState = $('#page-transitions').smoothState(options).data('smoothState');
    });
	$('body').append('<div class="page-change-preloader"><div id="preload-spinner" class="spinner-blue"></div></div>');
    
        //Generating Dynamic Styles to decrease CSS size and execute faster loading times.
        var colorsArray = [
            ["none","","",""], 
            ["plum","#6772A4","#6772A4","#3D3949"], 
            ["violet","#673c58","#673c58","#492D3D"], 
            ["magenta3","#413a65","#413a65","#2b2741"], 
            ["green3","#6eb148","#2d7335","#2d7335"], 
            ["sky","#188FB6","#0F5F79","#0F5F79"], 
            ["pumpkin","#E96A57","#C15140","#C15140"], 
            ["dark3","#535468","#535468","#343341"], 
            ["yellow3","#CCA64F","#996A22","#996A22"], 
            ["red2","#D8334A","#BF263C","#9d0f23"], 
            ["red","#ED5565","#DA4453","#a71222"], 
            ["red1","#ED5565","#DA4453","#a71222"], 
            ["red3","#c62f50","#6F1025","#6F1025"], 
            ["orange","#FC6E51","#E9573F","#ce3319"], 
            ["yellow","#FFCE54","#F6BB42","#e6a00f"], 
            ["yellow1","#FFCE54","#F6BB42","#e6a00f"], 
            ["yellow2","#E8CE4D","#E0C341","#dbb50c"],
            ["green","#A0D468","#8CC152","#5ba30b"], 
            ["green1","#A0D468","#8CC152","#5ba30b"], 
            ["green2","#2ECC71","#2ABA66","#0da24b"], 
            ["mint","#48CFAD","#37BC9B","#0fa781"], 
            ["teal","#A0CECB","#7DB1B1","#158383"], 
            ["aqua","#4FC1E9","#3BAFDA","#0a8ab9"], 
            ["blue","#4FC1E9","#3BAFDA","#0b769d"],
            ["blue1","#4FC1E9","#3BAFDA","#0b769d"],
            ["blue2","#5D9CEC","#4A89DC","#1a64c6"], 
            ["magenta","#AC92EC","#967ADC","#704dc9"], 
            ["magenta1","#AC92EC","#967ADC","#704dc9"], 
            ["magenta2","#8067B7","#6A50A7","#4e3190"], 
            ["pink","#EC87C0","#D770AD","#c73c8e"], 
            ["pink1","#EC87C0","#D770AD","#c73c8e"], 
            ["pink2","#fa6a8e","#fb3365","#d30e3f"], 
            ["brown","#BAA286","#AA8E69","#896b43"], 
            ["brown1","#BAA286","#AA8E69","#896b43"], 
            ["brown2","#8E8271","#7B7163","#584934"],
            ["gray","#F5F7FA","#E6E9ED","#c2c5c9"],
            ["gray2","#CCD1D9","#AAB2BD","#88919d"],
            ["dark","#656D78","#434A54","#242b34"],
            ["night","#656D78","#434A54","#242b34"],
            ["dark1","#3C3B3D","#323133","#1c191f"],
            ["dark2","#3C3B3D","#323133","#1c191f"],
            ["white","#FFFFFF","#FFFFFF","#FFFFFF"]
        ];
        var socialArray = [
            ["facebook","#3b5998"], 
            ["linkedin","#0077B5"],
            ["twitter","#4099ff"],
            ["google","#d34836"],
            ["whatsapp","#34AF23"],
            ["pinterest","#C92228"],
            ["sms","#27ae60"],
            ["mail","#3498db"],
            ["dribbble","#EA4C89"],
            ["tumblr","#2C3D52"],
            ["reddit","#336699"],
            ["youtube","#D12827"],
            ["phone","#27ae60"],
            ["skype","#12A5F4"],
            ["instagram","#e1306c"]
        ];
        var opacityArray = ["00", "10","15","20","25","30","35","40","45","50","55","60","65","70","75","80","85","90","95"];
        var marginArray = ["0","1","5","10","15","20","25","30","35","40","45","50","60","70","80","90","100"];
        var fontArray = ["8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40"];
        var fontWArray = ["100","200","300","400","500","600","700","800","900"];
        var rotateArray = ["0","15","30","45","60","75","90","105","120","135","150","165","180"];
        var scaleArray=[["10","1.1,1.1"],["20","1.2,1.2"],["30","1.3,1.3"],["40","1.4,1.4"],["50","1.5,1.5"],["60","1.6,1.6"],["70","1.7,1.7"],["80","1.8,1.8"],["90","1.9.1.9"],["100","2,2"]];        
        var generatedStyles = $('.generated-styles');
        var generatedHighlight = $('.generated-highlight');
        
        function highlight_colors(){
            var bodyColor = $('body').data('highlight');
            var bodyBackground = $('body').data('background');
            var data = colorsArray.map(colorsArray => colorsArray[0]);
            if (data.indexOf(bodyColor) > -1) {
                var highlightLocated = data.indexOf(bodyColor)
                var highlightColorCode = colorsArray[highlightLocated][2]
                var highlightColor = '.color-highlight{color:'+highlightColorCode+'!important}'
                var highlightBg = '.bg-highlight, .menu-badge, .footer-menu-center-icon .active-nav i{background-color:'+highlightColorCode+'!important}'
                var highlightNav = '.active-nav i, .active-nav span{color:'+highlightColorCode+'!important; border-color:'+highlightColorCode+'!important;}'
                var highlightBorder = '.border-highlight{border-color:'+highlightColorCode+'!important}'
                var highlightHeaderTabs = '.header-tab-active{border-color:'+highlightColorCode+'!important}'
                if(!generatedHighlight.length){
                    $('body').append('<style class="generated-highlight"></style>')
                    $('.generated-highlight').append(highlightColor, highlightBg, highlightNav, highlightBorder, highlightHeaderTabs);
                }
            }
        }      
        highlight_colors();
        
        $('[data-change-highlight]').on('click',function(changeColor){
            var highlightNew = $(this).data('change-highlight');
            $('body').attr('data-highlight',highlightNew);
            $('.generated-highlight').remove();
            var data = colorsArray.map(colorsArray => colorsArray[0]);
                if (data.indexOf(highlightNew) > -1) {
                    var highlightLocated = data.indexOf(highlightNew)
                if($(this).data('color-light') !== undefined){
                    var highlightColorCode = colorsArray[highlightLocated][1]
                } else {
                    var highlightColorCode = colorsArray[highlightLocated][2]
                }
                var highlightColor = '.color-highlight{color:'+highlightColorCode+'!important}'
                var highlightBg = '.bg-highlight, .menu-badge, .footer-menu-center-icon .active-nav i{background-color:'+highlightColorCode+'!important}'
                var highlightNav = '.active-nav i, .active-nav span{color:'+highlightColorCode+'!important; border-color:'+highlightColorCode+'!important;}'
                var highlightBorder = '.border-highlight{border-color:'+highlightColorCode+'!important}'
                $('body').append('<style class="generated-highlight"></style>')
                $('.generated-highlight').append(highlightColor, highlightBg, highlightNav, highlightBorder);
            }
        });     
        
        if (!generatedStyles.length){
            $('body').append('<style class="generated-styles"></style>');    
            $('.generated-styles').append('/*Generated using JS for lower CSS file Size, Easier Editing & Faster Loading*/');
            colorsArray.forEach(function (colorValue) {$('.generated-styles').append('.bg-'+colorValue[0]+'-light{ background-color: '+colorValue[1]+'!important; color:#FFFFFF!important;} .bg-'+colorValue[0]+'-light i, .bg-'+colorValue[0]+'-dark i{color:#FFFFFF;} .bg-'+colorValue[0]+'-dark{  background-color: '+colorValue[2]+'!important; color:#FFFFFF!important;} .border-'+colorValue[0]+'-light{ border-color:'+colorValue[1]+'!important;} .border-'+colorValue[0]+'-dark{  border-color:'+colorValue[2]+'!important;} .color-'+colorValue[0]+'-light{ color: '+colorValue[1]+'!important;} .color-'+colorValue[0]+'-dark{  color: '+colorValue[2]+'!important;}');});	
            colorsArray.forEach(function (gradientValue) {$('.generated-styles').append('.bg-gradient-'+gradientValue[0]+'{background-image: linear-gradient(to bottom, '+gradientValue[1]+' 0, '+gradientValue[2]+' 100%)}')});	
            socialArray.forEach(function (socialColorValue) {$('.generated-styles').append('.bg-'+socialColorValue[0]+'{background-color:'+socialColorValue[1]+'!important; color:#FFFFFF;} .color-'+socialColorValue[0]+'{color:'+socialColorValue[1]+'!important;}')});
            opacityArray.forEach(function(opacityValues){$('.generated-styles').append('.opacity-'+opacityValues+'{opacity:'+opacityValues/100+'}')});
            marginArray.forEach(function(marginValues){$('.generated-styles').append('.top-'+marginValues+'{margin-top:'+marginValues+'px!important} .bottom-'+marginValues+'{margin-bottom:'+marginValues+'px!important} .left-'+marginValues+'{margin-left:'+marginValues+'px!important} .right-'+marginValues+'{margin-right:'+marginValues+'px!important}');})
            fontArray.forEach(function (fontValues) {$('.generated-styles').append('.font-'+fontValues+'{font-size:'+fontValues+'px!important;}');})
            fontWArray.forEach(function (fontWeightValues){$('.generated-styles').append('.font-'+fontWeightValues+'{font-weight:'+fontWeightValues+'!important}')});
            scaleArray.forEach(function(scaleVal ){$('.generated-styles').append('.scale-'+scaleVal[0]+'{transform:scale('+scaleVal[1]+')}');});   
            rotateArray.forEach(function( rotateVal ){$('.generated-styles').append('.rotate-'+[rotateVal]+'{transform:rotate('+[rotateVal]+'deg)!important}' );});
            colorsArray.forEach(function (gradientBodyValue) {$('.generated-styles').append('.body-'+gradientBodyValue[0]+'{background-image: linear-gradient(to bottom, '+gradientBodyValue[1]+' 0, '+gradientBodyValue[3]+' 100%)}')});	
        }

    
    //Activate the PWA    
    if(isPWA === true){
        var loadJS = function(url, implementationCode, location){
            var scriptTag = document.createElement('script');
            scriptTag.src = url;
            scriptTag.onload = implementationCode;
            scriptTag.onreadystatechange = implementationCode;
            location.appendChild(scriptTag);
        };
        function loadPWA(){}
        loadJS('scripts/pwa.js', loadPWA, document.body);
    }

    
});


var $ = jQuery;

/* ------------------------------------
 * LOAD START
 -------------------------------------*/
$( window ).load(function() {

	$('img:not(".logo-img, .scroll-down-img, .avatar")').each(function() {
		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
		  var ieversion=new Number(RegExp.$1)
		  if (ieversion>=9)
			if (typeof this.naturalWidth === "undefined" || this.naturalWidth === 0) {
			  this.src = "https://placehold.it/" + ($(this).attr('width') || this.width || $(this).naturalWidth()) + "x" + (this.naturalHeight || $(this).attr('height') || $(this).height());
			}
		} else {
		  if (!this.complete || typeof this.naturalWidth === "undefined" || this.naturalWidth === 0) {
			this.src = "https://placehold.it/" + ($(this).attr('width') || this.width) + "x" + ($(this).attr('height') || $(this).height());
		  }
		}
	});

	$( 'body' ).removeClass( 'display-h' );
	$( '.site-footer' ).removeClass( 'display-h' );

	// Touch device
	if( navigator.userAgent.match( /iPad|iPhone|Android/i ) ) {
		$( 'body' ).addClass( 'touch-device' );
	} else {
		$( 'body' ).addClass( 'no-touch-device' );
	}

	$("body").on("click", ".navbar-toggle-close, .navbar-toggle", function() {
		var a = $(".navigation, .navbar-close");
		if (a.hasClass("open")) {
			a.removeClass("open");
			$(".full-height-wrapper > .table > .table-cell > ul > li").removeClass("animated");
		} else {
			a.addClass("open");
			var e = 250;
			$(".full-height-wrapper > .table > .table-cell > ul > li").each(function() {
				var a = $(this);
				e += 100;
				setTimeout(function() {
					a.addClass("animated");
				}, e);
			});
		}
		return !1;
	});

	// ready
	init();

	// section background
	styleHelper();

	// carousel
	carousel();

	// slider
	slider();

	// isotope
	isotopeInit();


	/* ------------------------------------
	 * Menu active item BEGIN
	 -------------------------------------*/
	$(document).on( 'scroll' , onScroll);

	onScroll();
	/* ------------------------------------
	 * Menu active item END
	 -------------------------------------*/

	setTimeout(function() {
		$( 'body' ).removeClass( 'load' );
	}, 300);
});
/* ------------------------------------
 * LOAD END
 -------------------------------------*/

/* ------------------------------------
 * READY BEGIN
 -------------------------------------*/
$( document ).ready(function(){
	'use strict';

	var $navbarStyle2 = $( '.navbar.style2, .navbar-fixed-top' );
	menuFixedButton( $navbarStyle2 );

	$( 'img.frame' ).each(function() {
		$( this ).wrap( "<div class='img-frame'></div>" );
		$( this ).closest( ".img-frame" ).prepend( "<div class='dot'></div><div class='dot'></div><div class='dot'></div>" );
	});

	// mop init
	mapInit();

	/* ------------------------------------
	 * Map animation START
	 -------------------------------------*/
	$( 'body' ).on( 'click', '.map-block a', function() {
		if ( ! $(this).closest('.page-section').hasClass('open') ) {
			$(this).closest('.page-section').addClass('open');
			$(this).closest('.page-section').find('.container').css('top', $('.map-content').height());
		} else {
			$(this).closest('.page-section').removeClass('open');
			$(this).closest('.page-section').find('.container').css('top', '0px');
		}
		return false;
	} );
	/* ------------------------------------
	 * Map animation END
	 -------------------------------------*/

	/* ------------------------------------
	 * Subscribe START
	 -------------------------------------*/
	$( 'body' ).on( 'submit', '#subscribe', function() {
		var $this = $(this);

		if ( $this.hasClass( 'send' ) ) {
			return false;
		}

		$this.addClass( 'send' );

		$.ajax({
			method: "POST",
			url: "php/subscribe.php",
			data: {
				'email': $( '#subscribe input[name="email"]' ).val()
			},
			success: function(data) {
				$( '.msg', $this ).html(data).addClass( 'show' );
				$( '#subscribe input[name="email"]' ).val( '' );
				$this.removeClass( 'send' );
			}
		});

		return false;
	});
	/* ------------------------------------
	 * Subscribe END
	 -------------------------------------*/

	/* ------------------------------------
	 * Contact form START
	 -------------------------------------*/
	$( '#contact-form' ).submit(function() {
		var $this = $(this);

		if ( $this.hasClass( 'send' ) ) {
			return false;
		}

		$this.addClass( 'send' );

		$.ajax({
			method: "POST",
			url: "php/contact.php",
			data: {
				'name': $( '#contact-form input[name="name"]' ).val(),
				'email': $( '#contact-form input[name="email"]' ).val(),
				'msg': $( '#contact-form textarea[name="msg"]' ).val()
			},
			success: function(data) {

				data = JSON.parse(data);

				$( '.help-block', $this ).html(data.msg);

				if ( data.status === 'success' ) {
					$( '#contact-form input[name="name"]' ).val( '' );
					$( '#contact-form input[name="email"]' ).val( '' );
					$( '#contact-form textarea[name="msg"]' ).val( '' );
				}

				$this.removeClass( 'send' );
			}
		});

		return false;
	});
	/* ------------------------------------
	 * Contact form END
	 -------------------------------------*/

	/* ------------------------------------
	 * Ajax load page START
	 -------------------------------------*/
	$(document).on('pjax:send', function(e) {
		$( 'body' ).addClass( 'load' );
	})

	$(document).on('pjax:complete', function(e) {
		var portfolio = false;

		if (e.relatedTarget) {
			var url = $(e.relatedTarget).attr('href'),
				hash = url.substring(url.indexOf('#'));

			if ($(e.relatedTarget).hasClass('work-all')) {
				portfolio = true;
			}
		}
		
		setTimeout(function() {
			init();
			mapInit();
			slider();
			styleHelper();
			carousel();
			isotopeInit();

			$('.navigation li').removeClass( 'active' );
			$( '[href="' + url + '"]' ).parent('li').addClass( 'active' );
			$( '[href="' + hash + '"]' ).parent('li').addClass( 'active' );
		}, 1);

		setTimeout(function() {

			if ( portfolio === true ) {
				$("html, body").animate({ scrollTop: $( '.portfolio' ).position().top }, 1);
			} else if (url === hash) {
				$("html, body").animate({ scrollTop: 0 }, 1);
			} else {
				$("html, body").animate({ scrollTop: $(hash).position().top }, 1);
			}

			setTimeout(function() {
				$( 'body' ).removeClass( 'load' );
			}, 200);

		}, 700);
	})

	$(document).pjax('.page-load, .single-page-load', '.wrapper', {
		fragment: '.wrapper'
	});
	/* ------------------------------------
	 * Ajax load page END
	 -------------------------------------*/

	/* ------------------------------------
	 * Navigation scroll START
	 -------------------------------------*/
	$( 'body' ).on( 'click', '.navigation a:not(.page-load, .single-page-load, [target="_blank"]), .scrollTo', function() {

		if ( $( this ).closest( 'li' ).hasClass( 'sub-close' ) ) {
			return false;
		}

		var $navbarStyle2 = $( '.navbar-fixed-top' );
		menuFixedButton( $navbarStyle2 );

		$( 'body' ).addClass( 'scrollTo' );

		var url = $(this).attr('href'),
			hash = url.substring(url.indexOf('#'));

		window.history.pushState({path: url},'',url);

		$('.navigation li').removeClass( 'active' );

		$( this ).parent( 'li' ).addClass( 'active' );

		$("html, body").animate({ scrollTop: $(hash).position().top }, 1000, function() {
			$( 'body' ).removeClass( 'scrollTo' );
			$( '.navigation.style-3' ).removeClass( 'open' );
		});

		return false;
	});
	/* ------------------------------------
	 * Navigation scroll END
	 -------------------------------------*/

} );
/* ------------------------------------
 * READY END
 -------------------------------------*/

/* ------------------------------------
 * RESIZE BEGIN
 -------------------------------------*/
$( window ).resize( function(){

	// slider conteiner resize
	$( '.slide .display-tc' ).css({width: $(window).width(), height: $(window).height()});

	// Featured item auto height
	autoHeightFeatured();

	// Set height for home section
	$( '.video-bg, .image-bg, .home-text-rotate' ).css( 'height', $( window ).height() );

	// Set height and width for paralax portfolio item
	$( '.info-wrapper' ).css( {'height': $( '.portfolio-item' ).height(), 'width': $( '.portfolio-item' ).width()} );

	// Set not found page height
	$( '.not-found' ).css( {'height': $( window ).height(), 'width': $( window ).width()} );

} );
/* ------------------------------------
 * RESIZE END
 -------------------------------------*/

/* ------------------------------------
 * Ready function Start
 -------------------------------------*/
function init() {

	$( '.full-height' ).css('height', $(window).height());

	if ($.fn.elevateZoom && $( '.general-img' ).length > 0 ) {
		var image      = $( '.general-img' ).find( 'img' ),
			zoomType,
			zoomWidth  = 458,
			zoomHeight = 458,
			zoomType   = 'window';

		if ( ( $( 'body' ).width() ) < 992 ) {
			zoomWidth  = 0;
			zoomHeight = 0;
			zoomType   = 'inner';
		}

		image.removeData( 'elevateZoom' );
		$( '.zoomContainer' ).remove();

		image.elevateZoom({
			gallery            : 'thumblist',
			cursor             : 'crosshair',
			galleryActiveClass : 'active',
			zoomWindowWidth    : zoomWidth,
			zoomWindowHeight   : zoomHeight,
			borderSize         : 0,
			borderColor        : 'none',
			lensFadeIn         : true,
			zoomWindowFadeIn   : true,
			zoomType		   : zoomType
		});
	}

	// html shop helper
	shop();

	$( '.select-sorting .active' ).click(function() {
		$( this ).closest( '.select-sorting' ).addClass( 'open' );
		return false;
	});

	$( '.select-sorting .list li' ).click(function() {
		$( '.select-sorting .active span' ).text( $( this ).html() );
		$( '.select-sorting' ).removeClass( 'open' );
		return false;
	});

	// slider range
	if ($( "#price-range" ).length > 0) {
		$( "#price-range" ).slider({
		  range: true,
		  min: $( '.price_range_amount' ).data( 'min' ),
		  max: $( '.price_range_amount' ).data( 'max' ),
		  values: [ $( '.price_range_amount' ).data( 'current-min' ), $( '.price_range_amount' ).data( 'current-max' ) ],
		  slide: function( event, ui ) {
			// $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			$( '#price-range > span:nth-child(2)' ).html( '<span>' + ui.values[ 0 ] + '</span>' );
			$( '#price-range > span:nth-child(3)' ).html( '<span>' + ui.values[ 1 ] + '</span>' );
		  },
		  create: function( event, ui ) {
			$( '#price-range > span:nth-child(2)' ).html( '<span>' + $( '.price_range_amount' ).data( 'current-min' ) + '</span>' );
			$( '#price-range > span:nth-child(3)' ).html( '<span>' + $( '.price_range_amount' ).data( 'current-max' ) + '</span>' );
		  }
	  });

	  $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
		  " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	}

	// portfolio focus
	$( '.portfolio-filter button' ).hover(function() {
		$( '.portfolio-list .portfolio-item:not('+ $( this ).data( 'filter' ) +')' ).addClass( 'opacity' );
	}, function() {
		$( '.portfolio-list .portfolio-item:not('+ $( this ).data( 'filter' ) +')' ).removeClass( 'opacity' );
	});

	// work tabs
	$( '.work-process a' ).click(function (e) {
		e.preventDefault();
		$(this).tab( 'show' );
	});

	// Clients item width
	$( '.client-item a' ).each(function() {
		$(this).width($(this).closest('div').width());
	});

	// World map init
	if ( $( '.worldmap-table' ).length === 0 && ! $( 'body' ).hasClass( 'docs' ) ) {
		worldMapInit(window, document);

		// Map elements animation
		if (typeof setRandomClassID !== 'undefined') {
			clearInterval(setRandomClassID);
		}
		setRandomClass();
		setRandomClassID = setInterval(function () {
			setRandomClass();
		}, 2000);

		if (typeof setRandomPlaneID !== 'undefined') {
			clearInterval(setRandomPlaneID);
		}
		setRandomPlane();
		setRandomPlaneID = setInterval(function () {
			setRandomPlane();
		}, 5300);
	}

	// Set height for home section
	$( '.video-bg, .image-bg, .home-text-rotate' ).css( 'height', $( window ).height() );

	// Set height and width for paralax portfolio item
	$( '.info-wrapper' ).css( {'height': $( '.portfolio-item' ).height(), 'width': $( '.portfolio-item' ).width()} );

	// Set not found page height
	$( '.not-found' ).css( {'height': $( window ).height(), 'width': $( window ).width()} );

	// Text rotator
	$( ".js-rotating" ).each(function() {
		var $this = $( this );
		$this.Morphext({
			animation: $this.data( 'animation' ),
			separator: ",",
			speed: 3000,
		});
	});

	// Home video background
	homeVideoBG();

	// Featured item auto height
	autoHeightFeatured();

	/* ------------------------------------
	 * Menu BEGIN
	 -------------------------------------*/

	// Hide Header on on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('.navigation').outerHeight();

	$(window).scroll(function(event){
		didScroll = true;
	});

	// Map elements animation
	if (typeof menuInterval !== 'undefined') {
		clearInterval(menuInterval);
	}

	menuInterval = setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled() {
		var st = $(this).scrollTop();

		// Make sure they scroll more than delta
		if(Math.abs(lastScrollTop - st) <= delta)
			return;

		// If they scrolled down and are past the navbar, add class .nav-up.
		// This is necessary so you never see what is "behind" the navbar.
		if (st > lastScrollTop && st > navbarHeight){
			// Scroll Down
			$('.navigation').removeClass('nav-down').addClass('nav-up');
		} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
				$('.navigation').removeClass('nav-up').addClass('nav-down');
			}
		}

		var winHeight = $(window).height();
		if ($(window).scrollTop() >= winHeight) {
			$('.scroll-to-top').addClass('visible');
		} else {
			$('.scroll-to-top').removeClass('visible');
		}

		lastScrollTop = st;
	}

	$('.scroll-to-top').click(function() {
		$("html, body").animate({ scrollTop: 0 }, 1000);
		return false;
	});

	$(".full-height-wrapper .sub").prepend('<li class="sub-close"><a href="#">+</a></li>');
	$(".has-sub i").click(function() {
		var a = $(this).closest("li");
		if ( a.hasClass("open") ) {
			a.removeClass("open");
		} else {
			a.addClass("open");
		}
		a.find("> ul").css("padding-top", ($(".full-height-wrapper").height() - a.find("> ul").height()) / 2 + "px");
		a.find("> ul").css("bottom", "0px");
		return !1;
	});

	$(".sub-close").click(function() {
		$(this).closest("ul").removeAttr("style");
		$(this).closest(".has-sub").removeClass("open");
	});

	// menu fixed style2
	var $navbarStyle2 = $( '.navbar-fixed-top' );

	menuFixedButton( $navbarStyle2 );

	$( window ).on( 'scroll', function() {
		menuFixedButton( $navbarStyle2 );
	} );
	/* ------------------------------------
	 * Menu END
	 -------------------------------------*/

	/* ------------------------------------
	 * Animation Progress Bars START
	 -------------------------------------*/
	$( '[data-progress-animation]' ).each(function() {
		$(this).one('inview', function(){
			var $this = $(this);
			var delay = ( $this.attr( 'data-animation-delay' ) ? $this.attr( 'data-animation-delay' ) : 1);

			setTimeout( function() {

				$this.addClass( 'animated' );

				$( { someValue: 0 } ).animate( { someValue: $this.attr( 'data-progress-animation' ) }, {
					duration: 1550,
					step: function() {
						$this.attr( 'data-progress-text', Math.round( this.someValue ) );
					}
				} );
			}, delay );
		});
	});
	/* ------------------------------------
	 * Animation Progress Bars END
	 -------------------------------------*/

	/* ------------------------------------
	 * Animation Counter START
	 -------------------------------------*/
	$( '[data-counter-animation]' ).each(function() {
		var $this = $( this ),
			$counter = $this.find( '.count' );
		$(this).one('inview', function(){
			setTimeout( function() {
				$( { someValue: 0 } ).animate( { someValue: $this.attr( 'data-counter-animation' ) }, {
					duration: 1000,
					step: function() {
						$counter.text( Math.round( this.someValue ) );
					}
				} );
			}, 0 );
		});
	});
	/* ------------------------------------
	 * Animation Counter END
	 -------------------------------------*/

	/* ------------------------------------
	 * Animation Layers START
	 -------------------------------------*/
	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 90,
		mobile: false,
		live: true
	});

	wow.init();
	/* ------------------------------------
	 * Animation Layers END
	 -------------------------------------*/

	/* ------------------------------------
	 * Popup gallery START
	 -------------------------------------*/
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		showCloseBtn: true,
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1]
		}
	});
	/* ------------------------------------
	 * Popup gallery END
	 -------------------------------------*/

	/* ------------------------------------
	 * Video popup START
	 -------------------------------------*/
	$('.popup-youtube, .popup-vimeo').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
	});
	/* ------------------------------------
	 * Video popup END
	 -------------------------------------*/

}
/* ------------------------------------
 * Ready function END
 -------------------------------------*/

/* ------------------------------------
 * Menu style2 scroll START
 -------------------------------------*/
function menuFixedButton( $navbarStyle2 ) {

	if ( $( this ).scrollTop() >= 100 ) {
		$navbarStyle2.addClass( 'scrolled' );
	} else {
		if ( $navbarStyle2.hasClass( 'scrolled' ) ) {
			$navbarStyle2.removeClass( 'scrolled' );
		}
	}
}
/* ------------------------------------
 * Menu style2 scroll END
 -------------------------------------*/

/* ------------------------------------
 * Post carousel START
 -------------------------------------*/
function carousel() {
	setTimeout(function() {
		if ( $( '.default-carousel' ).length > 0 ) {
			$( '.default-carousel' ).each( function() {

				var responsive = false,
					nav = false,
					dots = false,
					margin = 0;

				if ( $( this ).hasClass( 'no-arrow' ) ) {
					nav = false;
				} else {
					nav = true;
				}

				if ( $( this ).hasClass( 'no-dots' ) ) {
					dots = false;
				} else {
					dots = true;
				}

				responsive = {
					0: {
						items: 1,
					},
					480: {
						items: 1,
					},
					768: {
						items: 1,
					}
				};

				if ( $( this ).hasClass( 'team-carousel' ) ) {
					responsive = {
						0: {
							items: 2,
						},
						480: {
							items: 3,
						},
						768: {
							items: 4,
						}
					};
				}

				if ( $( this ).hasClass( 'recent-works' ) ) {
					responsive = {
						0: {
							items: 2,
						},
						480: {
							items: 3,
						},
						768: {
							items: 4,
						}
					};
				}

				if ( $( this ).hasClass( 'client-carousel' ) ) {
					responsive = {
						0: {
							items: 2,
						},
						480: {
							items: 3,
						},
						768: {
							items: 6,
						}
					};

					margin = 30;
				}

				if ( $( this ).hasClass( '4-items' ) ) {
					responsive = {
						0: {
							items: 2,
						},
						480: {
							items: 3,
						},
						768: {
							items: 4,
						}
					};

					margin = 30;
				}

				if ( ! $( this ).hasClass( 'animation-fade' ) ) {
					$( this ).owlCarousel({
						themeClass: 'brainwave',
						navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
						lazyLoad: true,
						mouseDrag: false,
						nav: nav,
						dots: dots,
						loop: true,
						items: 1,
						autoWidth: false,
						responsiveClass: true,
						responsive: responsive,
						margin: margin,
						onInitialized: function() {
							if ($.fn.elevateZoom && $( '.general-img' ).length > 0 ) {
							  var image      = $( '.general-img' ).find( 'img' ),
								zoomType,
								zoomWidth  = 458,
								zoomHeight = 458,
								zoomType   = 'window';

							  if ( ( $( 'body' ).width() ) < 992 ) {
								zoomWidth  = 0;
								zoomHeight = 0;
								zoomType   = 'inner';
							  }

							  image.removeData( 'elevateZoom' );
							  $( '.zoomContainer' ).remove();

							  image.elevateZoom({
								gallery            : 'thumblist',
								cursor             : 'crosshair',
								galleryActiveClass : 'active',
								zoomWindowWidth    : zoomWidth,
								zoomWindowHeight   : zoomHeight,
								borderSize         : 0,
								borderColor        : 'none',
								lensFadeIn         : true,
								zoomWindowFadeIn   : true,
								zoomType		   : zoomType
							  });
							}
						}
					});
				} else {
					$( this ).owlCarousel({
						themeClass: 'brainwave',
						navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
						lazyLoad: true,
						mouseDrag: false,
						nav: nav,
						dots: dots,
						loop: true,
						items: 1,
						animateIn: 'fadeIn',
						animateOut: 'fadeOut',
						responsiveClass: true,
						responsive: responsive
					});
				}

			} );
		}
	}, 200);
}
/* ------------------------------------
 * Post carousel END
 -------------------------------------*/

/* ------------------------------------
 * Slider START
 -------------------------------------*/
function slider() {
	$('#slides').superslides({
		play: 5000,
		animation: 'fade',
		pagination: false,
	});
	$( '.content .display-tc' ).css({width: $(window).width(), height: $(window).height()});
}
/* ------------------------------------
 * Slider END
 -------------------------------------*/

/* ------------------------------------
 * Section Background START
 -------------------------------------*/
function styleHelper () {

	$( '[data-color]' ).each( function(){
		$( this ).css( "color", $( this ).data( "color" ) );
	} );

	$( '[data-border-color]' ).each( function(){
		$( this ).css( "border-color", $( this ).data( "border-color" ) );
	} );

	$( '[data-background]' ).each( function(){
		$( this ).css( "background-image", "url(" + $( this ).data( "background" ) + ")" );
	} );

	$( '[data-background-color]' ).each( function() {
		$( this ).css( "background-color", $( this ).data( "background-color" ) );
	} );

	$( '[data-overlay-color]' ).each( function() {
		$( this ).css( 'z-index', 0 );
		if ( $( this ).find( '.overlay' ).length === 0 ) {
			$( this ).append( '<div class="overlay" style="background-color: ' + $( this ).data( "overlay-color" ) + '; opacity: ' + $( this ).data( "overlay-opacity" ) + '"></div>' );
		}
	} );
}
/* ------------------------------------
 * Section Background END
 -------------------------------------*/

/* ------------------------------------
 * Map START
 -------------------------------------*/

function mapInit() {
	if ( $( "#map-canvas" ).length > 0 ) {

		mapInitialize();

		$(window).resize( mapInitialize );
	}
}

function mapInitialize() {

	var mapLon = $( "#map-canvas" ).data( "map-lon" );  // Longitude
	var mapLat = $( "#map-canvas" ).data( "map-lat" );  // Latitude

	// Marker
	var mapMarkerLon = $( "#map-canvas" ).data( "map-marker-lon" );  // Longitude
	var mapMarkerLat = $( "#map-canvas" ).data( "map-marker-lat" );  // Latitude
	var mapMarkerTitle = $( "#map-canvas" ).data( "map-marker-title" );  // Latitude

	//Default
	if ( mapLon === undefined ) { mapLon = -34.697; }
	if ( mapLat === undefined ) { mapLat = 151.22; }

	if ( mapMarkerLon === undefined ) { mapMarkerLon = ""; }
	if ( mapMarkerLat === undefined ) { mapMarkerLat = ""; }
	if ( mapMarkerTitle === undefined ) { mapMarkerTitle = ""; }

	if ( $( "#map-canvas" ).length > 0 ) {
		var center = new google.maps.LatLng( mapLon, mapLat );
	}

	var roadAtlasStyles = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#fcfcfc"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#fcfcfc"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#dddddd"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#dddddd"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#dddddd"}]}];

	var mapOptions = {
		zoom: 12,
		center: center,
		draggable: true,
		disableDefaultUI: true,
		disableDoubleClickZoom: true,
		scrollwheel: false,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'usroadatlas']
		}
	};

	var map = new google.maps.Map(document.getElementById( 'map-canvas' ), mapOptions);

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng( mapMarkerLon, mapMarkerLat ),
		map: map,
		title: mapMarkerTitle
	});

	var styledMapOptions = {
		name: 'US Road Atlas'
	};

	var usRoadMapType = new google.maps.StyledMapType( roadAtlasStyles, styledMapOptions );

	map.mapTypes.set( 'usroadatlas', usRoadMapType );
	map.setMapTypeId( 'usroadatlas' );
}

/* ------------------------------------
 * Map END
 -------------------------------------*/

/* ------------------------------------
 * Isotope START
 -------------------------------------*/
function isotopeInit() {

	// init Isotope
	var $grid = $('.portfolio-list:not(.paralax)').isotope({
		percentPosition: true,
		masonry: {
			columnWidth: '.grid-sizer'
		}
	});
	// layout Isotope after each image loads
	$grid.imagesLoaded().progress( function() {
	  $grid.isotope('layout');
	});

	// filter items on button click
	$( '.portfolio-filter' ).on( 'click', 'button', function() {
		$( '.portfolio-filter button' ).removeClass( 'active' );
		$( this ).addClass( 'active' );
		var filterValue = $( this ).attr( 'data-filter' );
		$grid.isotope({ filter: filterValue });
	});
}
/* ------------------------------------
 * Isotope END
 -------------------------------------*/

/* ------------------------------------
 * Auto height for featured item START
 -------------------------------------*/
function autoHeightFeatured() {
	$( '.features-item' ).css( 'height', $( '.features-item' ).width() );
}
/* ------------------------------------
 * Auto height for featured item END
 -------------------------------------*/

/* ------------------------------------
 * Home video bg START
 -------------------------------------*/
function homeVideoBG() {
	$( '.video-bg' ).css( 'height', $( window ).height() );
	if ( ( $( 'body' ).hasClass( "no-touch-device" ) ) ) {
		$.backgroundVideo( $( '.video-bg' ), {
			"align": "centerXY",
			"width": 1280,
			"height": 720,
			"path": "video/",
			"filename": $( '.video-bg' ).data( 'video' ),
			"types": ["mp4","ogg","webm"],
			"preload": true,
			"autoplay": true,
			"loop": true
		});

		setTimeout(function() {
			$( '#video_background' ).prop( 'muted', true );
		}, 1);
	}
}
/* ------------------------------------
 * Home video bg END
 -------------------------------------*/

/* ------------------------------------
 * Home video bg START
 -------------------------------------*/
function onScroll(){
	var $navbarStyle2 = $( '.navbar-fixed-top' );
	menuFixedButton( $navbarStyle2 );

	var scrollPos = $(document).scrollTop();

	if ( $( 'body' ).hasClass( 'scrollTo' ) ) {
		return false;
	}

	$( '.navigation li a:not(.page-load, .single-page-load)' ).each(function () {

		var attr = $(this).attr('target');
		if (typeof attr !== typeof undefined && attr !== false) {
			return false;
		}

		var currLink = $(this);
		var refElement = $( currLink.attr( 'href' ) );

		if ( refElement.length === 1 ) {
			if ( refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos ) {
				$( '.navigation li' ).removeClass( 'active' );
				currLink.closest( 'li' ).addClass( 'active' );
			} else{
				currLink.closest( 'li' ).removeClass( 'active' );
			}
		}
	});
}

/* ------------------------------------
 * Map vs plane
 -------------------------------------*/
function worldMapInit(w, d, undefined) {
	var positions = [44,45,46,47,48,149,150,151,152,153,154,155,156,160,161,162,163,164,165,166,167,168,169,170,266,267,268,269,270,271,272,273,274,275,276,277,278,280,281,282,283,284,285,286,287,288,289,290,291,292,293,311,312,316,317,329,383,385,386,387,388,389,390,391,392,393,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,423,424,425,426,432,433,435,436,437,438,439,448,449,450,500,502,503,504,506,507,508,509,510,511,513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528,529,530,541,542,543,544,569,570,571,572,617,618,619,620,622,625,628,629,630,633,634,635,636,637,638,639,640,641,642,643,644,645,646,647,648,649,650,662,663,665,691,692,736,737,738,739,740,741,742,743,744,746,747,754,755,756,757,758,759,760,761,762,763,764,765,766,767,768,769,770,797,798,799,800,808,809,810,811,812,813,814,815,823,824,825,856,859,867,868,869,870,878,879,880,881,882,883,884,885,886,887,888,889,890,916,917,926,927,928,929,930,931,932,933,934,935,943,944,945,946,947,975,976,977,978,981,982,983,984,985,986,987,988,989,990,999,1000,1001,1002,1003,1004,1005,1006,1007,1008,1009,1035,1036,1040,1041,1042,1043,1044,1045,1046,1047,1048,1049,1050,1051,1052,1053,1054,1055,1056,1057,1058,1059,1060,1064,1065,1084,1085,1095,1096,1097,1098,1099,1100,1101,1102,1104,1105,1107,1108,1109,1110,1111,1112,1113,1119,1120,1121,1122,1123,1124,1125,1126,1127,1128,1129,1146,1147,1154,1155,1156,1159,1160,1161,1162,1163,1164,1165,1166,1167,1168,1169,1170,1171,1172,1173,1174,1175,1176,1177,1178,1179,1180,1181,1182,1183,1184,1185,1186,1187,1188,1197,1198,1203,1204,1205,1206,1207,1208,1209,1210,1213,1214,1215,1216,1218,1219,1220,1221,1222,1223,1224,1225,1226,1228,1229,1230,1231,1232,1233,1234,1239,1240,1241,1242,1243,1244,1245,1246,1247,1248,1249,1263,1264,1265,1266,1267,1273,1277,1278,1279,1280,1281,1282,1283,1284,1285,1286,1287,1288,1289,1290,1291,1292,1293,1294,1295,1296,1297,1298,1299,1300,1301,1302,1303,1304,1305,1306,1307,1308,1309,1310,1311,1312,1313,1314,1315,1316,1321,1322,1323,1324,1325,1326,1327,1328,1329,1330,1331,1332,1333,1334,1335,1336,1337,1338,1339,1341,1342,1343,1344,1345,1346,1347,1348,1349,1351,1353,1354,1355,1359,1360,1361,1362,1363,1364,1365,1366,1367,1382,1383,1384,1385,1386,1387,1388,1389,1390,1391,1392,1393,1394,1395,1396,1397,1398,1399,1400,1401,1402,1403,1404,1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421,1422,1423,1424,1425,1426,1427,1428,1429,1430,1431,1432,1433,1434,1435,1436,1437,1438,1441,1442,1443,1444,1445,1446,1447,1448,1449,1450,1451,1452,1453,1454,1455,1456,1457,1458,1459,1460,1461,1462,1463,1464,1465,1466,1467,1468,1473,1474,1475,1476,1479,1480,1481,1482,1483,1484,1485,1489,1490,1491,1501,1502,1503,1504,1505,1506,1507,1508,1509,1510,1511,1512,1513,1514,1515,1516,1517,1518,1519,1520,1521,1522,1523,1524,1525,1526,1527,1528,1529,1530,1531,1532,1533,1534,1535,1536,1537,1538,1539,1540,1541,1542,1543,1544,1545,1546,1547,1548,1549,1550,1551,1552,1553,1554,1555,1556,1557,1558,1559,1560,1561,1562,1563,1564,1565,1566,1567,1568,1569,1570,1571,1572,1573,1574,1575,1576,1577,1578,1579,1580,1581,1582,1583,1584,1585,1586,1587,1588,1589,1591,1592,1593,1594,1595,1600,1601,1602,1603,1609,1610,1620,1621,1622,1623,1624,1625,1626,1627,1628,1629,1630,1631,1632,1633,1634,1635,1636,1637,1638,1639,1640,1641,1642,1643,1644,1645,1646,1647,1648,1649,1650,1651,1652,1653,1654,1655,1656,1657,1658,1659,1660,1661,1662,1663,1664,1665,1666,1667,1668,1669,1670,1671,1672,1673,1674,1675,1676,1677,1679,1682,1683,1684,1685,1686,1687,1688,1689,1690,1691,1692,1693,1694,1695,1696,1697,1698,1699,1700,1701,1702,1703,1704,1705,1706,1709,1711,1712,1714,1715,1720,1721,1722,1723,1734,1739,1740,1741,1742,1744,1745,1746,1747,1748,1749,1750,1751,1752,1753,1754,1755,1756,1757,1758,1759,1760,1761,1762,1763,1764,1765,1766,1767,1768,1769,1770,1771,1772,1773,1774,1775,1776,1777,1778,1779,1780,1781,1782,1783,1784,1785,1786,1787,1788,1789,1790,1791,1792,1793,1794,1795,1796,1797,1802,1803,1804,1805,1806,1807,1808,1809,1810,1811,1812,1813,1814,1815,1816,1817,1818,1819,1820,1821,1822,1823,1824,1825,1831,1832,1833,1841,1842,1856,1857,1859,1860,1861,1862,1863,1865,1866,1867,1868,1869,1870,1871,1872,1873,1874,1875,1876,1877,1878,1879,1880,1881,1882,1883,1884,1885,1886,1887,1888,1889,1890,1891,1892,1893,1894,1895,1896,1897,1898,1899,1900,1901,1902,1903,1904,1905,1906,1907,1908,1909,1911,1912,1913,1914,1923,1924,1925,1926,1926,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1941,1942,1943,1944,1945,1946,1951,1952,1953,1954,1955,1975,1976,1979,1980,1981,1982,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2030,2031,2043,2044,2045,2052,2053,2054,2055,2056,2057,2058,2059,2060,2061,2062,2063,2064,2065,2066,2067,2072,2073,2074,2075,2076,2094,2095,2096,2100,2102,2104,2105,2106,2107,2108,2109,2110,2111,2112,2113,2114,2115,2116,2117,2118,2119,2120,2121,2122,2123,2124,2125,2126,2127,2128,2129,2130,2131,2132,2133,2134,2135,2136,2137,2138,2139,2140,2141,2142,2143,2150,2151,2161,2162,2163,2174,2175,2176,2177,2178,2179,2180,2181,2182,2183,2184,2185,2186,2187,2188,2189,2191,2192,2193,2194,2195,2196,2197,2213,2214,2215,2216,2217,2220,2221,2222,2223,2224,2225,2226,2227,2228,2229,2230,2231,2232,2233,2234,2235,2236,2237,2238,2239,2240,2241,2242,2243,2244,2245,2246,2247,2248,2249,2250,2251,2252,2253,2254,2255,2256,2257,2258,2259,2260,2261,2262,2263,2264,2269,2270,2271,2281,2294,2295,2296,2297,2298,2299,2300,2301,2302,2303,2304,2305,2306,2307,2308,2309,2311,2312,2313,2314,2315,2316,2317,2318,2335,2336,2338,2339,2340,2341,2342,2343,2344,2345,2346,2347,2348,2349,2350,2351,2352,2353,2354,2355,2356,2357,2358,2359,2360,2361,2362,2363,2364,2365,2366,2367,2368,2369,2370,2371,2372,2373,2374,2375,2376,2377,2378,2379,2380,2381,2382,2383,2384,2385,2390,2414,2415,2416,2417,2418,2419,2420,2421,2422,2423,2424,2425,2426,2427,2428,2429,2430,2431,2432,2433,2434,2438,2457,2458,2459,2460,2461,2462,2463,2464,2465,2466,2467,2468,2469,2470,2471,2472,2473,2474,2475,2476,2477,2478,2479,2480,2481,2482,2483,2484,2485,2486,2487,2488,2489,2490,2491,2492,2493,2494,2495,2496,2497,2498,2499,2500,2501,2502,2503,2504,2505,2536,2537,2538,2539,2540,2541,2542,2543,2544,2545,2546,2547,2548,2549,2550,2551,2552,2553,2554,2555,2557,2558,2559,2575,2576,2577,2578,2580,2581,2582,2583,2583,2584,2585,2586,2587,2588,2589,2590,2591,2592,2593,2594,2595,2596,2597,2598,2599,2600,2601,2602,2603,2604,2605,2606,2607,2608,2609,2610,2611,2612,2613,2614,2615,2616,2617,2618,2619,2620,2621,2622,2623,2624,2625,2656,2657,2658,2659,2660,2661,2662,2663,2664,2665,2666,2667,2668,2669,2670,2671,2672,2673,2674,2675,2676,2697,2698,2699,2700,2701,2702,2703,2704,2705,2706,2707,2708,2709,2710,2711,2712,2713,2714,2715,2716,2717,2718,2719,2720,2721,2722,2723,2724,2725,2726,2727,2728,2729,2730,2731,2732,2733,2734,2735,2736,2737,2738,2739,2740,2741,2742,2743,2744,2745,2776,2777,2778,2779,2780,2781,2782,2783,2784,2785,2786,2787,2788,2789,2790,2791,2792,2793,2814,2815,2816,2817,2818,2819,2820,2821,2823,2824,2825,2826,2831,2832,2833,2834,2835,2836,2837,2838,2839,2840,2841,2842,2843,2844,2845,2846,2847,2848,2849,2850,2851,2852,2853,2854,2855,2856,2857,2858,2859,2860,2861,2862,2864,2865,2896,2897,2898,2899,2900,2901,2902,2903,2904,2905,2906,2907,2908,2909,2910,2911,2912,2934,2935,2936,2937,2940,2942,2944,2945,2946,2947,2948,2949,2950,2951,2952,2953,2954,2955,2956,2957,2958,2959,2960,2961,2962,2963,2964,2965,2966,2967,2968,2969,2970,2971,2972,2973,2974,2975,2976,2977,2978,2979,2980,2984,3016,3017,3018,3019,3020,3021,3022,3023,3024,3025,3026,3027,3028,3029,3030,3031,3054,3055,3056,3061,3062,3064,3065,3066,3067,3068,3069,3070,3071,3072,3073,3074,3075,3076,3077,3078,3079,3080,3081,3082,3083,3084,3085,3086,3087,3088,3089,3090,3091,3092,3093,3094,3095,3096,3097,3099,3100,3103,3104,3137,3138,3139,3140,3141,3142,3143,3144,3145,3146,3147,3148,3149,3150,3151,3175,3176,3177,3178,3179,3180,3188,3189,3190,3191,3192,3193,3194,3195,3196,3197,3198,3199,3200,3201,3202,3203,3204,3205,3206,3207,3208,3209,3210,3211,3212,3213,3214,3215,3216,3217,3220,3221,3222,3223,3224,3258,3259,3260,3261,3262,3263,3264,3265,3266,3267,3268,3269,3270,3294,3295,3296,3297,3298,3299,3300,3301,3304,3305,3309,3310,3311,3312,3313,3314,3315,3316,3317,3318,3319,3320,3321,3322,3323,3324,3325,3326,3327,3328,3329,3330,3331,3332,3333,3334,3335,3336,3337,3341,3379,3380,3381,3382,3383,3384,3385,3386,3387,3388,3389,3390,3414,3415,3416,3417,3418,3419,3420,3421,3422,3423,3424,3425,3426,3427,3428,3429,3430,3431,3432,3433,3434,3435,3436,3437,3438,3439,3440,3441,3442,3443,3444,3445,3446,3447,3448,3449,3450,3451,3452,3453,3454,3455,3456,3457,3461,3499,3500,3501,3502,3503,3504,3510,3533,3534,3535,3536,3537,3538,3539,3540,3541,3542,3543,3544,3545,3546,3547,3548,3549,3550,3551,3552,3553,3555,3556,3557,3558,3559,3560,3561,3562,3563,3564,3565,3566,3567,3568,3569,3570,3571,3572,3573,3574,3575,3576,3577,3580,3620,3621,3621,3622,3623,3624,3652,3653,3654,3655,3656,3657,3658,3659,3660,3661,3662,3663,3664,3665,3666,3667,3668,3670,3671,3672,3673,3674,3680,3681,3682,3683,3684,3685,3686,3687,3688,3689,3690,3691,3692,3693,3694,3695,3696,3697,3742,3743,3744,3747,3748,3750,3751,3752,3753,3771,3772,3773,3774,3775,3776,3777,3778,3779,3780,3781,3782,3783,3784,3785,3786,3787,3788,3789,3790,3791,3792,3793,3794,3795,3796,3800,3801,3802,3803,3804,3805,3806,3807,3808,3809,3810,3811,3812,3813,3814,3862,3863,3864,3865,3866,3867,3871,3872,3873,3874,3875,3892,3893,3894,3895,3896,3897,3898,3899,3900,3901,3902,3903,3904,3905,3906,3907,3908,3909,3911,3912,3913,3914,3915,3922,3923,3924,3925,3929,3930,3931,3932,3934,3937,3938,3984,3985,3986,3987,3988,3989,4012,4013,4014,4015,4016,4017,4018,4019,4020,4021,4022,4023,4024,4025,4026,4027,4028,4029,4030,4032,4033,4034,4042,4043,4044,4050,4051,4052,4053,4057,4058,4107,4108,4109,4113,4132,4133,4134,4135,4136,4137,4138,4139,4140,4141,4142,4143,4144,4145,4146,4147,4148,4149,4150,4151,4152,4162,4163,4164,4170,4171,4172,4173,4177,4178,4179,4228,4229,4230,4231,4232,4233,4234,4235,4236,4253,4254,4255,4256,4257,4258,4259,4260,4261,4262,4263,4264,4265,4266,4267,4268,4269,4270,4271,4272,4273,4274,4283,4290,4292,4296,4298,4299,4350,4351,4352,4353,4354,4355,4356,4357,4373,4374,4375,4376,4377,4378,4379,4380,4381,4382,4383,4384,4385,4386,4387,4388,4389,4390,4391,4392,4393,4394,4404,4410,4411,4416,4418,4419,4471,4472,4473,4474,4475,4476,4477,4478,4479,4480,4494,4495,4500,4501,4502,4503,4504,4505,4506,4507,4508,4509,4510,4511,4512,4529,4530,4531,4532,4536,4590,4591,4592,4593,4594,4595,4596,4597,4598,4599,4600,4620,4621,4622,4623,4624,4625,4626,4627,4628,4629,4630,4631,4650,4651,4652,4654,4656,4657,4659,4660,4710,4711,4712,4713,4714,4715,4716,4717,4718,4719,4720,4721,4722,4740,4741,4742,4743,4744,4745,4746,4747,4748,4749,4750,4771,4774,4776,4777,4778,4779,4780,4781,4782,4783,4784,4830,4831,4832,4833,4834,4835,4836,4837,4838,4839,4840,4841,4842,4843,4844,4845,4861,4862,4863,4864,4865,4866,4867,4868,4869,4870,4892,4893,4897,4898,4899,4902,4902,4903,4904,4905,4906,4907,4908,4951,4952,4953,4954,4955,4956,4957,4958,4959,4960,4961,4962,4963,4964,4965,4982,4983,4984,4985,4986,4987,4988,4989,4990,5013,5014,5016,5017,5018,5019,5021,5022,5023,5024,5025,5026,5029,5030,5071,5072,5073,5074,5075,5076,5077,5078,5079,5080,5081,5082,5083,5084,5102,5103,5104,5105,5106,5107,5108,5109,5110,5135,5137,5138,5141,5147,5192,5193,5194,5195,5196,5197,5198,5199,5200,5201,5202,5203,5204,5221,5222,5223,5224,5225,5226,5227,5228,5229,5230,5233,5234,5255,5259,5260,5261,5262,5265,5313,5314,5315,5316,5317,5318,5319,5320,5321,5322,5323,5324,5341,5342,5343,5344,5345,5346,5347,5348,5349,5350,5352,5353,5375,5377,5378,5379,5380,5381,5382,5383,5384,5385,5386,5434,5435,5436,5437,5438,5439,5440,5441,5442,5443,5462,5463,5464,5465,5466,5467,5468,5469,5472,5473,5497,5498,5499,5500,5501,5502,5503,5504,5505,5506,5512,5513,5554,5555,5556,5557,5558,5559,5560,5561,5562,5563,5582,5583,5584,5585,5586,5587,5588,5589,5592,5593,5615,5616,5617,5618,5619,5620,5621,5622,5623,5624,5625,5626,5627,5632,5633,5674,5675,5676,5677,5678,5679,5680,5681,5702,5703,5704,5705,5706,5707,5708,5709,5712,5735,5736,5737,5738,5739,5740,5741,5742,5743,5744,5745,5746,5747,5748,5793,5794,5795,5796,5797,5798,5799,5800,5823,5824,5825,5826,5827,5855,5856,5857,5858,5859,5860,5861,5862,5863,5864,5865,5866,5867,5868,5913,5914,5915,5916,5917,5918,5919,5920,5943,5944,5945,5946,5947,5976,5977,5978,5979,5980,5981,5982,5983,5984,5985,5986,5987,5988,6033,6034,6035,6036,6037,6038,6039,6063,6064,6065,6066,6096,6097,6098,6102,6103,6104,6105,6106,6107,6115,6153,6154,6155,6156,6157,6158,6224,6225,6226,6227,6235,6236,6273,6274,6275,6276,6277,6345,6346,6355,6356,6357,6392,6393,6394,6395,6396,6466,6475,6476,6512,6513,6514,6515,6593,6594,6595,6632,6633,6634,6713,6714,6752,6753,6754,6872,6873,6992,6993,6994,7113,7114,7115],
	stg = d.getElementById('WorldMap'),
	ns = 'worldmap-table';

	function createTable (w, h) {
		var table = d.createElement('table'),
			cellW = w,
			cellH = h,
			cellL = (cellW * cellH),
			html = '';

		table.className = ns;

		for (var i = 1; i < cellL + 1; i++) {
		  html += '<td><div class="dot dot-'+ i +' sea"></div></td>';

		  if ( i === 0 ) {
			html += '</tr>';
		  } else if ( i !== 0 && i%cellW === 0 && cellL !== i ) {
			html += '</tr><tr>';
		  }
		}

		table.innerHTML = html;
		return table;
	}

	if ( d.getElementById('WorldMap') !== null ) {
		stg.appendChild( createTable(120, 60) );

		for (var i=0; i<positions.length; i++) {
			var targ = d.querySelector('.'+ ns +' .dot-'+ positions[i]);
			targ.className = targ.className.replace('sea','ground');
		}
	}
}

function setRandomClass() {
	var items = $('#WorldMap').find(".ground");
	var number = items.length;
	var random_L_1 = Math.floor((Math.random() * number));
	var random_L_2 = Math.floor((Math.random() * number));

	var random_S_1 = Math.floor((Math.random() * number));
	var random_S_2 = Math.floor((Math.random() * number));
	var random_S_3 = Math.floor((Math.random() * number));
	var random_S_4 = Math.floor((Math.random() * number));

	items.eq(random_L_1).addClass("dot-animation");
	items.eq(random_L_2).addClass("dot-animation");

	items.eq(random_S_1).addClass("dot-animation-small");
	items.eq(random_S_2).addClass("dot-animation-small");
	items.eq(random_S_3).addClass("dot-animation-small");
	items.eq(random_S_4).addClass("dot-animation-small");

	setTimeout(function() {
	  items.eq(random_L_1).removeClass("dot-animation");
	  items.eq(random_L_2).removeClass("dot-animation");
	}, 4000);

	setTimeout(function() {
	  items.eq(random_S_1).removeClass("dot-animation-small");
	  items.eq(random_S_2).removeClass("dot-animation-small");
	  items.eq(random_S_3).removeClass("dot-animation-small");
	  items.eq(random_S_4).removeClass("dot-animation-small");
	}, 3000);
}

function setRandomPlane() {

  var arr = ['plane-top', 'plane-right', 'plane-bottom', 'plane-left'];
  var idx = getRandomInt(0, 4);

  if ( arr[idx] === 'plane-top' || arr[idx] === 'plane-bottom' ) {
	$('.plane').addClass( arr[idx] ).css('left', getRandomInt(0, 100) + '%');
  } else {
	$('.plane').addClass( arr[idx] ).css('top', getRandomInt(0, 100) + '%');
  }

  setTimeout(function() {
	$('.plane').removeClass( arr[idx] );
  }, 5000);
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shop () {
	$('.showlogin').click(function() {
		$('.login').slideToggle();
	})
	$('#createaccount').click(function() {
		if($(this).is(':checked'))
			$(".create-account").slideDown();
		else
			$(".create-account").slideUp();
	})
	$('#ship-to-different-address-checkbox').click(function() {
		if($(this).is(':checked'))
			$(".shipping_address").slideDown();
		else
			$(".shipping_address").slideUp();
	})
}

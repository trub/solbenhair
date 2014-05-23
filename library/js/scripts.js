/* -----------------------------------------------------------------------------

	TABLE OF CONTENTS

	1.) General
	2.) Components
	3.) Header
	4.) Main Slider
	5.) Core
	6.) Bottom Panel
	4.) Footer
	8.) Style Switcher

----------------------------------------------------------------------------- */

(function($){ "use strict";
$(document).ready(function(){

/* -----------------------------------------------------------------------------

	/* -------------------------------------------------------------------------
		FLUID VIDEOS
	------------------------------------------------------------------------- */

	$( 'body' ).lvFluidEmbedVideo();


	/* -------------------------------------------------------------------------
		LOAD HIRES IMAGES FOR HiDPI SCREENS
	------------------------------------------------------------------------- */

	if ( $.fn.lvLoadHiresImages ) {
		$( 'body' ).lvLoadHiresImages();
	}

	/* -------------------------------------------------------------------------
		MEDIA QUERY BREAKPOINT
	------------------------------------------------------------------------- */

	var mediaQueryBreakpoint;
	if ( $.fn.lvGetMediaQueryBreakpoint ) {
		mediaQueryBreakpoint = $.fn.lvGetMediaQueryBreakpoint();
		$( document ).on( 'screenTransition', function(){
			mediaQueryBreakpoint = $.fn.lvGetMediaQueryBreakpoint();
		});
	}
	else {
		mediaQueryBreakpoint = $(window).width();
	}


/* -----------------------------------------------------------------------------

	2.) COMPONENTS

----------------------------------------------------------------------------- */

	/* -------------------------------------------------------------------------
		ACCORDION
	------------------------------------------------------------------------- */

	if ( $.fn.lvAccordion ) {
		$( '.c-accordion' ).each(function(){
			$(this).lvAccordion();
		});
	}

	/* -------------------------------------------------------------------------
		GALLERY
	------------------------------------------------------------------------- */

	if ( $.fn.owlCarousel ) {
		$( '.c-gallery.m-paginated' ).each(function(){

			var $this = $(this),
			itemList = $this.find( '> .thumb-list' ),
			items = $this.data( 'items' ) ? parseInt( $this.data( 'items' ) ) : 4,
			itemsDesktop = $this.data( 'items-desktop' ) ? parseInt( $this.data( 'items-desktop' ) ) : 4,
			itemsDesktopSmall = $this.data( 'items-desktop-small' ) ? parseInt( $this.data( 'items-desktop-small' ) ) : 3,
			itemsTablet = $this.data( 'items-tablet' ) ? parseInt( $this.data( 'items-tablet' ) ) : 2,
			itemsMobile = $this.data( 'items-mobile' ) ? parseInt( $this.data( 'items-mobile' ) ) : 1;

			// CAROUSEL
			itemList.owlCarousel({
				autoPlay: false,
				slideSpeed: 300,
				pagination: true,
				paginationSpeed : 400,
				singleItem: false,
				addClassActive: true,
				autoHeight: false,
				items : items,
				itemsDesktop : [1199,itemsDesktop],
				itemsDesktopSmall : [979,itemsDesktopSmall],
				itemsTablet: [768,itemsTablet],
				itemsMobile: [479,itemsMobile]
			});

			// HOVER
			$this.hover(function(){
				$this.addClass( 'm-hover' );
			}, function(){
				$this.removeClass( 'm-hover' );
			});

		});
	}

	/* -------------------------------------------------------------------------
		PROGRESS BAR
	------------------------------------------------------------------------- */

	if ( $.fn.lvProgressBar ) {
		$( '.c-progress-bar' ).each(function(){
			$(this).lvProgressBar();
		});
	}

	/* -------------------------------------------------------------------------
		SERVICE LIST
	------------------------------------------------------------------------- */

	if ( $.fn.owlCarousel ) {
		$( '.c-service-list.m-paginated' ).each(function(){

			var $this = $(this),
			itemList = $this.find( '.service-list-inner' ),
			items = $this.data( 'items' ) ? parseInt( $this.data( 'items' ) ) : 4,
			itemsDesktop = $this.data( 'items-desktop' ) ? parseInt( $this.data( 'items-desktop' ) ) : 4,
			itemsDesktopSmall = $this.data( 'items-desktop-small' ) ? parseInt( $this.data( 'items-desktop-small' ) ) : 3,
			itemsTablet = $this.data( 'items-tablet' ) ? parseInt( $this.data( 'items-tablet' ) ) : 2,
			itemsMobile = $this.data( 'items-mobile' ) ? parseInt( $this.data( 'items-mobile' ) ) : 1;

			// CAROUSEL
			itemList.owlCarousel({
				autoPlay: false,
				slideSpeed: 300,
				pagination: true,
				paginationSpeed : 400,
				singleItem: false,
				addClassActive: true,
				autoHeight: true,
				items : items,
				itemsDesktop : [1199,itemsDesktop],
				itemsDesktopSmall : [979,itemsDesktopSmall],
				itemsTablet: [768,itemsTablet],
				itemsMobile: [479,itemsMobile]
			});

			// HOVER
			$this.hover(function(){
				$this.addClass( 'm-hover' );
			}, function(){
				$this.removeClass( 'm-hover' );
			});

		});
	}

	/* -------------------------------------------------------------------------
		TABS
	------------------------------------------------------------------------- */

	if ( $.fn.lvTabbed ) {
		$( '.c-tabs' ).each(function(){
			$(this).lvTabbed();
		});
	}

	/* -------------------------------------------------------------------------
		TESTIMONIAL LIST
	------------------------------------------------------------------------- */

	if ( $.fn.owlCarousel ) {
		$( '.c-testimonial-list.m-paginated' ).each(function(){

			var $this = $(this),
			itemList = $this.find( '.testimonial-list-inner' );

			// CAROUSEL
			itemList.owlCarousel({
				autoPlay: false,
				slideSpeed: 300,
				pagination: true,
				paginationSpeed : 400,
				singleItem: true,
				addClassActive: true,
				autoHeight: true
			});

			// HOVER
			$this.hover(function(){
				$this.addClass( 'm-hover' );
			}, function(){
				$this.removeClass( 'm-hover' );
			});

		});
	}


/* -----------------------------------------------------------------------------

	3.) HEADER

----------------------------------------------------------------------------- */

	/* -------------------------------------------------------------------------
		HEADER SUBMENU
	------------------------------------------------------------------------- */

	$( '#header .header-menu .sub-menu' ).each(function(){
		$(this).parent().each(function(){

			var $this = $(this),
			submenu = $(this).find( '> .sub-menu' );

			// SHOW SUBMENU ON HOVER
			$this.hover(function(){
				if ( mediaQueryBreakpoint > 1199 ) {
					$this.addClass( 'm-hover' );
					submenu.show().addClass( 'animated fadeInLeft' );
				}
			}, function(){
				if ( mediaQueryBreakpoint > 1199 ) {
					$this.removeClass( 'm-hover' );
					submenu.hide().removeClass( 'animated fadeInLeft' );
				}
			});

			// SUBMENU TOGGLE
			$this.addClass( 'm-has-submenu' ).append( '<button class="submenu-toggle" type="button"><i class="fa"></i></button>' );
			$this.find( '.submenu-toggle' ).click(function(){
				$(this).toggleClass( 'm-active' );
				if ( mediaQueryBreakpoint > 767 ) {
					if ( submenu.is( ':visible' ) ) {
						submenu.hide().removeClass( 'animated fadeInLeft' );
					}
					else {
						submenu.show().addClass( 'animated fadeInLeft' );
						$(this).unbind( 'clickoutside' );
						$(this).bind( 'clickoutside', function(){
							$(this).unbind( 'clickoutside' );
							submenu.hide().removeClass( 'animated fadeInLeft' );
							$(this).removeClass( 'm-active' );
						});
					}
				}
				else {
					$this.find( '> .sub-menu' ).slideToggle( 300 );
				}
			});
			$( document ).on( 'screenTransition', function(){
				$this.find( '.submenu-toggle' ).removeClass( 'm-active' );
				$this.find( '> .sub-menu' ).removeAttr( 'style' );
			});

		});
	});

	/* -------------------------------------------------------------------------
		HEADER MENU MOBILE
	------------------------------------------------------------------------- */

	$( '#header .header-menu' ).each(function(){

		var $this = $(this),
		toggle = $this.find( '.header-menu-toggle' ),
		inner = $this.find( '> ul' );

		toggle.click(function(){
			inner.slideToggle( 300 );
			toggle.toggleClass( 'm-active' );
			if ( mediaQueryBreakpoint <= 767 ) {
				$( '#header .header-search-inner:visible' ).slideUp( 300 );
			}
		});
		$( document ).on( 'screenTransition', function(){
			inner.removeAttr( 'style' );
			toggle.removeClass( 'm-active' );
		});

	});

	/* -------------------------------------------------------------------------
		HEADER SEARCH
	------------------------------------------------------------------------- */

	$( '#header .header-search' ).each(function(){

		var $this = $(this),
		toggle = $this.find( '.search-toggle' ),
		toggleMobile = $this.find( '.search-toggle-mobile' );

		// SEARCH TOGGLE
		toggle.click(function(){
			$this.addClass( 'm-active' );
			$this.find( '.search-input' ).focus();
			$this.bind( 'clickoutside', function(){
				$this.removeClass( 'm-active' );
			});
		});

		// SEARCH TOGGLE MOBILE
		toggleMobile.click(function(){
			$this.find( '.header-search-inner' ).slideToggle( 300 );
			toggleMobile.toggleClass( 'm-active' );
			if ( mediaQueryBreakpoint <= 767 ) {
				$( '#header .header-menu > ul:visible' ).slideUp( 300 );
			}
		});
		$( document ).on( 'screenTransition', function(){
			$this.find( '.header-search-inner' ).removeAttr( 'style' );
			toggleMobile.removeClass( 'm-active' );
		});

	});

	/* -------------------------------------------------------------------------
		HEADER CONTACT / RESERVATION / SOCIAL TOGGLE
	------------------------------------------------------------------------- */

	$( '#header .header-panel' ).each(function(){

		var $this = $(this),
		toggle = $this.find( '.header-panel-toggle' ),
		reservation = $this.find( '.header-reservation' ),
		contact = $this.find( '.header-contact' ),
		social = $this.find( '.header-social' );

		// TOGGLE
		toggle.click(function(){

			contact.slideToggle( 300 );
			reservation.slideToggle( 300 );
			$( '#header' ).toggleClass( 'm-has-active-panel' );
			toggle.toggleClass( 'm-active' );

			if ( mediaQueryBreakpoint <= 767 ) {
				social.slideToggle( 300 );
			}

		});

		// RESET ON SCREEN TRANSITION
		$( document ).on( 'screenTransition', function(){
			toggle.removeClass( 'm-active' );
			$( '#header' ).removeClass( 'm-has-active-panel' );
			reservation.removeAttr( 'style' );
			contact.removeAttr( 'style' );
			social.removeAttr( 'style' );
		});

	});


/* -----------------------------------------------------------------------------

	4.) MAIN SLIDER

----------------------------------------------------------------------------- */

	if ( $.fn.owlCarousel ) {
		$( '#main-slider' ).each(function(){

			var slider = $(this),
			slide_list = slider.find( '.slide-list' ),
			slide_count = slide_list.find( '> .slide' ).length,
			slides = slide_list.find( '> .slide' ),
			interval = slider.data( 'interval' ) ? parseInt( slider.data( 'interval' ) ) : false;

			if ( slide_count > 1 ) {

				// CREATE CAROUSEL
				slide_list.owlCarousel({
					autoPlay: interval,
					slideSpeed: 300,
					pagination: false,
					paginationSpeed : 400,
					singleItem: true,
					addClassActive: true,
					autoHeight: false,
					beforeMove: function(){
						// REFRESH INDICATOR
						if ( interval ) {
							slider.find( '.slider-indicator > span' ).stop( 0, 0 );
						}
					},
					afterMove: function(){
						// REFRESH INDICATOR
						if ( interval && mediaQueryBreakpoint > 991 ) {
							slider.find( '.slider-indicator > span' ).css( 'width', 0 );
							if ( ! slider.hasClass( 'm-paused' ) ) {
								slider.find( '.slider-indicator > span' ).stop( 0, 0 ).animate({ width : "100%" }, interval );
							}
						}
					},
					afterAction: function(){
						var active_index = slide_list.find( '.owl-item.active' ).index();
						slider.find( '.slider-nav ul > li.m-active' ).removeClass( 'm-active' );
						slider.find( '.slider-nav ul > li:eq(' + active_index + ')' ).addClass( 'm-active' );
					}
				});

				// CREATE NAVIGATION
				var label,
				nav = '<div class="slider-nav"><div class="container"><ul>';
				for ( var i = 0; i < slide_count; i++ ) {
					if ( slides.eq( i ).data( 'label' ) ) {
						label = slides.eq( i ).data( 'label' );
					}
					else {
						label = i;
					}
					nav += '<li><button>' + label + '</button></li>';
				}
				nav += '</ul></div></div>';
				slide_list.append( nav );
				var slider_nav = slider.find( '.slider-nav' );
				slider_nav.find( 'ul > li:first-child' ).addClass( 'm-active' );

				// NAVIGATION CLICK
				slider_nav.find( 'button' ).each(function(){
					var $this = $(this),
					this_index = $this.parent().index();
					$this.click(function(){
						if ( ! $(this).parent().hasClass( 'm-active' ) ) {
							slide_list.trigger( 'owl.goTo', this_index );
						}
					});
				});

				// AUTO SLIDE INDICATOR
				if ( interval ) {

					// CREATE
					slider.addClass( 'm-has-indicator' );
					slider.append( '<div class="slider-indicator"><span></span></div>' );

					// INITIAL ANIMATION
					slider.find( '.slider-indicator > span' ).animate({
						width : "100%"
					}, interval, 'linear' );

					// PAUSE
					slider_nav.find( '.container' ).append( '<button class="slider-pause-btn" type="button"><i class="fa"></i></button>' );
					var sliderPauseBtn = slider_nav.find( '.slider-pause-btn' );
					var sliderPause = function(){
						sliderPauseBtn.addClass( 'm-active' );
						slider.addClass( 'm-paused' );
						slide_list.trigger( 'owl.stop' );
						slider.find( '.slider-indicator > span' ).stop( 0, 0 );
					};
					var sliderResume = function(){
						sliderPauseBtn.removeClass( 'm-active' );
						slider.removeClass( 'm-paused' );
						slide_list.trigger( 'owl.play', interval );
						slider.find( '.slider-indicator > span' ).stop( 0, 0 ).animate({
							width : "100%"
						}, interval, 'linear' );
					};

					sliderPauseBtn.click(function(){
						if ( $(this).hasClass( 'm-active' ) ) {
							sliderResume();
						}
						else {
							sliderPause();
						}
					});
					$( document ).on( 'modalOpened', function(){
						sliderPause();
					});
					$( document ).on( 'modalClosed', function(){
						sliderResume();
					});

					// STOP ON SMALLER RESOLUTIONS
					$( document ).on( 'screenTransition', function(){
						if ( mediaQueryBreakpoint <= 991 ) {
							sliderPause();
						}
					});
					if ( mediaQueryBreakpoint <= 991 ) {
						sliderPause();
					}

				}

			}

		});
	}


/* END. */
});
})(jQuery);
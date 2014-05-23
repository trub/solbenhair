(function($){
    "use strict";

/* -----------------------------------------------------------------------------

	PLUGINS

----------------------------------------------------------------------------- */

	/* -------------------------------------------------------------------------
		ACCORDION
	------------------------------------------------------------------------- */

	$.fn.lvAccordion = function(){

		var $this = $(this),
		isToggle = $this.hasClass( 'm-toggle' ) ? true : false,
		items = $this.find( '> li' );
		items.filter( '.m-active' ).find( '.accordion-content' ).slideDown( 300 );

		$this.find( '.accordion-title' ).click(function(){
			if ( ! $(this).parent().hasClass( 'm-active' ) ) {
				if ( ! isToggle ) {
					items.filter( '.m-active' ).find( '.accordion-content' ).slideUp(300);
					items.filter( '.m-active' ).removeClass( 'm-active' );
				}
				$(this).parent().find( '.accordion-content' ).slideDown(300);
				$(this).parent().addClass( 'm-active' );
			}
			else {
				$(this).parent().find( '.accordion-content' ).slideUp(300);
				$(this).parent().removeClass( 'm-active' );
			}
		});

		// RADIO GROUP
		if ( $this.hasClass( 'm-radio-group' ) ) {
			items.removeClass( 'm-active' );
			$this.find( '.accordion-content' ).hide();
			$this.find( 'input[type="radio"]:checked' ).parent().addClass( 'm-active' ).find( '.accordion-content' ).slideDown( 300 );
		}

	};



	/* -------------------------------------------------------------------------
		FLUID VIDEOS
	------------------------------------------------------------------------- */

	$.fn.lvFluidEmbedVideo = function(){

		var $self = $(this),
		allVideos;

        var reloadFluidVideos = function(){
			// Resize all videos according to their own aspect ratio
            allVideos.each(function() {
                var el = $(this);
                var elContainer = el.parents( '.embed-video' );
                var newWidth = elContainer.width();
                el.width( newWidth ).height( newWidth * el.data( 'aspectRatio' ) );
            });
        };

        var generateFluidVideos = function(){
            // Find all videos
            allVideos = $self.find( '.embed-video iframe' );
            // The element that is fluid width
            //$fluidEl = $('.embed-video').first();
            // Figure out and save aspect ratio for each video
            allVideos.each(function() {
                $(this).data( 'aspectRatio', this.height / this.width )
                    // and remove the hard coded width/height
                    .removeAttr( 'height' )
                    .removeAttr( 'width' );
            });
            reloadFluidVideos();
        };

		if ( $self.find( '.embed-video' ).length > 0 ) {
			generateFluidVideos();
			$(window).resize(function(){
				reloadFluidVideos();
			});
		}

	};

	/* -------------------------------------------------------------------------
		LOAD HIRES IMAGES
	------------------------------------------------------------------------- */

	$.fn.lvLoadHiresImages = function() {
		if ( window.devicePixelRatio > 1 ) {
			$(this).find( 'img[data-hires]' ).each(function(){
				$(this).attr( 'src', $(this).data( 'hires' ) );
			});
		}
	};

	/* -------------------------------------------------------------------------
		MEDIA QUERY BREAKPOINT
	------------------------------------------------------------------------- */

	$.fn.lvGetMediaQueryBreakpoint = function() {

		if ( $( '#media-query-breakpoint' ).length < 1 ) {
			$( 'body' ).append( '<span id="media-query-breakpoint" style="display: none;"></span>' );
		}
		var value = $( '#media-query-breakpoint' ).css( 'font-family' );
		if ( typeof value !== 'undefined' ) {
			value = value.replace( "\"", "" ).replace( "\"", "" ).replace( "\'", "" ).replace( "\'", "" );
		}
		if ( isNaN( value ) ) {
			return $(window).width();
		}
		else {
			return parseInt( value );
		}

	};

	/* -------------------------------------------------------------------------
		QUANTITY INPUT
	------------------------------------------------------------------------- */

	$.fn.lvQuantityInput = function(){

		var $this = $(this),
		input = $this.find( 'input' ),
		value = parseInt( input.val() ),
		minValue = input.prop( 'min' ) ? parseInt( input.prop( 'min' ) ) : 0,
		maxValue = input.prop( 'max' ) ? parseInt( input.prop( 'max' ) ) : 100,
		step = input.prop( 'step' ) ? parseInt( input.prop( 'step' ) ) : 1;

		// CREATE ELEMENTS
		input.hide();
		$this.append( '<input class="fake-input" type="text" value="' + value + '"><button class="minus" type="button"><i class="fa fa-minus"></i></button><button class="plus" type="button"><i class="fa fa-plus"></i></button>' );
		var plus = $this.find( '.plus' ),
		minus = $this.find( '.minus' ),
		fakeInput = $this.find( '.fake-input' );
		if ( input.hasClass( 'm-type-2' ) ){
			fakeInput.addClass( 'm-type-2' );
		}

		// ACTIONS
		minus.click(function(){
			if ( ( value - step ) >= minValue ) {
				value -= step;
				fakeInput.val( value );
				fakeInput.trigger( 'change' );
			}
		});
		plus.click(function(){
			if ( ( value + step ) <= maxValue ) {
				value += step;
				fakeInput.val( value );
				fakeInput.trigger( 'change' );
			}
		});
		fakeInput.change(function(){
			if ( ! isNaN( fakeInput.val() ) ) {
				value = parseInt( fakeInput.val() );
				input.val( value );
			}
		});

	};

	/* -------------------------------------------------------------------------
		SELECTBOX INPUT
	------------------------------------------------------------------------- */

	$.fn.lvSelectboxInput = function(){

		var $this = $(this);
		$this.wrap( '<div class="selectbox-input"></div>' );
		$this = $this.parent();
		var input = $this.find( 'select' ),
		fakeSelectHtml = '';
		input.removeClass( 'selectbox-input' );
		var value = input.val();
		var defaultValue = input.find( 'option[value="' + value + '"]' ).text() ? input.find( 'option[value="' + value + '"]' ).text() : input.find( 'option' ).first().text();

		// COPY CLASSES
		if ( input.hasClass( 'm-small' ) ) {
			$this.addClass( 'm-small' );
		}
		if ( input.hasClass( 'm-type-2' ) ) {
			$this.addClass( 'm-type-2' );
		}

		// CREATE ELEMENTS
		input.hide();
		$this.append( '<button type="button" class="toggle"><span>' + defaultValue + '</span></button>' );
		fakeSelectHtml = '<ul class="fake-selectbox" style="display: none;">';
		input.find( 'option' ).each(function(){
			fakeSelectHtml += '<li data-value="' + $(this).attr( 'value' ) + '">' + $(this).text() + '</li>';
		});
		fakeSelectHtml += '</ul>';
		$this.append( fakeSelectHtml );
		var toggle = $this.find( '.toggle' ),
		fakeSelect = $this.find( '.fake-selectbox' );

		// TOGGLE
		toggle.click(function(){
			fakeSelect.slideToggle(150);
			toggle.toggleClass( 'm-active' );
			$this.unbind( 'clickoutside' );
			if ( toggle.hasClass( 'm-active' ) ) {
				$this.bind( 'clickoutside', function(event){
					fakeSelect.slideUp(150);
					toggle.removeClass( 'm-active' );
					$this.unbind( 'clickoutside' );
				});
			}
		});

		// FAKE SELECTBOX CLICK
		fakeSelect.find( 'li' ).each(function(){
			$(this).click(function(){
				toggle.removeClass( 'm-active' ).find( 'span' ).text( $(this).text() );
				fakeSelect.slideUp(150);
				input.val( $(this).attr( 'data-value' ) );
				input.trigger( 'change' );
			});
		});

	};

	/* -------------------------------------------------------------------------
		TABS
	------------------------------------------------------------------------- */

	$.fn.lvTabbed = function(){

		var $this = $(this),
		tabs = $this.find( '.tab-list > li' ),
		contents = $this.find( '.content-list > li' );

		tabs.click(function(){
			if ( ! $(this).hasClass( 'm-active' ) ) {
				var index = $(this).index();
				tabs.filter( '.m-active' ).removeClass( 'm-active' );
				$(this).addClass( 'm-active' );
				contents.filter( ':visible' ).slideUp( 300, function(){
					$(this).removeClass( 'm-active' );
				});
				contents.filter( ':eq(' + index + ')' ).slideDown(300).addClass( 'm-active' );
			}
		});

	};

/* -----------------------------------------------------------------------------

	EVENTS

----------------------------------------------------------------------------- */

	/* -------------------------------------------------------------------------
		SCREEN SIZE TRANSITION
	------------------------------------------------------------------------- */

	if ( $.fn.lvGetMediaQueryBreakpoint ) {
		var mediaQueryBreakpoint = $.fn.lvGetMediaQueryBreakpoint();
		$(window).resize(function(){
			if ( $.fn.lvGetMediaQueryBreakpoint() !== mediaQueryBreakpoint ) {
				mediaQueryBreakpoint = $.fn.lvGetMediaQueryBreakpoint();
				$.event.trigger({
					type: 'screenTransition',
					message: 'Screen transition completed.',
					time: new Date()
				});
			}
		});
	}

})(jQuery);
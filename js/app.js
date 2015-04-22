$(document).ready(function(){
	//set max height equal to initial parent height, so things don't get...weird
	$('.flip-up-back').each(function(){
		$(this).css('max-height', $(this).parent().css('height'));
	})

	$('.flip-up-component').each(function(){
		$(this).css('max-height', $(this).css('height'));
	})

	//this takes a component object (defined below)
	//and makes a hammer out of it.
	function makeHammer( component ){
		var hammer = new Hammer( component.id );
		hammer.get( 'pan' ).set({
			direction: Hammer.DIRECTION_ALL
		})
		hammer.on('panup pandown', function( ev ){
			if( component.self.height() >= 0 && component.self.height() <= component.initHeight && component.self.hasClass('active') ){
				component.self.css( 'height' , component.self.height() + ev.deltaY );
				component.back.css( 'height' , component.initHeight - ( component.self.height() + ev.deltaY ) );
			}

			if ( component.self.height() == 0 && component.self.next('.flip-up-component-wrapper')[0] ){
				component.self.removeClass('active');
				component.self.next('.flip-up-component-wrapper').addClass('active');
			}
		});
	}

	//this function serves as a constructor, but also creates hammers
	//so you don't have to worry about writing more than one line
	//of code per component.
	var Component = function( elem ){
		this.id = document.getElementById( elem );
		this.self = $( '#' + elem );
		this.back = $( '#' + elem ).find( '.flip-up-back' );
		this.initHeight = $( '#' + elem ).height();
		makeHammer( this );
	}

	//here we declare our individual components.
	var torso = new Component( 'torso' ),
		lungs = new Component( 'lungs' ),
		stomach = new Component( 'stomach' );
});
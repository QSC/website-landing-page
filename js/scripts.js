/*****************************************
	
    *Author			PickArt Studio
	*Website		www.pickartstudio.com
		
 *****************************************/
 
 /* 1. -
  * 2. WoW JS
  * 3. CountDown Date of Release
  * 4. Ajax Subscribe
  * 5. Ajax Contact
  * 6. Smooth Scroll on Anchor Pages
  */
 
$(document).ready(function() {
'use strict';


/* == 02. WoW JS == */
new WOW().init();

/* == 03. Countdown Date of Release == */
	/*VERY IMPORTANT: Put the same date on each row in order to have a fully functionally countdown*/
	
	/*Showing Days*/
	 $('.countdown-days').countdown('2017/02/03', function(event) { /*Edit the Date of Release Here for Days*/
     $(this).html(event.strftime('%D'));
   });
   	/*Showing Hours*/
	 $('.countdown-hours').countdown('2017/02/03', function(event) { /*Edit the Date of Release Here for Hours*/
     $(this).html(event.strftime('%H'));
   });
   	/*Showing Minutes*/
	 $('.countdown-minutes').countdown('2017/02/03', function(event) { /*Edit the Date of Release Here for Minutes*/
     $(this).html(event.strftime('%M'));
   });
   /*Showing Minutes*/
	 $('.countdown-seconds').countdown('2017/02/03', function(event) { /*Edit the Date of Release Here for Seconds*/
     $(this).html(event.strftime('%S seconds'));
   });

/* == 04. Ajax Subscribe == */

	$('.subscribe-form').submit(function() {
		  var postdata = $('.subscribe-form').serialize();
		  $.ajax({
			  type: 'POST',
			  url: 'inc/subscribe.php',
			  data: postdata,
			  dataType: 'json',
			  success: function(json) {
				  if(json.valid == 0) {
					  $('.status-message').html(json.error);
					  $('.status-message').fadeIn('slow');
					  $('.status-message').css('margin-top','5px');
				  }
				  else {
					  $("input, textarea").val('');
					  $('.subscribe-form button').prop('disabled',true);
					  $('.status-message').html(json.message);
					  $('.status-message').fadeIn('slow');
					  $('.status-message').css('margin-top','5px');
				  }
			  }
			});
			return false;
		});
		
/* == 05. Ajax Contact == */

	$('.contact-form form').submit(function() {
	
			$('.contact-form form .nameLabel').html('Name');
			$('.contact-form form .emailLabel').html('Email');
			$('.contact-form form .messageLabel').html('Message');
	
			var postdata = $('.contact-form form').serialize();
			$.ajax({
				type: 'POST',
				url: 'inc/sendmail.php',
				data: postdata,
				dataType: 'json',
				success: function(json) {
					if(json.nameMessage != '') {
						$('.contact-form form .nameLabel').append(' - <span class="status"> ' + json.nameMessage + '</span>');
					}
					if(json.emailMessage != '') {
						$('.contact-form form .emailLabel').append(' - <span class="status"> ' + json.emailMessage + '</span>');
					}
					if(json.messageMessage != '') {
						$('.contact-form form .messageLabel').append(' - <span class="status"> ' + json.messageMessage + '</span>');
					}
					if(json.nameMessage == '' && json.emailMessage == '' && json.messageMessage == '') {
							$('.status-message-contact').addClass('animated fadeIn').html('EMAIL SENT SUCCESSFULLY.');
							$('input[type="text"],textarea').val('');
					}
				}
			});
			return false;
		});	
                
/* == 06. Smooth Scroll on Anchor Pages == */               
  $(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

   


});
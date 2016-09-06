// Find and set page url, title, and summary
window.mp_sm_sidebar_init = function(url, title, description) {
	if (url) {
		url 	= encodeURIComponent(url);
	}
	if (title) {
		title 	= encodeURIComponent(title);
	}
	if (description) {
		description = encodeURIComponent(description);
	}

	// plug page url, title, and summary into share links for social media
	$('.sm-share-selector').each(function(index, elem){
		var href = $(elem).attr('href')

		if(!href) return

		href = href.replace("#{url}", url || '')
				   .replace("#{title}", title || '')
				   .replace("#{description}", description || '');
		$(elem).attr('href', href);
	})

	// google analytics event for social media share clicks
	var socialMediaShare = function(platform){
		return function(){
			ga('send', {
				hitType: 'event',
				eventCategory: 'Social Media Shares',
				eventAction: platform,
				eventLabel: title
			});
		}
	}

	$('#facebook-share-button').click(socialMediaShare('facebook'));
	$('#twitter-share-button').click(socialMediaShare('twitter'));
	$('#google-share-button').click(socialMediaShare('google'));
	$('#linkedin-share-button').click(socialMediaShare('linkedin'));

	// Bring up share button after 30 seconds on page
	var shareMe = setTimeout(function() {
		$(".share-slider-toggle").animate({
			'bottom': '+=100px'
		})
	}, 30000)

	$(document).ready(shareMe);

	// Share button toggle pane slide out
	$(".share-slider-toggle").click(function() {
		$(this).animate({
			'bottom' : "-=100px"
		});
		$(".sm-share-buttons").animate({
			'left' : "+=100px"
		});
	});
};
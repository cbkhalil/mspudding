// Find and set page url, title, and summary
window.mp_sm_sidebar_init = function(page_url, page_title, page_summary) {
	if (page_url) {
		page_url 	= encodeURIComponent(page_url);
	}
	if (page_title) {
		page_title 	= encodeURIComponent(page_title);
	}
	if (page_summary) {
		page_summary = encodeURIComponent(page_summary);
	}

	// plug page url, title, and summary into share links for social media
	$('.sm-share-selector').each(function(index, elem){
		var href = $(elem).attr('href')

		if(!href) return

		href = href.replace("$PAGE_URL", page_url || '')
				   .replace("$PAGE_TITLE", page_title || '')
				   .replace("$PAGE_SUMMARY", page_summary || '');
		$(elem).attr('href', href);
	})

	// google analytics event for social media share clicks
	var socialMediaShare = function(platform){
		return function(){
			ga('send', {
				hitType: 'event',
				eventCategory: 'Social Media Shares',
				eventAction: platform,
				eventLabel: page_title
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
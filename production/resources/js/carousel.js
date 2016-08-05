var adjustSizing = function(){
  if ($(this).width() < 600) {
    //   Shrink Carousel font sizes
    $(".carousel-caption > h3").css("font-size", "18px");
    $(".carousel-caption > p").css("font-size", "12px");

    //   Swap out carousel images with square mobile ones
    $(".mobileImg1").attr("src", "/resources/images/mobile/pancakes-mobile-banner.jpg");
    $(".mobileImg2").attr("src", "/resources/images/mobile/pokemon-mobile-banner.jpg");
    $(".mobileImg3").attr("src", "/resources/images/mobile/htmlcss-mobile-banner.jpg");
    $(".mobileaboutme").attr("src", "/resources/images/mobile/aboutme-mobile.jpg");
  }
  else {
    //   Restore Carousel font sizes for larger screens
    $(".carousel-caption > h3").css("font-size", "24px");
    $(".carousel-caption > p").css("font-size", "14px");

    //   Swap out carousel images with original banners
    $(".mobileImg1").attr("src", "/resources/images/banners/pancakes-banner.jpg");
    $(".mobileImg2").attr("src", "/resources/images/banners/pokemon-banner.jpg");
    $(".mobileImg3").attr("src", "/resources/images/banners/htmlcss-banner.jpg");
  }
}


$(document).ready(adjustSizing);
$(window).resize(adjustSizing);
materialKit = {
  misc:{
    navbar_menu_visible: 0
  },

  checkScrollForTransparentNavbar: debounce(function () {
    if ($(document).scrollTop() > 260 ) {
      if (transparent) {
        transparent = false;
        $('.navbar-color-on-scroll').removeClass('navbar-transparent');
      }
    } else {
      if (!transparent) {
        transparent = true;
        $('.navbar-color-on-scroll').addClass('navbar-transparent');
      }
    }
  }, 17),

  initSliders: function () {
    // Sliders for demo purpose
    $('#sliderRegular').noUiSlider({
      start: 40,
      connect: "lower",
      range: {
        min: 0,
        max: 100
      }
    });

    $('#sliderDouble').noUiSlider({
      start: [20, 60] ,
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
  }
}

var big_image;

materialKitDemo = {

  checkScrollForParallax: debounce(function () {
    if(isElementInViewport(big_image)) {
      var current_scroll = $(this).scrollTop();

      oVal = ($(window).scrollTop() / 3);
      big_image.css({
        'transform':'translate3d(0,' + oVal +'px,0)',
        '-webkit-transform':'translate3d(0,' + oVal +'px,0)',
        '-ms-transform':'translate3d(0,' + oVal +'px,0)',
        '-o-transform':'translate3d(0,' + oVal +'px,0)'
      });
    }
  }, 4),

  initContactUsMap: function(){
    var myLatlng = new google.maps.LatLng(44.433530, 26.093928);
    var mapOptions = {
      zoom: 14,
      center: myLatlng,
      styles:
[{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}],
      scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
    }
    var map = new google.maps.Map(document.getElementById("contactUsMap"), mapOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
      title:"Hello World!"
    });
    marker.setMap(map);
  },

  initContactUs2Map: function(){
    var lat = 45.495061;
    var long = -122.766344;

    var centerLong = long - 0.025;

    var myLatlng = new google.maps.LatLng(lat,long);
    var centerPosition = new google.maps.LatLng(lat, centerLong);

    var mapOptions = {
      zoom: 14,
      center: centerPosition,
      styles:
[{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}],
      scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
    }
    var map = new google.maps.Map(document.getElementById("contactUs2Map"), mapOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
      title:"Hello World!"
    });
    marker.setMap(map);
  }

}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};
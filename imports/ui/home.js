import { Template } from 'meteor/templating';
import './home.html';

Template.myHome.helpers({
  copyrightDate: function () {
    return new Date().getFullYear();
  }
});

Template.myHome.onRendered(function bodyOnRendered() {
  $(function () {
    $('.typer').typed({
      strings: [ 'financial planner^3000', 'insurance broker^3000', 'lender^3000' ],
      typeSpeed: 1,
      loop: true,
      loopCount: false
    });
  });

  $(document).ready(function () {
    BrowserDetect.init();

    if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 9) {
      $('body').html(better_browser);
    }

    window_width = $(window).width();
    window_height = $(window).height();

    burger_menu = $('.navbar').hasClass('navbar-burger') ? true : false;

    if (!Modernizr.touch) {
      $('body').addClass('no-touch');
      no_touch_screen = true;
    }

    // Init navigation toggle for small screens
    if (window_width < 992 || burger_menu) {
      gaia.initRightMenu();
    }

    if ($('.content-with-opacity').length != 0) {
      content_opacity = 1;
    }

    $navbar = $('.navbar[color-on-scroll]');
    scroll_distance = $navbar.attr('color-on-scroll') || 500;

    $('.google-map').each(function() {
      var lng = $(this).data('lng');
      var lat = $(this).data('lat');

      gaia.initGoogleMaps(this, lat, lng);
    });

  });

  // activate collapse right menu when the windows is resized
  $(window).resize(function() {
    if ($(window).width() < 992) {
      gaia.initRightMenu();
      //gaia.checkResponsiveImage();
    }

    if ($(window).width() > 992 && !burger_menu) {
      $('nav[role="navigation"]').removeClass('navbar-burger');
      gaia.misc.navbar_menu_visible = 1;
      navbar_initialized = false;
    }
  });

  $(window).on('scroll', function() {
    gaia.checkScrollForTransparentNavbar();
    if (window_width > 992) {
      gaia.checkScrollForParallax();
    }

    if (content_opacity == 1) {
      gaia.checkScrollForContentTransitions();
    }
  });

  $( document ).ready(function() {
    var header = $('#filter-home');
    var location = $('#location');
    var loans1 = $('#loans-1');
    var loans2 = $('#loans-2');
    var loans3 = $('#loans-3');
    var lastDiv;
    var thisDiv;

    function fadeRightLeft(divOut, divIn) {
      TweenLite.to(divOut, 1, {opacity:0, x:-200});
      setTimeout(function () {
        divOut.css('display', 'none');
      }, 1000);

      setTimeout(function () {
        divIn.css('display', 'block');
        TweenLite.from(divIn, 1, {opacity:0, x:200});
        TweenLite.to(divIn, 1, {opacity:1})
      }, 1000);

      lastDiv = divOut;
      thisDiv = divIn;
    }

    function fadeLeftRight(divOut, divIn) {
      TweenLite.to(divOut, 1, {opacity:0, x:200});
      setTimeout(function () {
        divOut.css('display', 'none');
      }, 1000);

      setTimeout(function () {
        divIn.css('display', 'block');
        TweenLite.from(divIn, 1, {opacity:0, x:-200});
        TweenLite.to(divIn, 1, {opacity:1})
      }, 1000);

      lastDiv = divOut;
      thisDiv = divIn;
    }


    $('#back').click(function() {
      fadeLeftRight(thisDiv, lastDiv);
    });


    $('#Loans').click(function() {
      console.log($(this).attr('id'));
      $('.homeParallax').find('.image').addClass('blur');
      fadeRightLeft(header, loans1);
    });

    $('.loans1').click(function() {
      console.log($(this).attr('id'));
      fadeRightLeft(loans1, loans2);
    });

    $('.loans2').click(function() {
      console.log($(this).attr('id'));
      fadeRightLeft(loans2, loans3);
    });

    $('.loans3').click(function() {
      console.log($(this).attr('id'));
      fadeRightLeft(loans3, location);
    });
  });

});

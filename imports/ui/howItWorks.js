import { Template } from 'meteor/templating';
import './howItWorks.html';

Template.howItWorks.helpers({
  copyrightDate: function () {
    return new Date().getFullYear()
  }
});

Template.howItWorks.onRendered(function bodyOnRendered() {
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

    $('.google-map').each(function () {
      var lng = $(this).data('lng');
      var lat = $(this).data('lat');

      gaia.initGoogleMaps(this, lat, lng);
    });
  });

  //activate collapse right menu when the windows is resized
  $(window).resize(function () {
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

  $(window).on('scroll', function () {

    gaia.checkScrollForTransparentNavbar();

    if (window_width > 992) {
      gaia.checkScrollForParallax();
    }

    if (content_opacity == 1 ) {
      gaia.checkScrollForContentTransitions();
    }
  });
});

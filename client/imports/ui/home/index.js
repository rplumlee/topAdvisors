import { Template } from 'meteor/templating';
import './home.html';

Template.myHome.helpers({
  copyrightDate: function () {
    return new Date().getFullYear();
  }
});

Template.myHome.onRendered(function bodyOnRendered() {
  new Vivus('my-svg', {duration: 200});

  $(function () {
    $(".typer").typed({
      strings: ["financial planner.^3000", "insurance broker.^3000", "lender.^3000"],
      typeSpeed: 1,
      loop: true,
      loopCount: false
    });
  });

  var transparent = true;

  var transparentDemo = true;
  var fixedTop = false;

  var navbar_initialized = false;

  materialKit = {
    misc:{
      navbar_menu_visible: 0
    },

    checkScrollForTransparentNavbar: debounce(function() {
      if($(document).scrollTop() > 260 ) {
        if(transparent) {
          transparent = false;
          $('.navbar-color-on-scroll').removeClass('navbar-transparent');
        }
      } else {
        if( !transparent ) {
          transparent = true;
          $('.navbar-color-on-scroll').addClass('navbar-transparent');
        }
      }
    }, 17),

    initSliders: function(){
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
    checkScrollForParallax: debounce(function(){
      if(isElementInViewport(big_image)){
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


  function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
  }

  $(document).ready(function () {

    // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
    $.material.init();

    window_width = $(window).width();

    //  Activate the Tooltips
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

    // Activate Datepicker
    if($('.datepicker').length != 0){
        $('.datepicker').datepicker({
             weekStart:1
        });
    }

    //    Activate bootstrap-select
    $(".select").dropdown({ "dropdownClass": "dropdown-menu", "optionClass": "" });

    // Activate Popovers
    $('[data-toggle="popover"]').popover();

    // Active Carousel
    $('.carousel').carousel({
      interval: 400000
    });

    //Activate tags
    if($(".tagsinput").length != 0){
      $(".tagsinput").tagsInput();
    }

    if($('.navbar-color-on-scroll').length != 0){
      $(window).on('scroll', materialKit.checkScrollForTransparentNavbar)
    }

    if (window_width >= 768){
      big_image = $('.page-header[data-parallax="active"]');
      if(big_image.length != 0){
        $(window).on('scroll', materialKitDemo.checkScrollForParallax);
      }
    }

  });

});

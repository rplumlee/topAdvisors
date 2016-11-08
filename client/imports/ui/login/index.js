import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker'
import './login.html';

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

var loadMaterialKit = function () {
  // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
  $.material.init();

  window_width = $(window).width();

  // Activate Datepicker
  if($('.datepicker').length != 0){
    $('.datepicker').datepicker({
       weekStart:1
    });
  }

  //    Activate bootstrap-select
  $(".select").dropdown({ "dropdownClass": "dropdown-menu", "optionClass": "" });

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
};

Template.myLogin.helpers({
  copyrightDate: function () {
    return new Date().getFullYear();
  }
});

Template.myLogin.onRendered(function () {
  if (Meteor.userId()) {
    this.autorun((c) => {
      if (this.subscriptionsReady()) {
        var user = Meteor.user();
        if (user) {
          if (user.profile.type === 'pro') {
            Router.go('/dashboard');
          } else {
            Router.go('/admin/leads');
          }
        }
      }
    });
  }

  $(document).ready(function () {

    loadMaterialKit();
  });

});


Template.myLogin.events({
  'submit .form'(e) {
    // Prevent default browser form submit
    e.preventDefault();
    var email = e.target.email.value;
    var password = e.target.password.value;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        // Transition to the app
        Router.go('/admin/leads');
      }
    });
  }
});

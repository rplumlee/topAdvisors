import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker'
import Common from '../common';
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

var lbdLoader = function () {
  $(document).ready(function(){
    window_width = $(window).width();

    // Init navigation toggle for small screens
    if(window_width <= 991){
      lbd.initRightMenu();
    }

    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();

    //      Activate the switches with icons
    if($('.switch').length != 0){
      $('.switch')['bootstrapSwitch']();
    }
    //      Activate regular switches
    if($("[data-toggle='switch']").length != 0){
       $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();
    }

    $('.form-control').on("focus", function(){
      $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function(){
      $(this).parent(".input-group").removeClass("input-group-focus");
    });

  });

  // activate collapse right menu when the windows is resized
  $(window).resize(function(){
    if($(window).width() <= 991){
      lbd.initRightMenu();
    }
  });
}

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
            Router.go('/pro/leads');
          } else {
            Router.go('/admin/leads');
          }
        }
      }
    });
  }

  Common.loadMaterialKit();
  // lbdLoader();
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

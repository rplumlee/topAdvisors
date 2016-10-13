import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker'
import './login.html';

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
});

Template.myLogin.events({
  'click .btn'() {
    // Prevent default browser form submit
    var email = $('[type=email]').val();
    var password = $('[type=password]').val();
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

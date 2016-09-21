import { Template } from 'meteor/templating';
import './login.html';

Template.myLogin.helpers({
  copyrightDate: function () {
    return new Date().getFullYear();
  }
});

Template.myLogin.onRendered(function bodyOnRendered() {
  if (Meteor.userId()) {
    Router.go('/admin/leads');
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

import { Template } from 'meteor/templating';
import './navbar.html';

Template.proNavbar.events({
  'click #logout'(event) {
    Meteor.logout(() => {
      Router.go('login');
    });
  }
});
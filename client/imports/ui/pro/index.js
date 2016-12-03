import { Template } from 'meteor/templating';
import './navbar.html';
import Common from '../common';

Template.proNavbar.events({
  'click #logout'(event) {
    Meteor.logout(() => {
      Router.go('login');
    });
  }
});

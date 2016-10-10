import { Template } from 'meteor/templating';
import Collections from '/lib/collections';
import './manage_pros.html';
import './add_pro.html';
import './edit_pro.html';


Template.adminPros.helpers({
  user: () => {
    return Meteor.user()
  },
  pros: () => {
    return Collections.Users.find({ type: 'pro' })
  }
});

Template.adminPros.events({
  'click #logout'(event) {
    Meteor.logout(() => {
      Router.go('login');
    });
  }
});

Template.adminPros.onRendered(function bodyOnRendered() {
  if (!Meteor.userId()) {
    Router.go('login');
  }

  document.title = 'Admin Dashboard';
  Meteor.subscribe('pros.list');

  //
  // paper-dashboard.js
  //
  window_width = $(window).width();

  // Init navigation toggle for small screens
  if (window_width <= 991) {
    lbd.initRightMenu();
  }
});

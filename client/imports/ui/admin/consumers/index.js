import { Template } from 'meteor/templating';
import Collections from '/lib/collections';
import './manage_consumers.html';

Template.adminConsumers.helpers({
  consumers: function (selector) {
    return Collections.Leads.find({});
  },
  parseDate: function (date) {
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
  },
  user: function () {
    return Meteor.user()
  }
});

Template.adminConsumers.events({
  'click #logout'(event) {
    Meteor.logout(() => {
      Router.go('login');
    });
  }
});

Template.adminConsumers.onRendered(function bodyOnRendered() {
  if (!Meteor.userId()) {
    Router.go('login');
  }

  document.title = 'Admin Dashboard';
  Meteor.subscribe('leads.listConsumers');

  //
  // paper-dashboard.js
  //
  window_width = $(window).width();

  // Init navigation toggle for small screens
  if (window_width <= 991) {
    lbd.initRightMenu();
  }
});

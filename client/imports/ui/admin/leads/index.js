import { Template } from 'meteor/templating';
import Collections from '/lib/collections';
import './manage_leads.html';

Template.adminLeads.helpers({
  copyrightDate: function () {
    return new Date().getFullYear();
  },
  leads: function (selector) {
    return Collections.Leads.find({ status: selector.hash.status });
  },
  views: function () {
    return Collections.Activities.find({ type: 'viewProfile' });
  },
  parseDate: function (date) {
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
  },
  statusLabel: function (status) {
    return (status == 'open');
  },
  user: function () {
    return Meteor.user()
  }
});

Template.adminLeads.events({
  'click #logout'(event) {
    Meteor.logout(() => {
      Router.go('login');
    });
  }
});

Template.adminLeads.onRendered(function bodyOnRendered() {
  if (!Meteor.userId()) {
    Router.go('login');
  }

  document.title = 'Admin Dashboard';
  Meteor.subscribe('leads.list');
  Meteor.subscribe('activities.list');

  //
  // paper-dashboard.js
  //
  window_width = $(window).width();

  // Init navigation toggle for small screens
  if (window_width <= 991) {
    lbd.initRightMenu();
  }
});

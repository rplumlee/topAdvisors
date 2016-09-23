import { Template } from 'meteor/templating';
import Collections from '/lib/collections';
import './manage_companies.html';
import './add_company.html';
import './edit_company.html';

Template.adminCompanies.helpers({
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

Template.adminCompanies.events({
  'click #logout'(event) {
    Meteor.logout(() => {
      Router.go('login');
    });
  }
});

Template.adminCompanies.onRendered(function bodyOnRendered() {
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

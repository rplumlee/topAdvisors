import { Template } from 'meteor/templating';
import Collections from '/lib/collections';
import './dashboard.html';

Template.myDashboard.helpers({
  leads: function (selector) {
    return Collections.Leads.find({ status: selector.hash.status });
  },
  leadCount: function () {
    return Collections.Leads.find({}).count();
  },  views: function () {
    return Collections.Activities.find({ type: 'viewProfile' });
  },
  parseDate: function (date) {
    if (date) {
      return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    }
  },
  statusLabel: function (status) {
    return (status == 'open');
  },
  user: function () {
    return Meteor.user()
  },
  agentUser: function (user) {
    var profile = Collections.Users.findOne({ _id: user }).profile;
    return `${profile.firstName} ${profile.lastName}`;
  }
});

Template.myDashboard.events({
  'click #logout'(event) {
    Meteor.logout(() => {
      Router.go('login');
    });
  }
});

Template.myDashboard.onRendered(function bodyOnRendered() {
  if (!Meteor.userId()) {
    Router.go('login');
  }

  document.title = 'Leads Dashboard';
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

import { Template } from 'meteor/templating';
import Collections from '/lib/collections';
import './dashboard.html';

Template.myDashboard.helpers({
  copyrightDate: function () {
    return new Date().getFullYear();
  },
  leads: function () {
    return Collections.Leads.find();
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

  Meteor.subscribe('leads.list');
  Meteor.subscribe('activities.list');
});

import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import Collections from '/lib/collections';
import './dashboard.html';

Template.proLeadsDashboard.helpers({
  leads: function (selector) {
    return Collections.Leads.find({ status: selector.hash.status });
  },
  leadCount: function () {
    return Collections.Leads.find({}).count();
  },
  views: function () {
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
  currentLead: function () {
    if (Template.instance().state.get('leadId')) {
      return Collections.Leads.findOne({ _id: Template.instance().state.get('leadId') });
    } else {
      return Collections.Leads.find().fetch()[0];
    }
  },
  agentUser: function (user) {
    var profile = Collections.Users.findOne({ _id: user }).profile;
    return `${profile.firstName} ${profile.lastName}`;
  }
});

Template.proLeadsDashboard.events({
  'click #logout'(event) {
    Meteor.logout(() => {
      Router.go('login');
    });
  },
  'click .leadModal'(event, instance) {
    instance.state.set('leadId', event.currentTarget.dataset.id);
  }
});

Template.proLeadsDashboard.onCreated(function () {
  this.state = new ReactiveDict();
  this.state.setDefault({
    leadId: null
  });
});

Template.proLeadsDashboard.onRendered(function bodyOnRendered() {
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

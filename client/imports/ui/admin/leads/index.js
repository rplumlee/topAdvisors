import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import Collections from '/lib/collections';
import './manage_leads.html';

Template.adminLeads.helpers({
  copyrightDate: function () {
    return new Date().getFullYear();
  },
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

Template.adminLeads.events({
  'click .leadModal'(event, instance) {
    instance.state.set('leadId', event.currentTarget.dataset.id);
  }
});

Template.adminLeads.onCreated(function () {
  this.state = new ReactiveDict();
  this.state.setDefault({
    leadId: null
  });
});

Template.adminLeads.onRendered(function () {
  this.autorun(() => {
    if (!Meteor.userId()) {
      Router.go('login');
    }
  });

  this.autorun((c) => {
    if (this.subscriptionsReady()) {
      var user = Meteor.user();
      if (user) {
        if (user.profile.type === 'pro') {
          Router.go('/pro');
        } else {
          Router.go('/admin/leads');
        }
      }
    }
  });

  document.title = 'Admin Dashboard';
  Meteor.subscribe('pros.list');
  Meteor.subscribe('leads.list');

  //
  // paper-dashboard.js
  //
  window_width = $(window).width();

  // Init navigation toggle for small screens
  if (window_width <= 991) {
    lbd.initRightMenu();
  }
});

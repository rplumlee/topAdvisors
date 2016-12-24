import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import Collections from '/lib/collections';
import Common from '../../common';
import './manage_leads.html';

Template.adminLeads.helpers({
  copyrightDate: function () {
    return new Date().getFullYear();
  },
  or: function (a, b) {
    return  a || b;
  },
  leads: function (selector) {
    return Collections.Leads.find({ status: selector.hash.status });
  },
  leadCount: function (status) {
    if (status) {
      return Collections.Leads.find({ status }).count();
    }
    return Collections.Leads.find({}).count();
  },
  views: function () {
    return _.reduce(Collections.Activities.find({}, { count: true }).fetch(), function (total, each) { return total + each.count; }, 0);
  },
  closedLeadsCount: function () {
    return Collections.Leads.find({ status: 'closed' }).count();
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
  },
  'change input[type="checkbox"]'(event) {
    Meteor.call('leads.edit', {
      _id: event.currentTarget.dataset.id,
      paid: event.currentTarget.checked
    }, function (err, res) {
      if (err) {
        console.log(err);
      }
    });
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
  Meteor.subscribe('activities.list');

});

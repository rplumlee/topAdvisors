import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import Collections from '/lib/collections';
import Common from '../../common';
import './dashboard.html';

Template.proLeadsDashboard.helpers({
  leads: function (selector) {
    return Collections.Leads.find({ status: selector.hash.status });
  },
  leadCount: function (status) {
    if (status) {
      return Collections.Leads.find({ status }).count();
    }
    return Collections.Leads.find({}).count();
  },
  profileViews: function () {
    var activity = Collections.Activities.findOne({ agent: Meteor.userId() });
    return activity ? activity.count : 0;
  },
  parseDate: function (date) {
    if (date) {
      return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    }
  },
  or: function (a, b) {
    return  a || b;
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
  },
  getCompany: function () {
    return Collections.Companies.findOne();
  },
  getCPA: function () {
    var designations = Meteor.user().designations;
    var des = _.map(designations, function (each) { return each.designation });
    return (des.length > 0 ? ', ' + des.join(', ') : '');
  }
});

Template.proLeadsDashboard.events({
  'click .leadModal'(event, instance) {
    instance.state.set('leadId', event.currentTarget.dataset.id);
  },
  'click .fresh-lead-btn' (event, instance) {
    var leadId = instance.state.get('leadId');
    Meteor.call('leads.edit', {
      _id: leadId,
      status: 'fresh'
    }, function (err, res) {
      if (err) {
        console.log(err);
      }
    });
  },
  'click .open-lead-btn' (event, instance) {
    var leadId = instance.state.get('leadId');
    Meteor.call('leads.edit', {
      _id: leadId,
      status: 'open'
    }, function (err, res) {
      if (err) {
        console.log(err);
      }
    });
  },
  'click .dead-lead-btn' (event, instance) {
    var leadId = instance.state.get('leadId');
    Meteor.call('leads.edit', {
      _id: leadId,
      status: 'dead'
    }, function (err, res) {
      if (err) {
        console.log(err);
      }
    });
  },
  'click .closed-lead-btn' (event, instance) {
    var leadId = instance.state.get('leadId');
    Meteor.call('leads.edit', {
      _id: leadId,
      status: 'closed'
    }, function (err, res) {
      if (err) {
        console.log(err);
      }
    });
  }
});

Template.proLeadsDashboard.onCreated(function () {
  this.state = new ReactiveDict();
  this.state.setDefault({
    leadId: null
  });
  Meteor.subscribe('companies.list');
  Meteor.subscribe('pros.list');
  Meteor.subscribe('leads.list');
});

Template.proLeadsDashboard.onRendered(function bodyOnRendered() {
  this.autorun(() => {
    if (!Meteor.userId()) {
      Router.go('login');
    }
  });


  document.title = 'Leads Dashboard';
  Meteor.subscribe('activities.get');

  //
  // paper-dashboard.js
  //
  window_width = $(window).width();

  // Init navigation toggle for small screens
  if (window_width <= 991) {
    lbd.initRightMenu();
  }
});

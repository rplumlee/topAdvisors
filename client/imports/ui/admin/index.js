import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import Collections from '/lib/collections';
import './sidebar.html';

var adminTemplates = {
  leads: 'adminLeads',
  pros: 'adminPros',
  companies: 'adminCompanies',
  consumers: 'adminConsumers'
};

var prosTemplates = {
  add: 'adminProsAdd',
  edit: 'adminProsEdit'
};

Template.adminSidebar.helpers({
  user: () => {
    return Meteor.user();
  },
  loadTemplate: () => {
    return Template[Template.instance().state.get('template')];
  }
});

Template.adminSidebar.events({
  'click #logout'() {
    Meteor.logout(() => {
      Router.go('login');
    });
  },
  'click #leads'(event, instance) {
    instance.state.set('template', 'adminLeads');
    history.pushState({}, "Admin Dashboard", "/admin/leads");
  },
  'click #pros'(event, instance) {
    instance.state.set('template', 'adminPros');
    history.pushState({}, "Admin Dashboard", "/admin/pros");
  },
  'click #companies'(event, instance) {
    instance.state.set('template', 'adminCompanies');
    history.pushState({}, "Admin Dashboard", "/admin/companies");
  },
  'click #consumers'(event, instance) {
    instance.state.set('template', 'adminConsumers');
    history.pushState({}, "Admin Dashboard", "/admin/consumers");
  }
});

Template.adminSidebar.onCreated(function () {
  this.state = new ReactiveDict();
  if (this.data.path) {
    this.state.setDefault({
      template: adminTemplates[this.data.path]
    });
  } else {
    this.state.setDefault({
      template: prosTemplates[this.data.action]
    });
  }
});

Template.adminSidebar.onRendered(function bodyOnRendered() {
  if (!Meteor.userId()) {
    Router.go('login');
  }

  document.title = 'Admin Dashboard';

  //
  // paper-dashboard.js
  //
  window_width = $(window).width();

  // Init navigation toggle for small screens
  if (window_width <= 991) {
    lbd.initRightMenu();
  }
});

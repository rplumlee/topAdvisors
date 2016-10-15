import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import Collections from '/lib/collections';
import './manage_companies.html';
import './company_inner.html';

Template.adminCompanies.helpers({
  copyrightDate: function () {
    return new Date().getFullYear();
  },
  companies: function (selector) {
    return Collections.Companies.find({ });
  },
  parseDate: function (date) {
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
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

Template.adminCompanies.onRendered(function () {
  if (!Meteor.userId()) {
    Router.go('login');
  }

  document.title = 'Admin Dashboard';
  Meteor.subscribe('companies.list');

  //
  // paper-dashboard.js
  //
  window_width = $(window).width();

  // Init navigation toggle for small screens
  if (window_width <= 991) {
    lbd.initRightMenu();
  }
});

Template.adminCompanyInner.helpers({
  company: () => {
    return Template.instance().companies.get('company')
  }
});

Template.adminCompanyInner.onCreated(function () {
  this.companies = new ReactiveDict();
  this.companies.setDefault({
    company: {}
  });

  Meteor.subscribe('companies.list');
  Meteor.subscribe('pros.list');
});


Template.adminCompanyInner.onRendered(function bodyOnRendered() {
  if (!Meteor.userId()) {
    Router.go('login');
  }

  document.title = 'Admin Dashboard';

  if (Template.currentData().suburl !== 'add') {
    this.companies.set('company', Collections.Companies.findOne({ _id: Template.currentData().suburl }));
  }

  var input = document.getElementById('company_address');
  var options = {
    types: [],
    componentRestrictions: {country: 'us'}
  };

  autocomplete = new google.maps.places.Autocomplete(input, options);
  //
  // paper-dashboard.js
  //
  window_width = $(window).width();

  // Init navigation toggle for small screens
  if (window_width <= 991) {
    lbd.initRightMenu();
  }
});

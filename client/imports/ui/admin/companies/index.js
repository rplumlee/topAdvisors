import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import _ from 'underscore';
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
  },
  'click .add-company'(event) {
    event.preventDefault();
    Router.go('/admin/companies/new');
  },
  'click .edit-company'(event) {
    event.preventDefault();
    Router.go(`/admin/companies/${event.target.id}`);
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
    return Template.instance().companies.get('company') || {};
  },
  companyExists: () => {
    return !_.isEmpty(Template.instance().companies.get('company'));
  },
  pros: () => {
    return Template.instance().companies.get('pros') || [];
  },
  prosExist: () => {
    return !_.isEmpty(Template.instance().companies.get('pros'));
  }
});
Template.adminCompanyInner.events({
  'click .pros-link'(event) {
    event.preventDefault();
    Router.go(`/admin/pros/${event.target.id}`);
  }
});

Template.adminCompanyInner.onCreated(function () {
  this.companies = new ReactiveDict();
  this.companies.setDefault({
    company: {}
  });

});


Template.adminCompanyInner.onRendered(function bodyOnRendered() {
  if (!Meteor.userId()) {
    Router.go('login');
  }

  document.title = 'Admin Dashboard';

  if (Template.currentData().id !== 'new'){

    Meteor.call('companies.get', {
      _id: Template.currentData().id
    }, (error, result) => {
      console.log(error, result);
      this.companies.set('company', result.company);
      this.companies.set('pros', result.pros);
    });
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

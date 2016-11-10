import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import moment from 'moment';
import _ from 'underscore';
import Collections from '/lib/collections';
import './manage_companies.html';
import './company_inner.html';

var _parseAddress = function () {
  var base = {};
  autocomplete.getPlace().address_components.forEach(function (each) {
    base[each.types[0]] = each.long_name;
  });
  return {
    street1: base.street_number + ', ' + base.route,
    street2: base.neighborhood,
    city: base.locality,
    state: base.administrative_area_level_1,
    zip: base.postal_code,
    fullAddress: autocomplete.getPlace().formatted_address
  }
};

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
  this.autorun(() => {
    if (!Meteor.userId()) {
      Router.go('login');
    }
  });

  document.title = 'Admin Dashboard';
  Meteor.subscribe('companies.list');
  Meteor.subscribe('pros.list');

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
  totalLeads: () => {
    return (Template.instance().companies.get('leads') || []).length;
  },
  closedLeads: () => {
    return ([].concat(_.find((Template.instance().companies.get('leads') || []), {
      status: 'closed'
    }))).length;
  },
  prosExist: () => {
    return !_.isEmpty(Template.instance().companies.get('pros'));
  },
  leadsClosedByPro: (pro) => {
    var leads = Template.instance().companies.get('leads');
    return ([].concat(_.find(leads, {
      agent: pro._id, status: 'closed'
    }))).length;
  },
  getCreatedDate: () => {
    var createdDate = Template.instance().companies.get('company').createdOn;
    return moment(createdDate).format('ll');
  }
});
Template.adminCompanyInner.events({
  'click .pros-link'(event) {
    event.preventDefault();
    Router.go(`/admin/pros/${event.target.id}`);
  },
  'submit .add-company-form'(event) {
    event.preventDefault();
    var companyDetails = {
      name: event.target.companyName.value,
      bio: event.target.companyBio.value,
      address: _parseAddress()
    };
    Meteor.call('companies.create', companyDetails, function (error, result) {
      if (!error) {
        Router.go(`/admin/companies/${result.company}`);
        document.location.reload(true);
      }
    });
  },
  'submit .edit-company-form'(event) {
    event.preventDefault();
    var companyDetails = {
      _id: Template.instance().companies.get('company')._id,
      name: event.target.companyName.value,
      bio: event.target.companyBio.value
    };
    try {
      companyDetails.address = _parseAddress();
    } catch (err) {
      companyDetails.address = {
        fullAddress: event.target.companyFullAddress.value
      };
    }
    Meteor.call('companies.edit', companyDetails, function (error, result) {
      if (!error) {
        document.location.reload(true);
      }
    });
  }
});

Template.adminCompanyInner.onCreated(function () {
  this.companies = new ReactiveDict();
  this.companies.setDefault({
    company: {}
  });

});


Template.adminCompanyInner.onRendered(function bodyOnRendered() {
  this.autorun(() => {
    if (!Meteor.userId()) {
      Router.go('login');
    }
  });

  document.title = 'Admin Dashboard';

  if (Template.currentData().id !== 'new') {

    Meteor.call('companies.get', {
      _id: Template.currentData().id
    }, (error, result) => {

      this.companies.set('company', result.company);
      this.companies.set('pros', result.pros);
      this.companies.set('leads', result.leads);
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

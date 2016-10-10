import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import Collections from '/lib/collections';
import './navbar.html';
import './main.html';

var adminTemplates = {
  leads: 'adminLeads',
  pros: 'adminPros',
  companies: 'adminCompanies',
  consumers: 'adminConsumers'
};

var subTemplates = {
  pros: {
    add: 'adminProAdd',
    edit: 'adminProEdit'
  },
  companies: {
    add: 'adminCompanyAdd',
    edit: 'adminCompanyEdit'
  }
};

var _parseAddress = function (addressParams, place) {
  var base = {};
  place.address_components.forEach(function (each) {
    base[each.types[0]] = each.long_name;
  });
  addressParams.street1 = base.street_number + ', ' + base.route;
  addressParams.street2 = base.neighborhood;
  addressParams.city = base.locality;
  addressParams.state = base.administrative_area_level_1;
  addressParams.zip = base.postal_code;
};

Template.adminMain.helpers({
  user: () => {
    return Meteor.user();
  },
  loadTemplate: () => {
    return Template[Template.instance().state.get('template')];
  },
  loadAdminNavbar: () => {
    return Template.adminNavbar;
  },
  parseDate: function (date) {
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
  }
});

Template.adminMain.events({
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
  'click #addPro'(event, instance) {
    instance.state.set('template', 'adminProAdd');
    history.pushState({}, "Admin Dashboard", "/admin/pros/add");
  },
  'click #companies'(event, instance) {
    instance.state.set('template', 'adminCompanies');
    history.pushState({}, "Admin Dashboard", "/admin/companies");
  },
  'click #addCompany'(event, instance) {
    instance.state.set('template', 'adminCompanyAdd');
    history.pushState({}, "Admin Dashboard", "/admin/companies/add");
  },
  'click #consumers'(event, instance) {
    instance.state.set('template', 'adminConsumers');
    history.pushState({}, "Admin Dashboard", "/admin/consumers");
  },
  'click #create_company'(event, instance) {
    var params = {
      name: $('#company_name')[0].value,
      address: {
        fullAddress: $('#company_address')[0].value
      },
      bio: $('#company_bio')[0].value
    }
    _parseAddress(params.address, autocomplete.getPlace());
    Meteor.call('companies.create', params, function (error, result) {
      if (result.company) {
        instance.state.set('template', 'adminCompanies');
        history.pushState({}, "Admin Dashboard", "/admin/companies");
      }
    });
  }
});

Template.adminMain.onCreated(function () {
  this.state = new ReactiveDict();
  if (this.data.path) {
    this.state.setDefault({
      template: adminTemplates[this.data.path]
    });
  } else {
    this.state.setDefault({
      template: subTemplates[this.data.base][this.data.action]
    });
  }
});

Template.adminMain.onRendered(function () {
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

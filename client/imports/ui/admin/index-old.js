import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import Collections from '/lib/collections';
import './admin_navbar.html';
import './main.html';

var adminTemplates = {
  leads: 'adminLeads',
  pros: 'adminPros',
  companies: 'adminCompanies',
  consumers: 'adminConsumers'
};

var subTemplates = {
  pros: 'adminProInner',
  companies: 'adminCompanyInner'
};

var _parseAddress = function (addressParams, place) {
  var base = {};
  place.address_components.forEach(function (each) {
    base[each.types[0]] = each.long_name;
  });
  console.log(base.street_number);
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
  },
  'click #create_pro'(event, instance) {
    var params = {
    }
    Meteor.call('users.create', params, function (error, result) {
      if (result.company) {
        instance.state.set('template', 'adminPros');
        history.pushState({}, "Admin Dashboard", "/admin/pros");
      }
    });
  },
  'click .editPro'(event, instance) {
    instance.state.set('template', 'adminProInner');
    history.pushState({}, "Admin Dashboard", "/admin/pros/" + event.currentTarget.id);
  },
  'click .editCompany'(event, instance) {
    instance.state.set('template', 'adminCompanyInner');
    history.pushState({}, "Admin Dashboard", "/admin/companies/" + event.currentTarget.id);
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
      template: subTemplates[this.data.base]
    });
  }
});

Template.adminMain.onRendered(function () {
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

  //
  // paper-dashboard.js
  //
  window_width = $(window).width();

  // Init navigation toggle for small screens
  if (window_width <= 991) {
    lbd.initRightMenu();
  }
});

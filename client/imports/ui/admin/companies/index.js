import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import moment from 'moment';
import _ from 'underscore';
import Collections from '/lib/collections';
import Common from '../../common';
import './manage_companies.html';
import './company_inner.html';

var _parseAddress = function () {
  var base = {};
  autocomplete.getPlace().address_components.forEach(function (each) {
    base[each.types[0]] = { long: each.long_name, short: each.short_name };
  });

  var location = {
    street1: autocomplete.getPlace().formatted_address,
    city: base.locality.long,
    state: base.administrative_area_level_1.short,
    fullAddress: autocomplete.getPlace().formatted_address
  };

  if (base.postal_code && base.postal_code.long) {
    location.zip = base.postal_code.long;
  }

  return location;
};

Template.adminCompanies.onCreated(function () {
  this.state = new ReactiveDict();
  this.state.setDefault({});
  Meteor.subscribe('companies.list');
});

Template.adminCompanies.helpers({
  copyrightDate: function () {
    return new Date().getFullYear();
  },
  companies: function (selector) {
    var searchText = Template.instance().state.get('searchText');
    if (searchText) {
      searchText = new RegExp(searchText, 'ig');

      return Collections.Companies.find({
        name: searchText
      });
    }
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
  'click .add-company'(event) {
    event.preventDefault();
    Router.go('/admin/companies/new');
  },
  'click .edit-company'(event) {
    event.preventDefault();
    Router.go(`/admin/companies/${event.target.id}`);
  },
  'keyup #search-text'(event) {
    event.preventDefault();
    Template.instance().state.set('searchText', event.target.value);
  }
});

Template.adminCompanies.onRendered(function () {
  this.autorun(() => {
    if (!Meteor.userId()) {
      Router.go('login');
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

Template.adminCompanyInner.helpers({
  company: () => {
    return Template.instance().companies.get('company') || {};
  },
  companyExists: () => {
    return !_.isEmpty(Template.instance().companies.get('company'));
  },
  pros: () => {
    var company = Template.instance().companies.get('company')._id;
    return Collections.Users.find({ company, 'profile.type': 'pro' }).fetch() || [];
  },
  totalLeads: () => {
    var company = Template.instance().companies.get('company')._id;
    return Collections.Leads.find({ company }).fetch().length;
  },
  closedLeads: () => {
    var company = Template.instance().companies.get('company')._id;
    return Collections.Leads.find({
      company,
      status: 'closed'
    }).fetch().length;
  },
  prosExist: () => {
    var company = Template.instance().companies.get('company')._id;
    return !_.isEmpty(Collections.Users.find({ company }).fetch());
  },
  leadsClosedByPro: (pro) => {
    return Collections.Leads.find({
      agent: pro._id,
      status: 'closed'
    }).fetch().length;
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
      console.log(companyDetails);
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
      console.log(err);
      companyDetails.address = {
        fullAddress: event.target.companyFullAddress.value
      };
    }
    Meteor.call('companies.edit', companyDetails, function (error, result) {
      if (!error) {
        document.location.reload(true);
      }
    });
  },
  'focus .fileinput input'(event) {
    var companyId = Template.instance().companies.get('company')._id;
    if ($('.fileinput img')[1]) {
      $('#companyImageLoader').show();
      $('.fileinput img').css({ opacity: 0.2 });
      $.ajax({
        type: "POST",
        url: "/upload",
        data: $('.fileinput img')[1].src,
        success: function (response) {
          $('#companyImageLoader').hide();
          $('.fileinput img').css({ opacity: 1 });
          if (companyId) {
            Meteor.call('companies.edit', {
              _id: companyId,
              image: response.secure_url
            });
          } else {
            $('#companyTempImage')[0].value = response.secure_url;
          }
        }
      });
    }
  }
});

Template.adminCompanyInner.onCreated(function () {
  this.companies = new ReactiveDict();
  this.companies.setDefault({
    company: {}
  });

  if (!this.data.id) {
    this.companies.set('company', {});
  } else {

    Meteor.subscribe('companies.list', {
      onReady: ()=> {
        var company = Collections.Companies.findOne({
          _id: this.data.id
        });
        if (!company) {
          Router.go('/admin/companies');
        }
        this.companies.set('company', company || {});
      }
    });
    Meteor.subscribe('pros.list');
    Meteor.subscribe('leads.list');
  }
});


Template.adminCompanyInner.onRendered(function bodyOnRendered() {
  this.autorun(() => {
    if (!Meteor.userId()) {
      Router.go('login');
    }
  });

  document.title = 'Admin Dashboard';

  var input = document.getElementById('company_address');
  var options = {
    types: [],
    componentRestrictions: {country: 'us'}
  };

  autocomplete = new google.maps.places.Autocomplete(input, options);
});

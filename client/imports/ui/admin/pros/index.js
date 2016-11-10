import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import moment from 'moment';
import _ from 'underscore';
import Collections from '/lib/collections';
import './manage_pros.html';
import './pro_inner.html';

var _handleRemoval = function (instance, dataSet, currentId) {
  var data = instance.pros.get('pro');
  var pos = _.findIndex(data[dataSet], (o) => { return o.id == currentId; });
  data[dataSet].splice(pos, 1);
  instance.pros.set('pro', data);
};

var _resetFields = function (fieldsArray) {
  fieldsArray.forEach(function (field) {
    $(field)[0].value = '';
  });
};

Template.adminPros.helpers({
  user: () => {
    return Meteor.user()
  },
  pros: () => {
    return Collections.Users.find({ 'profile.type': 'pro' })
  },
  leadsClosedByPro: (pro) => {
    var leads = Collections.Leads.find({
      agent: pro._id,
      status: 'closed'
    }) || [];
    return leads.count();
  }
});

Template.adminPros.events({
  'click #logout'(event) {
    Meteor.logout(() => {
      Router.go('login');
    });
  },
  'click .editPro'(event) {
    event.preventDefault();
    Router.go(`/admin/pros/${event.target.id}`);
  },
  'click .addPro'(event) {
    event.preventDefault();
    Router.go('/admin/pros/new');
  }
});

Template.adminPros.onRendered(function () {
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

Template.adminPros.onCreated(function () {
  Meteor.subscribe('pros.list');
  Meteor.subscribe('leads.list');
});

Template.adminProInner.onCreated(function () {
  this.pros = new ReactiveDict();
  this.pros.setDefault({
    pro: {}
  });

  Meteor.subscribe('companies.list');
  Meteor.subscribe('pros.list', {
    onReady: ()=> {
      var pro = Collections.Users.findOne({
        _id: this.data.id,
        'profile.type': 'pro'
      });
      this.pros.set('pro', pro);
    }
  });
  Meteor.subscribe('leads.list');
});


Template.adminProInner.onRendered(function () {
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

Template.adminProInner.helpers({
  pros: () => {
    return Template.instance().pros.get('pro');
  },
  prosExist: () => {
    return !_.isEmpty(Template.instance().pros.get('pro'));
  },
  getProEmail: (pro) => {
    return pro.emails ? pro.emails[0].address : null;
  },
  getCreatedDate: (date) => {
    var createdDate = date || Template.instance().pros.get('pro').createdOn;
    return moment(createdDate).format('ll');
  },
  getProLeads: (type) => {
    var pro = Template.instance().pros.get('pro');
    var findQuery = {
      agent: pro._id
    };
    if (type) {
      findQuery.status = type;
    }
    var leads = Collections.Leads.find(findQuery).fetch() || [];
    return leads;
  },
  getProLeadsCount: (type) => {
    var pro = Template.instance().pros.get('pro');
    var findQuery = {
      agent: pro._id
    };
    if (type) {
      findQuery.status = type;
    }
    var leads = Collections.Leads.find(findQuery).fetch() || [];
    return leads.length;
  },
  print: (something) => {
    console.log(something);
  },
  personalSpecialities: [
    "Home Loans",
    "Auto Loans",
    "Personal Loans",
    "Financial Advising",
    "Wealth Management",
    "Education Funding",
    "Home Insurance",
    "Auto Insurance",
    "Life Insurance",
    "Health Insurance",
    "Long-Term Care Insurance",
    "Disability Insurance",
    "P&C Insurance"
  ],
  businessSpecialities: [
    "Basic Commercial Loans",
    "Term Commercial Loans",
    "Unsecured Commercial Loans",
    "Commercial Acquisition Loans",
    "General Liability Insurance",
    "Product Liability Insurance",
    "Professional Liability Insurance",
    "Commercial Property Insurance",
    "Life & Health Insurance",
    "Commerical Auto Insurance",
    "Workers Compensation Insurance",
    "Directors and Officers Insurance",
    "Data Breach Insurance",
    "Tax Planning",
    "Employee Benefit Planning",
    "Retirement Planning",
    "Business Valuation",
    "Business Succession Planning",
    "Investment Planning"
  ],
  companies: () => {
    return Collections.Companies.find();
  }
});

Template.adminProInner.events({
  'change .proForm'(event, instance) {
    var data = instance.pros.get('pro');
    data[event.currentTarget.id] = event.currentTarget.value;
    instance.pros.set('pro', data);
  },
  'change .businessSpecialty'(event, instance) {
    var data = instance.pros.get('pro');
    data.profile = data.profile || {};
    data.profile.businessSpecialty = data.profile.businessSpecialty || [];
    if (data.profile.businessSpecialty.indexOf(event.currentTarget.value) === -1) {
      data.profile.businessSpecialty.push(event.currentTarget.value);
    }
    instance.pros.set('pro', data);
  },
  'change .personalSpecialty'(event, instance) {
    var data = instance.pros.get('pro');
    data.profile = data.profile || {};
    data.profile.personalSpecialty = data.profile.personalSpecialty || [];
    if (data.profile.personalSpecialty.indexOf(event.currentTarget.value) === -1) {
      data.profile.personalSpecialty.push(event.currentTarget.value);
    }
    instance.pros.set('pro', data);
  },
  'click .businessSpecialtyRemove'(event, instance) {
    var data = instance.pros.get('pro');
    var pos = data.profile.businessSpecialty.indexOf(event.currentTarget.id);
    data.profile.businessSpecialty.splice(pos, 1);
    instance.pros.set('pro', data);
  },
  'click .personalSpecialtyRemove'(event, instance) {
    var data = instance.pros.get('pro');
    var pos = data.profile.personalSpecialty.indexOf(event.currentTarget.id);
    data.profile.personalSpecialty.splice(pos, 1);
    instance.pros.set('pro', data);
  },
  'click .addCollege'(event, instance) {
    var data = instance.pros.get('pro');
    data.educations = data.educations || [];
    data.educations.push({
      id: Date.now(),
      collegeName: $('#college_name')[0].value,
      degreeName: $('#college_degree')[0].value,
      yearGraduated: $('#college_year')[0].value
    });
    _resetFields(['#college_name', '#college_degree', '#college_year']);
    instance.pros.set('pro', data);
  },
  'click .addLicense'(event, instance) {
    var data = instance.pros.get('pro');
    data.licenses = data.licenses || [];
    data.licenses.push({
      id: Date.now(),
      license: $('#license_name')[0].value,
      licenseNumber: $('#license_number')[0].value,
      dateEarned: $('#license_date')[0].value
    });
    _resetFields(['#license_name', '#license_number', '#license_date']);
    instance.pros.set('pro', data);
  },
  'click .addDesignation'(event, instance) {
    var data = instance.pros.get('pro');
    data.designations = data.designations || [];
    data.designations.push({
      id: Date.now(),
      designation: $('#designation_name')[0].value,
      designationNumber: $('#designation_number')[0].value,
      dateEarned: $('#designation_date')[0].value
    });
    _resetFields(['#designation_name', '#designation_number', '#designation_date']);
    instance.pros.set('pro', data);
  },
  'click .addWorkHistory'(event, instance) {
    var data = instance.pros.get('pro');
    data.workHistories = data.workHistories || [];
    data.workHistories.push({
      id: Date.now(),
      companyName: $('#workHistory_company')[0].value,
      yearRange: $('#workHistory_year')[0].value
    });
    _resetFields(['#workHistory_company', '#workHistory_year']);
    instance.pros.set('pro', data);
  },
  'click .removeCollege'(event, instance) {
    _handleRemoval(instance, 'educations', event.currentTarget.id);
  },
  'click .removeLicense'(event, instance) {
    _handleRemoval(instance, 'licenses', event.currentTarget.id);
  },
  'click .removeDesignation'(event, instance) {
    _handleRemoval(instance, 'designations', event.currentTarget.id);
  },
  'click .removeWorkHistory'(event, instance) {
    _handleRemoval(instance, 'workHistories', event.currentTarget.id);
  }
});

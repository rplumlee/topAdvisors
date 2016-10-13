import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import _ from 'underscore';
import Collections from '/lib/collections';
import './manage_pros.html';
import './add_pro.html';
import './edit_pro.html';

var _handleRemoval = function (instance, dataSet, currentId) {
  var data = instance.pros.get('pro');
  var pos = _.findIndex(data[dataSet], (o) => { return o.id == currentId; });
  data[dataSet].splice(pos, 1);
  instance.pros.set('pro', data);
}

Template.adminPros.helpers({
  user: () => {
    return Meteor.user()
  },
  pros: () => {
    return Collections.Users.find({ type: 'pro' })
  }
});

Template.adminPros.events({
  'click #logout'(event) {
    Meteor.logout(() => {
      Router.go('login');
    });
  }
});

Template.adminPros.onRendered(function () {
  if (!Meteor.userId()) {
    Router.go('login');
  }

  document.title = 'Admin Dashboard';
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


Template.adminProAdd.onCreated(function () {
  this.pros = new ReactiveDict();
  this.pros.setDefault({
    pro: {}
  });
});


Template.adminProAdd.onRendered(function () {
  console.log(_.findIndex);
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

Template.adminProAdd.helpers({
  pros: () => {
    return Template.instance().pros.get('pro')
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
  ]
});

Template.adminProAdd.events({
  'change .proForm'(event, instance) {
    var data = instance.pros.get('pro');
    data[event.currentTarget.id] = event.currentTarget.value;
    instance.pros.set('pro', data);
  },
  'change .businessSpeciality'(event, instance) {
    var data = instance.pros.get('pro');
    data.businessSpeciality = data.businessSpeciality || [];
    if (data.businessSpeciality.indexOf(event.currentTarget.value) === -1) {
      data.businessSpeciality.push(event.currentTarget.value);
    }
    instance.pros.set('pro', data);
  },
  'change .personalSpeciality'(event, instance) {
    var data = instance.pros.get('pro');
    data.personalSpeciality = data.personalSpeciality || [];
    if (data.personalSpeciality.indexOf(event.currentTarget.value) === -1) {
      data.personalSpeciality.push(event.currentTarget.value);
    }
    instance.pros.set('pro', data);
  },
  'click .businessSpecialityRemove'(event, instance) {
    var data = instance.pros.get('pro');
    var pos = data.businessSpeciality.indexOf(event.currentTarget.id);
    data.businessSpeciality.splice(pos, 1);
    instance.pros.set('pro', data);
  },
  'click .personalSpecialityRemove'(event, instance) {
    var data = instance.pros.get('pro');
    var pos = data.personalSpeciality.indexOf(event.currentTarget.id);
    data.personalSpeciality.splice(pos, 1);
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

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
    var searchText = Template.instance().state.get('searchText');
    if (searchText) {
      searchText = new RegExp(searchText, 'ig');

      return Collections.Users.find({
        'profile.type': 'pro',
        $or: [ { 'profile.firstName': searchText },{ 'profile.lastName': searchText}]
      });
    }
    return Collections.Users.find({ 'profile.type': 'pro' });
  },
  leadsClosedByPro: (pro) => {
    return Collections.Leads.find({
      agent: pro._id,
      status: 'closed'
    }).count();
  }
});

Template.adminPros.events({
  'click .editPro'(event) {
    event.preventDefault();
    Router.go(`/admin/pros/${event.target.id}`);
  },
  'click .addPro'(event) {
    event.preventDefault();
    Router.go('/admin/pros/new');
  },
  'keyup #search-text'(event) {
    event.preventDefault();
    Template.instance().state.set('searchText', event.target.value);
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
  this.state = new ReactiveDict();
  this.state.setDefault({});
  Meteor.subscribe('pros.list');
  Meteor.subscribe('leads.list');
});

Template.adminProInner.onCreated(function () {
  this.pros = new ReactiveDict();
  this.pros.setDefault({
    pro: {},
    proExists: false,
    leadId: null
  });

  Meteor.subscribe('companies.list');
  if (!this.data.id) {
    this.pros.set('proExists', false);
  } else {
    this.pros.set('proExists', true);
    Meteor.subscribe('pros.list', {
      onReady: ()=> {
        var pro = Collections.Users.findOne({
          _id: this.data.id,
          'profile.type': 'pro'
        });
        if (!pro) {
          Router.go('/admin/pros');
        }
        Meteor.subscribe('activities.get', pro._id);
        this.pros.set('pro', pro);
      }
    });
    Meteor.subscribe('leads.list');
  }
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
    return Template.instance().pros.get('proExists');
  },
  or: function (a, b) {
    return  a || b;
  },
  profileViews: () => {
    var activity = Collections.Activities.findOne({ agent: Template.instance().pros.get('pro')._id });
    return activity ? activity.count : 0;
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
  parseDate: function (date) {
    if (date) {
      return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    }
  },
  currentLead: function () {
    if (Template.instance().pros.get('leadId')) {
      return Collections.Leads.findOne({ _id: Template.instance().pros.get('leadId') });
    } else {
      return Collections.Leads.find().fetch()[0];
    }
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
  },
  currentCompany: (companyId) => {
    return Template.instance().pros.get('pro').company === companyId;
  }
});

Template.adminProInner.events({
  'change .businessSpecialty'(event, instance) {
    var data = instance.pros.get('pro');
    data.profile = data.profile || {};
    data.profile.businessSpecialty = data.profile.businessSpecialty || [];
    if (_.findIndex(data.profile.businessSpecialty, { name: event.currentTarget.value }) == -1) {
      data.profile.businessSpecialty.push({ name: event.currentTarget.value, percent: 0 });
    }
    instance.pros.set('pro', data);
  },
  'change .personalSpecialty'(event, instance) {
    var data = instance.pros.get('pro');
    data.profile = data.profile || {};
    data.profile.personalSpecialty = data.profile.personalSpecialty || [];
    if (_.findIndex(data.profile.personalSpecialty, { name: event.currentTarget.value }) == -1) {
      data.profile.personalSpecialty.push({ name: event.currentTarget.value, percent: 0 });
    }
    instance.pros.set('pro', data);
  },
  'change .personalPercent'(event, instance) {
    var data = instance.pros.get('pro');
    var specialty = _.find(data.profile.personalSpecialty, { name: event.currentTarget.dataset.id });
    specialty.percent = event.currentTarget.value;
    instance.pros.set('pro', data);
  },
  'change .businessPercent'(event, instance) {
    var data = instance.pros.get('pro');
    var specialty = _.find(data.profile.businessSpecialty, { name: event.currentTarget.dataset.id });
    specialty.percent = event.currentTarget.value;
    instance.pros.set('pro', data);
  },
  'click .businessSpecialtyRemove'(event, instance) {
    var data = instance.pros.get('pro');
    var pos = _.findIndex(data.profile.businessSpecialty, { name: event.currentTarget.id });
    data.profile.businessSpecialty.splice(pos, 1);
    instance.pros.set('pro', data);
  },
  'click .personalSpecialtyRemove'(event, instance) {
    var data = instance.pros.get('pro');
    var pos = _.findIndex(data.profile.personalSpecialty, { name: event.currentTarget.id });
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
  },
  'submit .add-pro-form' (event, instance) {
    event.preventDefault();
    var data = instance.pros.get('pro');

    console.log(instance);

    _.each(event.target, function(t) {
      if (t.name) {
        if (t.type === 'checkbox') {
          data[t.name] = t.checked;
        } else if (!_.isEmpty(t.value)) {
          data[t.name] = t.value;
        }
      }
    });

    if ($('#proTempImage')[0].value) {
      data['profile.image'] = $('#proTempImage')[0].value;
    }

    if ($('#coverTempImage')[0].value) {
      data['profile.coverImage'] = $('#coverTempImage')[0].value;
    }

    console.log(data);

    Meteor.call('users.create', data, function (err, result) {
      if (!err) {
        Router.go(`/admin/pros/${result.user}`);
        document.location.reload(true);
      } else {
        console.log(err);
      }
    })
  },
  'submit .edit-pro-form' (event, instance) {
    event.preventDefault();
    var data = instance.pros.get('pro');

    _.each(event.target, function(t) {
      if (t.name) {
        if (t.type === 'checkbox') {
          data[t.name] = t.checked;
        } else if (!_.isEmpty(t.value)) {
          data[t.name] = t.value;
        }
      }
    });

    Meteor.call('users.edit', data, function (err, result) {
      if (!err) {
        document.location.reload(true);
      } else {
        console.log(err);
      }
    });
  },

  'click .deactivate-pro'(event, instance) {
    var data = {
      _id: instance.pros.get('pro')._id,
      active: false
    };
    Meteor.call('users.edit', data, function (err, result) {
      if (!err) {
        document.location.reload(true);
      } else {
        console.log(err);
      }
    });
  },

  'click .activate-pro'(event, instance) {
    var data = {
      _id: instance.pros.get('pro')._id,
      active: true
    };
    Meteor.call('users.edit', data, function (err, result) {
      if (!err) {
        document.location.reload(true);
      } else {
        console.log(err);
      }
    });
  },
  'focus #proImage input'(event, instance) {
    var proId = instance.pros.get('pro')._id;
    if ($('#proImage img')[1]) {
      $('#proImageLoader').show();
      $('#proImage img').css({ opacity: 0.2 });
      $.ajax({
        type: "POST",
        url: "/upload",
        data: $('#proImage img')[1].src,
        success: function (response) {
          $('#proImageLoader').hide();
          $('#proImage img').css({ opacity: 1 });
          if (proId) {
            Meteor.call('users.edit', {
              _id: proId,
              'profile.image': response.secure_url
            });
          } else {
            $('#proTempImage')[0].value = response.secure_url
          }
        }
      });
    }
  },
  'focus #coverImage input'(event, instance) {
    var proId = instance.pros.get('pro')._id;
    if ($('#coverImage img')[1]) {
      $('#coverImageLoader').show();
      $('#coverImage img').css({ opacity: 0.2 });
      $.ajax({
        type: "POST",
        url: "/upload",
        data: $('#coverImage img')[1].src,
        success: function (response) {
          $('#coverImageLoader').hide();
          $('#coverImage img').css({ opacity: 1 });
          if (proId) {
            Meteor.call('users.edit', {
              _id: proId,
              'profile.coverImage': response.secure_url
            });
          } else {
            $('#coverTempImage')[0].value = response.secure_url
          }
        }
      });
    }
  },
  'click .leadModal'(event, instance) {
    instance.pros.set('leadId', event.target.id);
  },
  'click .fresh-lead-btn' (event, instance) {
    var leadId = instance.pros.get('leadId');
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
    var leadId = instance.pros.get('leadId');
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
    var leadId = instance.pros.get('leadId');
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
    var leadId = instance.pros.get('leadId');
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

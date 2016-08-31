import { Template } from 'meteor/templating';
import './dashboard.html';

Template.myDashboard.helpers({
  copyrightDate: function () {
    return new Date().getFullYear();
  },
  tab: function() {
    console.log(Template.instance().currentTab.get());
    return "0";
  },
});

Template.myDashboard.events({
  'click #logout'(event) {
    Meteor.logout(() => {
      Router.go('login');
    });
  }
});

Template.myDashboard.onRendered(function bodyOnRendered() {
  if (!Meteor.userId()) {
    Router.go('login');
  }
});

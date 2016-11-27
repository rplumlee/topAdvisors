import { Template } from 'meteor/templating';
import Collections from '/lib/collections';
import Common from '../../common';
import './manage_consumers.html';

Template.adminConsumers.helpers({
  consumers: function (selector) {
    return Collections.Leads.find({});
  },
  parseDate: function (date) {
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
  },
  user: function () {
    return Meteor.user()
  }
});

Template.adminConsumers.events({
  'click #logout'(event) {
    Meteor.logout(() => {
      Router.go('login');
    });
  }
});

Template.adminConsumers.onRendered(function bodyOnRendered() {
  this.autorun(() => {
    if (!Meteor.userId()) {
      Router.go('login');
    }
  });


  document.title = 'Admin Dashboard';
  Meteor.subscribe('leads.listConsumers');

});

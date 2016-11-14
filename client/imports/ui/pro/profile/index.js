import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import Collections from '/lib/collections';
import './update_profile.html';

Template.proProfileUpdate.helpers({
  user: function () {
    return Meteor.user()
  },
  getCompany: function () {
    return Collections.Companies.findOne();
  }
});

Template.proProfileUpdate.onCreated(function () {
  Meteor.subscribe('companies.list');
});

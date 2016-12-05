import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Accounts } from 'meteor/accounts-base';
import Collections from '/lib/collections';
import Common from '../../common';
import './update_profile.html';

Template.proProfileUpdate.helpers({
  user: function () {
    return Meteor.user()
  },
  getCompany: function () {
    return Collections.Companies.findOne();
  },
  getCPA: function () {
    var designations = Meteor.user().designations;
    var des = _.map(designations, function (each) { return each.designation });
    return (des.length > 0 ? ', ' + des.join(', ') : '');
  }
});

Template.proProfileUpdate.onCreated(function () {
  Meteor.subscribe('companies.list');
  Meteor.subscribe('pros.list');
});

Template.proProfileUpdate.events({
  "submit .form"(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var currentPassword = event.target.currentPassword.value;
    var newPassword = event.target.newPassword.value;
    var retypePassword = event.target.retypePassword.value;

    if(newPassword !== retypePassword) {
      swal("Error", "Both passwords dont match!", "error")
    }
    else {
      Accounts.changePassword(currentPassword, newPassword, (err)=> {
        if (err) {
          swal("Error!", "Error changing password!", "error")
        } else {
          swal("Good job!", "Password changed successfully!", "success")
          event.target.currentPassword.value = "";
          event.target.newPassword.value = "";
          event.target.retypePassword.value = "";
        }
      })
    }
  }
});

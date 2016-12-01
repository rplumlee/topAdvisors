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
  }
});

Template.proProfileUpdate.onCreated(function () {
  Meteor.subscribe('companies.list');
});

Template.proProfileUpdate.events({
  "submit .form"(event, template) {
    // Prevent default browser form submit
    event.preventDefault();

    var currentPassword = event.target.currentPassword.value;
    var newPassword = event.target.newPassword.value;
    var retypePassword = event.target.retypePassword.value;

    if(newPassword !== retypePassword) {
      alert("Passwords don't match");
    }
    else {
      Accounts.changePassword(currentPassword, newPassword, (err)=> {
        if (err) {
          alert(err.reason);
        } else {
          alert("Sucessfully changed the password");
          event.target.currentPassword.value = "";
          event.target.newPassword.value = "";
          event.target.retypePassword.value = "";
        }
      })
    }
  }
});

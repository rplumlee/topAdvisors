import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseSchema from './schemas/base';

var LeadSchema = new SimpleSchema([ BaseSchema, {
  //
  // Profile details of the consumer
  //
  profile: {
    type: Object
  },
  'profile.firstName': {
    type: String
  },
  'profile.lastName': {
    type: String
  },
  //
  // Customer email
  'profile.email': {
    type: String,
    optional: true
  },
  //
  // Customer contact number
  //
  'profile.phone': {
    type: String,
    optional: true
  },
  //
  // Current Status of the Lead
  //
  status: {
    type: String,
    regEx: /(fresh|open|dead|closed)/,
    defaultValue: 'fresh'
  },
  //
  // Purpose of the enquiry like Mortgage, Business Loan etc.
  //
  purpose: {
    type: String
  },
  //
  // Detailed dscription of the lead
  //
  message: {
    type: String,
    optional: true
  },
  //
  // Agent (pro) Id
  //
  agent: {
    type: String
  },
  //
  // Company Id
  //
  company: {
    type: String
  },
  paid: {
    type: Boolean,
    defaultValue: false
  },
  preferredContact: {
    type: String,
    defaultValue: 'Email'
  }
}] );

var Leads = new Mongo.Collection('leads', {
  transform: function (doc) {
    doc.getAgent = function () {
      return Users.findOne({ _id: doc.agent });
    },
    doc.getCompany = function () {
      return Companies.find({ _id: doc.company });
    }
    return doc;
  }
});

Leads.attachSchema(LeadSchema);

export default Leads;

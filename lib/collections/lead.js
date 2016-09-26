import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseSchema from './schemas/base';

var LeadSchema = new SimpleSchema([ BaseSchema, {
  //
  // Profile deatils of the consumer
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
  // Current Status of the Lead
  //
  status: {
    type: String,
    regEx: /(fresh|open|dead|closed)/
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
  phone: {
    type: String,
    optional: true
  },
  //
  // Detailed dscription of the lea
  //
  message: {
    type: String
  },
  //
  // Agent (pro) Id
  //
  agent: {
    type: String
  },
  createdOn: {
    type: Date
  }
}] );

var Leads = new Mongo.Collection('leads');

Leads.attachSchema(LeadSchema);

export default Leads;

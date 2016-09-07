import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseSchema from './schemas/base';

var LeadSchema = new SimpleSchema([ BaseSchema, {
  profile: {
    type: Object
  },
  'profile.firstName': {
    type: String
  },
  'profile.lastName': {
    type: String
  },
  status: {
    type: String,
    regEx: /(open|closed)/
  },
  purpose: {
    type: String
  },
  date: {
    type: Date
  },
  createdOn: {
    type: Date
  }
}] );

var Leads = new Mongo.Collection('leads');

Leads.attachSchema(LeadSchema);

//
// Export it for convenience
//
export default Leads;

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseSchema from './schemas/base';
import AddressSchema from './schemas/address';

var CompanySchema = new SimpleSchema([ BaseSchema, {
  name: {
    type: String
  },
  address: {
    type: AddressSchema
  },
  bio: {
    type: String
  }
}] );

var Companies = new Mongo.Collection('companies');

Companies.attachSchema(CompanySchema);

export default Companies;

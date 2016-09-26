import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseSchema from './schemas/base';
import AddressSchema from './schemas/address';

import Users from './user';

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

var Companies = new Mongo.Collection('companies', {
  transform: function (doc) {
    doc.agents = function () {
      return Users.find({ company: doc._id });
    }
    return doc;
  }
});

Companies.attachSchema(CompanySchema);

export default Companies;
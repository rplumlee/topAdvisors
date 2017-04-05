import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseSchema from './schemas/base';
import AddressSchema from './schemas/address';

import Users from './user';
import Leads from './lead';

var CompanySchema = new SimpleSchema([ BaseSchema, {
  name: {
    type: String
  },
  address: {
    type: AddressSchema,
  },
  bio: {
    type: String
  },
  image: {
    type: String,
    optional: true
  }
}] );

var Companies = new Mongo.Collection('companies', {
  transform: function (doc) {
    doc.getAgents = function () {
      return Users.find({ company: doc._id }).fetch();
    },
    doc.getLeads = function () {
      return Leads.find({ company: doc._id }).fetch();
    }
    return doc;
  }
});

Companies.attachSchema(CompanySchema);

export default Companies;

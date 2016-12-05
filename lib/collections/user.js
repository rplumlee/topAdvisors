import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import ProfileSchema from './schemas/profile';
import EducationSchema from './schemas/education';
import LicenseSchema from './schemas/license';
import DesignationSchema from './schemas/designation';
import WorkHistorySchema from './schemas/workHistory';
import SpecialitySchema from './schemas/speciality';
import BaseSchema from './schemas/base';
import AddressSchema from './schemas/address';

import Leads from './lead';
import Companies from './company';
var UserSchema = new SimpleSchema([ BaseSchema, {
  active: {
    type: Boolean,
    defaultValue: true
  },
  profile: {
    type: ProfileSchema
  },
  //
  // If user.type is pro, it should have a company ID
  //
  company: {
    type: String,
    optional: true
  },
  //
  // Collections
  //
  educations: {
    type: [ EducationSchema ],
    defaultValue: []
  },
  licenses: {
    type: [ LicenseSchema ],
    defaultValue: []
  },
  designations: {
    type: [ DesignationSchema ],
    defaultValue: []
  },
  workHistories: {
    type: [ WorkHistorySchema ],
    defaultValue: []
  },

  //
  // Boolean fields
  //
  trophies: {
    type: Object
  },
  'trophies.verified': {
    type: Boolean,
    defaultValue: false
  },
  'trophies.veteran': {
    type: Boolean,
    defaultValue: false
  },
  'trophies.contentContributor': {
    type: Boolean,
    defaultValue: false
  },
  'trophies.topPerformer': {
    type: Boolean,
    defaultValue: false
  },
  'trophies.customerFavorite': {
    type: Boolean,
    defaultValue: false
  },

  //
  // To support the Meteor Accounts
  // package
  //
  emails: {
    type: [ Object ]
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true
  },
  'emails.$.verified': {
    type: Boolean,
    optional: true
  },
  services: {
    type: Object,
    blackbox: true
  },
  speciality: {
    type: Object,
    optional: true
  },
  'speciality.financialPlanning': {
    type: SpecialitySchema,
    optional: true
  },
  'speciality.insurance': {
    type: SpecialitySchema,
    optional: true
  },
  'speciality.loans': {
    type: SpecialitySchema,
    optional: true
  }
}] );

//
// Attach the schema to the Meteor.users collection
//
Meteor.users.attachSchema(UserSchema);


//
// Export it for convenience
//
export default Meteor.users;

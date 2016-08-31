import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import ProfileSchema from './schemas/profile';
import EducationSchema from './schemas/education';
import LicenseSchema from './schemas/license';
import DesignationSchema from './schemas/designation';
import WorkHistorySchema from './schemas/workHistory';

var UserSchema = new SimpleSchema({
  profile: {
    type: ProfileSchema
  },

  //
  // Collections
  //
  educations: {
    type: [ EducationSchema ],
    optional: true
  },
  licenses: {
    type: [ LicenseSchema ],
    optional: true
  },
  designations: {
    type: [ DesignationSchema ],
    optional: true
  },
  workHistories: {
    type: [ WorkHistorySchema ],
    optional: true
  },

  //
  // Boolean fields
  //
  settings: {
    type: Object
  },
  'settings.verified': {
    type: Boolean,
    defaultValue: false
  },
  'settings.veteran': {
    type: Boolean,
    defaultValue: false
  },
  'settings.contentContributor': {
    type: Boolean,
    defaultValue: false
  },
  'settings.topPerformer': {
    type: Boolean,
    defaultValue: false
  },
  'settings.customerFavorite': {
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
  }
});

//
// Attach the schema to the Meteor.users collection
//
Meteor.users.attachSchema(UserSchema);

//
// Export it for convenience
//
export default Meteor.users;

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';
import ProSpecialtySchema from './proSpecialty';

export default new SimpleSchema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  slug: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        return this.siblingField('firstName').value.toLowerCase() + '-' + this.siblingField('lastName').value.toLowerCase() + '-' + Math.ceil(Math.random()*100000);
      }
    }
  },
  jobTitle: {
    type: String
  },
  about: {
    type: String
  },
  image: {
    type: String,
    optional: true
  },
  coverImage: {
    type: String,
    optional: true
  },
  industry: {
    type: [ String ],
    defaultValue: []
  },
  personalSpecialty: {
    type: [ ProSpecialtySchema ],
    defaultValue: []
  },
  businessSpecialty: {
    type: [ ProSpecialtySchema ],
    defaultValue: []
  },
  performance:{
    type: Object
  },
  'performance.clientRetentionRate': {
    type: String,
    defaultValue: '0'
  },
  'performance.annualProduction': {
    type: String,
    defaultValue: '0'
  },
  focus: {
    type: Object,
  },
  'focus.quickly': {
    type: Boolean,
    defaultValue: false,
  },
  'focus.highReturns': {
    type: Boolean,
    defaultValue: false,
  },
  'focus.education': {
    type: Boolean,
    defaultValue: false,
  },
  phone: {
    type: String,
    optional: true
  },
  type: {
    type: String,
    defaultValue: 'pro'
  }
});

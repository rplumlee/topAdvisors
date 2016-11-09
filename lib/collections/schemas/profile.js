import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

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
  industry: {
    type: [ String ]
  },
  personalSpecialty: {
    type: [ String ]
  },
  businessSpecialty: {
    type: [ String ]
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


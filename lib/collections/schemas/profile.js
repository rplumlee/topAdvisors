import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

export default new SimpleSchema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
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
  specialty: {
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


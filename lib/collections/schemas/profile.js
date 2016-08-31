import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

export default new SimpleSchema({
  name: {
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
  }
});


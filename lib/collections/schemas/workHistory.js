import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

export default new SimpleSchema({
  //
  // Previous company Name
  //
  companyName: {
    type: String
  },
  //
  // Years worked
  //
  yearRange: {
    type: String
  }
});

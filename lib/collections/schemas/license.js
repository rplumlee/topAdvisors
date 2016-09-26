import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

export default new SimpleSchema({
  //
  // Name of the license
  //
  license: {
    type: String
  },
  //
  // License Number
  //
  licenseNumber: {
    type: String
  },
  //
  // Date the license was issued
  //
  dateEarned: {
    type: String
  }
});

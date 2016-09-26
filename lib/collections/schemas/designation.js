import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

export default new SimpleSchema({
  //
  // Designation Name
  //
  designation: {
    type: String
  },
  //
  // Designation Number
  //
  designationNumber: {
    type: String
  },
  //
  // Date of issue
  //
  dateEarned: {
    type: String
  }
});

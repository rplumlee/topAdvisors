import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

export default new SimpleSchema({
  //
  // Name of degree
  //
  degreeName: {
    type: String
  },
  //
  // Name of college
  //
  collegeName: {
    type: String
  },
  //
  // Year of graduation
  //
  yearGraduated: {
    type: Number
  }
});

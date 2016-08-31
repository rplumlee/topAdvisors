import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

export default new SimpleSchema({
  //
  // Unique id for comment
  //
  degreeType: {
    type: String
  },
  //
  // Comment text
  //
  schoolName: {
    type: String
  },
  //
  // Date the comment was submitted
  //
  dateEarned: {
    type: Date
  }
});

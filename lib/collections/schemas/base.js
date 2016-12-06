import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
  //
  // Date this document was created
  //
  createdOn: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      }
    }
  },
  //
  // Date this document was last updated
  //
  updatedOn: {
    type: Date,
    autoValue: function () {
      return new Date();
    }
  }
});

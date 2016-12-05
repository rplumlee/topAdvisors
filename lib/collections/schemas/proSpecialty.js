import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({

  name: {
    type: String
  },
  percent: {
    type: Number,
    defaultValue: 0
  }
});

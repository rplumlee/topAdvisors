import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
  street1: {
    type: String
  },
  street2: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: String
  }
});

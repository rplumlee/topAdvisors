import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
  street1: {
    type: String
  },
  street2: {
    type: String,
    optional: true
  },
  city: {
    type: String
  },
  state: {
    type: String,
    optional: true
  },
  zip: {
    type: String,
    optional: true
  },
  fullAddress: {
    type: String
  }
});

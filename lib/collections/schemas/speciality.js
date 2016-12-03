import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({

  business: {
    type: Object,
    optional: true
  },
  'business.percent': {
    type: String,
    optional: true
  },
  'business.avgPolicySize': {
    type: String,
    optional: true
  },
  personal: {
    type: Object,
    optional: true
  },
  'personal.percent': {
    type: String,
    optional: true
  },
  'personal.avgPolicySize': {
    type: String,
    optional: true
  }
});

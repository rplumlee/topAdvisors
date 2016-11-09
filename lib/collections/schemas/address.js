import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'underscore';

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
    type: String,
    autoValue: function () {
      if (!this.isSet) {
        var addressParts = [];
        addressParts.push(this.siblingField('street1').value);
        addressParts.push(this.siblingField('street2').value);
        addressParts.push(this.siblingField('city').value);
        addressParts.push(this.siblingField('state').value);
        addressParts.push(this.siblingField('zip').value);
        return _.filter(addressParts, function (addressPart) {
          return !!addressPart;
        }).join(', ');
      }
    }
  }
});

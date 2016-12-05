import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'underscore';

export default new SimpleSchema({
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
        addressParts.push(this.siblingField('city').value);
        addressParts.push(this.siblingField('state').value);
        if (this.siblingField('zip')) {
          addressParts.push(this.siblingField('zip').value);
        }
        return _.filter(addressParts, function (addressPart) {
          return !!addressPart;
        }).join(', ');
      }
    }
  }
});

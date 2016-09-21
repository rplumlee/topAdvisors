import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseSchema from './schemas/base';

var ActivitySchema = new SimpleSchema([ BaseSchema, {
  type: {
    type: String
  }
}] );

var Activities = new Mongo.Collection('activities');

Activities.attachSchema(ActivitySchema);

//
// Export it for convenience
//
export default Activities;
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseSchema from './schemas/base';

var ActivitySchema = new SimpleSchema([ BaseSchema, {
  count: {
    type: Number,
    defaultValue: 0
  },
  agent: {
    type: String
  }
}] );

var Activities = new Mongo.Collection('activities');

Activities.attachSchema(ActivitySchema);

export default Activities;

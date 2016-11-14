import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseSchema from './schemas/base';

var ReviewSchema = new SimpleSchema([ BaseSchema, {
  firstName: {
    type: String
  },
  rating: {
    type: Number
  },
  description: {
    type: String
  },
  agent: {
    type: String
  }
}] );

var Reviews = new Mongo.Collection('reviews');

Reviews.attachSchema(ReviewSchema);

export default Reviews;

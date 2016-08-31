import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Collections from '/lib/collections';

import logger from './logger';
import users from './users';

var context = {
  Meteor,
  Collections,
  Accounts,
  check
};

Meteor.startup(() => {
  logger(context);
  users(context);
});

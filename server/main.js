import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Collections from '/lib/collections';

import logger from './logger';
import users from './users';
import leads from './leads';
// import activities from './activities';

var context = {
  Meteor,
  Collections,
  Accounts,
  check
};

Meteor.startup(() => {
  logger(context);
  users(context);
  leads(context);
  // activities(context);
});

WebApp.connectHandlers.use("/home", function(req, res, next) {
  res.writeHead(200);
  res.end(Assets.getText('index.html'));
});
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Flat from 'flat';
import Collections from '/lib/collections';
import lib from '/server/lib';

import logger from './logger';
import users from './users';
import leads from './leads';
// import activities from './activities';

var context = {
  Meteor,
  Collections,
  Accounts,
  check,
  Flat
};

Meteor.startup(() => {
  lib.init(context);
  logger(context);
  users(context);
  leads(context);
  // activities(context);
});

WebApp.connectHandlers.use('/home', function (req, res) {
  res.writeHead(200);
  res.end(Assets.getText('index.html'));
});

WebApp.connectHandlers.use('/profile', function (req, res) {
  res.writeHead(200);
  res.end(Assets.getText('profile.html'));
});

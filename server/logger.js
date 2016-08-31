import winston from 'winston';
import { Papertrail } from 'winston-papertrail';

/**
 * Initializes the Logger with credentials passed in the config object
 * @param {object} context - server application context
 */
export default function (context) {

  var config = {};
  config.host = process.env.PAPERTRAIL_HOST || Meteor.settings.PAPERTRAIL_HOST;
  config.port = process.env.PAPERTRAIL_PORT || Meteor.settings.PAPERTRAIL_PORT;

  //
  // Define our transport
  //
  var transport = new Papertrail({
    levels: {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
      auth: 4
    },
    colors: {
      debug: 'blue',
      info: 'green',
      warn: 'red',
      error: 'red',
      auth: 'red'
    },
    host: config.host,
    port: config.port,
    json: true,
    colorize: true,
    logFormat: (level, message) => {
      return level + ': ' + message;
    }
  });

  //
  // Handle exceptions
  //
  transport.exceptionsLevel = 'error';
  winston.handleExceptions(transport);

  //
  // undefined -> no config needed, true -> is already initialized
  //
  winston.add(transport, undefined, true);

  //
  // Announce the initialization
  //
  winston.info('Initializing Module: Logger');

  //
  // Add winton to the context as the Logger
  // so it can be used by other modules
  //
  context.Logger = winston;
}

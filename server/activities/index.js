import publications from './publications';

/**
 * Initializes the activities module
 * @param {object} context - server application context
 */
export default function (context) {
  //
  // Announce the initialization
  //
  context.Logger.info('Initializing Module: Activities');

  //
  // Initialze the components passing in the
  // server application context
  //
  publications(context);
}

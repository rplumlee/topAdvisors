import routes from './routes';

/**
 * Initializes the reviews module
 * @param {object} context - server application context
 */
export default function (context) {
  //
  // Announce the initialization
  //
  context.Logger.info('Initializing Module: Reviews');

  //
  // Initialze the components passing in the
  // server application context
  //
  routes(context);
}

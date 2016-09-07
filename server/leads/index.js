import startup from './startup';
import publications from './publications';

/**
 * Initializes the leads module
 * @param {object} context - server application context
 */
export default function (context) {
  //
  // Announce the initialization
  //
  context.Logger.info('Initializing Module: Leads');

  //
  // Initialze the components passing in the
  // server application context
  //
  publications(context);
  startup(context);
}

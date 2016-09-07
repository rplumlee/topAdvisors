import configs from './configs';
import methods from './methods';
import startup from './startup';

/**
 * Initializes the accounts module
 * @param {object} context - server application context
 */
export default function (context) {
  //
  // Announce the initialization
  //
  context.Logger.info('Initializing Module: Users');

  //
  // Initialze the components passing in the
  // server application context
  //
  configs(context);
  methods(context);
  startup(context);
}

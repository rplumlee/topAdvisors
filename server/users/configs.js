/**
 * Configures the Meteor Accounts Package
 * @param {object} context - server application context
 */
export default function ({ Accounts }) {

  //
  // Set general configuration options
  //
  Accounts.config({
    forbidClientAccountCreation: true
  });

  //
  // Set the onCreateUser callback used to customize
  // the user object when created
  //
  Accounts.onCreateUser((options, user) => {

    user.settings = options.settings;
    return user;
  });

}

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

    user.profile = options.profile;
    user.trophies = options.trophies;
    user.type = options.type;
    user.company = options.company;
    return user;
  });

}

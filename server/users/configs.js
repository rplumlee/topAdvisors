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
    user.company = options.company;
    user.educations = options.educations;
    user.licenses = options.licenses;
    user.designations = options.designations;
    user.workHistories = options.workHistories;
    return user;
  });

  Accounts.emailTemplates.siteName = process.env.ROOT_URL.replace(/\/$/, '');
  Accounts.emailTemplates.from = Meteor.settings['CONTACT_NAME'] + ' <' + Meteor.settings['CONTACT_EMAIL'] + '>';
  Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return 'Welcome to Top Advisors, ' + user.profile.firstName;
  };
  Accounts.emailTemplates.enrollAccount.text = function () {
    return 'Your account has been created at TopAdvisors.\nPlease contact admin for credentials.';
  };
}

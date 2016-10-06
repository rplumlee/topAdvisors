/**
 * Define the exported methods for the accounts module
 * @param {object} context - server application context
 */
export default function ({ Meteor, Accounts, Collections, check }) {

  Meteor.methods({

    /**
     * Create a new user
     * @public
     * @params {object} params - user info
     */
    'users.create': function (params) {
      check(params, Object);

      // Create user
      var id = Accounts.createUser(params);

      // Accounts.sendEnrollmentEmail(id);

      return { success: true, user: id };
    },

    /**
     * Create a new company
     * @public
     * @params {object} params - company info
     */
    'companies.create': function (params) {
      check(params, Object);

      // Ensure logged in user is an admin
      // lib.authorize([ roles.admin ]);

      // Create user
      var id = Collections.Companies.insert(params);

      return { success: true, company: id };
    }

  });
}

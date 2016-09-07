/**
 * Define the exported methods for the accounts module
 * @param {object} context - server application context
 */
export default function ({ Meteor, Accounts, Roles, check }) {

  Meteor.methods({

    /**
     * Create a new user
     * @public
     * @params {object} params - user info
     */
    'users.create': function (params) {
      check(params, Object);

      // Ensure logged in user is an admin
      // lib.authorize([ roles.admin ]);

      // Check the roles and parent org selected for the new users
      // _checkRoles(data.role);

      // Create user
      var id = Accounts.createUser(params);

      // Accounts.sendEnrollmentEmail(id);

      // Add role to the user
      Roles.addUsersToRoles(id, [ 'admin' ]);

      return { success: true, user: id };
    }

  });
}

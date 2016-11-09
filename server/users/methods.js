/**
 * Define the exported methods for the accounts module
 * @param {object} context - server application context
 */
export default function ({ Meteor, Accounts, Collections, check, lib }) {

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
      lib.authorizeAdmin();

      // Create user
      var id = Collections.Companies.insert(params);

      return { success: true, company: id };
    },
    'companies.get': function (params) {
      check(params, Object);
      if (!Meteor.user()) {
        return {};
      }
      return {
        company: Collections.Companies.findOne(params._id) || {},
        pros: Collections.Users.find({ company: params._id }).fetch() || [],
        leads: Collections.Leads.find({ company: params._id }).fetch() || []
      };
    }
  });
}

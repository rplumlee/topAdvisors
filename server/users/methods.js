/**
* Define the exported methods for the accounts module
* @param {object} context - server application context
*/
export default function ({ Meteor, Accounts, Collections, check, lib, Flat }) {

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
      check(params, {
        name: String,
        address: {
          street1: String,
          city: String,
          state: String,
          zip: String
        },
        bio: String
      });

      // Ensure logged in user is an admin
      lib.authorizeAdmin();

      // Create user
      var id = Collections.Companies.insert(params);

      return { success: true, company: id };
    },

    'companies.edit': function (params) {
      check(params, Object);

      // Ensure logged in user is an admin
      lib.authorizeAdmin();

      // Create user
      var id = Collections.Companies.update(
        { _id: params._id },
        { $set: Flat.flatten(params) }
      );

      return { success: true, company: id };
    }
  });
}

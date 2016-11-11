/**
* Define the exported methods for the accounts module
* @param {object} context - server application context
*/
export default function ({ Meteor, Accounts, Collections, check, Match, lib, Flat }) {

  Meteor.methods({

    /**
    * Create a new user
    * @public
    * @params {object} params - user info
    */
    'users.create': function (params) {
      check(params, Object);
      var inflatedData = Flat.unflatten(params);

      check(inflatedData, {
        email: String,
        password: String,
        educations: Match.Maybe(Array),
        licenses: Match.Maybe(Array),
        designations: Match.Maybe(Array),
        workHistories: Match.Maybe(Array),
        trophies: Match.Maybe({
          verified: Match.Maybe(Boolean),
          veteran: Match.Maybe(Boolean),
          contentContributor: Match.Maybe(Boolean),
          topPerformer: Match.Maybe(Boolean),
          customerFavorite: Match.Maybe(Boolean)
        }),
        profile: {
          firstName: String,
          lastName: String,
          jobTitle: String,
          about: String,
          industry: Match.Maybe([String]),
          personalSpecialty: Match.Maybe([String]),
          businessSpecialty: Match.Maybe([String]),
          performance: Match.Maybe({
            clientRetentionRate: Match.Maybe(String),
            annualProduction: Match.Maybe(String)
          }),
          focus: Match.Maybe(Object),
          phone: Match.Maybe(String)
        }
      });

      // Create user
      var id = Accounts.createUser(inflatedData);

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
          street2: Match.Maybe(String),
          fullAddress: Match.Maybe(String),
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

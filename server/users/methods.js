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

      // Ensure logged in user is an admin
      lib.authorizeAdmin();

      check(params, Object);
      var inflatedData = Flat.unflatten(params);

      console.log(inflatedData);

      check(inflatedData, {
        email: String,
        password: String,
        company: String,
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
          industry: Match.Maybe([ String ]),
          personalSpecialty: Match.Maybe(Array),
          businessSpecialty: Match.Maybe(Array),
          performance: Match.Maybe({
            clientRetentionRate: Match.Maybe(String),
            annualProduction: Match.Maybe(String)
          }),
          focus: Match.Maybe({
            quickly: Match.Maybe(Boolean),
            highReturns: Match.Maybe(Boolean),
            education: Match.Maybe(Boolean),
          }),
          phone: Match.Maybe(String),
          image: Match.Maybe(String),
          coverImage: Match.Maybe(String)
        }
      });

      // Create user
      var id = Accounts.createUser(inflatedData);

      //Accounts.sendEnrollmentEmail(id, inflatedData.email);

      // Accounts.sendEnrollmentEmail(id);

      return { success: true, user: id };
    },

    'users.edit': function (params) {
      check(params, Object);

      // Ensure logged in user is an admin
      lib.authorizeAdmin();

      if (params.email) {
        // Convert email to the format desired by db
        params.emails = [ {
          address: params.email,
          verified: false
        } ];
      }

      if (params.password) {
        Accounts.setPassword(params._id, params.password);
      }

      // Create user
      Collections.Users.update(
        { _id: params._id },
        { $set: Flat.flatten(params, { safe: true }) }
      );

      return { success: true };
    },
    /**
    * Create a new company
    * @public
    * @params {object} params - company info
    */
    'companies.create': function (params) {

      // Ensure logged in user is an admin
      lib.authorizeAdmin();

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

      // Create the activity document for the new user
      Collections.Activities.insert({
        agent: id
      });

      return { success: true, company: id };
    },

    'companies.edit': function (params) {
      check(params, Object);

      // Ensure logged in user is an admin
      lib.authorizeAdmin();

      // Edit user
      Collections.Companies.update(
        { _id: params._id },
        { $set: Flat.flatten(params, { safe: true }) }
      );

      return { success: true };
    }
  });
}

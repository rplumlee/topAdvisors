/**
 * Define the exported methods for the leads module
 * @param {object} context - server application context
 */
export default function ({ Meteor, Collections, check }) {

  Meteor.methods({

    /**
     * Create a new lead
     * @public
     * @params {object} params - user info
     */
    'leads.create': function (params) {
      check(params, Object);

      // Create lead
      var id = Collections.Leads.insert(params);

      return { success: true, lead: id };
    }

  });
}

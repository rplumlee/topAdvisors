/**
 * Define the exported methods for the leads module
 * @param {object} context - server application context
 */
export default function ({ Meteor, Collections, check, lib }) {

  Meteor.methods({

    /**
     * Create a new lead
     * @public
     * @params {object} params - user info
     */
    'leads.create': function (params) {
      check(params, Object);

      // Get the company the lead belongs to
      var agent = lib.getDoc(Collections.Users, { _id: params.agent }, 'agent');
      params.company = agent.company;
      // Create lead
      var id = Collections.Leads.insert(params);

      return { success: true, lead: id };
    }

  });
}

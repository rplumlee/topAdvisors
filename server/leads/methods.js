/**
 * Define the exported methods for the leads module
 * @param {object} context - server application context
 */
export default function ({ Meteor, Collections, check, lib, Flat }) {

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
    },

    'leads.edit': function (params) {
      check(params, Object);

      if (!Meteor.userId()) {
        throw new Meteor.Error('403', 'Forbidden');
      }

      var updated;

      if (Meteor.user().profile.type === 'pro') {
        // Edit user
        updated = Collections.Leads.update(
          { _id: params._id, agent: this.userId },
          { $set: Flat.flatten(params, { safe: true }) }
        );
      } else {
        // Edit user
        updated = Collections.Leads.update(
          { _id: params._id },
          { $set: Flat.flatten(params, { safe: true }) }
        );
      }


      return { success: Boolean(updated) };
    }

  });
}

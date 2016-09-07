/**
 * Define the exported methods for the leads module
 * @param {object} context - server application context
 */
export default function ({ Meteor, Collections }) {

  Meteor.publish('leads.list', function () {

    //
    // If user is not logged in, stop the publication
    //
    if (!this.userId) {
      return this.stop();
    }

    return Collections.Leads.find();
  });
}

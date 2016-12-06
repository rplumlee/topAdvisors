/**
 * Define the exported methods for the leads module
 * @param {object} context - server application context
 */
export default function ({ Meteor, Collections }) {

  Meteor.publish('activities.get', function (userId) {

    //
    // If user is not logged in, stop the publication
    //
    if (!this.userId) {
      return this.stop();
    }
    var user = Meteor.users.findOne({ _id: this.userId });

    if (user.profile.type === 'pro') {
      return Collections.Activities.find({ agent: this.userId });
    }
    return Collections.Activities.find({ agent: userId });
  });

  Meteor.publish('activities.list', function () {

    //
    // If user is not logged in, stop the publication
    //
    if (!this.userId) {
      return this.stop();
    }
    return Collections.Activities.find({});
  });

}

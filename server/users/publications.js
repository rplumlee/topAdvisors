/**
 * Define the exported methods for the leads module
 * @param {object} context - server application context
 */
export default function ({ Meteor, Collections }) {

  Meteor.publish('companies.list', function () {

    //
    // If user is not logged in, stop the publication
    //
    if (!this.userId) {
      return this.stop();
    }

    var user = Meteor.users.findOne({ _id: this.userId });

    if (user.profile.type === 'pro') {
      return Collections.Companies.find({ _id: user.company });
    }
    return Collections.Companies.find();
  });

  Meteor.publish('pros.list', function () {

    //
    // If user is not logged in, stop the publication
    //
    if (!this.userId) {
      return this.stop();
    }
    var user = Meteor.users.findOne({ _id: this.userId });

    if (user.profile.type === 'pro') {
      return Collections.Users.find({ _id: this.userId }, { fields: { services: 0 } });
    }
    return Collections.Users.find({ 'profile.type': 'pro' }, { fields: { services: 0 } });
  });

}

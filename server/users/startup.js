import { Fake } from 'meteor/anti:fake';

export default function ({ Meteor, Logger }) {
  //
  // On startup, create sample leads
  //
  if (Meteor.users.find().count() < 0) {
    for (var i = 0; i < 5; i++) {
      var profile = Fake.user({ fields: [ 'name', 'surname' ] });
      Accounts.createUser({
        profile: {
          name: profile.name + ' ' + profile.surname,
          about: Fake.sentence,
          industry: [],
          specialty: []
        },
        email: 'admin@topadvisors.co',
        settings: {}
      });
    }
    Logger.info('Create Admin User');
  }
}

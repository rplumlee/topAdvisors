import { Fake } from 'meteor/anti:fake';

export default function ({ Meteor, Logger }) {
  //
  // On startup, create admin user
  //
  if (!Meteor.users.find().count()) {
    var profile = Fake.user({ fields: [ 'name', 'surname' ] });
    Accounts.createUser({
      profile: {
        firstName: profile.name,
        lastName: profile.surname,
        about: Fake.sentence(5),
        industry: [],
        specialty: []
      },
      email: 'admin@topadvisors.co',
      password: 'password',
      settings: {}
    });
    Logger.info('Create Admin User');
  }
}

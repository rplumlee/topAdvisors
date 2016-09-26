import { Fake } from 'meteor/anti:fake';

export default function ({ Meteor, Logger, Collections }) {
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
      trophies: {}
    });
    Logger.info('Create Admin User');
  }

  //
  // On startup, create sample companies
  //
  if (Collections.Companies.find().count() < 5) {
    for (var i = 0; i < 5; i++) {
      var companies = Fake.user({ fields: [ 'surname' ] });
      Collections.Companies.insert({
        name: companies.surname,
        address: {
          street1: Fake.sentence(4),
          city: Fake.fromArray([ 'Portland', 'New York', 'Los Angeles', 'Washington', 'Seattle' ]),
          fullAddress: Fake.sentence(8)
        },
        bio: Fake.paragraph(4)
      });
    }
    Logger.info('Create Companies');
  }
}

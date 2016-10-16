import { faker } from 'meteor/digilord:faker';

export default function ({ Meteor, Logger, Collections }) {
  //
  // On startup, create admin user
  //
  if (!Meteor.users.find().count()) {
    Accounts.createUser({
      profile: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        jobTitle: 'Business Analyst',
        about: faker.lorem.sentence(),
        industry: [],
        personalSpecialty: [],
        businessSpecialty: [],
        type: 'admin'
      },
      email: 'admin@topadvisors.co',
      password: 'password',
      trophies: {}
    });
    Logger.info('Created Admin User');
  }

  //
  // On startup, create sample companies
  //
  if (Collections.Companies.find().count() < 5) {
    for (var i = 0; i < 5; i++) {
      var address = {
        street1: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state()
      };

      var company = Collections.Companies.insert({
        name: faker.company.companyName(),
        address: {
          street1: address.street1,
          city: address.city,
          state: address.state,
          fullAddress: address.street1 + ', ' + address.city + ', ' + address.state
        },
        bio: faker.lorem.paragraph()
      });

      Accounts.createUser({
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          phone: faker.phone.phoneNumberFormat(),
          jobTitle: 'Business Analyst',
          about: faker.lorem.sentence(),
          industry: [],
          personalSpecialty: [],
          businessSpecialty: [],
          type: 'pro'
        },
        company,
        email: faker.internet.email(),
        password: 'password',
        trophies: {}
      });
    }
    Logger.info('Created Companies');
  }
}

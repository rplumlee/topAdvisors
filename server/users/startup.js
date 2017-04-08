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
  if (Collections.Companies.find().count() < 0) {
    for (var i = 0; i < 5; i++) {
      var address = {
        street1: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state()
      };

      var company = Collections.Companies.insert({
        name: faker.company.companyName(),
        address: {
          city: address.city,
          state: address.state
        },
        bio: faker.lorem.paragraph()
      });

      console.log(company.name);

      for (var j = 0; j < 0; j++) {
        var personal = _.sample([ 'Home Loans', 'Auto Loans', 'Personal Loans', 'Financial Advising', 'Wealth Management', 'Education Funding', 'Home Insurance', 'Auto Insurance', 'Life Insurance', 'Health Insurance', 'Long-Term Care Insurance', 'Disability Insurance', 'P&C Insurance' ], 5);
        var business = _.sample([ 'Basic Commercial Loans', 'Term Commercial Loans', 'Unsecured Commercial Loans', 'Commercial Acquisition Loans', 'General Liability Insurance', 'Product Liability Insurance', 'Professional Liability Insurance', 'Commercial Property Insurance',
          'Life & Health Insurance', 'Commerical Auto Insurance', 'Workers Compensation Insurance', 'Directors and Officers Insurance', 'Data Breach Insurance', 'Tax Planning', 'Employee Benefit Planning', 'Retirement Planning', 'Business Valuation', 'Business Succession Planning',
          'Investment Planning' ], 5);
        var id = Accounts.createUser({
          profile: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phone: faker.phone.phoneNumberFormat(),
            jobTitle: 'Business Analyst',
            about: faker.lorem.sentence(),
            industry: [],
            personalSpecialty: _.map(personal, function (each) { return { name: each, percent: 10 }; }),
            businessSpecialty: _.map(business, function (each) { return { name: each, percent: 10 }; }),
            type: 'pro'
          },
          company,
          email: faker.internet.email(),
          password: 'password',
          trophies: {}
        });
        Collections.Activities.insert({ agent: id });
      }
    }
    Logger.info('Created Companies');
  }
}

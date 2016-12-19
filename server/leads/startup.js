import { faker } from 'meteor/digilord:faker';

export default function ({ Collections, Logger }) {
  //
  var agents = Collections.Users.find({ 'profile.type': 'pro' }).fetch();
  //
  // On startup, create sample leads
  //
  if (Collections.Leads.find().count() < 5) {
    for (var i = 0; i < 50; i++) {
      var currentAgent = agents[Math.floor(Math.random() * agents.length)];
      Collections.Leads.insert({
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          phone: faker.phone.phoneNumberFormat()
        },
        agent: currentAgent._id,
        company: currentAgent.company,
        status: faker.random.arrayElement([ 'fresh', 'open', 'dead', 'closed' ]),
        message: faker.lorem.sentence(),
        purpose: _.sample([ 'Home Loans', 'Auto Loans', 'Personal Loans', 'Financial Advising', 'Wealth Management', 'Education Funding', 'Home Insurance', 'Auto Insurance', 'Life Insurance', 'Health Insurance', 'Long-Term Care Insurance', 'Disability Insurance', 'P&C Insurance' ]),
        date: new Date()
      });
    }
    Logger.info('Created Leads');
  }
}

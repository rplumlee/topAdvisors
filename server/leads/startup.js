import { faker } from 'meteor/digilord:faker';

export default function ({ Collections, Logger }) {
  //
  var agents = Collections.Users.find({ 'profile.type': 'pro' }).fetch();
  //
  // On startup, create sample leads
  //
  if (Collections.Leads.find().count() < 5) {
    for (var i = 0; i < 10; i++) {
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
        purpose: faker.random.arrayElement([ 'Mortgage', 'Business Loan' ]),
        date: new Date()
      });
    }
    Logger.info('Created Leads');
  }
}

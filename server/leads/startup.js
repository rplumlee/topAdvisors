import { Fake } from 'meteor/anti:fake';

export default function ({ Collections, Logger }) {
  //
  var agents = Collections.Users.find({ 'profile.type': 'pro' }).fetch();
  //
  // On startup, create sample leads
  //
  if (Collections.Leads.find().count() < 5) {
    for (var i = 0; i < 10; i++) {
      var profile = Fake.user({ fields: [ 'name', 'surname' ] });
      Collections.Leads.insert({
        profile: {
          firstName: profile.name,
          lastName: profile.surname,
          email: profile.name + '_' + profile.surname + '@topuser.com'
        },
        agent: agents[Math.floor(Math.random() * agents.length)]._id,
        status: Fake.fromArray([ 'fresh', 'open', 'dead', 'closed' ]),
        message: Fake.sentence(5),
        purpose: Fake.fromArray([ 'Mortgage', 'Business Loan' ]),
        date: new Date()
      });
    }
    Logger.info('Created Leads');
  }
}

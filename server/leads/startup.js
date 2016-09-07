import { Fake } from 'meteor/anti:fake';

export default function ({ Collections, Logger }) {
  //
  // On startup, create sample leads
  //
  if (Collections.Leads.find().count() < 5) {
    for (var i = 0; i < 5; i++) {
      var profile = Fake.user({ fields: [ 'name', 'surname' ] });
      Collections.Leads.insert({
        profile: {
          firstName: profile.name,
          lastName: profile.surname
        },
        status: Fake.fromArray([ 'open', 'closed' ]),
        purpose: Fake.fromArray([ 'Mortgage', 'Business Loan' ]),
        date: new Date()
      });
    }
    Logger.info('Create Leads');
  }
}

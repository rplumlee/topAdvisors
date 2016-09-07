import { Fake } from 'meteor/anti:fake';

export default function ({ Collections, Logger }) {
  //
  // On startup, create sample Activities
  //
  if (Collections.Activities.find().count() < 15) {
    for (var i = 0; i < 15; i++) {
      var profile = Fake.user({ fields: [ 'name', 'surname' ] });
      Collections.Activities.insert({
        type: 'viewProfile',
      });
    }
    Logger.info('Create Activities');
  }
}

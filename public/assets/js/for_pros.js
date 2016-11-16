(function ($) {
  $(document).ready(function() {
    $('.new-pro-request-form').submit(function (e) {
      e.preventDefault();
      var newProData = {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        jobTitle: e.target.jobTitle.value,
        employer: e.target.employer.value
      };
      Meteor.call('pros.request', newProData);
    });
  });
}(jQuery));

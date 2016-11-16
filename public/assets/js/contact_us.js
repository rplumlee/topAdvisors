(function ($) {
  $(document).ready(function() {
    $('.contact-form').submit(function (e) {
      e.preventDefault();
      if (!e.target.human.checked) {
        return false;
      }

      var query = {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
      };

      // query.message.replace(/\r\n|\n/g,'<br/>');

      Meteor.call('contact.us', query, function (err, res) {
        if (!err) {
          e.target.name.value = '';
          e.target.email.value = '';
          e.target.message.value = '';
          e.target.human.checked = false;
        }
      });
    });
  });
}(jQuery));

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
        message: e.target.message.value
      };

      $.ajax({
        url: '/contactUs',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(query)
      });

      e.target.name.value = '';
      e.target.email.value = '';
      e.target.message.value = '';
      e.target.human.checked = false;
    });
  });
}(jQuery));

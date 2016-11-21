(function ($) {
  $(document).ready(function() {
    $('.new-pro-request-form').submit(function (e) {
      e.preventDefault();
      var newProData = {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        employer: e.target.employer.value
      };

      $.ajax({
        url: '/proRequest',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(newProData)
      });

      $('.new-pro-request-form').find('input[type=text]').val('');
      $('.new-pro-request-form').find('input[type=email]').val('');
      $('.new-pro-request-form').find('input[type=tel]').val('');
    });
  });
}(jQuery));

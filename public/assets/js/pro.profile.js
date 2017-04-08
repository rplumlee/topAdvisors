
(function ($) {
  $(document).ready(function() {

   $('.contact-pro-form').submit(function(e){
      e.preventDefault();

      var fields = [
        'profile.firstName',
        'profile.lastName',
        'profile.phone',
        'profile.email',
        'message',
        'agent',
        'company',
        'purpose'
      ];
      var jsonData = {};
      fields.forEach(function (field) {
        jsonData[field] = e.target[field].value;
      });
      if (e.target['contact-phone'].checked) {
        jsonData.preferredContact = 'Phone';
      } else if (e.target['contact-email'].checked) {
        jsonData.preferredContact = 'Email';
      }
      $.ajax({
        url: '/createLead',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(jsonData)
      });
      $('#contact-modal-close').click();
      window.sessionStorage.setItem('lead', JSON.stringify(jsonData));
    });

    $('.new-review-form').submit(function(e){
      e.preventDefault();

      var fields = [
        'firstName',
        'description',
        'agent'
      ];

      var jsonData = {};
      fields.forEach(function (field) {
        jsonData[field] = e.target[field].value;
      });
      jsonData.rating = $('.fa-star').length || 0;
      $.ajax({
        url: '/writeReview',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(jsonData)
      });
      $('#review-modal-close').click();
      document.location.reload(true);
    });

  });
}(jQuery));

window.onload = function () {


    var ctx = document.getElementById("chartContainer");
    var labels = [];
    var amount = [];
    for (i = 0; i < window.specialties.length; i++){
        labels.push(window.specialties[i].legendText);
        amount.push(window.specialties[i].y);
    }

    var data = {
        labels: labels,
        datasets: [
            {
                data: amount,
                backgroundColor: [
                    "#36A2EB",
                    "#FF6384",
                    "#FFCE56",
                    "#00BCD4",
                    "#9C27B0"
                ],
                hoverBackgroundColor: [
                    "#36A2EB",
                    "#FF6384",
                    "#FFCE56",
                    "#00BCD4",
                    "#9C27B0"
                ]
            }]
    };

    var myPieChart = new Chart(ctx,{
        type: 'doughnut',
        data: data
    });


    var data = window.sessionStorage.getItem('lead');
    data = data ? JSON.parse(data) : {};
    for (props in data) {
        if (document.getElementById(props)) {
            document.getElementById(props).value = data[props];
        }
    }
}

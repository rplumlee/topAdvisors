
(function ($) {
  $(document).ready(function() {

    // fade in .navbar
    $(function () {
      $(window).scroll(function () {
        // set distance user needs to scroll before we start fadeIn
        if ($(this).scrollTop() > 570) {
          $('.profile-drop').css('top', '0px');
        } else {
          $('.profile-drop').css('top', '-100px');
        }
      });
    });

  });
}(jQuery));

window.onload = function () {
  var chart = new CanvasJS.Chart("chartContainer",
  {
    title: {
      text: ""
    },
    animationEnabled: true,
    legend: {
      verticalAlign: "center",
      horizontalAlign: "right"
    },
    data: [
    {
      indexLabelFontSize: 18,
      indexLabelFontFamily: "Helvetica",
      indexLabelFontColor: "#444444",
      indexLabelLineColor: "#999999",
      indexLabelPlacement: "inside",
      type: "pie",
      showInLegend: true,
      toolTipContent: "<strong>{legendText} - #percent%</strong>",
      dataPoints: [
      {  y: 20, legendText:"Mortgages", color: "#FF6A6A" },
      {  y: 25, legendText:"Small Business Loans", color: "#7095AE" },
      {  y: 55, legendText:"Personal Loans",exploded: true, },

      ]
    }
    ]
  });
  chart.render();
}


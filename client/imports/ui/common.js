var loadMaterialKit = function () {
  // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
  $.material.init();

  window_width = $(window).width();

  // Activate Datepicker
  if($('.datepicker').length != 0){
    $('.datepicker').datepicker({
       weekStart:1
    });
  }

  //    Activate bootstrap-select
  $(".select").dropdown({ "dropdownClass": "dropdown-menu", "optionClass": "" });

  //Activate tags
  if($(".tagsinput").length != 0){
    $(".tagsinput").tagsInput();
  }

  if($('.navbar-color-on-scroll').length != 0){
    $(window).on('scroll', materialKit.checkScrollForTransparentNavbar)
  }

  if (window_width >= 768){
    big_image = $('.page-header[data-parallax="active"]');
    if(big_image.length != 0){
      $(window).on('scroll', materialKitDemo.checkScrollForParallax);
    }
  }
};

module.exports = {
  loadMaterialKit: loadMaterialKit
}

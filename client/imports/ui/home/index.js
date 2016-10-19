import { Template } from 'meteor/templating';
import './home.html';

var loadFilters = function () {

  filterQuestionContainer = $('.filter-question-container').find('.container');
  filterAnswerContainer = $('.filter-answer-container').find('.container');
  modalBody = $('.modal-body');

  //Set all questions in variables.  var[0] is the question, the rest of the array values are the answers
  var filter1 = {
    question: 'Great! Which industry do you need help with?',
    options: ['Financial Planning', 'Insurance', 'Loans'],
    next: ['finance', 'insurance', 'loans'],
    class: 'horizontal',
    icons: ['pie_chart', 'cloud', 'home']
  };

  //Personal or Business
  var loans = {
    question: 'Do you need a loan for you or your business?',
    options: ['Personal', 'Business'],
    next: ['loansPers1', 'loansBusn1'],
    class: 'horizontal'
  };
  var finance = {
    question: 'Do you need personal or business financial services?',
    options: ['Personal', 'Business'],
    next: ['financePers1', 'financeBusn1'],
    class: 'horizontal'
  };
  var insurance = {
    question: 'Do you need insurance for yourself or your business?',
    options: ['Personal', 'Business'],
    next: ['insurancePers1', 'insuranceBusn1'],
    class: 'horizontal'
  };

  //Qualitative
  var finance2 = {
    question: 'What is your approximate risk tolerance?',
    options: ['Low',  'Medium', 'High'],
    next: ['personalInfo', 'personalInfo', 'personalInfo'],
    class: 'vertical'
  };

  //Loans personal
  var loansPers1 = {
    question: 'What do you need a loan for?',
    options: ['Home', 'Auto', 'Other'],
    next: ['loansPers2', 'loansPers2', 'loansPers2'],
    class: 'vertical'
  };
  var loansPers2 = {
    question: 'Approximately how much are you looking to borrow?',
    options: ['$0 - $20,000', '$20,001 - $50,000', '$50,001 - $100,000', '$100,001 - $500,000', '$500,001 +', 'I\'m not sure'],
    next: ['personalInfo', 'personalInfo', 'personalInfo', 'personalInfo', 'personalInfo', 'personalInfo'],
    class: 'vertical'
  };

  //Loans Business
  var loansBusn1 = {
    question: 'What type of business loan do you need?',
    options: ['Basic Commercial Loan', 'Term Commercial Loan', 'Unsecured Commercial Loan', 'Commercial Acquisition Loan', 'I am not sure'],
    next: ['loansBusn2', 'loansBusn2', 'loansBusn2', 'loansBusn2', 'loansBusn2'],
    class: 'vertical'
  };
  var loansBusn2 = {
    question: 'Approximately how much are you looking to borrow?',
    options: ['$10,000 - $500,000', '$500,001 - $1m', '$1m - $10m', '$10m +', 'I\'m not sure'],
    next: ['personalInfo', 'personalInfo', 'personalInfo', 'personalInfo', 'personalInfo'],
    class: 'vertical'
  };

  //Finance Personal
  var financePers1 = {
    question: 'Which kind of personal financial services do you need?',
    options: ['Financial Advising', 'Wealth Management', 'Education Funding', 'Estate Plannning'],
    next: ['financePers2', 'financePers2', 'financePers3', 'financePers4'],
    class: 'vertical'
  };
  var financePers2 = {
    question: 'How much are you looking to invest?',
    options: ['$0 - $20,000', '$20,001 - $50,000', '$50,001 - $100,000', '$100,001 - $500,000', '$500,001 +', 'I\'m not sure'],
    next: ['finance2', 'finance2', 'finance2', 'finance2',  'finance2', 'finance2'],
    class: 'vertical'
  };
  var financePers3 = {
    question: 'How long until the first year of college?',
    options: ['0 - 5 years', '5 - 10 years', '10 - 15 years', '15 + years'],
    next: ['personalInfo', 'personalInfo', 'personalInfo', 'personalInfo'],
    class: 'vertical'
  };
  var financePers4 = {
    question: 'What is the estate\'s approximate net worth?',
    options: ['$0 - $20,000', '$20,001 - $50,000', '$50,001 - $100,000', '$100,001 - $500,000', '$500,001 +', 'I\'m not sure'],
    next: ['personalInfo', 'personalInfo', 'personalInfo', 'personalInfo',  'personalInfo', 'personalInfo'],
    class: 'vertical'
  };

  //Finance Business
  var financeBusn1 = {
    question: 'What type of business financial services do you need?',
    options: ['Tax Planning', 'Employee Benefit Planning', 'Retirement Planning', 'Business Valuation', 'Business Succession Planning', 'Investment Planning', 'I\'m not sure'],
    next: ['financeBusn2', 'financeBusn2', 'financeBusn2', 'financeBusn2',  'financeBusn2', 'financeBusn2', 'financeBusn2', 'financeBusn2', 'financeBusn2'],
    class: 'vertical'
  };
  var financeBusn2 = {
    question: 'How many employees are in the company?',
    options: ['1 - 10', '11 - 50', '51 - 100',  '100 +'],
    next: ['finance2', 'finance2', 'finance2', 'finance2'],
    class: 'vertical'
  };

  //Insurance Personal
  var insurancePers1 = {
    question: 'What type of insurance do you need?',
    options: ['Home', 'Auto', 'Life', 'Health', 'Long-Term Care', 'Disability', 'Property + Casualty', 'I\'m not sure'],
    next: ['insurancePers2', 'insurancePers2', 'insurancePers3', 'insurancePers2',  'insurancePers2', 'insurancePers2', 'insurancePers2', 'insurancePers2'],
    class: 'vertical'
  };
  var insurancePers2 = {
    question: 'Approximately how much coverage do you need?',
    options: ['$0 - $50,000', '$50.001 - $250,000', '$250,001 - $1m', '1m +', 'I\'m not sure'],
    next: ['personalInfo', 'personalInfo', 'personalInfo', 'personalInfo', 'personalInfo', 'personalInfo'],
    class: 'vertical'
  };
  var insurancePers3 = {
    question: 'Do you want term or permanent Insurance?',
    options: ['Term', 'Permanent', 'I\'m not sure'],
    next: ['personalInfo', 'personalInfo', 'personalInfo'],
    class: 'vertical'
  };

  //Insurance Business
  var insuranceBusn1 = {
    question: 'What type of business insurance do you need?',
    options: ['General Liability Insurance', 'Product Liability Insurance', 'Life & Health Insurance', 'Commercial Auto Insurance', 'Worker\'s Compensation Insurance', 'Director\'s and Officer\'s Insurance', 'Data Breach Insurance', 'I\'m not sure'],
    next: ['insuranceBusn2', 'insuranceBusn3', 'insuranceBusn2', 'insuranceBusn3',  'insuranceBusn2', 'insuranceBusn2', 'insuranceBusn2', 'insuranceBusn2', 'insuranceBusn3'],
    class: 'vertical'
  };
  var insuranceBusn2 = {
    question: 'Ok. How many individuals are you purhcasing this policy for?',
    options: ['1 - 10', '11 - 50',  '50 - 100', '100 +', 'I\'m not sure'],
    next: ['insuranceBusn3', 'insuranceBusn3', 'insuranceBusn3', 'insuranceBusn3', 'insuranceBusn3'],
    class: 'vertical'
  };
  var insuranceBusn3 = {
    question: 'Approximately how much coverage do you need??',
    options: ['$0 - $100,000', '$100,001 - $500,000', '$500,001 - $1m', '$1m +', 'I\'m not sure'],
    next: ['personalInfo', 'personalInfo', 'personalInfo', 'personalInfo', 'personalInfo'],
    class: 'vertical'
  };

  var a = 1;
  var arr = [];

  $('#start').click(function(){
    $('#filterModal').modal({
      backdrop: 'static',
      keyboard: false
    });
    nextQuestion(filter1);
  });

  function nextQuestion(question){
    arr.push(a);
    var filterQuestion = $('.filter-question');
    filterQuestionContainer.html('<div class="filter-question" id="'+a+'"><h2 class="filter-top">' + question.question + '</h2><br></div>');
    var i = 0;
    var length = question.options.length;
    filterAnswerContainer.html('');
    while (i < length) {
      filterAnswerContainer.append(
        '<div class="row">' +
        '<div class="col-lg-4 col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3" style="padding:0;">'+
        '<a class="filter-option" href="#" onclick="return false" id="' + question.next[i] + '">'+
        question.options[i]+
        '</a>' +
        '</div>'+
        '</div>')
      i++;
    }

    loadA();
    a++;
  }


  //Load javascript onto new links
  function loadA(){
    filterAnswerContainer.find('.filter-option').click(function(){

      //Check the checkbox
      var filterQuestionId = $(this).parent().parent().parent().attr('id');
      if (filterQuestionId == arr[arr.length-1]) {
        next = $(this).attr('id');
        var value = eval(next);
        nextQuestion(value);
        $(this).parent().addClass('clicked');
      } else{
        $('.filter-question').each(function(){
          var id = $(this).attr('id');

          if (id > filterQuestionId){
            $(this).remove();
          }
        });

        next = $(this).attr('id');
        var value = eval(next);

        if (next == 'personalInfo'){
          personalInfo();
        } else{
          nextQuestion(value);
        }
      }
    });
  }

  var personalInfo = function(){
    var filterQuestion = $('.filter-question');
    filterQuestionContainer.html('<div class="filter-question"><h2 class="filter-top">What is the best contact info to pass on to pros?</h2><br></div>');
    filterAnswerContainer.html(
      '<div class="row" style="margin:0;">'+
      '<div class="col-lg-4 col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 filterPersonal" style="padding:0;">' +
      '<div class="row">'+
      '<div class="col-sm-12">'+
      '<input type="text" class=" form-control input-lg" placeholder="First Name">'+
      '</div>'+
      '<div class="col-sm-12">'+
      '<input type="text" class="form-control input-lg" placeholder="Last Name">'+
      '</div>'+
      '<div class="col-sm-12">'+
      '<input type="text" class="form-control input-lg" placeholder="Phone Number">'+
      '</div>'+
      '<div class="col-sm-12">'+
      '<input type="text" class="form-control input-lg" placeholder="Email">'+
      '</div>'+
      '<div class="col-sm-12">'+
      '<a class="btn btn-lg btn-primary" id="giveResults"><i class="material-icons">search</i> Match Now</a>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</div>'
      );


    $('#giveResults').click(function(){
      filterQuestionContainer.html('');
      filterQuestionContainer.parent().css('padding', '0');
      filterQuestionContainer.parent().css('min-height', '0');
      filterQuestionContainer.parent().css('height', '0');

      filterAnswerContainer.html('<h2 style="font-weight:300;">Finding the top professionals in your area..</h2><h1><i class="fa fa-spin fa-circle-o-notch"></i></h1>')

      setTimeout(function(){
        filterAnswerContainer.html('');
        i=0;
        while(i < 10){
          filterAnswerContainer.append(

            '<div class="row results-card">'+
            '<a class="toProfile" href="./profile.html">' +
            '</a>' +
            '<div class="result">'+
            '<div class="row profile-short" style="margin:0;">'+
            '<div class="col-sm-2 col-xs-3">'+
            ' <img src="assets/img/faces/marc.jpg" class="img-circle img-responsive">'+
            '</div>'+
            '<div class="col-sm-10 col-xs-9">'+
            '<div class="row">' +
            '<div class="col-sm-4">'+
            '<h3 class="name">Jacob Palmer, <span class="designation">CPA</span></h3>'+
            '<div class="rating">'+
            '<i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_half_empty</i>'+
            '</div>'+
            '<div class="contact">'+
            ' <a class="btn btn-primary">'+
            '   Contact Jacob'+
            '</a>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>' +

            '</div>'

            );
          i++;
        }

      }, 1500);
    });
  }

  $('#filterModal').on('hide', function () {
    arr = [];
    a = 1;
  });

  $('#filterModal').on('hidden.bs.modal', function (e) {
    filterQuestionContainer.parent().css('padding', '30px 30px 0 30px');
    filterQuestionContainer.parent().css('min-height', '200px');
    filterQuestionContainer.parent().css('height', '200px');
  });
};

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

  // Activate Popovers
  $('[data-toggle="popover"]').popover();

  // Active Carousel
  $('.carousel').carousel({
    interval: 400000
  });

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

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};


function isElementInViewport(elem) {
  var $elem = $(elem);

  // Get the scroll position of the page.
  var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
  var viewportTop = $(scrollElem).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  // Get the position of the element on the page.
  var elemTop = Math.round( $elem.offset().top );
  var elemBottom = elemTop + $elem.height();

  return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}


Template.myHome.helpers({
  copyrightDate: function () {
    return new Date().getFullYear();
  }
});

Template.myHome.onRendered(function bodyOnRendered() {
  $(document).ready(function () {

    loadFilters();

    loadMaterialKit();
  });

});

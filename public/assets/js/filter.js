function saveField(field) {
  if (field) {
    var data = window.sessionStorage.getItem('lead');
    data = data ? JSON.parse(data) : {};
    data.purpose = field;
    window.sessionStorage.setItem('lead', JSON.stringify(data));
  }
}

$( document ).ready(function() {

  var input = document.getElementById('home_address');
  var options = {
    types: ['(cities)'],
    componentRestrictions: {country: 'us'}
  };

  autocomplete = new google.maps.places.Autocomplete(input, options);

  filterQuestionContainer = $('.filter-question-container').find('.container');
  filterAnswerContainer = $('.filter-answer-container').find('.container');
  modalBody = $('.modal-body');
  //Set all questions in variables.  var[0] is the question, the rest of the array values are the answers
  var zip = {
    question: 'Great! Which industry do you need help with?',
    options: ['Financial Planning', 'Insurance', 'Loans'],
    next: ['finance', 'insurance', 'loans'],
    class: 'horizontal',
    icons: ['pie_chart', 'cloud', 'home']
  };

  var filter1 = {
    question: 'In which industry do you need financial assistance?',
    options: ['Financial Planning', 'Insurance', 'Loans'],
    next: ['finance', 'insurance', 'loans'],
    class: 'horizontal',
    icons: ['trending_up', 'beach_access', 'account_balance']
  };

  //Personal or Business
  var loans = {
    question: 'Do you need a loan for you or your business?',
    options: ['Personal', 'Business'],
    next: ['loansPers1', 'loansBusn1'],
    class: 'horizontal',
    icons: ['accessibility', 'store']
  };
  var finance = {
    question: 'Do you need personal or business financial services?',
    options: ['Personal', 'Business'],
    next: ['financePers1', 'financeBusn1'],
    class: 'horizontal',
    icons: ['accessibility', 'store']
  };
  var insurance = {
    question: 'Do you need insurance for yourself or your business?',
    options: ['Personal', 'Business'],
    next: ['insurancePers1', 'insuranceBusn1'],
    class: 'horizontal',
    icons: ['accessibility', 'store']
  };


  //Qualitative

  var finance2 = {
    question: 'What is your approximate risk tolerance?',
    options: ['Low',  'Medium', 'High'],
    next: ['personalInfo', 'personalInfo', 'personalInfo'],
    class: 'vertical',
    icons: ['trending_down', 'trending_flat', 'trending_up']
  };


  //Loans personal
  var loansPers1 = {
    question: 'What do you need a loan for?',
    options: ['Home', 'Auto', 'Other'],
    values: ['Home Loans', 'Auto Loans', 'Other'],
    next: ['loansPers2', 'loansPers2', 'loansPers2'],
    keyword: 'purpose',
    class: 'vertical',
    icons: ['home', 'directions_car', 'help']
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
    options: ['Basic Commercial Loan', 'Term Commercial Loan', 'Unsecured Commercial Loan', 'Commercial Acquisition Loan', 'I\'m not sure'],
    values: ['Basic Commercial Loans', 'Term Commercial Loans', 'Unsecured Commercial Loans', 'Commercial Acquisition Loans', 'I\'m not sure'],
    next: ['loansBusn2', 'loansBusn2', 'loansBusn2', 'loansBusn2', 'loansBusn2'],
    keyword: 'purpose',
    class: 'vertical',
    icons: ['account_balance', 'store', 'visibility_off', 'flight_takeoff', 'help']
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
    options: ['Financial Advising', 'Wealth Management', 'Education Funding', 'Estate Planning', 'I\'m not sure'],
    values: ['Financial Advising', 'Wealth Management', 'Education Funding', 'Estate Planning', 'I\'m not sure'],
    next: ['financePers2', 'financePers2', 'financePers3', 'financePers4'],
    keyword: 'purpose',
    class: 'vertical',
    icons: ['trending_up', 'attach_money', 'school', 'domain', 'help']
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
    options: ['Tax Planning', 'Employee Benefit Planning', 'Employee Retirement Planning', 'Business Valuation', 'Business Succession Planning', 'Investment Planning', 'I\'m not sure'],
    values: ['Tax Planning', 'Employee Benefit Planning', 'Retirement Planning', 'Business Valuation', 'Business Succession Planning', 'Investment Planning', 'I\'m not sure'],
    next: ['financeBusn2', 'financeBusn2', 'financeBusn2', 'financeBusn2',  'financeBusn2', 'financeBusn2', 'financeBusn2', 'financeBusn2', 'financeBusn2'],
    keyword: 'purpose',
    class: 'vertical',
    icons: ['create_new_folder', 'face', 'trending_up', 'store', 'shuffle', 'pie_chart', 'help']
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
    values: ['Home Insurance', 'Auto Insurance', 'Life Insurance', 'Health Insurance', 'Long-Term Care Insurance', 'Disability Insurance', 'P&C Insurance', 'I\'m not sure'],
    next: ['insurancePers2', 'insurancePers2', 'insurancePers3', 'insurancePers2',  'insurancePers2', 'insurancePers2', 'insurancePers2', 'insurancePers2'],
    keyword: 'purpose',
    class: 'vertical',
    icons: ['home', 'directions_car', 'face', 'favorite', 'touch_app', 'accessible', 'store', 'help']
  };
  var insurancePers2 = {
    question: 'Approximately how much coverage do you need?',
    options: ['$0 - $50,000', '$50,001 - $250,000', '$250,001 - $1m', '1m +', 'I\'m not sure'],
    next: ['personalInfo', 'personalInfo', 'personalInfo', 'personalInfo', 'personalInfo', 'personalInfo'],
    class: 'vertical'
  };
  var insurancePers3 = {
    question: 'Do you want term or permanent Insurance?',
    options: ['Term', 'Permanent', 'I\'m not sure'],
    next: ['personalInfo', 'personalInfo', 'personalInfo'],
    class: 'vertical',
    icons: ['alarm', 'autorenew', 'help']
  };


  //Insurance Business
  var insuranceBusn1 = {
    question: 'What type of business insurance do you need?',
    options: ['General Liability Insurance', 'Product Liability Insurance', 'Life & Health Insurance', 'Commercial Auto Insurance', 'Worker\'s Comp Insurance', 'Director\'s and Officer\'s Insurance', 'Data Breach Insurance', 'I\'m not sure'],
    values: ['General Liability Insurance', 'Product Liability Insurance', 'Life & Health Insurance', 'Commercial Auto Insurance', 'Workers Compensation Insurance', 'Directors and Officers Insurance', 'Data Breach Insurance', 'I\'m not sure'],    next: ['insuranceBusn2', 'insuranceBusn3', 'insuranceBusn2', 'insuranceBusn3',  'insuranceBusn2', 'insuranceBusn2', 'insuranceBusn2', 'insuranceBusn2', 'insuranceBusn3'],
    keyword: 'purpose',
    class: 'vertical',
    icons: ['domain', 'loyalty', 'favorite', 'directions_car', 'people', 'face', 'laptop', 'help']
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



  $('#start').click(function(e) {
    e.preventDefault();
    if (!document.getElementById('home_address').value || document.getElementById('home_address').value == '') {
      return;
    }
    $('#filterModal').modal({
      backdrop: 'static',
      keyboard: false
    });
    nextQuestion(filter1);
  });

  var location = {};
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    var place = autocomplete.getPlace();
    var base = {};
    place.address_components.forEach(function (each) {
      base[each.types[0]] = { long: each.long_name, short: each.short_name };
    });
    location.city = base.locality.long;
    location.state = base.administrative_area_level_1.short;
    window.geoLocation = false;
  });


  function nextQuestion (question) {
    arr.push(a);
    var filterQuestion = $('.filter-question');

    filterQuestionContainer.html('<div class="filter-question" id="'+a+'"><h2 class="filter-top">' + question.question + '</h2><br></div>');
    var i = 0;
    var length = question.options.length;
    filterAnswerContainer.html('');
    $('#filterModal').scrollTop(0);
    if (question.icons){
      filterAnswerContainer.append('<div class="row"><div class="col-xs-12">');
      while (i < length) {
        var methodParams = question.keyword ? question.values[i] : '';
        filterAnswerContainer.append(
          '<a class="filter-option-icon" href="#" onclick="saveField(\''+methodParams+'\')" id="' + question.next[i] + '"><i class="material-icons">'+question.icons[i]+'</i>'+
          question.options[i]+
          '</a>' )

        i++;
      }
      filterAnswerContainer.append('</div></div>');
    } else {
      while (i < length) {
        var methodParams = question.keyword ? question.values[i] : '';
        filterAnswerContainer.append(
          '<div class="row">' +
          '<div class="col-lg-6 col-md-8 col-md-offset-2 col-sm-12 col-lg-offset-3" style="padding:0;">'+
          '<a class="filter-option" href="#" onclick="saveField(\''+methodParams+'\')" id="' + question.next[i] + '">'+
          question.options[i]+
          '</a>' +
          '</div>'+
          '</div>')
        i++;
      }
    }

    loadA();

    a++;

  }


  //Load javascript onto new links
  function loadA() {

    filterAnswerContainer.find('a').click(function(){

      //Check the checkbox
      var filterQuestionId = $(this).parent().parent().parent().attr('id');
      if (filterQuestionId == arr[arr.length-1]) {
        next = $(this).attr('id');
        var value = eval(next);
        nextQuestion(value);
        $(this).parent().addClass('clicked');
      }
      else{
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
        }
        else{
          nextQuestion(value);
        }
      }
    });
  }

  $('.seemore').click(function (event) {
    window.sessionStorage.setItem('lead', JSON.stringify({ purpose: event.target.dataset.id }));
    $('#filterModal').modal({
      backdrop: 'static',
      keyboard: false
    });
    personalInfo();
  });


  var personalInfo = function () {
    $('#filterModal').scrollTop(0);
    var filterQuestion = $('.filter-question');
    filterQuestionContainer.html('<div class="filter-question"><h3 >Some information to be passed on to ONLY professionals of your choosing. We respect your Privacy. </h3><br></div>');
    filterAnswerContainer.html(
      '<form class="new-lead-form">'+
      '<div class="row" style="margin:0;">'+
      '<div class="col-lg-6 col-lg-offset-3 col-sm-8 col-sm-offset-2 filterPersonal" style="padding:0;">' +
      '<div class="row">'+
      '<div class="col-sm-12">'+
      '<input type="text" name="profile.firstName" class=" form-control input-lg" required placeholder="First Name">'+
      '</div>'+
      '<div class="col-sm-12">'+
      '<input type="text" name="profile.lastName"  class="form-control input-lg" required placeholder="Last Name">'+
      '</div>'+
      '<div class="col-sm-12">'+
      '<input type="tel" name="profile.phone" class="form-control input-lg" required placeholder="Phone Number">'+
      '</div>'+
      '<div class="col-sm-12">'+
      '<input type="email" name="profile.email" class="form-control input-lg" required placeholder="Email">'+
      '</div>'+
      '<div class="col-sm-12">'+
      '<button type="submit" class="btn btn-lg btn-primary" id="giveResults"><i class="material-icons">search</i> Match Now</button>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</form>'
    );


    $('.new-lead-form').submit(function(e) {
      $('#filterModal').scrollTop(0);
      e.preventDefault();
      var fields = [
        'profile.firstName',
        'profile.lastName',
        'profile.phone',
        'profile.email'
      ];

      // Get the lead data from session storage
      var data = window.sessionStorage.getItem('lead');
      data =  data ? JSON.parse(data) : {};

      fields.forEach(function (field) {
        data[field] = e.target[field].value;
      });
      // Store the lead details in session storage
      window.sessionStorage.setItem('lead', JSON.stringify(data));

      filterQuestionContainer.html('');
      filterQuestionContainer.parent().css('padding', '0');
      filterQuestionContainer.parent().css('min-height', '0');
      filterQuestionContainer.parent().css('height', '60px');

      filterAnswerContainer.html('<h2 style="font-weight:300;">Finding the top professionals in your area..</h2><h1><i class="fa fa-spin text-info fa-circle-o-notch"></i></h1>')

      if (window.geoLocation) {
        location = window.geoLocation;
      }

      $.get( "/getPros?purpose="+data.purpose+"&city="+location.city+"&state="+location.state, function (prosData) {
        filterAnswerContainer.html('');
        if (prosData.length > 0) {
          prosData.forEach(function (pro) {
            var image = pro.profile.image || '/assets/img/samplePro.png';
            var reviews = '';
            var stars = parseInt(pro.review);
            var halfStars = pro.review - stars;
            var leftStars = 5 - stars - (halfStars*2);
            for (var i=0; i<stars; i++) {
              reviews += '<i class="material-icons text-warning">star</i>';
            }
            for (var i=0; i<halfStars; i++) {
              reviews += '<i class="material-icons text-warning">star_half</i>';
            }
            for (var i=0; i<leftStars; i++) {
              reviews += '<i class="material-icons text-warning">star_border</i>';
            }

            filterAnswerContainer.append(
              '<div class="row result">'+
              '<a href="/profile/'+pro.profile.slug+'"></a>' +
              '<div class="result-inner">'+
              '<div class="row result-margin">'+
              '<div class="col-sm-9 clearfix">'+
              '<div class="col-sm-3 col-xs-6 col-xs-offset-3 col-sm-offset-0">'+
              ' <img src="'+ image +'" class="img-circle img-responsive result-image">'+
              '</div>'+
              '<div class="col-sm-9 col-xs-12 col-md-8">'+
              '<h3 class="result-name"><a href="/profile/'+pro.profile.slug+'">'+pro.profile.firstName+' '+pro.profile.lastName+'<span class="designation">'+pro.designation+'</span></a></h3>'+
              '<div class="result-rating">'+
              '<div>'+
              reviews +
              '</div>'+
              '</div>'+
              '<h6 class="contact" style="font-weight:500;">'+
              pro.profile.jobTitle+' of '+pro.address.city+
              '</h6>'+
              '<h6 style="margin-top:5px;"><i class="material-icons hidden-xs" style="vertical-align:middle;margin-top:-5px;margin-right:5px;">verified_user</i>'+pro.professionalExperience+' Experience'+
              '</div>'+
              '</div>'+
              '<div class="col-sm-3 result-highlights">'+
              '<h5 class="text-center results-place"><i class="material-icons hidden-sm hidden-md hidden-lg" style="vertical-align:middle;margin-top:-5px;margin-right:5px;">pin_drop</i><i class="text-info fa-2x material-icons hidden-xs">person_pin_circle</i><br class="hidden-xs">'+pro.address.city+', '+pro.address.state+'</h5>'+
              '</div>'+
              '</div>'+
              '</div>' +
              '</div>'
            );
          })
        } else {
          filterAnswerContainer.append('<div class="row result"><h2 class="text-center">No Search Results</h2></div>');
        }
      });

      $(".result").click(function() {
        window.location = $(this).find("a").attr("href");
        return false;
      });

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

});

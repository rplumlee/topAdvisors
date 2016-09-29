$( document ).ready(function() {

	filterContainer = $('.filterContainer');
	modalBody = $('.modal-body');
	//Set all questions in variables.  var[0] is the question, the rest of the array values are the answers
	var filter1 = {
		question: 'Great! Which industry do you need help with?',
		options: ['Financial Planning',	'Insurance', 'Loans'],
		next: ['finance', 'insurance', 'loans'],
		class: 'horizontal',
		icons: ['pie_chart', 'cloud', 'home']
	};

	//Personal or Business
	var loans = {
		question: 'What type of loan do you need?',
		options: ['Personal', 'Business'],
		next: ['loansPers1', 'loansBusn1'],
		class: 'horizontal'
	};
	var finance = {
		question: 'What type of financial services do you need?',
		options: ['Personal', 'Business'],
		next: ['financePers1', 'financeBusn1'],
		class: 'horizontal'
	};
	var insurance = {
		question: 'What type of insurance do you need?',
		options: ['Personal', 'Business'],
		next: ['insurancePers1', 'insuranceBusn1'],
		class: 'horizontal'
	};


	//Qualitative
	var loans2 = {
		question: 'It is most important that my broker..',
		options: ['Shops around to get me the best rate', 'Gets me a loan ASAP', 'Takes the time to educate me'],
		next: ['personalInfo', 'personalInfo', 'personalInfo'],
		class: 'vertical'
	};
	var finance2 = {
		question: 'It is most important that my broker..',
		options: ['Grows my portfolio',	'Doesn\'t risk my money', 'Will allow me to have an active role in the management'],
		next: ['personalInfo', 'personalInfo', 'personalInfo'],
		class: 'vertical'
	};
	var insurance2 = {
		question: 'It is most important that my broker..',
		options: ['It is most important that my broker..', 'Shops around to get me the best rate', 'Gets me a loan ASAP', 'Takes the time to educate me'],
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
		question: 'How much are you looking to borrow?',
		options: ['$0 - $20,000', '$20,001 - $50,000', '$50,001 - $100,000', '$100,001 - $500,000', '$500,001 +'],
		next: ['loans2', 'loans2', 'loans2', 'loans2', 'loans2'],
		class: 'vertical'
	};


	//Loans Business
	var loansBusn1 = {
		question: 'What type of loan do you need?',
		options: ['Basic Commercial Loan', 'Term Commercial Loan', 'Unsecured Commercial Loan', 'Commercial Acquisition Loan', 'I am not sure'],
		next: ['loansBusn2', 'loansBusn2', 'loansBusn2', 'loansBusn2', 'loansBusn2'],
		class: 'vertical'
	};
	var loansBusn2 = {
		question: 'How much are you looking to borrow?',
		options: ['$10,000 - $500,000', '$500,001 - $1m', '$1m - $10m', '$10m +'],
		next: ['loans2', 'loans2', 'loans2', 'loans2'],
		class: 'vertical'
	};


	//Finance Personal
	var financePers1 = {
		question: 'Which of these best fits your needs?',
		options: ['Financial Advising',	'Wealth Management', 'Education Funding', 'Estate Plannning'],
		next: ['financePers2', 'financePers2', 'financePers3', 'financePers4'],
		class: 'vertical'
	};
	var financePers2 = {
		question: 'How much are you looking to invest?',
		options: ['$0 - $20,000', '$20,001 - $50,000', '$50,001 - $100,000', '$100,001 - $500,000', '$500,001 +'],
		next: ['finance2', 'finance2', 'finance2', 'finance2',	'finance2'],
		class: 'vertical'
	};
	var financePers3 = {
		question: 'How long until the first year of college?',
		options: ['0 - 5 years', '5 - 10 years', '10 - 15 years', '15 + years'],
		next: ['finance2', 'finance2', 'finance2', 'finance2'],
		class: 'vertical'
	};
	var financePers4 = {
		question: 'What is the estate\'s approximate net worth?',
		options: ['$0 - $20,000', '$20,001 - $50,000', '$50,001 - $100,000', '$100,001 - $500,000', '$500,001 +'],
		next: ['finance2', 'finance2', 'finance2', 'finance2',	'finance2'],
		class: 'vertical'
	};


	//Finance Business
	var financeBusn1 = {
		question: 'What type of business financial services do you need?',
		options: ['Tax Planning', 'Employee Benefit Planning', 'Retirement Planning', 'Business Valuation', 'Business Succession Planning', 'Investment Planning', 'I\'m not sure'],
		next: ['financeBusn2', 'financeBusn2', 'financeBusn2', 'financeBusn2',	'financeBusn2', 'financeBusn2',	'financeBusn2', 'financeBusn2', 'financeBusn2'],
		class: 'vertical'
	};
	var financeBusn2 = {
		question: 'How many employees are in the company?',
		options: ['1 - 10',	'11 - 50', '51 - 100',	'100 +'],
		next: ['finance2', 'finance2', 'finance2', 'finance2'],
		class: 'vertical'
	};


	//Insurance Personal
	var insurancePers1 = {
		question: 'What type of insurance do you need?',
		options: ['Home', 'Auto', 'Life', 'Health',	'Long-Term Care', 'Disability',	'Property + Casualty', 'I\'m not sure'],
		next: ['insurancePers2', 'insurancePers2', 'insurancePers3', 'insurancePers2',	'insurancePers2', 'insurancePers2',	'insurancePers2', 'insurancePers2'],
		class: 'vertical'
	};
	var insurancePers2 = {
		question: 'How much coverage do you need?',
		options: ['$0 - $50,000', '$50.001 - $250,000',	'$250,001 - $1m', '1m +'],
		next: ['insurance2', 'insurance2', 'insurance2', 'insurance2'],
		class: 'vertical'
	};
	var insurancePers3 = {
		question: 'What type of Insurance do you need?',
		options: ['Term', 'Perm', 'I\'m not sure'],
		next: ['insurance2', 'insurance2', 'insurance2'],
		class: 'vertical'
	};


	//Insurance Business
	var insuranceBusn1 = {
		question: 'What type of insurance do you need?',
		options: ['General Liability Insurance', 'Product Liability Insurance',	'Life & Health Insurance', 'Commercial Auto Insurance',	'Worker\'s Compensation Insurance',	'Director\'s and Officer\'s Insurance',	'Data Breach Insurance', 'I\'m not sure'],
		next: ['insuranceBusn2', 'insuranceBusn3', 'insuranceBusn2', 'insuranceBusn3',	'insuranceBusn2', 'insuranceBusn2',	'insuranceBusn2', 'insuranceBusn2', 'insuranceBusn3'],
		class: 'vertical'
	};

	var insuranceBusn2 = {
		question: 'How many individuals are you purhcasing this policy for?',
		options: ['1 - 10',	'11 - 50',	'50 - 100',	'100 +'],
		next: ['insuranceBusn3', 'insuranceBusn3', 'insuranceBusn3', 'insuranceBusn3'],
		class: 'vertical'
	};

	var insuranceBusn3 = {
		question: 'How much coverage are you looking for?',
		options: ['$0 - $100,000', '$100,001 - $500,000', '$500,001 - $1m', '$1m +'],
		next: ['personalInfo', 'personalInfo', 'personalInfo', 'personalInfo'],
		class: 'vertical'
	};

	var a = 1;
	var arr = [];

	function nextQuestion(question){

		arr.push(a);

		var filterQuestion = $('.filter-question');

			filterContainer.append('<div class="filter-question" id="'+a+'"><h2>' + question.question + '</h2><br>');
			var i = 0;
			var length = question.options.length;
			while (i < length) {
				filterContainer.find('.filter-question').last().append('<div class="horizontal"><a href="#" onclick="return false" id="' + question.next[i] + '"><span>' + question.options[i] + '</span></a></div>')
				i++;
			}



		filterContainer.append('</div>');
		loadA();
		console.log(arr);
		a++;

		modalBody.animate({scrollTop: modalBody[0].scrollHeight}, '800');

		setTimeout(function() { if(filterQuestion){
			filterQuestion.css('opacity', ('.4'));
		} }, 100);

	}

	function loadA(){
		filterContainer.find('.filter-question').last().find('a').click(function(){
			var parent = $(this).parent().parent();
			var filterQuestionId = parent.attr('id');
			if (filterQuestionId == arr[arr.length-1]) {
				next = $(this).attr('id');
				var value = eval(next);
				nextQuestion(value);
				$(this).parent().addClass('clicked');
			}
			else{
				$('.filter-question').each(function(){
					var id = $(this).attr('id');
					console.log(id);
					if (id > filterQuestionId){
						$(this).remove();
					}
				});

				next = $(this).attr('id');
				var value = eval(next);
				nextQuestion(value);
				$(this).parent().siblings().removeClass('clicked');
				$(this).parent().addClass('clicked');
				}
		}

		);


	}

	$('.modal-body').scroll(function() {
		var questions =  $('.filter-question');

		questions.each(function(){
			var scroll = $('.modal-body').scrollTop();
			var one = $(this).position().top;
			var count = 0;
			if (scroll - 3 < one) {
				var newCount = count + 1;
				if (newCount === 1) {
					$(this).css('opacity', '1');
				}
			}
		})

	});

	$('#start').click(function(){
		$('#filterModal').modal({
			backdrop: 'static',
			keyboard: false
		});
		nextQuestion(filter1);
	});

	$('#filterModal').on('hidden.bs.modal', function (e) {
		filterContainer.html('');
		arr = [];
		a = 1;
	})



});
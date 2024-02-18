console.log("----- wpq-auto-fill.js running -----");


function favorZerosAndOnes() {
	// Define the probabilities for each number (0, 1, 2, 3)
	const probabilities = [0.55, 0.20, 0.15, 0.10];

	// Generate a random number between 0 and 1
	const randomValue = Math.random();

	// Initialize a cumulative probability variable
	let cumulativeProbability = 0;

	// Check the random value against the cumulative probabilities
	for (let i = 0; i < probabilities.length; i++) {
		cumulativeProbability += probabilities[i];

		if (randomValue < cumulativeProbability) {
			return i; // Return the selected number
		}
	}

	return probabilities.length - 1; // Fallback, should not happen
}


// answer all the questions on the page
function answerQuestions() {
	console.log("Answering questions: ");
	$('#jsonFormQuestions .form-group').each(function (index) {

		// pick a random answer
		let rBtn = favorZerosAndOnes() + 1;
		console.log("   Picked: "+rBtn);
		$('.radio:nth-of-type('+rBtn+') input', this).prop("checked", true);
		// use angular's triggerHandler function to call the change
		angular.element($('.radio:nth-of-type('+rBtn+') input', this)).triggerHandler('click');


		/*
		if (index % 2 == 0) {
			// pick first radio btn
			$('.radio:nth-of-type(1) input', this).prop("checked", true);
			// use angular's triggerHandler function to call the change
			angular.element($('.radio:nth-of-type(1) input', this)).triggerHandler('click');
		}
		else {
			// pick second radio btn
			$('.radio:nth-of-type(2) input', this).prop("checked", true);
			// use angular's triggerHandler function to call the change
			angular.element($('.radio:nth-of-type(2) input', this)).triggerHandler('click');
		}
		*/
	});
	console.log("Done answering questions");

	// click next/submit
	clickNext();

}


// check for errors
function checkForSubmitErrors() {
	if ($("#jsonFormSubmit .submit-json-form-error-msg").is(":visible")) {
		console.log("Submit error, back to answering questions");

		// answer more questions
		answerQuestions();
	}
}


// wait to answer questions until spinner is gone
function waitSubmitCompletion(p_finalSubmit) {
	if ($("span.glyphicon-refresh-animate").is(":visible")) {
		console.log("spinner present");
		// wait
		setTimeout(() => {
			waitSubmitCompletion(false);
		}, 500);
	}
	else {
		console.log("spinner gone");
		// answer more questions if not final submit otherwise check for errors
		if (p_finalSubmit) {
			checkForSubmitErrors();
		}
		else {
			answerQuestions();
		}

	}
}


// click next/submit
function clickNext() {
	
	// click the next btn if present
	if ($("#jsonFormSubmit .btn-primary>span.glyphicon-chevron-right").is(":visible")) {
		console.log("Clicking Next");

		// click next, then call answerQuestions
		$("#jsonFormSubmit .btn-primary>span.glyphicon-chevron-right").trigger( "click" );

		// wait for submit to complete then answer more questions
		waitSubmitCompletion(false);

	}
	else if ($("#jsonFormSubmit .btn-primary:contains('Submit')").is(":visible")) {
		console.log("Clicking Submit (English)");

		// click submit
		$("#jsonFormSubmit .btn-primary:contains('Submit')").trigger( "click" );

		// wait for submit to complete then check for errors
		waitSubmitCompletion(true);
	}
	else if ($("#jsonFormSubmit .btn-primary:contains('Enviar')").is(":visible")) {
		console.log("Clicking Submit (Spanish)");

		// click submit
		$("#jsonFormSubmit .btn-primary:contains('Enviar')").trigger( "click" );

		// wait for submit to complete then check for errors
		waitSubmitCompletion(true);
	}
	else if ($("#jsonFormSubmit .btn-primary:contains('Soumettre')").is(":visible")) {
		console.log("Clicking Submit (French)");

		// click submit
		$("#jsonFormSubmit .btn-primary:contains('Soumettre')").trigger( "click" );

		// wait for submit to complete then check for errors
		waitSubmitCompletion(true);
	}
	else {
		console.log("expected btns not present, waiting to try again");
		// wait
		setTimeout(() => {
			clickNext();
		}, 500);
	}
	
}


// Look for the direct link speed bump 'Next' button
if ($(".direct-link-speed-bump .btn-primary>span.glyphicon-chevron-right").is(":visible")) {
	// click it
	$(".direct-link-speed-bump .btn-primary>span.glyphicon-chevron-right").trigger( "click" );
	// wait for submit to complete then start answering questions
	waitSubmitCompletion(false);
}
else {
	// kick it all off
	answerQuestions();
}




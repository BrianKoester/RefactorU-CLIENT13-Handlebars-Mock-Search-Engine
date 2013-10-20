//***************
// CLIENT SIDE JS
//***************

$(function(){

	console.log("READY!")

	// compile Handlebars file
	var source = $("#search-results-template").html();
    var searchTemplate = Handlebars.compile(source);
    $results = $('#results')


    // execute code when 'submit' button is clicked
    // or 'return' key is pressed
	$("#search-form").submit(function(e){
		e.preventDefault()

		// accept user input value and create an object
		// to prepare for Ajax request
		var inputValue = $('#search').val();
	    var data = {searchKey: inputValue};

		// make an Ajax 'get' request
		$.get('/search', data, function(foundValue){
			// move search result to 'results' div in html-index.jade
			// using hbfoundValue (as an object required by handelbars)
			// in handlebars-template.html
			$results.html(searchTemplate({hbFoundValue: foundValue}));
			
		});

	});

}); 
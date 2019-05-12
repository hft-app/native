// Course selector
$('.subjects .item').map(item => {
	
	// Main input state observer
	const observe = () => {
		
		// Test if all sub inputs are checked or not checked
		let checked = true;
		let unchecked = true;
		$('.courses input', item).map(test => test.checked ? unchecked = false : checked = false);
		
		// Set main input state
		$('.header input', item).map(main => {
			main.indeterminate = false;
			if(unchecked) main.checked = false;
			else {
				main.checked = true;
				if(!checked) main.indeterminate = true;
			}
		});
	}
	
	// Setup initial state
	observe();

	// Sub input change handler
	$('.courses input', item).on('change', observe);
	
	// Main input change handler
	$('.header input', item).on('change', function(){
		$('.courses input', item).map(input => input.checked = this.checked);
	});
	
	// Open/close sub menu
	$('.header a', item).on('click', () => item.classList.toggle('active'));
});

// Save course selection
$('nav .save').on('click', function(){
	this.classList.add('active');
	document.forms[0].submit();
}, {once: true});

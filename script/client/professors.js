// Filter professors
$('nav input.search').on('keyup', function(){
	let pattern = new RegExp(this.value, 'i');
	let visible = 0;
	document.querySelectorAll('.list .professor').forEach(professor => {
		let matching = professor.querySelector('.title').innerHTML.match(pattern);
		professor.classList.toggle('hidden', !matching);
		if(matching) visible++;
	});
});

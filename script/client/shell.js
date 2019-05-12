// Prevent header, footer and nav from putting the scroll focus on the body
$('header, footer, nav').on('touchmove', e => e.preventDefault());

// Prevent the wrapper from scrolling to the limit and bubbling to the body
$('.wrapper').on('touchstart', function(){
	if(this.scrollTop <= 0) this.scrollTop = 1;
	if(this.scrollTop >= this.scrollHeight - this.clientHeight) this.scrollTop = this.scrollHeight - this.clientHeight - 1;
});

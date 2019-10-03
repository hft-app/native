class Events {
	constructor(handler) {
		this.handler = handler;
	}
	
	// Check whether an event is upcoming
	isUpcoming(event) {
		return event.end >= this.handler.today || event.start >= this.handler.today;
	}
	
	// Add event range (from - to)
	addRange(event) {
		if(event.start <= this.handler.today) event.range = event.end ? 'Aktuell' : 'Heute';
		else event.range = Elements.render('{{j}}. [[date.F.{{n}}]]', event.start);
		if(event.end) event.range+= ' – '+Elements.render('{{j}}. [[date.F.{{n}}]]', event.end);
		return event;
	}
	
	// List events
	async process() {
		const events = await IDB.events.all(this.isUpcoming.bind(this));
		this.events = events.map(this.addRange.bind(this));
	}
}
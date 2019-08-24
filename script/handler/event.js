class EventHandler {
	
	// Construct with controller
	constructor(controller) {
		this.controller = controller;
	}
	
	// URL pattern
	get pattern() {
		return /^\/event\/(\d+)?$/;
	}
	
	// Process request
	async process(request) {
		const event = await IDB.events.get(request.params[1]);
		if(event) {
			
			// Flatten title and description
			event.title = event.title.map(title => title.replace(/[:;,]/g, '\\$&')).join('\\n');
			event.description = event.description.map(description => description.replace(/[:;,]/g, '\\$&')).join('\\n');

			// Load template
			const template = await this.controller.fetch('template/event.ics').then(response => response.text());		
			
			// Collect data
			const data = Elements.render(template, {
				summary: event.title || event.description,
				description: event.title && event.description ? event.description : null,
				dtstart: event.start,
				dtend: event.end || event.start,
				now: new Date(),
				id: event.id,
			});
			
			// Return response
			return new Response(data, {
				status: 200,
				statusText: 'OK',
				headers: {
					'Content-Disposition': 'inline; filename=event.ics',
					'Content-Type': 'text/calendar; charset=utf-8',
				}
			});
		}
	}
}
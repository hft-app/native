class LaunchHandler {

	constructor(controller) {
		this.controller = controller;
	}
	
	get pattern() {
		return /\/launch\/?$/;
	}
	
	async process() {
		
		// Check login
		const device = await IDB.server.get('device');
		if(!device) return Response.redirect('/login');
		
		// Redirect to last visited page or messages
		const page = await IDB.server.get('page') || 'messages';
		return Response.redirect('/'+page);
	}
}
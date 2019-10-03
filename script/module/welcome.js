class Welcome {	
	
	// Load firstname
	async process() {
		const displayname = await IDB.server.get('displayname');
		this.firstname = displayname.substr(0, displayname.indexOf(' '));
	}
}
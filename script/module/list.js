class List {
	constructor(name) {
		this.name = name;
	}
	
	// List items
	async process() {
		this.list = await IDB[this.name].all();
	}
}
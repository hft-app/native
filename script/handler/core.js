class CoreHandler {
	
	// Constructor
	constructor(controller) {
		this.controller = controller;
		
		// Setup time
		this.today = new Date();
		this.today.setHours(0,0,0,0);
		
		// Setup modules
		this.modules = {
			'meals': new Meals(this),
			'lectures': new Lectures(this),
			'events': new Events(this),
			'exams': new Exams(),
			'courses': new Courses(this),
			'professors': new List('professors'),
			'printers': new List('printers'),
			'tips': new List('tips'),
			'menu': new Menu(),
			'welcome': new Welcome(),
		};
	}
	
	// URL pattern
	get pattern() {
		return new RegExp('^\/(' + Object.keys(this.modules).join('|') + ')(?:\/(.+))?\/?');
	}
	
	// Process request
	async process(request) {
		
		// Auto refresh
		const checked = await IDB.server.get('checked');
		if(!checked || new Date() - checked > 15*60*1000) {
			await IDB.server.put(new Date(), 'checked');
			if(navigator.onLine) await controller.refresh();
		}
		
		// Manual refresh
		if(request.GET.has('refresh')) await controller.refresh();
		
		// Load page and module
		const page = request.params[1];
		const module = this.modules[page];
		
		// Process request
		const result = await module.process(request);
		if(result instanceof Response) return result;
		
		// Setup data
		const data = {
			version: this.controller.version,
			username: await IDB.server.get('username'),
			device: await IDB.server.get('device'),
			page: page,
			module: module,
		}
		
		// Setup tabs
		data.tabs = Object.keys(this.modules).slice(0,4).map(name => ({
			name: name,
			active: name == page,
		}));
		
		// Remember visitable page
		IDB.server.put(page, 'page');	
		
		// Load templates
		const content = await this.controller.fetch('/template/_'+page+'.html').then(response => response.text());
		const shell = await this.controller.fetch('/template/shell.html').then(response => response.text());
		const meta = await this.controller.fetch('/launcher/meta.html').then(response => response.text());
		const cooked = shell.replace('{{>content}}', content).replace('{{>meta}}', meta);
		
		// Render html
		return Elements.render(cooked, data);
	}
}
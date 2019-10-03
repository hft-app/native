class Controller {
	
	// IDB table definition
	get tables() {
		return {
			exams: { autoIncrement: true },
			meals: { autoIncrement: true },
			lectures: { autoIncrement: true },
			events: { keyPath: 'id' },
			professors: { autoIncrement: true },
			tips: { autoIncrement: true },
			printers: { autoIncrement: true },
			subjects: { autoIncrement: true },
			server: {},
		};
	}
	
	// Cache definition
	get cache() {
		return [
			'/font/awesome.woff2?v=4.7.0',
			'/font/awesome.woff?v=4.7.0',
			
			'/script/client/courses.js',
			'/script/client/insight.js',
			'/script/client/lu.min.js',
			'/script/client/menu.js',
			'/script/client/professors.js',
			'/script/client/shell.js',
			
			'/style/main.scss',
			'/style/login.scss',
			
			'/lang/de.json',
			
			'/template/event.ics',
			
			'/template/_courses.html',
			'/template/_events.html',
			'/template/_exams.html',
			'/template/_welcome.html',
			'/template/_lectures.html',
			'/template/_meals.html',
			'/template/_menu.html',
			'/template/_printers.html',
			'/template/_professors.html',
			'/template/_tips.html',
			'/template/_error.html',
			'/template/shell.html',
			'/template/login.html',
		];
	}
	
	// Constructor
	constructor(version) {
		this.version = version;
		
		// Setup server
		this.server = 'https://server.hft-app.de/';
		
		// Setup handlers
		this.handlers = [
			new LaunchHandler(this),
			new CoreHandler(this),
			new AuthHandler(this),
			new EventHandler(this),
		];
	
		// Connect to DB
		IDB.open(this.tables);
	}
	
	// Exception handler
	async exceptionHandler(exception) {
		switch(exception) {
			
			// Redirect to login page
			case 'InvalidDevice':
			case 'InvalidCredentials': return Response.redirect('/logout');
				
			// Redirect to error page
			default: return Response.redirect('/error/'+exception);
		}
	}
	
	// Response filter
	async responseFilter(response) {
		
		// Handle delayed exception (thrown at auto refresh)
		if(this.exception) {
			const redirect = await this.exceptionHandler(this.exception);
			delete this.exception;
			return redirect;
		}
		
		// Return native response
		if(response instanceof Response) return response;
		
		// Return html wrapped in response
		if(response) {
			const language = await this.fetch('/lang/de.json').then(response => response.json());
			const translated = new Elements({open: '[[', close: ']]'}).render(response, language);
			return new Response(translated, {
				status: 200,
				statusText: 'OK',
				headers: new Headers({
					'Content-Type': 'text/html;charset=UTF-8',
					'Content-Length': response.length,
				}),
			});
		}
		
		// Return error
		return Response.error();
	}
	
	// Refresh data
	async refresh() {
		
		// Report status to clients
		this.post({status: 'refreshing'});
		
		// Perform request
		const result = await this.query('refresh');
		
		// Clear all tables but server
		for(let name in this.tables) {
			if(name == 'server') continue;
			await IDB[name].clear();
			
			// Refill tables
			if(result[name]) for(let object of result[name]) {
				
				// Cast date objects
				for(let index in object) if((
					(name == 'lectures' && index == 'start') ||
					(name == 'lectures' && index == 'end') ||
					(name == 'events' && index == 'start') ||
					(name == 'events' && index == 'end')
				) && object[index]) object[index] = new Date(object[index]);
				
				// Insert data
				await IDB[name].put(object);
			}
		}
		
		// Report status to clients
		this.post({status: 'refreshed'});
	}
	
	// Post message to clients
	async post(message) {
		for(const client of await clients.matchAll()) client.postMessage(message);
	}
	
	// Handle incoming messages
	async messageHandler(message) {
		switch(message.data.action) {
			
			// Refresh request
			case 'refresh':	{
				await this.refresh();
			} break;
		}
	}
	
	// Fetch a resource
	async fetch(request) {
		return await caches.match(request) || await fetch(request);
	}
	
	// Query API
	async query(action, data) {
		
		// Check connection
		if(!navigator.onLine) throw 'offline';
		
		// Add device
		if(!data) data = new URLSearchParams();
		data.set('device', await IDB.server.get('device'));
		
		// Perform request
		const response = await fetch(this.server+'api.php?action='+action, {
			method: 'POST',
			body: data,
		}).then(response => response.json());
		
		// Check response
		if(response.status && response.status == 'OK') return response;
		else throw response.error || 'unknown error';
	}
}
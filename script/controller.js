class Controller {
	
	// IDB table definition
	get tables() {
		return {
			exams: { autoIncrement: true },
			meals: { autoIncrement: true },
			lectures: { autoIncrement: true },
			events: { autoIncrement: true },
			professors: { autoIncrement: true },
			messages: { autoIncrement: true },
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
			
			'/template/_courses.html',
			'/template/_events.html',
			'/template/_exams.html',
			'/template/_messages.html',
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
		
		// Wrap html in response
		if(response instanceof Response) return response;
		else return new Response(response, {
			status: 200,
			statusText: 'OK',
			headers: new Headers({
				'Content-Type': 'text/html;charset=UTF-8',
				'Content-Length': response.length,
			}),
		});
	}
	
	// Refresh data
	async refresh() {
		
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
					(name == 'events' && index == 'end') ||
					(name == 'messages' && index == 'sent')
				) && object[index]) object[index] = new Date(object[index]);
				
				// Insert data
				await IDB[name].put(object);
			}
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
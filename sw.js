// Import dependencies
self.importScripts(
	'script/idb.min.js',
	'script/service.min.js',
	'script/elements.min.js',
	'script/controller.js',
	'script/table.js',
	'script/handler/auth.js',
	'script/handler/launch.js',
	'script/handler/core.js',
);

// Setup controller and service
const controller = new Controller('3.1.0');
const service = new Service(controller);

// Setup auto-refresh
setInterval(async () => {
	if(!navigator.onLine) return;
	
	// Check device (no refresh before login)
	const device = await IDB.server.get('device');
	if(!device) return;
	
	// Check refresh interval
	const checked = await IDB.server.get('checked');
	if(!checked || new Date() - checked > 15*60*1000) {
		await IDB.server.put(new Date(), 'checked');
		
		// Perform refresh
		try { await controller.refresh(); }
		catch(e) { controller.exception = e; }
	}
}, 3000);

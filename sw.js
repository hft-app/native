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
	'script/handler/event.js',
	'script/module/events.js',
	'script/module/exams.js',
	'script/module/courses.js',
	'script/module/meals.js',
	'script/module/lectures.js',
	'script/module/menu.js',
	'script/module/welcome.js',
	'script/module/list.js',
);

// Setup controller and service
const controller = new Controller('3.1.0');
const service = new Service(controller);

class CoreHandler {
	
	// Constructor
	constructor(controller) {
		this.controller = controller;
		
		// Setup time
		this.today = new Date();
		this.today.setHours(0,0,0,0);
	}
	
	// URL pattern
	get pattern() {
		return /^\/(meals|exams|events|lectures|professors|courses|printers|tips|menu|messages|error)(?:\/(.+))?\/?/i;
	}
	
	// Color palette
	get colors() {
		return ['green', 'blue', 'orange', 'red', 'yellow', 'teal', 'purple', 'pink'];	
	}
	
	// Navigation tabs
	get tabs() {
		return ['meals', 'lectures', 'events', 'exams'];
	}
	
	// Process request
	async process(request) {
		const [, page, context] = request.params;
		
		// Setup data
		const data = {
			version: this.controller.version,
			username: await IDB.server.get('username'),
			device: await IDB.server.get('device'),
			title: '[[page.'+page+'.title]]',
		}
		
		// Setup tabs
		data.tabs = this.tabs.map(name => ({
			name: name,
			title: '[[page.'+name+'.tab]]',
			active: name == page
		}));
		
		// Extract page data
		switch(page) {
			case 'courses': {
				
				// Process input
				if(request.GET.has('submit')) {
					await this.controller.query('enroll', request.POST);
					await this.controller.refresh();
					return Response.redirect('/lectures');
				}
				
				// Load subjects
				data.subjects = await IDB.subjects.all();
			} break;
			case 'meals': {
				const meals = await IDB.meals.all(meal => new Date(meal.date) >= this.today);
				
				// Collect unique dates
				const dates = [];
				for(let meal of meals) if(!dates.includes(meal.date)) dates.push(meal.date);
				
				// Determine context
				let index = dates.indexOf(context);
				if(index < 0) index = 0;
				
				// Add navigators
				if(index > 0) data.previous = dates[index-1];
				if(index < dates.length - 1) data.next = dates[index+1];
				
				// Filter meals
				data.meals = meals.filter(meal => meal.date == dates[index]);
			
				// Render options
				data.options = dates.map(item => ({
					date: new Date(item),
					selected: context == item
				}));
				
				// List allergens
				data.allergens = Object.entries({
					'Ei': 'Ei',
					'En': 'Erdnuss',
					'Fi': 'Fisch',
					'GlW': 'Weizen',
					'GlD': 'Dinkel',
					'GlKW': 'Khorsan-Weizen',
					'GlR': 'Roggen',
					'GlG': 'Gerste',
					'GlH': 'Hafer',
					'Kr': 'Krebstiere (Krusten- und Schalentiere)',
					'La': 'Milch und Laktose',
					'Lu': 'Lupine',
					'NuM': 'Mandeln',
					'NuH': 'Haselnüsse',
					'NuW': 'Walnüsse',
					'NuC': 'Cashewnüsse',
					'NuPe': 'Pecanüsse',
					'NuPa': 'Paranüsse',
					'NuPi': 'Pistazien',
					'NuMa': 'Macadamianüsse',
					'Se': 'Sesam',
					'Sf': 'Senf',
					'Sl': 'Sellerie',
					'So': 'Soja',
					'Sw': 'Schwefeloxid ("SO2") und Sulfite',
					'Wt': 'Weichtiere'
				}).map(entry => ({key: entry[0], value: entry[1]}));
				
				// List additives
				data.additives = Object.entries({
					1: 'mit Konservierungsstoffen',
					2: 'mit Farbstoffen',
					3: 'mit Antioxodationsmitteln',
					4: 'mit Geschmacksverstärkern',
					5: 'geschwefelt',
					6: 'gewachst',
					7: 'mit Phosphaten',
					8: 'mit Süßungsmitteln',
					9: 'enthält eine Phenylaninquelle',
					10: 'geschwärzt',
					11: 'mit Alkohol'
				}).map(entry => ({key: entry[0], value: entry[1]}));
			} break;
			case 'events': {
				data.events = (await IDB.events.all(event => event.end >= this.today || event.start >= this.today)).map(event => {
					
					// Setup export query
					const query = [
						'dtstart='+Math.round(event.start.getTime() / 1000),
						'dtend='+(Math.round((event.end ? event.end.getTime() : event.start.getTime()) / 1000) + 60*60*24 - 1),
						'summary='+encodeURIComponent(event.title || event.description)
					];
					if(event.title && event.description) query.push('description='+encodeURIComponent(event.description));
					
					// Collect data
					const data = {
						'title': event.title,
						'description': event.description,
						'query': query.join('&')
					}
					
					// Add time range
					if(event.start <= this.today) data.range = event.end ? 'Aktuell' : 'Heute';
					else data.range = Elements.render('{{j}}. [[date.F.{{n}}]]', event.start);
					if(event.end) data.range+= ' – '+Elements.render('{{j}}. [[date.F.{{n}}]]', event.end);
					return data;	
				});
			} break;
			case 'exams': {
				const exams = await IDB.exams.all();
				
				// List exams
				data.exams = exams.map(exam => {
					const pass = exam.status == 'bestanden';
					
					// Collect infos
					var infos = [];
					if(exam.date) infos.push(exam.date);
					if(parseInt(exam.cp) > 0) infos.push(parseInt(exam.cp)+' CP');
					if(exam.try) infos.push([, 'Erst', 'Zweit', 'Dritt'][exam.try]+'versuch');
					
					// Collect data
					return {
						status: pass ? 'passed' : 'failed',
						infos: infos.join(' &middot; '),
						title: exam.title,
						grade: exam.grade
					};
				});
			} break;
			case 'lectures': {
				const lectures = await IDB.lectures.all(lecture => lecture.start >= this.today);
				
				// Setup data
				data.days = [];
				
				// Create timetable for the next weeks
				for(let i=0; i<21; i++) {
					const start = new Date();
					start.setDate(start.getDate() + i);
					start.setHours(0,0,0);
					const end = new Date()
					end.setDate(end.getDate() + i);
					end.setHours(23,59,59);
					
					// Filter lectures for current day
					const today = lectures.filter(lecture => lecture.start >= start && lecture.end <= end);
					
					// Calculate color hash
					today.forEach(async lecture => {
						let hash = lecture.title.charCodeAt(0) + lecture.title.charCodeAt(1);
						lecture.color = this.colors[hash % this.colors.length];
					});
					
					// Render day in timetable
					if(today.length > 0) data.days.push({
						table: new Table(today).render(),
						date: start
					});
				}
			} break;
			case 'professors': {
				data.professors = await IDB.professors.all();
			} break;
			case 'printers': {
				data.printers = await IDB.printers.all();
			} break;
			case 'tips': {
				data.tips = await IDB.tips.all();
			} break;
			case 'menu': {
				data.displayname = await IDB.server.get('displayname');
				data.menus = [
					{
						group: 'Weitere Inhalte',
						color: 'red',
						items: [
							{
								url: '/courses',
								icon: 'book',
								title: 'Kurse auswählen'
							},{
								url: '/tips',
								icon: 'lightbulb-o',
								title: 'Tipps und Tricks'
							},{
								url: '/printers',
								icon: 'print',
								title: 'Druckerstandorte'
							},{
								url: '/professors',
								icon: 'list-ul',
								title: 'Professorenverzeichnis'
							}
						]
					},{
						group: 'App unterstützen',
						color: 'green',
						items: [
							{
								url: 'whatsapp://send?text='+encodeURI("https://hft-app.de"),
								icon: 'whatsapp',
								title: 'Freunde einladen'
							},{
								url: 'mailto:info@hft-app.de?subject=Feedback',
								icon: 'star-o',
								title: 'Feedback senden'
							},{
								url: 'https://github.com/luniverse/hft-app/fork',
								icon: 'puzzle-piece',
								title: 'Selbst mitwirken',
								blank: true
							}
						]
					},{
						group: 'Informationen',
						color: 'blue',
						items: [
							{
								url: '//luniversity.de/info/terms',
								icon: 'handshake-o',
								title: 'Nutzungsbedingungen',
								blank: true
							},{
								url: '//luniversity.de/info/imprint',
								icon: 'bullhorn',
								title: 'Impressum',
								blank: true
							},{
								url: '//luniversity.de/info/privacy',
								icon: 'shield',
								title: 'Datenschutzrichtlinien',
								blank: true
							}
						]
					}
				];
			} break;
			case 'messages': {
				
				// Mark messages as read
				await IDB.server.put(new Date(), 'read');
				
				data.messages = await IDB.messages.all();
				for(const message of data.messages) message.blank = message.href.startsWith('http');
			} break;
			case 'error': {
				data.error = decodeURI(context);
			} break;
		}
		
		// Get unread messages
		const read = await IDB.server.get('read');
		data.unread = await IDB.messages.all(message => !read || message.sent > read);
		
		// Remember visitable page
		IDB.server.put(page, 'page');	
		
		// Load templates
		const content = await this.controller.fetch('/template/_'+page+'.html').then(response => response.text());
		const shell = await this.controller.fetch('/template/shell.html').then(response => response.text());
		
		// Render html
		const combined = shell.replace('{{>content}}', content);
		const raw = Elements.render(combined, data);
		
		// Render language
		const lang = await this.controller.fetch('/lang/de.json').then(response => response.json());
		return new Elements({open: '[[', close: ']]'}).render(raw, lang);
	}
}
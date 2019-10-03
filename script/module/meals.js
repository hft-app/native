class Meals {
	constructor(handler) {
		this.handler = handler;	
	}
	
	get allergens() {
		return this.toArray({
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
			'Wt': 'Weichtiere',
		});
	}
	
	get additives() {
		return this.toArray({
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
			11: 'mit Alkohol',
		});
	}
	
	// Map allergens and additives to array
	toArray(object) {
		return Object.entries(object).map(entry => ({key: entry[0], value: entry[1]}));
	}
	
	// List meals
	async process(request) {
		const meals = await IDB.meals.all(meal => new Date(meal.date) >= this.handler.today);
		const date = request.params[2];
		
		// Collect unique dates
		const dates = [];
		for(let meal of meals) if(!dates.includes(meal.date)) dates.push(meal.date);
		
		// Determine selected date
		let index = dates.indexOf(date);
		if(index < 0) index = 0;
		
		// Add navigators
		if(index > 0) this.previous = dates[index-1];
		if(index < dates.length - 1) this.next = dates[index+1];
		
		// Filter meals
		this.meals = meals.filter(meal => meal.date == dates[index]);
		
		// Render options
		this.options = dates.map(item => ({
			date: new Date(item),
			selected: date == item
		}));
	}
}
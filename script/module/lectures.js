class Lectures {	
	constructor(handler) {
		this.handler = handler;	
	}
	
	// Timetable color classes
	get colors() {
		return ['green', 'blue', 'orange', 'red', 'yellow', 'teal', 'purple', 'pink'];	
	}
	
	// Build timetable
	async process() {
		const lectures = await IDB.lectures.all(lecture => lecture.start >= this.handler.today);
		this.days = [];
		
		// Create timetable for the next 3 weeks
		for(let i=0; i<21; i++) {
			const start = new Date();
			start.setDate(start.getDate() + i);
			start.setHours(0,0,0);
			const end = new Date();
			end.setDate(end.getDate() + i);
			end.setHours(23,59,59);
			
			// Filter loadLectures for current day
			const today = lectures.filter(lecture => lecture.start >= start && lecture.end <= end);
			
			// Calculate color hash
			today.forEach(async lecture => {
				let hash = lecture.title.charCodeAt(0) + lecture.title.charCodeAt(1);
				lecture.color = this.colors[hash % this.colors.length];
			});
			
			// Add day to timetable
			if(today.length > 0) this.days.push({
				table: new Table(today).render(),
				date: start,
			});
		}
	}
}

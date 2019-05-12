class Table {
	
	// Construct with lectures
	constructor(lectures=[]) {
		
		// Load lectures
		this.lectures = lectures;
		
		// Setup grid
		this.grid = [];
		for(var x=0; x<12; x++) this.grid[x] = [];
		
		// Place lectures
		for(const lecture of this.lectures) this.place(lecture);
	}
	
	// Occupy grid space
	occupy(x, y, colspan, rowspan) {
		for(let dx=0; dx<colspan; dx++) {
			for(let dy=0; dy<rowspan; dy++) {
				this.grid[x+dx][y+dy] = false;
			}
		}
	}
	
	// Overlapping condition
	overlap(a, b) {
		return Math.max(a.start, b.start) < Math.min(a.end, b.end);
	}
	
	// Render timetable
	render() {
		let table = '';
		
		// Traverse rows (time)
		for(let y=0; y<44; y++) {
			const type = (y <= 20 && y % 7 < 6) || (y >= 24 && (y-24) % 7 < 6) ? 'block' : '';
			table+= `<tr class="${type}">`;
		
			// Traverse cols (overlap buffer)
			for(var x=0; x<12; x++) {
				
				// Measure and fill gap
				var dx=0;
				while(x+dx < 12 && typeof this.grid[x+dx][y] == 'undefined') dx++;
				x+= dx;
				if(dx > 0) table+= `<td colspan="${dx}"></td>`;
				
				// Render lecture
				else if(this.grid[x][y]) {
					table+= Elements.render(`
						<td class="occupied" colspan="{{colspan}}" rowspan="{{rowspan}}">
							<div class="lecture {{color}}">
								<div class="title">
									{{title}}
								</div>
								<div class="time">
									{{#start}}{{H}}:{{i}}{{/start}} - {{#end}}{{H}}:{{i}}{{/end}}
								</div>
								<div class="info">
									{{#professor}}<div class="professor data icon-prepend icon">{{.}}</div>{{/professor}}
									{{#room}}<div class="room data icon-prepend icon">{{.}}</div>{{/room}}
								</div>
							</div>
						</td>
					`, this.grid[x][y]);
				}
			} table+= `</tr>`;
		} return table;
	}
	
	// Place lecture
	place(lecture) {
	
		// Get lecture date
		var date = lecture.start;
		var morning = new Date(date);
		morning.setHours(8,0,0);
		
		// Only check lectures starting in the current time segment
		var y = (lecture.start - morning) / (60 * 15 * 1000);
		lecture.rowspan = (lecture.end - lecture.start) / (60 * 15 * 1000);
		if(!Number.isInteger(y) || y < 0 || y > 48) return false; // OPTIONAL: check for malformed input
					
		// Col traversal (overlap buffer)
		for(var x=0; x<12; x++) {
			
			// Position is occupied
			if(typeof this.grid[x][y] !== 'undefined') continue;
			
			// Find overlapping lectures
			var overlapping = 0;
			for(var index in this.lectures) {
				var test = this.lectures[index];
				
				// Devide the remaining space among not yet placed lectures
				if(!test.placed && this.overlap(test, lecture)) overlapping++;
			} lecture.colspan = (12 - x)/overlapping;
			
			// Occupy grid space
			this.occupy(x, y, lecture.colspan, lecture.rowspan);
			
			// Place lecture
			this.grid[x][y] = lecture;
			lecture.placed = true;
			return true;
		}
	}
}
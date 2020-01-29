class Courses {
	constructor(handler) {
		this.handler = handler;	
	}
	
	async process(request) {
		
		// Update course selection
		if(request.GET.has('submit')) {
			await this.handler.controller.query('enroll', request.POST);
			await this.handler.controller.refresh();
			return Response.redirect('/loadLectures');
		}
		
		// List subjects with courses
		this.subjects = await IDB.subjects.all();
		this.subjects.forEach(subject => subject.courses.forEach(course => course.subject = subject.id));
	}
}

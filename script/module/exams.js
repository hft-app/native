class Exams {
	
	// Collect exam data
	collectData(exam) {		
		const info = [];
		
		// Add info
		if(parseInt(exam.cp) > 0) info.push(parseInt(exam.cp)+' CP');
		info.push(exam.date || exam.semester);
		if(exam.try) info.push([, 'Erst', 'Zweit', 'Dritt'][exam.try]+'versuch');
		
		// Collect data
		return {
			status: exam.status == 'bestanden' ? 'passed' : 'failed',
			info: info.join(' &middot; '),
			title: exam.title,
			grade: exam.grade,
		}
	}
	
	// List exams
	async process() {
		const exams = await IDB.exams.all();
		this.exams = exams.map(this.collectData.bind(this));
	}
}
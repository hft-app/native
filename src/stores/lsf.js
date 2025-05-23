import { parseDate, sleep } from './util';
import { fetchDOM, fetchLogin, clearCookies } from 'platform/fetch';


const BASE_URL = 'https://lsf.hft-stuttgart.de/qisserver/rds';

function i18nEquals(german, english) {
    return (element) => {
        let content = element.textContent.trim();
        return content.indexOf(german) !== -1 || content.indexOf(english) !== -1;
    }
}

export const Client = {
    async login({ username, password }) {
        const formData = {
            asdf: username,
            fdsa: password,
            submit: 'Anmelden'
        };

        const success = await fetchLogin(BASE_URL +
            '?state=user' +
            '&type=1' +
            '&category=auth.login' +
            '&startpage=portal.vm' +
            '&breadCrumbSource=portal',
            formData);

        if (!success) {
            throw { type: 'invalidCreds' };
        }
        await sleep(100)
    },

    async loadExamsAndFullname() {
        let dom = await fetchDOM(BASE_URL +
            '?state=change' +
            '&type=1' +
            '&moduleParameter=studyPOSMenu' +
            '&nextdir=change' +
            '&next=menu.vm' +
            '&subdir=applications' +
            '&xml=menu');
        let link = Array.from(dom.querySelectorAll('a.auflistung'))
            .find(i18nEquals('Notenspiegel', 'Exams Extract'))
            .getAttribute('href');
        let fullname = dom.querySelector('.divloginstatus').childNodes[10]
            .textContent.trim().substring(5).split(/\s+/).join(' ');

        dom = await fetchDOM(link);
        link = Array.from(dom.querySelectorAll('a'))
            .find(element => element.getAttribute('title') && element.getAttribute('title')
                .indexOf('Leistungen für') !== -1)
            .getAttribute('href');

        dom = await fetchDOM(link);
        const table = dom.querySelectorAll('table')[1];
        const rows = table.querySelectorAll('tr');

        let exams = [];
        for (let rowIndex = 2; rowIndex < rows.length; rowIndex++) {
            let columns = rows[rowIndex].children;
            if (columns[0].className === 'qis_kontoOnTop') continue;

            const semesterParts = columns[2].textContent.trim().split(' ');
            const semester = semesterParts[semesterParts.length - 1];

            let date = columns[8].textContent.trim() || null;
            if (date) {
                date = parseDate(date).valueOf();
            }

            exams.push({
                id: columns[0].textContent.trim(),
                title: columns[1].textContent.trim(),
                grade: columns[3].textContent.trim() || null,
                passed: i18nEquals('bestanden', 'passed')(columns[4]),
                cp: parseFloat(columns[5].textContent.trim()),
                try: parseInt(columns[7].textContent.trim()),
                date,
                semester,
            });
        }
        exams = exams.sort((a, b) => a.date && b.date ? b.date - a.date : 0);
        exams = exams.sort((a, b) => b.semester.localeCompare(a.semester));

        return { exams, fullname };
    },

    async loadLectures(date) {
        // https://stackoverflow.com/a/27125580/5048815
        let onejan = new Date(date.getFullYear(), 0, 1);
        const week = Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);

        const dom = await fetchDOM(BASE_URL + '?state=wplan' +
            `&week=${week}_${date.getFullYear()}` +
            '&act=show' +
            '&pool=' +
            '&show=plan' +
            '&P.vx=lang' +
            '&P.Print=');

        const table = dom.body.children[1];

        const grid = [];
        for (let i = 0; i < 48; i++) grid[i] = [];

        // No lectures available
        if (!table.children[0]) return [];

        const rows = table.children[0].children;

        const days = [];
        const columns = rows[0].querySelectorAll('th');
        for (let columnIndex = 0; columnIndex < 5; columnIndex++) {
            const column = columns[columnIndex];
            const dateEl = column.querySelector('.klein');
            if (!dateEl) return []; // sometimes the table contains no dates in semester vacation
            days.push(parseDate(dateEl.textContent))
        }

        const lectures = [];
        for (let rowIndex = 0; rowIndex < 47; rowIndex++) {
            const row = rows[rowIndex + 2];

            const columns = row.children;
            let skip = rowIndex % 4 ? 1 : 2;

            for (let columnIndex = skip; columnIndex < columns.length; columnIndex++) {
                const column = columns[columnIndex];

                let x = 0;
                while (grid[rowIndex][x] && days[x + 1]) x++;

                const rowspan = parseInt(column.getAttribute('rowspan'));
                if (!rowspan || isNaN(rowspan)) {
                    grid[rowIndex][x] = true;
                } else {
                    for (let i = 0; i < rowspan; i++) {
                        grid[rowIndex + i][x] = true;
                    }

                    for (let lectureTable of column.children) {
                        let title = lectureTable.querySelector('a.ver').textContent.trim();
                        const prefixLength = title.indexOf(' ');
                        if (prefixLength && /\d/.test(title.substring(0, prefixLength))) {
                            title = title.substring(prefixLength + 1);
                        }

                        const infos = lectureTable.querySelectorAll('td.notiz[colspan="2"]');
                        let dates = infos[0].textContent;
                        dates = dates.split(/,/)[1].trim().split(/-/);
                        const dayDate = days[x];
                        const startDate = new Date(dayDate);
                        const endDate = new Date(dayDate);
                        startDate.setHours(parseInt(dates[0].trim().substring(0, 2)));
                        startDate.setMinutes(parseInt(dates[0].trim().substring(3, 5)));
                        endDate.setHours(parseInt(dates[1].trim().substring(0, 2)));
                        endDate.setMinutes(parseInt(dates[1].trim().substring(3, 5)));

                        let room = infos[infos.length - 1].textContent.split(/:/)[1].trim();

                        let professor;
                        const notiz = Array.from(lectureTable.querySelectorAll('td.notiz'))
                            .filter(i18nEquals('Durchf', 'Instructor'));
                        if (notiz.length === 1) {
                            professor = notiz[0].textContent.split(/:/)[1].trim();
                        }

                        lectures.push({
                            start: startDate.valueOf(),
                            end: endDate.valueOf(),
                            title,
                            room,
                            professor,
                            date: dayDate.valueOf()
                        })
                    }
                }
            }
        }
        return lectures.sort((a, b) => a.start - b.start);
    },

    async loadSubjects() {
        clearCookies();
        const dom = await fetchDOM(BASE_URL + '?state=verpublish&publishContainer=stgPlanList');

        return Array(...dom.querySelectorAll('.divcontent tbody tr'))
            .map(element => {
                const href = element.children[1].children[0].getAttribute('href');
                return {
                    name: element.children[0].textContent.trim(),
                    parallelId: /k_parallel.parallelid=(\d+)/.exec(href)[1],
                    id: /k_abstgv.abstgvnr=(\d+)/.exec(href)[1]
                }
            });
    },

    async loadCoursesBySubject({ parallelId, id }) {
        const dom = await fetchDOM(BASE_URL + '?state=wplan&act=stg&show=liste&P.Print' +
            `&k_parallel.parallelid=${parallelId}&k_abstgv.abstgvnr=${id}`);

        return [...dom.querySelectorAll('table tbody tr')]
            .slice(1)
            .map(element => {
                const linkElement = element.children[1].children[0];
                return {
                    subjectId: parallelId,
                    name: linkElement.textContent.trim(),
                    id: /publishid=(\d+)/.exec(linkElement.getAttribute('href'))[1]
                }
            })
    },

    async selectCourses(courses) {
        // Get URL with ASI
        let dom = await fetchDOM(BASE_URL +
            '?state=wplan&act=show&show=plan&P.subc=plan&category=timetable.browse' +
            '&breadcrumb=schedule&topitem=lectures');
        const url = dom.querySelector('.content_max > form').getAttribute('action');

        await fetchDOM(url + '&par=old&PlanSpeichern=PlanSpeichern &' +
            courses.map(ref => `&add.${ref.id}=${ref.subjectId}`).join(''))
    }
};

var DemoClient = {
    async login({ username, password }) {
        await new Promise(resolve => setTimeout(resolve, 1200))
        if (username !== 'demo' || password !== 'demo') {
            throw { type: 'invalidCreds' };
        }
    },

    async loadExamsAndFullname() {
        return {
            exams: [{
                    'id': '2010',
                    'title': 'Mathematik 2',
                    'grade': '1,3',
                    'passed': true,
                    'cp': 5,
                    'try': 1,
                    'date': 1562536800000,
                    'semester': '19'
                },
                {
                    'id': '2015',
                    'title': 'Vorleistung Mathematik 2',
                    'grade': null,
                    'passed': true,
                    'cp': 0,
                    'try': 1,
                    'date': 1562536800000,
                    'semester': '19'
                },
                {
                    'id': '2035',
                    'title': 'Prüfungsvorleistung Programmieren 2',
                    'grade': null,
                    'passed': true,
                    'cp': 0,
                    'try': 1,
                    'date': 1562536800000,
                    'semester': '19'
                },
                {
                    'id': '2040',
                    'title': 'Informatik-Projekt 1',
                    'grade': '1,0',
                    'passed': true,
                    'cp': 9,
                    'try': 1,
                    'date': null,
                    'semester': '19'
                },
                {
                    'id': '2045',
                    'title': 'Prüfungsvorleistung Informatik-Projekt 1',
                    'grade': null,
                    'passed': true,
                    'cp': 0,
                    'try': 2,
                    'date': null,
                    'semester': '20'
                },
                {
                    'id': '2045',
                    'title': 'Prüfungsvorleistung Informatik-Projekt 1',
                    'grade': null,
                    'passed': false,
                    'cp': 0,
                    'try': 1,
                    'date': null,
                    'semester': '19'
                },
                {
                    'id': '2050',
                    'title': 'Internet-Programmierung',
                    'grade': null,
                    'passed': true,
                    'cp': 5,
                    'try': 1,
                    'date': null,
                    'semester': '19'
                },
                {
                    'id': '1010',
                    'title': 'Mathematik 1',
                    'grade': null,
                    'passed': true,
                    'cp': 5,
                    'try': 1,
                    'date': 1549580400000,
                    'semester': '18/19'
                },
                {
                    'id': '1025',
                    'title': 'Vorleistung Diskrete Mathematik',
                    'grade': null,
                    'passed': true,
                    'cp': 0,
                    'try': 1,
                    'date': 1549580400000,
                    'semester': '18/19'
                },
                {
                    'id': '1030',
                    'title': 'Einführung in die Informatik',
                    'grade': '1,7',
                    'passed': true,
                    'cp': 5,
                    'try': 1,
                    'date': 1549407600000,
                    'semester': '18/19'
                },
                {
                    'id': '1020',
                    'title': 'Diskrete Mathematik',
                    'grade': '1,3',
                    'passed': true,
                    'cp': 5,
                    'try': 1,
                    'date': 1548716400000,
                    'semester': '18/19'
                },
                {
                    'id': '1035',
                    'title': 'Prüfungsvorleistung Einführung in die Informatik',
                    'grade': null,
                    'passed': true,
                    'cp': 0,
                    'try': 1,
                    'date': null,
                    'semester': '18/19'
                },
                {
                    'id': '1040',
                    'title': 'Programmieren 1',
                    'grade': null,
                    'passed': true,
                    'cp': 8,
                    'try': 1,
                    'date': 1549580400000,
                    'semester': '18/19'
                },
                {
                    'id': '1060',
                    'title': 'Arbeitstechniken im Studium',
                    'grade': null,
                    'passed': true,
                    'cp': 2,
                    'try': 1,
                    'date': 1549580400000,
                    'semester': '18/19'
                },
                {
                    'id': '1050',
                    'title': 'Betriebswirtschaftslehre',
                    'grade': '1,0',
                    'passed': true,
                    'cp': 4,
                    'try': 1,
                    'date': 1548889200000,
                    'semester': '18/19'
                },
                {
                    'id': '1070',
                    'title': 'Fremdsprachen',
                    'grade': null,
                    'passed': true,
                    'cp': 2,
                    'try': 1,
                    'date': null,
                    'semester': '18/19'
                }
            ],
            fullname: 'Max Mustermann'
        };
    },

    async loadLectures(date) {
        const t = Math.ceil(date / 86400000) * 86400000;

        return [{
                'start': t + 50400000,
                'end': t + 62100000,
                'title': 'Enterprise Architecture Management',
                'room': '2/433',
                'professor': 'Wanner, Knoll',
                'date': t
            },
            {
                'start': t + 121500000,
                'end': t + 126900000,
                'title': 'Algorithmische Geometrie',
                'room': '1/109',
                'professor': 'Wolpert',
                'date': t + 86400000
            },
            {
                'start': t + 207900000,
                'end': t + 219600000,
                'title': 'Informatik-Projekt 2',
                'room': '',
                'professor': 'Coors',
                'date': t + 172800000
            },
            {
                'start': t + 223200000,
                'end': t + 234000000,
                'title': 'Seminar',
                'room': '',
                'professor': 'Noe',
                'date': t + 172800000
            },
            {
                'start': t + 294300000,
                'end': t + 299700000,
                'title': 'Algorithmische Geometrie',
                'room': '1/109',
                'professor': 'Wolpert',
                'date': t + 259200000
            },
            {
                'start': t + 374400000,
                'end': t + 392400000,
                'title': 'Recht',
                'room': '',
                'professor': 'Seybold-Schryro',
                'date': t + 345600000
            },
            {
                'start': t + 380700000,
                'end': t + 392400000,
                'title': 'Geo-Visualisierung',
                'room': '',
                'professor': 'Coors',
                'date': t + 345600000
            },
            {
                'start': t + 396000000,
                'end': t + 407700000,
                'title': 'IT-Sicherheit 2',
                'room': '',
                'professor': 'Seedorf, Paukstadt',
                'date': t + 345600000
            },
            {
                'start': t + 655200000,
                'end': t + 666900000,
                'title': 'Enterprise Architecture Management',
                'room': '2/433',
                'professor': 'Wanner, Knoll',
                'date': t + 604800000
            },
            {
                'start': t + 726300000,
                'end': t + 731700000,
                'title': 'Algorithmische Geometrie',
                'room': '1/109',
                'professor': 'Wolpert',
                'date': t + 691200000
            },
            {
                'start': t + 812700000,
                'end': t + 824400000,
                'title': 'Informatik-Projekt 2',
                'room': '',
                'professor': 'Coors',
                'date': t + 777600000
            },
            {
                'start': t + 899100000,
                'end': t + 904500000,
                'title': 'Algorithmische Geometrie',
                'room': '1/109',
                'professor': 'Wolpert',
                'date': t + 864000000
            },
            {
                'start': t + 985500000,
                'end': t + 997200000,
                'title': 'Geo-Visualisierung',
                'room': '',
                'professor': 'Coors',
                'date': t + 950400000
            },
            {
                'start': t + 1000800000,
                'end': t + 1012500000,
                'title': 'IT-Sicherheit 2',
                'room': '',
                'professor': 'Seedorf, Paukstadt',
                'date': t + 950400000
            }
        ];
    },


    loadSubjects: Client.loadSubjects,
    loadCoursesBySubject: Client.loadCoursesBySubject,

    selectCourses() {
        sleep(1600)
    }
};

let client = Client;
export default {
    namespaced: true,
    state: {
        lectures: [],
        exams: [],
        fullname: '',
        selectedSubjects: [],
        selectedCourses: []
    },
    actions: {
        async login(context, credentials) {
            if (credentials.username === 'demo') {
                client = DemoClient;
            } else {
                client = Client;
            }
            await client.login(credentials);

            context.commit('credentials', credentials);
        },

        logout(context) {
            context.commit('credentials', null);
        },

        async refresh(context, { skipLogin = false } = {}) {
            if (!skipLogin) {
                const credentials = context.state.credentials;
                if (credentials.username === 'demo') {
                    client = DemoClient;
                }
                await client.login(credentials);
            }
            try {

                const examsFullname = client.loadExamsAndFullname();

                const lecturesThisWeek = client.loadLectures(new Date());
                const lecturesNextWeek = client.loadLectures(new Date(Date.now() + 6.04e+8));

                const { exams, fullname } = await examsFullname;
                context.commit('exams', exams);
                context.commit('fullname', fullname);

                const lectures = (await lecturesThisWeek).concat(await lecturesNextWeek);
                context.commit('lectures', lectures);
            } catch (e) {
                console.error(e);
            }
        },

        async selectCourses(context, newCourses) {
            await client.login(context.state.credentials);
            await client.selectCourses(newCourses);
            context.commit('selectedCourses', newCourses);

            // XXX We have to relogin to LSF
            await client.login(context.state.credentials);
            const lecturesThisWeek = await client.loadLectures(new Date());
            const lecturesNextWeek = await client.loadLectures(new Date(Date.now() + 6.04e+8));
            const lectures = lecturesThisWeek.concat(lecturesNextWeek);
            context.commit('lectures', lectures);
        }
    },
    getters: {
        isLoggedIn(state) {
            return !!state.credentials;
        }
    },
    mutations: {
        lectures(state, lectures) {
            state.lectures = lectures;
        },

        credentials(state, credentials) {
            state.credentials = credentials;
        },

        exams(state, exams) {
            state.exams = exams;
        },

        fullname(state, fullname) {
            state.fullname = fullname;
        },

        selectedSubjects(state, selectedSubjects) {
            state.selectedSubjects = selectedSubjects
        },

        selectedCourses(state, selectedCourses) {
            state.selectedCourses = selectedCourses
        }
    }
}
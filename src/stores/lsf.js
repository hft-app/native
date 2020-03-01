import {parseDate} from './util';
import {fetchDOM, fetchLogin} from 'platform/fetch';


const BASE_URL = 'https://lsf.hft-stuttgart.de/qisserver/rds';

function i18nEquals(german, english) {
  return (element) => {
    let content = element.textContent.trim();
    return content.indexOf(german) !== -1 || content.indexOf(english) !== -1;
  }
}

export const Client = {
  async login({username, password}) {
    const formData = {
      asdf: username, // No shit!
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
      throw {type: 'invalidCreds'};
    }
    await new Promise(resolve => setTimeout(resolve, 100))
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

      exams.push({
        id: columns[0].textContent.trim(),
        title: columns[1].textContent.trim(),
        grade: columns[3].textContent.trim() || null,
        passed: i18nEquals('bestanden', 'passed')(columns[4]),
        cp: parseFloat(columns[5].textContent.trim()),
        try: parseInt(columns[7].textContent.trim()),
        date: columns[8].textContent.trim() || null,
      });
    }

    exams = exams.reverse();

    return {exams, fullname};
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
      let skip = rowIndex  % 4 ? 1 : 2;

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
    return lectures;
  },

  async loadSubjects() {
    const dom = await fetchDOM(BASE_URL + '?state=verpublish&publishContainer=stgPlanList');

    return Array(...dom.querySelectorAll('.content tbody tr'))
      .map(element => {
        const href = element.children[1].children[0].getAttribute('href');
        return {
          name: element.children[0].textContent.trim(),
          parallelId: /k_parallel.parallelid=(\d+)/.exec(href)[1],
          id: /k_abstgv.abstgvnr=(\d+)/.exec(href)[1]
        }
      });
  },
  addSelectedCourses(courseRefs) {
    return fetchDOM(BASE_URL + '?state=wplan&act=add&show=plan&par=old&from=out' +
      courseRefs.map(ref => `&add.${ref.id}=${ref.subjectId}`).join(''));
  },

  removeSelectedCourse({subjectId, id}) {
    return fetchDOM(BASE_URL + `?state=wplan&search=ver&act=rem&show=plan&Gid=${subjectId}&Vid=${id}`)
  },

  async loadSelectedCourses() {
    const dom = await fetchDOM(BASE_URL + '?state=wplan&week=-2&act=show&pool=&show=plan&P.vx=kurz&P.subc=plan');
    const courses = new Set();
    return [...dom.querySelectorAll('td[title="aus Ansicht entfernen"]')]
      .map(element => {
        const linkHref = element.children[0].getAttribute('href');
        // XXX Maybe use `URLSearchParams` instead for url parsing
        return {
          id: /Vid=(\d+)/.exec(linkHref)[1],
          subjectId: /Gid=(\d+)/.exec(linkHref)[1]
        }
      }).filter(course => {
        if (courses.has(course.id)) {
          return false
        } else {
          courses.add(course.id);
          return true
        }
      })
  },

  async loadCoursesBySubject({parallelId, id}) {
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
  }
};

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
      await Client.login(credentials);

      context.commit('credentials', credentials);
    },

    logout(context) {
      context.commit('credentials', null);
    },

    async refresh(context, {skipLogin = false} = {}) {
      if (!skipLogin) {
        await Client.login(context.state.credentials);
      }

      const examsFullname = Client.loadExamsAndFullname();

      const lecturesThisWeek = Client.loadLectures(new Date());
      const lecturesNextWeek = Client.loadLectures(new Date(Date.now() + 6.04e+8));

      const {exams, fullname} = await examsFullname;
      context.commit('exams', exams);
      context.commit('fullname', fullname);

      const lectures = (await lecturesThisWeek).concat(await lecturesNextWeek);
      context.commit('lectures', lectures);
    },

    async selectCourses(context, newCourses) {
      await Client.login(context.state.credentials);

      const oldCourses = await Client.loadSelectedCourses();
      const oldCoursesSet = new Set(oldCourses.map(course => course.id));
      const newCoursesSet = new Set(newCourses.map(course => course.id));

      const coursesToAdd = newCourses.filter(x => !oldCoursesSet.has(x.id));
      const coursesToRemove = oldCourses.filter(x => !newCoursesSet.has(x.id));

      await Promise.all([Client.addSelectedCourses(coursesToAdd),
        ...coursesToRemove.map(Client.removeSelectedCourse)]);
      context.commit('selectedCourses', newCourses);

      const lecturesThisWeek = Client.loadLectures(new Date());
      const lecturesNextWeek = Client.loadLectures(new Date(Date.now() + 6.04e+8));
      const lectures = (await lecturesThisWeek).concat(await lecturesNextWeek);
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

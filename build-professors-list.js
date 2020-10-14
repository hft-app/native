const {JSDOM} = require('jsdom');
const fetch = require('node-fetch');

function fetchDOM(url) {
  return fetch(url)
    .then(response => response.text())
    .then(text => new JSDOM(text).window.document)
}


async function buildProfessorsList() {
  const entries = await Promise.all((await Promise.all([1, 2, 3]
    .map(async page =>
      fetchDOM('https://www.hft-stuttgart.de/personenverzeichnis?' +
        'tx_solr[filter][0]=role%3AProfessor%2Fin' +
        '&tx_solr[page]=' +
        page)
    )))
    .flatMap(dom => new Array(...dom.querySelectorAll('table tr td:first-child a'))
      .map(element => element.getAttribute('href')))
    .map(async prof => {
      const dom = await fetchDOM('https://www.hft-stuttgart.de' + prof);
      const tableRows = new Array(...dom.querySelector('.person-directory-columns').children);
      const getTableContent = (title) => {
        const row = tableRows
          .find(el => el.querySelector('.col-3').textContent.trim() === title);
        if (!row) return;
        const text = row.querySelector('.col-9').textContent.trim();
        if (!text || text === '') return;
        return text.replace(/\s+/g, ' ');
      };

      let room = getTableContent('Büro:');
      if (room && room.indexOf('Raum ') === 0) room = room.substring(5);

      return {
        name: dom.querySelector('.text-center > h1').textContent.trim(),
        phone: getTableContent('Telefon:'),
        email: getTableContent('E-Mail:'),
        time: getTableContent('Sprechzeiten:'),
        room
      }

    }));

  const getLastName = (name) => name.substring(name.lastIndexOf(' ') + 1);
  entries.sort((a, b) => getLastName(a.name).localeCompare(getLastName(b.name)));

  console.log(JSON.stringify(entries, null, 2))
}

buildProfessorsList();

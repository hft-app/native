const {JSDOM} = require('jsdom');
const fetch = require('node-fetch');

function fetchDOM(url) {
  return fetch(url)
    .then(response => response.text())
    .then(text => new JSDOM(text).window.document)
}


async function buildProfessorsList() {
  const entries = await Promise.all((await Promise.all(['A', 'B', 'C']
    .map(async fac =>
      fetchDOM('https://www.hft-stuttgart.de/Hochschule/Organisation/Professoren/Fak' +
        fac +
        '/index.html/de?printable=true&set_language=de')
    )))
    .flatMap(dom => new Array(...dom.querySelectorAll('table')[1].querySelectorAll('a'))
      .map(element => element.getAttribute('href')))
    .map(async prof => {
      const dom = await fetchDOM('https://www.hft-stuttgart.de/' +
        prof +
        '/de?printable=true&set_language=de');
      const tableRows = new Array(...dom.querySelectorAll('table')[1].querySelectorAll('tr'));
      const getTableContent = (title) => {
        const row = tableRows
          .find(el => el.querySelector('td').textContent.trim() === title);
        if (!row) return;
        const text = row.querySelectorAll('td')[1].textContent.trim();
        if (!text || text === '') return;
        return text.replace(/\s+/g, ' ');
      };

      let room = getTableContent('Büro:');
      if (room && room.indexOf('Raum ') === 0) room = room.substring(5);

      return {
        name: dom.querySelector('h2').childNodes[0].textContent.trim(),
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

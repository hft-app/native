const { JSDOM } = require('jsdom');
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
                    'tx_solr[filter][role_2]=role%3AProfessor%3Ain' +
                    '&tx_solr[page]=' +
                    page)
            )))
        .flatMap(dom => [...(dom.querySelector(".staff-list").querySelectorAll("tr"))])
        .filter(element => element.querySelector('a'))
        .map(element => element.querySelector('a').getAttribute('href'))
        .map(async prof => {
            const dom = await fetchDOM('https://www.hft-stuttgart.de' + prof);
            const tableRows = new Array(...dom.querySelectorAll('.row'));
            const getTableContent = (title) => {
                const row = tableRows
                    .find(el => el.querySelector('.col-5') && el.querySelector('.col-5').textContent.trim() === title);
                if (!row) return;
                const text = row.querySelector('.col-7').textContent.trim();
                if (!text || text === '') return;
                return text.replace(/\s+/g, ' ');
            };

            let room = getTableContent('Büro:');
            if (room && room.indexOf('Raum ') === 0) room = room.substring(5);

            return {
                name: dom.querySelector('.person-directory__header__headlines > h1').textContent.trim(),
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
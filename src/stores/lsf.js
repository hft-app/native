import {fetchDOM, parseDate} from "./fetch";

export default {
    namespaced: true,
    state: {
        lectures: [{
            "lectures": [{
                "title": "Theoretische Informatik",
                "start": 1578898800,
                "end": 1578904200,
                "room": "1/111",
                "professor": "Pado"
            }, {
                "title": "Datenstrukturen und Algorithmen",
                "start": 1578905100,
                "end": 1578910500,
                "room": "1/208",
                "professor": "Homberger"
            }, {
                "title": "Datenstrukturen und Algorithmen",
                "start": 1578911400,
                "end": 1578916800,
                "room": "1/014",
                "professor": "Homberger"
            }, {
                "title": "Statistik",
                "start": 1578920400,
                "end": 1578925800,
                "room": "1/022",
                "professor": "Knebusch"
            }], "date": 1578870000
        }, {
            "lectures": [{
                "title": "Statistik",
                "start": 1578991500,
                "end": 1578996900,
                "room": "1/022",
                "professor": "Knebusch"
            }, {
                "title": "Kommunikationssysteme-Verteilte Systeme",
                "start": 1578997800,
                "end": 1579003200,
                "room": "2/433",
                "professor": "Lückemeyer"
            }, {
                "title": "Kommunikationssysteme-Netzwerke",
                "start": 1579013100,
                "end": 1579018500,
                "room": "2/501",
                "professor": "Kiesel"
            }], "date": 1578956400
        }, {
            "lectures": [{
                "title": "Software-Technik - Software-Engineering",
                "start": 1579077900,
                "end": 1579083300,
                "room": "2/433",
                "professor": "Wanner"
            }, {
                "title": "Software-Technik - Software-Engineering",
                "start": 1579084200,
                "end": 1579089600,
                "room": "2/433",
                "professor": "Wanner"
            }], "date": 1579042800
        }, {
            "lectures": [{
                "title": "Theoretische Informatik",
                "start": 1579158000,
                "end": 1579163400,
                "room": "1/111",
                "professor": "Pado"
            }, {
                "title": "Kommunikationssysteme-Verteilte Systeme",
                "start": 1579164300,
                "end": 1579169700,
                "room": "2/433",
                "professor": "Lückemeyer"
            }, {
                "title": "Software-Technik - Software-Engineering",
                "start": 1579170600,
                "end": 1579176000,
                "room": "2/433",
                "professor": "Wanner"
            }], "date": 1579129200
        }, {"lectures": [], "date": 1579215600}, {"lectures": []}, {
            "lectures": [],
            "date": 1579474800
        }, {
            "lectures": [{
                "title": "Statistik",
                "start": 1579602600,
                "end": 1579608000,
                "room": "3/111",
                "professor": "Knebusch"
            }], "date": 1579561200
        }, {
            "lectures": [{
                "title": "Software-Technik - Software-Engineering",
                "start": 1579682700,
                "end": 1579688100,
                "room": "1/022",
                "professor": "Wanner"
            }], "date": 1579647600
        }, {
            "lectures": [{
                "title": "Statistik",
                "start": 1579775400,
                "end": 1579780800,
                "room": "3/111",
                "professor": "Knebusch"
            }], "date": 1579734000
        }, {"lectures": [], "date": 1579820400}, {"lectures": []}, {
            "lectures": [],
            "date": 1580079600
        }, {"lectures": [], "date": 1580166000}, {"lectures": [], "date": 1580252400}, {
            "lectures": [],
            "date": 1580338800
        }, {"lectures": [], "date": 1580425200}, {"lectures": []}]
    },
    actions: {
        async refresh(context) {
            const dom = await fetchDOM("https://lsf.hft-stuttgart.de/qisserver/rds?state=wplan" +
                "&k_parallel.parallelid=99" +
                "&k_abstgv.abstgvnr=262" +
                "&week=4_2020&act=stg" +
                "&pool=stg" +
                "&show=plan" +
                "&P.vx=lang" +
                "&P.Print=");

            const table = dom.body.children[1];

            const grid = [];
            for (let i = 0; i < 49; i++) grid[i] = [];
            const rows = table.querySelectorAll("tr");

            const days = [];
            const columns = rows[0].querySelectorAll("th");
            for (let columnIndex = 0; columnIndex < 5; columnIndex++) {
                const column = columns[columnIndex];
                const date = column.querySelector(".klein").textContent;
                days.push(parseDate(date))
            }

            const lectures = [];
            for (let rowIndex = 2; rowIndex < 49; rowIndex++) {
                const row = rows[rowIndex];
                const skip = (rowIndex - 1) % 4 === 0 ? 2 : 1;

                const columns = row.children;
                // console.log(columns)
                for (let columnIndex = skip; columnIndex < columns.length; columnIndex++) {
                    const column = columns[columnIndex];

                    let x = 0;
                    while (grid[rowIndex][x]) x++;

                    const rowspan = parseInt(column.getAttribute("rowspan"));
                    if (!rowspan || isNaN(rowspan)) {
                        grid[rowIndex][x] = true;
                    } else {
                        for (let i = 0; i < rowspan; i++) {
                            grid[rowIndex + i][x] = true;
                        }

                        let title = column.querySelector("a.ver").textContent.trim();
                        title = title.substring(6)

                        const infos = column.querySelectorAll("td.notiz");

                        const dates = infos[0].textContent.trim().split(/-/);

                        const dayDate = days[x];
                        const startDate = new Date(dayDate);
                        const endDate = new Date(dayDate);
                        startDate.setHours(parseInt(dates[0].substring(0, 2)));
                        startDate.setMinutes(parseInt(dates[0].substring(3, 5)));
                        endDate.setHours(parseInt(dates[1].substring(1, 3)));
                        endDate.setMinutes(parseInt(dates[1].substring(4, 6)));

                        let room = infos[3].querySelector("a.ver").textContent.trim();
                        if (room.startsWith("BAU ")) {
                            room = room.substring(4);
                        }

                        const professor = infos[4].querySelector("a.ver").textContent.trim();
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

            context.commit("lectures", lectures)
            console.log(lectures)
        }
    },

    mutations: {
        lectures(state, lectures) {
            state.lectures = lectures;
        }
    }
}

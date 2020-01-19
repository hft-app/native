import {fetchDOM, parseDate} from "./fetch";

export default {
    namespaced: true,

    state: {
        events: []
    },

    actions: {
        async refresh(context) {
            const dom = await fetchDOM("https://www.hft-stuttgart.de/Aktuell/Hochschultermine/Wintersemester1920?set_language=de&cl=de");
            const tableEl = dom.getElementById("HTermin");
            const rowsEl = tableEl.querySelectorAll("tr");

            let events = [];

            for (let rowEl of rowsEl) {
                if (rowEl.children.length < 3) continue;

                const date = rowEl.children[0].textContent.split(/–/);

                const startDate = parseDate(date[0]).valueOf();
                let endDate;
                if(date[1]) {
                    endDate = parseDate(date[1]).valueOf();
                }

                const contentEl = rowEl.children[2];
                const titleEl = contentEl.querySelector("strong");
                let title;
                let description = contentEl.textContent;
                if (titleEl && titleEl.textContent) {
                    title = titleEl.textContent;
                    if (description.length > title.length) {
                        description = description.substring(title.length + 1);
                    }
                    title = title.trim();
                }
                description = description.trim();

                events.push({
                    startDate,
                    endDate,
                    title,
                    description
                })
            }
            context.commit("events", events)
        }
    },

    mutations: {
        events(state, events) {
            state.events = events;
        }
    }
}

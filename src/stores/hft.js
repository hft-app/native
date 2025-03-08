import { fetchDOM } from 'platform/fetch';

export default {
    namespaced: true,

    state: {
        events: []
    },

    actions: {
        async refresh(context) {
            // eslint-disable-next-line max-len
            const url = 'https://www.hft-stuttgart.de/veranstaltungen';
            const dom = await fetchDOM(url);
            const rowsEl = dom.querySelectorAll('.ce--events');

            let events = [];
            for (let rowEl of rowsEl) {
                const datesEl = rowEl.querySelectorAll('time');
                const startDate = new Date(datesEl[0].getAttribute('datetime'))
                let endDate;
                if (datesEl[1]) {
                    endDate = new Date(datesEl[1].getAttribute('datetime'))
                }

                let title = rowEl.querySelector('.events__content__title').textContent.trim();

                events.push({
                    startDate,
                    endDate,
                    title
                })
            }
            context.commit('events', events)
        }
    },

    mutations: {
        events(state, events) {
            state.events = events;
        }
    }
}
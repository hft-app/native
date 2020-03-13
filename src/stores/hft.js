import {fetchDOM} from 'platform/fetch';

export default {
  namespaced: true,

  state: {
    events: []
  },

  actions: {
    async refresh(context) {
      // eslint-disable-next-line max-len
      const url = 'https://www.hft-stuttgart.de/veranstaltungen-2';
      const dom = await fetchDOM(url);
      const rowsEl = dom.querySelectorAll('.col-lg-7');

      let events = [];
      for (let rowEl of rowsEl) {
        const dates = rowEl.querySelectorAll('time');
        const startDate = new Date(dates[0].getAttribute('datetime')).valueOf();
        let endDate;
        if (dates[1]) {
          endDate = new Date(dates[1].getAttribute('datetime')).valueOf();
        }

        let title = rowEl.querySelector('h2').textContent.trim();

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

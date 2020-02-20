import {config, createLocalVue, shallowMount} from '@vue/test-utils'
import Home from 'components/Home.vue';
import Vuex from 'vuex';
import 'hash-color'

config.mocks['$d'] = date => date.valueOf();
config.mocks['$t'] = str => str;
config.mocks['$tc'] = (str, n) => str + n;

describe('Home', () => {
  test('renders correctly', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const store = new Vuex.Store({
      state: {
        lastRefresh: new Date('Mon Feb 19 2020 09:30:00 GMT+0100').valueOf()
      },
      modules: {
        lsf: {
          state: {
            lectures: [{
              title: 'Algorithmische Geometrie',
              room: '2/433',
              start: new Date('Mon Feb 19 2020 08:00:00 GMT+0100'),
              end: new Date('Mon Feb 19 2020 09:30:00 GMT+0100'),
              professor: 'Müller'
            }, {
              title: 'Geo-Visualisierung',
              professor: 'Müller',
              start: new Date('Mon Feb 19 2020 10:30:00 GMT+0100'),
              end: new Date('Mon Feb 19 2020 12:00:00 GMT+0100')
            }, {
              title: 'Geschäftsprozessmanagement',
              start: new Date('Mon Feb 20 2020 08:00:00 GMT+0100'),
              end: new Date('Mon Feb 20 2020 09:30:00 GMT+0100')
            }, {
              title: 'Infoveranstaltung Informatik Bachelor-Thesis und Ausland',
              room: '5/U26',
              start: new Date('Mon Feb 21 2020 08:00:00 GMT+0100'),
              end: new Date('Mon Feb 21 2020 09:30:00 GMT+0100')
            }]
          }
        },
        hft: {
          state: {
            events: [{
              title: 'Stallfest',
              description: '@ Block4',
              startDate: new Date('Mon Feb 20 2020 03:00:00 GMT+0100')
            }]
          }
        }
      }
    });

    const wrapper = shallowMount(Home, {
      stubs: ['fa-icon', 'router-link'],
      localVue,
      store,
      data() {
        return {now: new Date('Mon Feb 19 2020 11:00:00 GMT+0100')}
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });
});

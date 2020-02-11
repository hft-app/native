import {config, createLocalVue, shallowMount} from '@vue/test-utils'
import Exams from 'components/Exams.vue';
import Vuex from 'vuex';

config.mocks['$t'] = str => str;

describe('Exams', () => {
  test('renders correctly', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const store = new Vuex.Store({
      modules: {
        lsf: {
          state: {
            exams: [{
              passed: true,
              grade: 1.7,
              title: 'Exam0',
              date: new Date('Mon Feb 10 2020 08:00:00 GMT+0100'),
              cp: 3,
              try: 1
            }, {
              passed: false,
              grade: 5.0,
              title: 'Exam1',
              cp: 3,
              try: 2
            }, {
              passed: true,
              title: 'Exam2',
              cp: 3,
              try: 3
            }, {
              passed: false,
              title: 'Exam3',
              date: new Date('Mon Feb 10 2020 08:00:00 GMT+0100'),
              cp: 6,
              try: 2
            }]
          }
        }
      }
    });

    const wrapper = shallowMount(Exams, {
      stubs: ['fa-icon'],
      localVue,
      store
    });
    expect(wrapper.element).toMatchSnapshot()
  });
});




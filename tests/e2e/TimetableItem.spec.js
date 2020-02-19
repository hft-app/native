import {config, shallowMount} from '@vue/test-utils'
import TimetableItem from 'components/TimetableItem.vue';
import 'hash-color'

config.mocks['$d'] = date => date.valueOf();

describe('TimetableItem', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(TimetableItem, {
      stubs: ['fa-icon'],
      propsData: {
        lecture: {
          title: 'Advanced Stuff',
          room: '2/433',
          professor: 'Müller',
          start: new Date('Mon Feb 10 2020 08:00:00 GMT+0100'),
          end: new Date('Mon Feb 10 2020 09:30:00 GMT+0100'),
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot()
  });

  test('renders correctly without room', () => {
    const wrapper = shallowMount(TimetableItem, {
      stubs: ['fa-icon'],
      propsData: {
        lecture: {
          title: 'Advanced Stuff',
          professor: 'Müller',
          start: new Date('Mon Feb 10 2020 08:00:00 GMT+0100'),
          end: new Date('Mon Feb 10 2020 09:30:00 GMT+0100'),
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot()
  });

  test('renders correctly without professor', () => {
    const wrapper = shallowMount(TimetableItem, {
      stubs: ['fa-icon'],
      propsData: {
        lecture: {
          title: 'Advanced Stuff',
          room: '2/433',
          start: new Date('Mon Feb 10 2020 08:00:00 GMT+0100'),
          end: new Date('Mon Feb 10 2020 09:30:00 GMT+0100'),
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot()
  })
});




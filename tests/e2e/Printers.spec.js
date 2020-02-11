jest.mock('../../src/data/printers.json', () => ([
  {
    'title': 'ITB_HPCLJ5550_2_114',
    'room': '2/114',
    'sizes': 'A3, A4',
    'type': 'Farbe'
  },
  {
    'title': 'ITB_HPLJ9040_2_201',
    'room': '2/201',
    'sizes': 'A3',
    'type': 'S/W'
  }
]), {virtual: true});

import {config, shallowMount} from '@vue/test-utils'
import Printers from 'components/Printers.vue';

config.mocks['$t'] = str => str;

describe('Printers', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Printers, {stubs: ['fa-icon']});
    expect(wrapper.element).toMatchSnapshot()
  });
});




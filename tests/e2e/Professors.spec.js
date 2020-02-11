jest.mock('../../src/data/professors.json', () => [
  {
    'name': 'Prof. Dr. Rick Sanchez',
    'phone': '+49 (0)711 1245 8901',
    'email': 'rick.sanchez@hft-stuttgart.de',
    'room': '3/232',
    'time': 'Donnerstag 11:20 - 12:20'
  },
  {
    'name': 'Prof. Dr.-Ing. Morty Smith',
    'phone': '+49 (0)711 1245 8910',
    'email': 'morty.smith@hft-stuttgart.de',
    'room': '1/201',
    'time': 'nach Vereinbarung'
  }
], {virtual: true});

import {config, shallowMount} from '@vue/test-utils'
import Professors from 'components/Professors.vue';

config.mocks['$t'] = str => str;

describe('Professors', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Professors, {stubs: ['fa-icon']});
    expect(wrapper.element).toMatchSnapshot()
  });

  test('renders correctly - filters', async () => {
    const wrapper = shallowMount(Professors, {stubs: ['fa-icon']});

    wrapper.find('.search').setValue('sAnchez');
    await wrapper.vm.$nextTick();

    expect(wrapper.element).toMatchSnapshot()
  });

  test('renders correctly - filters nothing found', async () => {
    const wrapper = shallowMount(Professors, {stubs: ['fa-icon']});

    wrapper.find('.search').setValue('dfg');
    await wrapper.vm.$nextTick();

    expect(wrapper.element).toMatchSnapshot()
  });
});




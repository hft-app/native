jest.mock('../../package.json', () => ({version: '2.0.1'}), {virtual: true});

import {config, createLocalVue, shallowMount} from '@vue/test-utils'
import Menu from 'components/Menu.vue';
import Vuex from 'vuex';

config.mocks['$d'] = date => date.valueOf();
config.mocks['$t'] = str => str;

describe('Menu', () => {
  test('renders correctly', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const store = new Vuex.Store({
      modules: {
        lsf: {
          namespaced: true,
          state: {
            fullname: 'Max Müller'
          }
        }
      }
    });

    const wrapper = shallowMount(Menu, {
      stubs: ['fa-icon'],
      localVue,
      store
    });
    expect(wrapper.element).toMatchSnapshot()
  });

  it('should logout', async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const $router = {
      push: jest.fn()
    };

    const store = new Vuex.Store({
      modules: {
        lsf: {
          namespaced: true,
          state: {
            fullname: 'Max Miller'
          }
        }
      }
    });
    store.dispatch = jest.fn();

    const wrapper = shallowMount(Menu, {
      stubs: ['fa-icon'],
      mocks: {
        $router,
      },
      localVue,
      store
    });

    wrapper.find('.logout').trigger('click');
    await wrapper.vm.$nextTick();

    expect(store.dispatch).toHaveBeenCalledWith('lsf/logout');
    expect($router.push).toHaveBeenCalledWith('/');
  });

  it('should navigate to courses', async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const $router = {
      push: jest.fn()
    };

    const store = new Vuex.Store({
      modules: {
        lsf: {
          namespaced: true,
          state: {
            fullname: 'Mac Müller'
          }
        }
      }
    });

    const wrapper = shallowMount(Menu, {
      stubs: ['fa-icon'],
      mocks: {
        $router,
      },
      localVue,
      store
    });

    wrapper.find('.widget:nth-child(2) .item').trigger('click');
    await wrapper.vm.$nextTick();

    expect($router.push).toHaveBeenCalledWith('subjects');
  });

  it('should share via mail', async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const store = new Vuex.Store({
      modules: {
        lsf: {
          namespaced: true,
          state: {
            fullname: 'Max Müller'
          }
        }
      }
    });

    window.open = jest.fn();

    const wrapper = shallowMount(Menu, {
      stubs: ['fa-icon'],
      localVue,
      store
    });

    wrapper.find('.widget:nth-child(3) .item').trigger('click');
    await wrapper.vm.$nextTick();

    expect(window.open).toHaveBeenCalledWith(
      'mailto:?to=&subject=Lad%20dir%20jetzt%20die%20neue%20HFT%20App&body=https%3A%2F%2Fhft-app.de');
  });
});

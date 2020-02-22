import {config, shallowMount} from '@vue/test-utils'
import MealPicture from 'components/MealPicture.vue';
import 'hash-color'

config.mocks['$t'] = str => str;

describe('MealPicture', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(MealPicture, {
      stubs: ['fa-icon'],
      propsData: {
        meal: {
          title: 'Spätzle mit Soß',
          photo: 'photo123.jpg',
          price: '2,85'
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });

  test('renders correctly - default photo', () => {
    const wrapper = shallowMount(MealPicture, {
      stubs: ['fa-icon'],
      propsData: {
        meal: {
          title: 'Spätzle mit Soß',
          price: '2,85'
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });
});

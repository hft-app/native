import {fetchJSON} from 'platform/fetch';

export default {
  namespaced: true,

  state: {
    meals: []
  },

  actions: {
    async refresh(context) {
      let response = await fetchJSON('https://sws.maxmanager.xyz/extern/mensa_central.json');
      const newMealsByDay = Object.values(response)[0];

      let meals = {};
      for (let day in newMealsByDay) {
        let newMeals = newMealsByDay[day];

        meals[day] = newMeals.map(meal => {
          let title = meal.meal;
          if (meal.description) {
            title += ', ' + meal.description;
          }
          return {
            title,
            attributes: meal.additives.replace(/,/g, ', '),
            price: meal.price1,
            photo: meal.foto
          }
        })
      }
      context.commit('meals', meals);
    }
  },

  mutations: {
    meals(state, meals) {
      state.meals = meals;
    }
  },
  plugins: []
}

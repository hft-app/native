import {fetchJSON} from "./fetch";


export default {
    namespaced: true,

    state: {
        meals: []
    },

    actions: {
        async refresh(context) {
            let response = await fetchJSON('https://sws.maxmanager.xyz/extern/mensa_stuttgart-mitte.json');
            const newMealsByDay = Object.values(response)[0];

            let meals = {};
            for (let day in newMealsByDay) {
                let newMeals = newMealsByDay[day];

                meals[day] = newMeals.map(meal => {
                    return {
                        title: meal.meal,
                        additives: meal.additives,
                        price: meal.price1,
                        photo: meal.foto
                    }
                })
            }
            context.commit("meals", meals);
        }
    },

    mutations: {
        meals(state, meals) {
            state.meals = meals;
        }
    },
    plugins: []
}

import Vue from 'vue';
import Vuex from 'vuex'

import swsStore from './sws'
import lsfStore from './lsf'
import hftStore from './hft'
import {VuexPersistence} from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ["sws", "hft", "lsf"]
});

export default new Vuex.Store({
    state: {
        refreshing: false,
    },
    modules: {
        sws: swsStore,
        lsf: lsfStore,
        hft: hftStore,
    },
    actions: {
        async refresh(context, credentials) {
            context.commit("refreshing", true);
            try {
                if (credentials) {
                    await context.dispatch("lsf/login", credentials);
                }
                await Promise.all([
                    context.dispatch("sws/refresh"),
                    context.dispatch("hft/refresh"),
                    context.dispatch("lsf/refresh", {skipLogin: !!credentials})
                ]);
            } catch (e) {
                console.error(JSON.stringify(e));
                if (e.type) {
                    throw e;
                } else if (e.constructor.name === "TypeError") {
                    throw {type: "offline"}
                } else {
                    throw {type: "unknown"}
                }
            } finally {
                context.commit("refreshing", false);
            }
        }
    },
    mutations: {
        refreshing(state, refreshing) {
            state.refreshing = refreshing;
        }
    },
    plugins: [vuexLocal.plugin]
})

import Vue from 'vue';
import Vuex from 'vuex'

import swsStore from './sws'
import lsfStore from './lsf'
import hftStore from './hft'
import {VuexPersistence} from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

export default new Vuex.Store({
    modules: {
        sws: swsStore,
        lsf: lsfStore,
        hft: hftStore,
    },
    actions: {
        async refresh(context) {
            await Promise.all([
                context.dispatch("sws/refresh"),
                context.dispatch("hft/refresh"),
                context.dispatch("lsf/refresh")
            ]);
        }
    },
    plugins: [vuexLocal.plugin]
})

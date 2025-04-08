import Vue from 'vue';
import Vuex from 'vuex'

import swsStore from './sws'
import lsfStore from './lsf'
import hftStore from './hft'
import { VuexPersistence } from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['sws', 'hft', 'lsf'],
});

export default new Vuex.Store({
    state: {
        refreshing: false,
        lastRefresh: localStorage.getItem('lastRefresh')
    },
    modules: {
        sws: swsStore,
        lsf: lsfStore,
        hft: hftStore,
    },
    actions: {
        async refresh(context, { credentials, force = false } = {}) {
            if (context.state.refreshing || !credentials && !context.state.lsf.credentials) return;
            const lastRefreshDuration = Date.now() - context.state.lastRefresh;

            if (force || lastRefreshDuration > 864E5) {
                context.commit('refreshing', true);
                try {
                    if (credentials) {
                        await context.dispatch('lsf/login', credentials);
                    }

                    await Promise.all([
                        context.dispatch('sws/refresh'),
                        context.dispatch('hft/refresh'),
                        context.dispatch('lsf/refresh', { skipLogin: !!credentials })
                    ]);
                    context.commit('lastRefresh', Date.now())
                } catch (e) {
                    if (e.type === "invalidCreds") {
                        throw e;
                    } else {
                        console.error(e);
                    }
                } finally {
                    context.commit('refreshing', false);
                }
            }
        }
    },
    mutations: {
        refreshing(state, refreshing) {
            state.refreshing = refreshing;
        },

        lastRefresh(state, lastRefresh) {
            state.lastRefresh = lastRefresh;
            localStorage.setItem('lastRefresh', lastRefresh);
        }
    },
    plugins: [vuexLocal.plugin]
})
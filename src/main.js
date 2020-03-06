import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'

import Nav from './components/Nav.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue';
import Timetable from './components/Timetable.vue';
import Meals from './components/Meals.vue'
import MealPicture from './components/MealPicture.vue'
import Events from './components/Events.vue'
import Exams from './components/Exams.vue'
import Menu from './components/Menu.vue'
import Subjects from './components/Subjects.vue';
import Courses from './components/Courses.vue'
import store from './stores/store';
import langDE from './lang/de.json'
import HashColor from  './hash-color'
import Icons from  './icons'

import './index.scss'

Vue.use(VueRouter);
Vue.use(VueI18n);

const dateTimeFormats = {
  'en': {
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  },
  'de': {
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false
    },
    short: {
      weekday: 'long', month: 'long', day: 'numeric'
    },
    weekday: {
      weekday: 'long'
    },
    day: {
      month: 'long', day: 'numeric'
    },
    time: {
      hour: 'numeric', minute: 'numeric', hour12: false
    }
  }
};

const i18n = new VueI18n({
  locale: 'de',
  messages: {
    de: langDE
  },
  dateTimeFormats
});

const routes = [
  {
    path: '/', component: Login, meta: {hideNav: true}, beforeEnter: (to, from, next) => {
      if (store.getters['lsf/isLoggedIn']) {
        next({path: '/home'})
      } else {
        next()
      }
    }
  },
  {path: '/home', component: Home},
  {path: '/timetable', component: Timetable},
  {path: '/meals', component: Meals},
  {
    path: '/mealpicture',
    name: 'mealpicture',
    component: MealPicture,
    meta: {hideNav: true, canGoBack: true},
    props: true
  },
  {path: '/events', component: Events},
  {path: '/exams', component: Exams},
  {path: '/menu', component: Menu, meta: {canGoBack: true}},
  {path: '/subjects', component: Subjects, meta: {canGoBack: true}},
  {path: '/courses', component: Courses, meta: {canGoBack: true}, props: true},
  {
    path: '/professors',
    component: () => import(/* webpackChunkName: "page-professors" */  './components/Professors.vue'),
    meta: {canGoBack: true}
  },
  {
    path: '/printers',
    component: () => import(/* webpackChunkName: "page-printers" */  './components/Printers.vue'),
    meta: {canGoBack: true}
  },
  {
    path: '/tips',
    component: () => import(/* webpackChunkName: "page-tips" */  './components/Tips.vue'),
    meta: {canGoBack: true}
  },
  {
    path: '/licenses',
    component: () => import(/* webpackChunkName: "page-license" */  './components/Licenses.vue'),
    meta: {canGoBack: true}
  },
  {
    path: '/imprint',
    component: () => import( /* webpackChunkName: "page-imprint" */ './components/Imprint.vue'),
    meta: {canGoBack: true}
  },
];

const router = new VueRouter({
  routes
});

document.addEventListener('deviceready', () =>
    document.addEventListener('backbutton', () => {
      if (router.currentRoute.meta.canGoBack) {
        navigator.app.backHistory();
      } else {
        navigator.app.exitApp();
      }
    }, false),
  false);

Vue.use(HashColor);
Vue.use(Icons);
Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: createEle => createEle(Nav),
}).$mount('#app');

store.dispatch('refresh');

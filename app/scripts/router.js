import Vue from 'vue';
import Router from 'vue-router';

import HeaderComponent from 'components/header';
import ChooseComponent from 'components/choose';

Vue.use(Router);

const routes = [
  {
    path: '/',
    components: {
      header: HeaderComponent,
    },
  },
  {
    path: '/choose',
    components: {
      default: ChooseComponent,
      header: HeaderComponent,
    }
  },
  {
    path: '/assign',
    components: {
      header: HeaderComponent,
    },
  },
  {
    path: '/profile',
    components: {
      header: HeaderComponent,
    },
  },
  {
    path: '/manage',
    components: {
      header: HeaderComponent,
    },
  },
  {
    path: '*',
    redirect: '/',
  }
];

export default new Router({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { x: 0, y: 0 };
  },
});

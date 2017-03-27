import Vue from 'vue';
import Router from 'vue-router';
import HeaderComponent from 'components/header';


Vue.use(Router);

const routes = [
  {
    path: '/',
    components: {
      HeaderComponent,
    },
  },
  {
    path: '/elegir',
    components: {
      HeaderComponent,
    }
  },
  {
    path: '/elegir',
    components: {
      HeaderComponent,
    },
  },
];

export default new Router({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { x: 0, y: 0 };
  },
});

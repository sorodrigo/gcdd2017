import Vue from 'vue';
import Router from 'vue-router';

import datasource from 'datasource';

import HeaderComponent from 'components/header';
import ModalComponent from 'components/modal';
import TableComponent from 'components/table';

Vue.use(Router);

const routes = [
  {
    path: '/',
    components: {
      header: HeaderComponent
    },
  },
  {
    path: '/profile',
    components: {
      header: HeaderComponent,
    },
  },
  {
    path: '/:datasource',
    beforeEnter: (to, from, next) => ((to.params.datasource in datasource) ? next() : next('/')),
    components: {
      default: TableComponent,
      header: HeaderComponent,
      modal: ModalComponent
    },
    props: {
      default: route => ({ ...datasource[route.params.datasource] }),
    }
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

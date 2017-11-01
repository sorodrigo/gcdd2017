import Vue from 'vue';
import Router from 'vue-router';

import datasource from 'datasource';

import HeaderComponent from 'components/header';
import ModalComponent from 'components/modal';
import TableComponent from 'components/table';
import FormComponent from 'components/form';

Vue.use(Router);

const handlers = {
  dataSource: (to, from, next) => ((to.params.datasource in datasource) ? next() : next('/'))
};

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
    beforeEnter: handlers.dataSource,
    components: {
      default: TableComponent,
      header: HeaderComponent,
      modal: ModalComponent
    },
    props: {
      default: route => ({ ...datasource[route.params.datasource] }),
    },
  },
  {
    path: '/:datasource/:action/:id?',
    beforeEnter: handlers.dataSource,
    components: {
      header: HeaderComponent,
      default: FormComponent
    },
    props: {
      default: true,
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

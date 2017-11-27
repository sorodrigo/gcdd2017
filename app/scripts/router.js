import Vue from 'vue';
import Router from 'vue-router';

import { entities } from 'app/datasource.schema.json';

import HeaderComponent from 'components/header';
import ModalComponent from 'components/modal';
import TableComponent from 'components/table';
import FormComponent from 'components/form';
import ProfileComponent from 'components/profile';
import HomeComponent from 'components/home';
import LoginComponent from 'components/login';

import store from './store';

Vue.use(Router);

const entityAllowedActions = ['new', 'edit', 'view'];

const handlers = {
  isLoggedIn: (to, from, next) => {
    if (!store.state.authentication.loggedIn) {
      return next('/');
    }
    return next();
  },
  entity: (to, from, next) => {
    const { entity, action } = to.params;
    if (!(entity in entities)) return next('/');
    if (entities[entity].auth && !store.state.authentication.loggedIn) return next('/');
    if (action && !entityAllowedActions.includes(action)) return next(`/${entity}`);
    return next();
  }
};

const routes = [
  {
    path: '/',
    components: {
      default: HomeComponent,
      header: HeaderComponent
    },
  },
  {
    path: '/login',
    components: {
      default: LoginComponent,
      header: HeaderComponent,
    },
  },
  {
    path: '/profile',
    beforeEnter: handlers.isLoggedIn,
    components: {
      default: ProfileComponent,
      header: HeaderComponent,
    },
  },
  {
    path: '/:entity',
    beforeEnter: handlers.entity,
    components: {
      default: TableComponent,
      header: HeaderComponent,
      modal: ModalComponent
    },
    props: {
      default: route => ({ ...entities[route.params.entity] }),
    },
  },
  {
    path: '/:entity/:action/:id?',
    beforeEnter: handlers.entity,
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

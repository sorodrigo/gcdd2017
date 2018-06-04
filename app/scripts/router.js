import Vue from 'vue';
import Router from 'vue-router';
import capitalize from 'lodash/capitalize';

import { entities, appName } from 'app/datasource.schema.json';

import HeaderComponent from 'components/header';
import ModalComponent from 'components/modal';
import TableComponent from 'components/table';
import FormComponent from 'components/form';
import ProfileComponent from 'components/profile';
import HomeComponent from 'components/home';
import LoginComponent from 'components/login';

import store from './store';

store.dispatch('checkAuth');

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

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  const { entity, action, id } = to.params;
  let title = appName;
  if (to.path !== '/') {
    if (entity) {
      title += ` – ${capitalize(entity)}`;

      if (action) title += ` – ${capitalize(action)}`;
      if (id) title += ` – ${id}`;
    } else {
      const subtitle = to.path.substring(1);
      title += ` – ${capitalize(subtitle)}`;
    }
  }
  document.title = title;
  next();
});

export default router;

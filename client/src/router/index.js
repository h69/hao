import Vue from 'vue';
import Router from 'vue-router';
import Index from '../page/Index';
import Admin from '../page/Admin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
});

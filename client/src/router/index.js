import Vue from 'vue';
import Router from 'vue-router';
import Index from '../page/Index';
import Admin from '../page/Admin';
import Browser from '../page/Browser';

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
    },
    {
      path: '/browser',
      name: 'Browser',
      component: Browser
    }
  ]
});

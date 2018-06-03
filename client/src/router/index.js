import Vue from 'vue';
import Router from 'vue-router';
import Index from '../components/page/Index';
import Admin from '../components/page/Admin';

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

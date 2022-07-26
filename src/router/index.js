import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import ClientesView from '../views/ClientesView.vue';
import store from '../store/store.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LoginView
    },
    {
      path: '/clientes',
      name: 'Clientes',
      component: ClientesView,
      meta: {
        needsAuth: true
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.meta.needsAuth && store.getters.isAdmin){
    next();
  } else if (to.meta.needsAuth && !store.getters.isAdmin){
    next('/login');
  } else {
    next();
  }
});

export default router
import { createRouter, createWebHashHistory } from 'vue-router';

const Home = () => import('../pages/Home.vue');
const JymCircle = () => import('../pages/JymCircle.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/circle',
    name: 'circle',
    component: JymCircle,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

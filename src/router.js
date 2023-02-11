import { createRouter, createWebHistory } from "vue-router";
import Home from './pages/Home.vue'
import NotFound from './pages/NotFound.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/not-found',
      component: NotFound
    }
  ]
})

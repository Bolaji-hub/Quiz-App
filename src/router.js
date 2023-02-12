import { createRouter, createWebHistory } from "vue-router";
import Home from './pages/Home.vue'
import Category from './pages/Category.vue'
import NotFound from './pages/NotFound.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/category/:id',
      component: Category,
    },
    {
      path: '/not-found',
      component: NotFound
    }
  ]
})

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewPostView from '@/views/NewPostView.vue'
import ProfileView from '@/views/ProfileView.vue'
import LoginView from '@/views/LoginView.vue'
import BlogView from '@/views/BlogView.vue'
import PromptView from '@/views/PromptView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/new-post',
      name: 'new-post',
      component: NewPostView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/prompt',
      name: 'prompt',
      component: PromptView
    }, 
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogView
    }
  ],
})

export default router

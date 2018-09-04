import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/pages/LandingPage'
import LandingPageLayout from '@/layouts/LandingPageLayout'
import NotFound from '@/pages/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: LandingPageLayout,
      children: [
        {
          path: '',
          component: LandingPage
        },
        {
          path: 'Dashboard',
          component: () => require('@/pages/Dashboard')
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

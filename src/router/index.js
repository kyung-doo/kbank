import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Search from '@/pages/Search'
import TimeseriesHub from '@/pages/TimeseriesHub'
import Mypage from '@/pages/Mypage'

Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/timeseries-hub',
      name: 'TimeseriesHub',
      component: TimeseriesHub
    },
    {
      path: '/mypage',
      name: 'Mypage',
      component: Mypage
    }
  ]
})

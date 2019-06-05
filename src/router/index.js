import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import TimeseriesHub from '@/pages/TimeseriesHub'
import MicrodataHub from '@/pages/MicrodataHub'
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
      path: '/timeseries-hub',
      name: 'TimeseriesHub',
      component: TimeseriesHub
    },
    {
      path: '/microdata-hub',
      name: 'MicrodataHub',
      component: MicrodataHub
    },
    {
      path: '/mypage',
      name: 'Mypage',
      component: Mypage
    }
  ]
})

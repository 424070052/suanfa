import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LayOut from '@/layout/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: LayOut,
      children:[
        {
          path: 'beibao',
          name: 'beibao',
          component: () => import('@/view/beibao/index.vue')
        }
      ]
    }
  ]
})

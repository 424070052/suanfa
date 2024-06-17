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
<<<<<<< HEAD
=======
        },
        {
          path:'short',
          name:'short',
          component: () => import('@/view/short/short.vue')
>>>>>>> c42c92219fc179164a83d93a1f728307be5592c6
        }
      ]
    }
  ]
})

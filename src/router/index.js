import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/Home/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:{name:'home'}
  },
  {
    path: '/home/:id',
    name: 'home',
    component: HomeView,
    children:[
      {
        path:'viewAccount',
        name:'view-account',
        component:() => import ("../views/Home/ViewAccount/index.vue")
      },
      {
        path:'addAccount',
        name:'add-account',
        component:() => import ("../views/Home/AddAccount/index.vue")
      },
      {
        path:'AccountAnalysis',
        name:'account-analysis',
        component:() => import ("../views/Home/AccountAnalysis/index.vue")
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:()=>import("../views/Login/LoginView.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 设置路由守卫
router.beforeEach((to,from,next)=>{
  const token = sessionStorage.getItem('token')
  if (to.name !== 'login' && !token) {
    next({name:'login'})
  }else{
    next()
  }
})
export default router

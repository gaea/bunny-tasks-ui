import Vue from 'vue'
import VueRouter from 'vue-router'
import UserList from '../views/UserList.vue'
import UserShow from '../views/UserShow.vue'
import UserCreate from '../views/UserCreate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'user-list',
    component: UserList
  },
  {
    path: '/user/:id',
    name: 'user-show',
    component: UserShow,
    props: true
  },
  {
    path: '/user/create',
    name: 'user-create',
    component: UserCreate
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import KArea from '../views/K-Area.vue'
import Taxonomia from '../views/Taxonomia.vue'
import KUnit from '../views/KUnit.vue'
import Research from '../views/Research.vue'
import WorkRoles from '../views/WorkRole.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/karea',
    name: 'KArea',
    component: KArea,
  },
  {
    path: '/:idKA/:idKU-:KUName',
    name: 'KUnit',
    component: KUnit,
  },
  {
    path: '/:idKA/:idKU/:researchName-:sectorId',
    name: 'Research',
    component: Research,
  },
  {
    path: '/:wrId-:wrName',
    name: 'WorkRoles',
    component: WorkRoles,
  },
  {
    path: '/taxonomyChart',
    name: 'Taxonomia',
    component: Taxonomia
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router

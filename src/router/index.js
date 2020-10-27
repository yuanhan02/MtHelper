import Vue from 'vue'
import VueRouter from 'vue-router'

// const VueRouterPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return VueRouterPush.call(this, location).catch(error=> error)
// }

Vue.use(VueRouter)

//路由懒加载
// const Home = ()=>import('../pages/Home/Home.vue')

const routes = [
  {
    path: '/',
		name: 'home',
    component: ()=>import('../pages/Home/Home.vue')
  },
	{
	  path: '/home',
		name: 'home',
	  component: ()=>import('../pages/Home/Home.vue')
	},
	{
	  path: '/search',
		name: 'search',
	  component: ()=>import('../pages/Search/Search.vue')
	},
	{
	  path: '/notes',
		name: 'notes',
	  component: ()=>import('../pages/Notes/Notes.vue')
	},
	{
	  path: '/me',
		name: 'me',
	  component: ()=>import('../pages/Me/Me.vue')
	},
	{
	  path: '/login',
		name: 'login',
	  component: ()=>import('../pages/Login/Login.vue')
	},
	{
	  path: '/register',
		name: 'register',
	  component: ()=>import('../pages/Register/Register.vue')
	},

]


const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})



export default router

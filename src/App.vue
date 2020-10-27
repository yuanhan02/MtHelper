<template>
  <div id="app">
		<Navbar></Navbar>
		<router-view></router-view>
		<Tabbar></Tabbar>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
import Tabbar from './components/Tabbar.vue'
export default {
	name:'app',
	components:{
		Navbar,
		Tabbar
	}
}
</script>
<style>
	
</style>
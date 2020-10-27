<template>
	<div class="tabbar">
		<van-tabbar route v-model="active" active-color="#07c160" inactive-color="#000"	 safe-area-inset-bottom>
		  <van-tabbar-item icon="home-o" replace to="/home">主页</van-tabbar-item>
		  <van-tabbar-item icon="search" replace to="/search">搜索</van-tabbar-item>
		  <van-tabbar-item icon="notes-o" replace to="/notes">任务</van-tabbar-item>
		  <van-tabbar-item icon="user-circle-o" replace to="/me">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	data(){
		return {
			active:'0'
		}
	},
	methods:{
		onChange(index) {
		      Notify({ type: 'primary', message: index });
		},
	}
}
</script>

<style>
</style>

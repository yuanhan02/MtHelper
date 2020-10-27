<template>
	<div class="container">
		<div class="search">
			<van-search
				v-model="tkl"
				shape="round"
				show-action
				placeholder="请输入淘口令"
				@search="onSearch"
			>
			<template #action>
			    <div @click="onSearch">搜索</div>
			</template>
			</van-search>
		</div>
		<div class="contents">
			<div class="empty" v-show="active == 'empty'">
				<van-empty image="search" description="暂无搜索" />
			</div>
			<div class="info" v-show="active == 'info'">
				<van-divider
				  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
				>
				  查询结果
				</van-divider>
				<van-cell-group>
<!-- 				  <van-cell title="淘宝UID" v-model="uid" /> -->
				  <van-cell title="淘宝昵称" v-model="nick" />
					<van-cell title="中签时间" v-model="obtainTime" />
					<van-cell title="抽签结果" v-model="msg" />
				</van-cell-group>
			</div>
		</div>
	</div>
	
</template>

<script>
export default {
	data(){
		return {
			tkl:'',
			uid:'',
			nick:'',
			obtainTime:'',
			msg:'',
			active:'empty'
		}	
	},
	methods:{
		onSearch(val){
			let tkl = this.tkl;
			let data = '{"tkl":"' + tkl + '"}';
			data = encodeURI(data);
			let url = '/mt2_api.php';
			this.$axios.get(url,{
				params:{
					act:'checkCard',
					data:data
				}
			}).then(res=>{
				let obj = res.data;
				console.log(obj);
				this.uid = obj.data.uid;
				this.obtainTime = this.$formatDate(parseInt(obj.data.obtainTime),'yyyy-MM-dd HH:mm:ss');
				this.nick = obj.data.nick;
				if(obj.code == '200'){
					this.msg = '恭喜你中签啦';
				}else{
					this.msg = '暂未中签';
				}
				this.active = 'info';
			})
		},
		onCancel(){
			this.$toast('取消搜索');
		}
	}
}

</script>

<style>
</style>

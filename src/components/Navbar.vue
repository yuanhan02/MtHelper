<template>
	<div>
		<van-nav-bar 
		title="茅台小助手 mt.weixihang.com"
		style="background:#4fc08d ;" 
		>
		</van-nav-bar>
		<van-notice-bar :scrollable="true" :text="noticeText" left-icon="volume-o"  mode="closeable"/>
	</div>
</template>

<script>
export default{
	data(){
		return {
			noticeText:''
		}
	},
	methods:{
		//获取通知
		getNotice(){
			let data = '{"type":"all","num":"10"}';
			data = encodeURI(data);
			let url = '/mt2_api.php';
			this.$axios.get(url,{
				params:{
					act:'getNotice',
					data:data
				}
			}).then(res=>{
				let obj = res.data;
				let text = '';
				for(let i = 0,len = obj.length;i<len;i++){	
					text += '恭喜' + obj[i].nick + '已于'+ obj[i].obtain_time +'集齐卡片！ ' + '\r\n';
				}
				this.noticeText = text;
			})	
		}
	},
	created(){
		this.getNotice();
	}
}
</script>

<style>
</style>

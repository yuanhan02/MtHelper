<template>
	<div class="container">
		<van-tabs v-model="active">
		  <van-tab title="剩余卡片">
				<div>
					<van-cell title="选择日期" :value="date1" @click="show1 = true" />
					<van-calendar v-model="show1" :min-date="minDate" :max-date="maxDate" color="#07c160" @confirm="onConfirm1" />
					<ve-line :data="chartData1" :settings="chartSettings1"></ve-line>
				</div>
			</van-tab>
		  <van-tab title="集齐人数">
				<div>
					<van-cell title="选择日期" :value="date2" @click="show2 = true" />
					<van-calendar v-model="show2" :min-date="minDate" :max-date="maxDate" color="#07c160" @confirm="onConfirm2" />
					<ve-histogram :data="chartData2" :settings="chartSettings2"></ve-histogram>
				</div>
			</van-tab>
			<van-tab title="库存分布">
				<div>
					<van-cell title="选择日期" :value="date3" @click="show3 = true" />
					<van-calendar v-model="show3" :min-date="minDate" :max-date="maxDate3" color="#07c160" @confirm="onConfirm3" />
					<ve-bar :data="chartData3" :settings="chartSettings3" :extend="extend" :judge-width="true" height="520px"></ve-bar>
				</div>
			</van-tab>
		</van-tabs>
		
	</div>
</template>

<script>

export default {
	data(){
		this.extend = {
		  'yAxis.0.axisLabel.interval': 0
		}
		this.chartSettings1 = {
			labelMap: {
			  'time': '时间',
			  'process': '卡片剩余(%)'
			},
		  xAxisType: 'time'
		}
		this.chartSettings2 = {
			labelMap: {
			  'time': '时间',
			  'count': '数量'
			},
		  xAxisType: 'time',
			legendName: {
        '数量': '今日共集齐 : '
      }
		}
		this.chartSettings3 = {
			labelMap: {
			  'area': '地区',
			  'stock': '库存'
			}
		}
		return {
			active:0,
			date1:'',
			date2:'',
			date3:'',
			show1:false,
			show2:false,
			show3:false,
			minDate: new Date(2020, 4, 16),
			maxDate: new Date(2020, 4, 31),
			maxDate3: new Date(),
			chartData1:{
				columns:['time','process'],
				rows:[
					{'time':'','process':0}
				]
			},
			chartData2:{
				columns:['time','count'],
				rows:[
					{'time':'','count':10}
				]
			},
			chartData3:{
				metrics: ['stock'],
				dimension: ['area'],
				columns:['area','stock'],
				rows:[
					{'area':'北京','stock':10}
				]
			}
		}
	},
	methods:{
		filterStock(arr){
			for(let i = 0,len = arr.length; i < len; i++){
				let area = arr[i].area + '-' + parseInt(arr[i].stock);
				arr[i].area = area;
			}
			return arr;
		},
		onConfirm1(date){
			this.show1 = false;
			date = this.$formatDate(date,'yyyy-MM-dd');
			this.date1 = date;
			let data = '{"date":"' + date + '"}';
			data = encodeURI(data);
			let url = '/mt2_api.php';
			this.$axios.get(url,{
				params:{
					act:'getProcess',
					data:data
				}
			}).then(res=>{
				let obj = res.data;
				// console.log(obj);
				this.chartData1.rows = obj;
			})
		},
		onConfirm2(date){
			this.show2 = false;
			date = this.$formatDate(date,'yyyy-MM-dd');
			this.date2 = date;
			let data = '{"date":"' + date + '"}';
			data = encodeURI(data);
			let url = '/mt2_api.php';
			this.$axios.get(url,{
				params:{
					act:'getCount',
					data:data
				}
			}).then(res=>{
				let obj = res.data;
				// console.log(obj);
				this.chartData2.rows = obj;
				let sum = 0;
				for(let i = 0,len = obj.length;i<len;i++){
					sum += parseInt(obj[i].count);
				}
				this.chartSettings2.legendName['数量'] = '今日共集齐:' + sum;
			})
		},
		onConfirm3(date){
			this.show3 = false;
			date = this.$formatDate(date,'yyyy-MM-dd');
			this.date3 = date;
			let data = '{"date":"' + date + '"}';
			data = encodeURI(data);
			let url = '/mt2_api.php';
			this.$axios.get(url,{
				params:{
					act:'getStock',
					data:data
				}
			}).then(res=>{
				let obj = this.filterStock(res.data);
				// console.log(obj);
				this.chartData3.rows = obj;
			})
		}
	}	
}
</script>

<style>
</style>

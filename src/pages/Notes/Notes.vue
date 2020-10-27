<template>
	<div>
		<van-dialog  v-model="showDialog"  show-cancel-button :beforeClose="beforeClose">
		   <van-field
			    v-model="editArr.helpedTimes"
		      label="数量"
		      placeholder="请输入已助力数量"
					type="digit"
		   />
			 <van-cell>
			 状态：<select name="public-choice" v-model="editArr.status" @change="getStatusSelected">                                        
			     <option :value="op.value" v-for="op in option1" >{{op.text}}</option>                                    
			 </select>
			 </van-cell>
			<!-- <van-field
			    v-model="editArr.status"
			    label="状态"
			    placeholder="请选择要修改的状态"
			 		is-link
					@focus="showStatusChoice=true"
			 /> -->
		</van-dialog>
		<van-dropdown-menu>
		  <van-dropdown-item v-model="value1" :options="option1" @change="changeDropdown"/>
		</van-dropdown-menu>
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
		  <van-list
		    v-model="loading"
		    :finished="finished"
		    finished-text="没有更多了"
		    @load="onLoad"
		  >
		  <van-cell v-for="(item,index) in list" :key="index"  >
					<div class="van-cell">
							<div class="van-cell__title">
								<span>{{index+1}}. 任务ID: {{item.id}} </span>
								<div class="van-cell__label">昵称:{{item.nick}}</div>
							</div>
						<div class="van-cell__value ">
							<span :class="{'van-panel__header-value':item.status==1}">{{statusFormat(item.status)}}</span>
							<div class="van-cell__label">助力次数:{{item.helped_times | parseInt}}<span v-show="item.onway_times>0">/{{item.onway_times | parseInt}}</span></div>
						</div>
					</div>
					<div class="van-cell"><div style="user-select:text" class=" van-cell__label">淘口令:{{item.tkl}}</div></div>
					<div class="van-cell"  v-show="item.status!= 0 && item.status!= 9"><div class="van-cell__label">中签时间{{item.obtain_time | formatDate('yyyy-MM-dd HH:mm:ss')}}</div></div>
					<div class="van-cell"><div style="user-select:text" class=" van-cell__label">微信:{{item.wx}}</div></div>
					<div class="van-cell">
						<div style="user-select:text">备注:{{item.notes}}</div>
						<div class="button-right">
							<span v-show="item.userid=='1001'">
								<van-button v-if="item.shua == 0" size="small" type="primary" :round="true" @click="editShua(item.id,index,1)">开启</van-button>
								<van-button v-else size="small" type="primary" :round="true" @click="editShua(item.id,index,0)">关闭</van-button>
							</span>
							<van-button size="small" type="primary" :round="true" @click="edit(item.id,index,item.status,item.helped_times)">修改</van-button>
							<van-button size="small" type="danger" :round="true" @click="del(item.id,index)">删除</van-button>
						</div>
					</div>
					
			</van-cell>
		  </van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
import { Dialog } from 'vant';
export default {
	components: {
	    [Dialog.Component.name]: Dialog.Component
	},
	data(){
		return {
			value1:99,
			showDialog:false,
			editArr:{
					index:0,
					id:0,
					status:0,
					helpedTimes:''
			},
			helpedTimes:'',
			showStatusChoice:null,
			statusSelected:null,
			option1: [
			  { text: '全部任务', value: 99 },
				{ text: '抽签中', value: 0 },
			  { text: '已中签', value: 1 },
				{ text: '已下单', value: 2 },
			  { text: '已发货', value: 3 },
				{ text: '已签收', value: 4 },
				{ text: '未中签', value: 9 },
			],
			status:0,
			list: [],
			loading: false,
			finished: false,
			refreshing: false,
			currentPage:0,	
		}
	},
	methods:{
		getStatusSelected(){
			
		},
		changeDropdown(){
			//下拉菜单改变将list数组、currentPage页面初始化重新获取
			this.refreshing = true;
			this.onRefresh();
		},
		onLoad() {
			//如果刷新将list数组、currentPage页面初始化重新获取
			if (this.refreshing) {
			  this.list = [];
				this.currentPage = 0;
			  this.refreshing = false;
			}
			let data = {
				status:this.value1,
				currentPage: this.currentPage,
				pageSize: 10
			};
			this.currentPage += 1;
			data = JSON.stringify(data);
			data = encodeURI(data);
			let url = '/mt2_api.php';
			this.$axios.get(url,{
				params:{
					act:'getNotes',
					data:data
				}
			}).then(res=>{
				let obj = res.data;
				console.log(obj);
				let total = obj.data.total;
				let code = obj.code;
				if(code == 400){
					this.$toast('未登录或已过期，请重新登录!');
						this.$router.push({
							path:'/login'
						});	
					return;
				}
				if(total == undefined || total == 0 || total == ""){
					this.loading = false;
					this.finished = true;
				}else{
					this.list = this.list.concat(obj.data.result);
					console.log(this.list);
					this.loading = false;
					if (this.list.length >= total) {
					  this.finished = true;
					}
				}	
			})
		},
		onRefresh() {
			// 清空列表数据
			this.finished = false;
			// 重新加载数据
			// 将 loading 设置为 true，表示处于加载状态
			this.loading = true;
			this.onLoad();  
		},
		beforeClose(action, done){
			
			if(action === 'confirm') {
				let helpedTimes = this.editArr.helpedTimes;
				if(!helpedTimes) {
				  this.$toast("请输入已刷助力数量")
				  done(false); //不关闭弹框
					return;
				}
				let status = this.editArr.status;
				if(status == 99){
					this.$toast("状态错误，不能修改为[全部]")
					done(false); //不关闭弹框
					return;
				}
			  let data = {
			   	'id':this.editArr.id,
			   	'helpedTimes':helpedTimes,
					'status':status
			   };
			   data = JSON.stringify(data);
			   data = encodeURI(data);
			   let url = '/mt2_api.php';
			   this.$axios.get(url,{
			   	params:{
			   		act:'editNotes',
			   		data:data
			   	}
			   }).then(res=>{
			   	let obj = res.data;
			   	console.log(obj);
			   	let code = obj.code;
			   	if(code == 200){
						let index = this.editArr.index;
			   		console.log(this.list);
						this.list[index].helped_times = helpedTimes;
						this.$toast.success('修改成功');	
			   	}else{
						this.$toast.fail(obj.ret);
					}
					done(); //关闭
			   })   
			} else if(action === 'cancel') {
			  done() //关闭
			}
		},
		edit(itemId,index,status,helpedTimes){
			this.showDialog = true;
			this.editArr.id = itemId;
			this.editArr.index = index;
			this.editArr.status = status;
			this.editArr.helpedTimes = helpedTimes;
		},
		editShua(itemId,index,shua){
			let data = {
			 	'id':itemId,
			 	'shua':shua
			 };
			 data = JSON.stringify(data);
			 data = encodeURI(data);
			 let url = '/mt2_api.php';
			 this.$axios.get(url,{
			 	params:{
			 		act:'editShua',
			 		data:data
			 	}
			 }).then(res=>{
			 	let obj = res.data;
			 	console.log(obj);
			 	let code = obj.code;
			 	if(code == 200){
					// let index = this.editArr.index;
			 	// 	console.log(this.list);
					this.list[index].shua = shua;
					this.$toast.success('开启自动刷助力成功');	
			 	}else{
					this.$toast.fail('开启自动刷助力成功' + obj.ret);
				}
			 }) 
		},
	del(itemId,index){
		Dialog.confirm({
		  message: '确认要删除该记录吗？',
		})
		  .then(() => {
		    let data = {
		      id:itemId
		    };
		    data = JSON.stringify(data);
		    data = encodeURI(data);
		    let url = '/mt2_api.php';
		    this.$axios.get(url,{
		    	params:{
		    		act:'delNotes',
		    		data:data
		    	}
		    }).then(res=>{
		    	let obj = res.data;
		    	console.log(obj);
		    	let total = obj.data.total;
		    	let code = obj.code;
		    	if(code == 200){
		    		this.$toast.success('删除成功');
						this.list.splice(index, 1);
		    	}else{
						this.$toast.fail(obj.ret);
					}		    		
		    })
		  })
		  .catch(() => {
		    // on cancel
		  });

	}
	},
	created() {
	
	},
	computed:{
		statusFormat(){
			return function(value){
				let option = this.option1;
				let ret = '未知状态';
				for(let i=0,len=option.length;i<len;i++){
					if(option[i].value == value){
						ret = option[i].text;
						break;
					}
				}
				return ret;
			}
		}
	}
}
</script>

<style>
.van-cell{
	padding: 5px 16px;
}
.van-cell_top_yhh:not(:last-child)::after {
	border-button: 2px solid #000000;
}	
.button-right{
  position:absolute;
  right:15px;
}
.van-button--small {
    min-width: 40px;
    height: 24px;
    padding: 0 8px;
    font-size: 12px;
}
</style>

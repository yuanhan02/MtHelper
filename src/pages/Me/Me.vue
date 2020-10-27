<template>
	<div class="container">
		<!-- 登录页 用户表单 -->
		      <van-cell-group title="自动监控">
		        <van-field
		          v-model="tkl"
		          clearable
		          label="淘口令"
		          right-icon="question-o"
		          placeholder="请输入淘口令"
		          left-icon="shrink"
		          @click-right-icon="$toast('淘口令不能为空')"
		        />
		        <van-field
		          v-model="wx"
		          clearable
		          label="微信"
		          right-icon="question-o"
		          placeholder="请输入联系方式"
		          left-icon="friends-o"
		          @click-right-icon="$toast('此项可以为空')"
		        />
						<van-field
						  v-model="notes"
						  clearable
						  label="备注"
						  right-icon="question-o"
						  placeholder="请输入备注"
						  left-icon="comment-o"
						  @click-right-icon="$toast('此项可以为空')"
						/>
		        <!--提交按钮-->
		        <div><van-button type="primary" size="large" :round="true" :hairline="true" @click="onClickButtonSubmit">提交</van-button></div>
		      </van-cell-group>
	</div>
</template>

<script>
import { Dialog } from 'vant';
export default {
	components: {
	    [Dialog.Component.name]: Dialog.Component,
	},
	data(){
		return {
			tkl:'',
			wx:'',
			notes:''
		}
	},
	methods:{
		// 表单提交
		      onClickButtonSubmit: function (e) {
						this.tkl = this.tkl.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\ud83d[\ude80-\udeff]/g, "");
		        if(this.tkl == ''){
		          this.$toast("淘口令不能为空");
		          return false;
		        }
		        var that=this // 放置指针，便于then操作的获取		
		        let data = {
							tkl:this.tkl,
							wx:this.wx,
							notes:this.notes
						};
						data = JSON.stringify(data);
		        data = encodeURI(data);
		        let url = '/mt2_api.php';
		        this.$axios.get(url,{
		        	params:{
		        		act:'addNotes',
		        		data:data
		        	},
						
		        }).then(function (res) {
		            let obj = res.data;
		            // console.log(obj);
		            if(obj.code == '200'){
									Dialog.confirm({
									  message: '恭喜你！提交成功！',
										confirmButtonText: '确认',
										cancelButtonText: '继续新增'
									})
									  .then(() => {
									    this.$router.push({
									    	path:'/notes'
									    });
									  })
									  .catch(() => {
									    this.tkl = '';
									  });
		            }else{
									this.$toast('新增失败!' + obj.ret);
		            }              
		        }.bind(this))
		        .catch(function (error) {
		            console.log("请求失败"+error);
		        });        
		        e.preventDefault();       
		      },
	},
	created() {
		this.$checkToken();
	}
}
</script>

<style>
</style>

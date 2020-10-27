<template>
	<div class="container">

		<!-- 登录页 用户表单 -->
		      <van-cell-group title="注册">
		        <van-field
		          v-model="uname"
		          clearable
		          label="用户名"
		          right-icon="question-o"
		          placeholder="请输入用户名"
		          left-icon="contact"
		          @click-right-icon="$toast('用户名不能为空')"
		        />
		        
		        <van-field
		          v-model="upwd"
		          clearable
		          type="password"
		          label="密码"
		          right-icon="question-o"
		          placeholder="请输入密码"
		          left-icon="closed-eye"
		          @click-right-icon="$toast('密码必须是数字、字母、下划线')"
		        />
						
						<van-field
						  v-model="phone"
						  clearable
						  type="tel"
						  label="手机号"
						  right-icon="question-o"
						  placeholder="请输入手机号"
						  left-icon="phone-o"
						  @click-right-icon="$toast('手机号格式必须正确')"
						/>
						
						<van-field
						  v-model="code"
						  clearable
						  label="邀请码"
						  right-icon="question-o"
						  placeholder="请输入邀请码"
						  left-icon="comment-o"
						  @click-right-icon="$toast('邀请码请联系管理员获取')"
						/>
		        <!--注册按钮-->
		        <div><van-button type="primary" size="large" :round="true" :hairline="true" @click="onClickButtonSubmit">注册</van-button></div>
		      </van-cell-group>
	</div>
</template>

<script>
export default {
	data(){
		return {
			uname:'',
			upwd:'',
			phone:'',
			code:''
		}
	},
	methods:{
		// 表单提交
		      onClickButtonSubmit: function (e) {
		        if(this.uname == ''){
		          this.$toast("用户名不能为空");
		          return false;
		        }
		        if(this.upwd == ''){
		          this.$toast("密码不能为空");
		          return false;
		        }
						if(this.phone == ''){
						  this.$toast("手机号不能为空");
						  return false;
						}
						var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
						if (!myreg.test(this.phone)) {
						    this.$toast("手机号格式不正确");
						    return false;
						}
						if(this.code == '' || this.code !== '20200525'){
						  this.$toast("邀请码不正确");
						  return false;
						}
		        var that=this // 放置指针，便于then操作的获取		
						let salt = 'fghhytjj';
						let upwd = this.$md5(salt+this.upwd);
		        let data = {
							uname:this.uname,
							upwd:upwd,
							phone:this.phone
						};
						data = JSON.stringify(data);
		        data = encodeURI(data);
		        let url = '/mt2_api.php';
		        this.$axios.get(url,{
		        	params:{
		        		act:'Register',
		        		data:data
		        	}
		        }).then(function (res) {
		            let obj = res.data;
		            // console.log(obj);
		            if(obj.code == '200'){
									this.$toast('注册成功');
									this.$router.push({
										path:'/notes'
									});
									// this.$router.push({path:decodeURIComponent(url)});
		            }else{
		            	// console.log('登录失败');
									this.$toast('注册失败:'+ obj.ret);
		            }              
		        }.bind(this))
		        .catch(function (error) {
		            console.log("请求失败"+error);
		        });        
		        e.preventDefault();       
		      },
	}
}
</script>

<style>
</style>

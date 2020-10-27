<template>
	<div class="container">

		<!-- 登录页 用户表单 -->
		      <van-cell-group title="登录">
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
		        <!--登录按钮-->
		        <div><van-button type="primary" size="large" :round="true" :hairline="true" @click="onClickButtonSubmit">登录</van-button></div>
		      </van-cell-group>
	</div>
</template>

<script>
export default {
	data(){
		return {
			uname:'',
			upwd:''
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
		        var that=this // 放置指针，便于then操作的获取		
						let salt = 'fghhytjj';
						let upwd = this.$md5(salt+this.upwd);
		        let data = {
							uname:this.uname,
							upwd:upwd
						};
						data = JSON.stringify(data);
		        data = encodeURI(data);
		        let url = '/mt2_api.php';
		        this.$axios.get(url,{
		        	params:{
		        		act:'Login',
		        		data:data
		        	}
		        }).then(function (res) {
		            let obj = res.data;
		            // console.log(obj);
		            if(obj.code == '200'){
		            	let token = obj.data.token;
									localStorage.setItem('token',token);
									this.$toast('登录成功');
									this.$router.push({
										path:'/notes'
									});
									// this.$router.push({path:decodeURIComponent(url)});
		            }else{
		            	// console.log('登录失败');
									this.$toast('登录失败，用户名或密码错误');
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

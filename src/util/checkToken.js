export function checkToken() {
	let token = localStorage.getItem('token');
	if(token== "" || token == null || token == undefined){
		this.$toast('未登录或已过期，请重新登录!');
		this.$router.push({
			path:'/login'
		});
		return;
	}
	let data = {
		token
	};
	data = JSON.stringify(data);
	data = encodeURI(data);
	let url = '/mt2_api.php';
	this.$axios.get(url,{
		params:{
			act:'checkToken',
			data:data
		}
	}).then(res=>{
		let obj = res.data;
		// console.log(obj);
		if(obj.code !== '200'){
			this.$toast('未登录或已过期，请重新登录!');
			this.$router.push({
				path:'/login'
			});
			return;
		}
		return true;
	});
	
}
const filters = {
  formatDate: (timestamp,fmt) => {
		if(parseInt(timestamp) == timestamp && timestamp > 1000000000)  timestamp = parseInt(timestamp);
    var date = new Date(timestamp);
		// if (date == 'Invalid Date') return '传入的数据不是日期类型';
    var o = {
    	"M+": date.getMonth() + 1, //月份
    	"d+": date.getDate(), //日
    	"H+": date.getHours(), //小时
    	"m+": date.getMinutes(), //分
    	"s+": date.getSeconds(), //秒
    	"q+": Math.floor((date.getMonth() + 3) / 3), //季度
    	"S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
    	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
	parseInt: (value) => {
		return parseInt(value);
	}
}

export { filters }
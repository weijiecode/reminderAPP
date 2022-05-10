export const datetimes = {
	data() {
		return {
			todaydate: "",
			todaydate1: "",
			todaydatem: "",
			today: "",
			todaymd: "",
			sevendate: "",
			yeardate: "",
			oldsevendate: "",
			time: "",
			weekday: "",
			week: []
		}
	},
	created() {
		var data = new Date();
		var year = data.getFullYear();
		var month =
			data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
		var date = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
		var sdate =
			data.getDate() <= 1 ? "0" + (data.getDate() + 8) : data.getDate() + 8;
		let hh = data.getHours();
		let mf = data.getMinutes()<10 ? '0'+data.getMinutes() : data.getMinutes();
		// 当天 年-月-日
		this.todaydate = data.getFullYear() + "-" + month + "-" + date;
		// 当天 年-月-日
		this.todaydate1 = data.getFullYear() + "/" + month + "/" + date;
		// 当天 月-日
		this.todaymd = month + "-" + date;
		// 当天 日
		this.today = date;
		// 当月 月
		this.todaydatem = data.getFullYear() + "-" + month;
		// 当天 时：分
		this.time = hh + ":" + mf
		// 未来七天的日期
		this.sevendate = data.getFullYear() + "-" + month + "-" + sdate;
		// 今年的年份
		this.yeardate = data.getFullYear();
		// 前七天
		let time = data.getTime() - 7 * 24 * 60 * 60 * 1000
		let tragetTime = new Date(time)
		this.oldsevendate = tragetTime.getFullYear() + '-' + (tragetTime.getMonth() > 9 ? tragetTime.getMonth() +
			1 : '0' + (tragetTime.getMonth() + 1)) + '-' + (tragetTime.getDate() > 9 ? tragetTime.getDate() :
			'0' + tragetTime.getDate())
		// 获取当前周的日期
		var new_Date = new Date()
		var timesStamp = new_Date.getTime();
		var currenDay = new_Date.getDay();
		//console.log(currenDay)
		var dates = [];
		for (var i = 0; i < 7; i++) {
			dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString()
				.replace(/[年月]/g, '-').replace(/[日上下午]/g, ''));
			this.week[i] = dates[i].split('/')[2] <= 9 ? "0" + dates[i].split('/')[2] : dates[i].split('/')[2]
		}
		//console.log(this.week)   
		// 周几
		switch(currenDay) {
			case 1: this.weekday = "周一";break;
			case 2: this.weekday = "周二";break;
			case 3: this.weekday = "周三";break;
			case 4: this.weekday = "周四";break;
			case 5: this.weekday = "周五";break;
			case 6: this.weekday = "周六";break;
			case 7: this.weekday = "周天";break;
			default : console.log("error...")
		}
		//console.log(this.weekday)
	},
	methods: {}
}

export const getstatusBarHeight = {
	data() {
		return {
			statusBarHeight: 0,
			titleBarHeight: 0,
			alltop: "",
			unalltop: ""
		}
	},
	onLoad() {
		const SystemInfo = wx.getSystemInfoSync();
		this.statusBarHeight = SystemInfo.statusBarHeight;
		//console.log(this.statusBarHeight)
	},
	onReady() {
		this.titleBarHeight = (uni.getMenuButtonBoundingClientRect().top - this.statusBarHeight) * 2 +
			uni.getMenuButtonBoundingClientRect().height;
			this.alltop = this.statusBarHeight+this.titleBarHeight+'px'
			this.unalltop = 'calc(100% - '+this.alltop+')'
			this.statusBarHeight = this.statusBarHeight + 'px'
			this.titleBarHeight = this.titleBarHeight + 'px'
			// console.log(this.alltop)
			// console.log(this.statusBarHeight)
			// console.log(this.titleBarHeight)
	},
}

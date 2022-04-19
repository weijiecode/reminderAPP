export const datetimes = {
	data() {
		return {
			todaydate: "",
			todaydatem: "",
			today: "",
			todaymd: "",
			sevendate: "",
			yeardate: "",
			oldsevendate: "",
			hours: "",
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
		// 当天 年-月-日
		this.todaydate = data.getFullYear() + "-" + month + "-" + date;
		// 当天 月-日
		this.todaymd = month + "-" + date;
		// 当天 日
		this.today = date;
		// 当月 月
		this.todaydatem = data.getFullYear() + "-" + month;
		// 当前小时
		this.hours = data.getHours();
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
		var dates = [];
		for (var i = 0; i < 7; i++) {
			dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString()
				.replace(/[年月]/g, '-').replace(/[日上下午]/g, ''));
			this.week[i] = dates[i].split('/')[2] <= 9 ? "0" + dates[i].split('/')[2] : dates[i].split('/')[2]
		}
		//console.log(this.week)   
	},
	methods: {}
}

export const getstatusBarHeight = {
	data() {
		return {
			statusBarHeight: 0,
			titleBarHeight: 0,
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
			this.statusBarHeight = this.statusBarHeight + 'px'
			this.titleBarHeight = this.titleBarHeight + 'px'
			// console.log(this.statusBarHeight)
			// console.log(this.titleBarHeight)
	},
}

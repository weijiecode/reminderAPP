export const datetimes = {
    data() {
        return {
            todaydate: "",
			todaydatem: "",
			today: "",
            sevendate: "",
            yeardate: "",
            oldsevendate: "",
            hours: "",
			week1: "",
			week2: "",
			week3: "",
			week4: "",
			week5: "",
			week6: "",
			week7: ""
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
        // 今天日期
        this.todaydate = data.getFullYear() + "-" + month + "-" + date;
		// 当天
		this.today = date
		// 当月
		this.todaydatem = data.getFullYear() + "-" + month
        // 当前小时
        this.hours = data.getHours()
        // 未来七天的日期
        this.sevendate = data.getFullYear() + "-" + month + "-" + sdate;
        // 今年的年份
        this.yeardate = data.getFullYear();
        // 前七天
        let time = data.getTime() - 7 * 24 * 60 * 60 * 1000
        let tragetTime = new Date(time)
        this.oldsevendate = tragetTime.getFullYear() +'-' + (tragetTime.getMonth() > 9?tragetTime.getMonth() + 1 :'0'+ (tragetTime.getMonth() + 1)) +'-' + (tragetTime.getDate() > 9 ? tragetTime.getDate() : '0' + tragetTime.getDate())
        // 获取当前周的日期
		// var date = new Date();
		// var year = date.getFullYear();
		// var month = date.getMonth();
		var nowDate = data.getDate();
		var day = data.getDay();
		this.week1 = (new Date(year, month, nowDate - day + 1));
		this.week2 = (new Date(year, month, nowDate - day + 2));
		this.week3 = (new Date(year, month, nowDate - day + 3));
		this.week4 = (new Date(year, month, nowDate - day + 4));
		this.week5 = (new Date(year, month, nowDate - day + 5));
		this.week6 = (new Date(year, month, nowDate - day + 6));
		this.week7 = (new Date(year, month, nowDate - day + 7));
		this.week1 = this.week1.getDate() <= 9 ? "0" + this.week1.getDate() : this.week1.getDate()
		this.week2 = this.week2.getDate() <= 9 ? "0" + this.week2.getDate() : this.week2.getDate()
		this.week3 = this.week3.getDate() <= 9 ? "0" + this.week3.getDate() : this.week3.getDate()
		this.week4 = this.week4.getDate() <= 9 ? "0" + this.week4.getDate() : this.week4.getDate()
		this.week5 = this.week5.getDate() <= 9 ? "0" + this.week5.getDate() : this.week5.getDate()
		this.week6 = this.week6.getDate() <= 9 ? "0" + this.week6.getDate() : this.week6.getDate()
		this.week7 = this.week7.getDate() <= 9 ? "0" + this.week7.getDate() : this.week7.getDate()
    },
    methods: {}
}
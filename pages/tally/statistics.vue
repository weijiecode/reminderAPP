<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight,width: '100%'}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<span @click="backmycenter" class="t-icon t-icon-fanhui2"></span>
				<view style="padding-right: 80rpx;margin: 0 auto;" class="title">
					账单统计
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="topback">
			<span @click="backmycenter" class="t-icon t-icon-fanhui2"></span>
		</view>
		<view class="title">
			账单统计
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="listcontent" :style="{height: unalltop,overflow: 'auto'}">
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="listcontent" style="height: calc(100% - 51px);overflow: auto;">
				<!-- #endif -->

				<view class="datechoose">
					<view class="inouttitle">
						<view class="linouttitle">
							账单总览
						</view>
						<view class="datetitle">
							<u-icon name="arrow-left" color="#4F4F51" size="13" @click="leftdate"></u-icon>
							<view @click="showdate=true">
								{{choosedate}}
							</view>
							<u-icon name="arrow-right" color="#4F4F51" size="13" @click="rightdate"></u-icon>
						</view>
					</view>
					<view class="datecontent">
						<view class="subitem">
							<view class="subtitle">
								月支出
							</view>
							<view class="subcontent">
								{{outnum}}
							</view>
						</view>
						<view class="subitem">
							<view class="subtitle">
								月收入
							</view>
							<view class="subcontent">
								{{innum}}
							</view>
						</view>
						<view class="subitem">
							<view class="subtitle">
								月结余
							</view>
							<view class="subcontent">
								{{subnum}}
							</view>
						</view>
					</view>
				</view>

				<view class="inoutsta">
					<view class="inouttitle">
						<view class="linouttitle">
							收支统计
						</view>
						<view class="datetitle">
							<u-icon name="arrow-left" color="#4F4F51" size="13" @click="leftdatey"></u-icon>
							<view>
								{{tallyyear}}
							</view>
							<u-icon name="arrow-right" color="#4F4F51" size="13" @click="rightdatey"></u-icon>
						</view>
					</view>
					<view class="charts-box">
						<qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
					</view>
				</view>

				<view class="typesta">
					<view class="inouttitle">
						<view class="linouttitle">
							分类统计
						</view>
						<view class="datetitle">
							<u-icon name="arrow-left" color="#4F4F51" size="16" @click="leftdatepie"></u-icon>
							<view @click="showdatepie=true">
								{{choosedatepie}}
							</view>
							<u-icon name="arrow-right" color="#4F4F51" size="16" @click="rightdatepie"></u-icon>
						</view>
					</view>
					<view class="charts-box" v-if="btnitem==1">
						<qiun-data-charts type="pie" :opts="optspie" :chartData="chartDatapie" />
					</view>
					<view class="charts-box" v-if="btnitem==0">
						<qiun-data-charts type="pie" :opts="optspie" :chartData="chartDatapie1" />
					</view>
					<view class="typebtn">
						<view class="btnitem" v-if="btnitem==0" @click="inbtnitem">
							收入
						</view>
						<view class="btnitem" v-if="btnitem==1" @click="inbtnitem" :style="{color: 'white',backgroundColor: '#518BF1'}">
							收入
						</view>
						<view class="btnitem" v-if="btnitem==1" @click="outbtnitem">
							支出
						</view>
						<view class="btnitem" v-if="btnitem==0" @click="outbtnitem" :style="{color: 'white',backgroundColor: '#518BF1'}">
							支出
						</view>
					</view>
				</view>
			</view>
			<!-- 年月选择器 -->
			<u-datetime-picker :show="showdate" v-model="dateym" mode="year-month" closeOnClickOverlay
				@confirm="confirmdate" @cancel="showdate=false" @close="showdate=false"></u-datetime-picker>
				<!-- 年月选择器pie -->
			<u-datetime-picker :show="showdatepie" v-model="dateympie" mode="year-month" closeOnClickOverlay
				@confirm="confirmdatepie" @cancel="showdatepie=false" @close="showdatepie=false"></u-datetime-picker>

		</view>
	</view>
</template>

<script>
	// #ifdef MP-WEIXIN
	import {
		getstatusBarHeight
	} from '../../components/mixins/mixin.js'
	// #endif
	export default {
		// #ifdef MP-WEIXIN
		mixins: [getstatusBarHeight],
		// #endif

		async onShow() {
			// 表单一数据
			this.gettallyone().then(() => {
				// 统计图数据
				this.gettally()
			})

			// 当前年-月
			this.choosedate = uni.$u.timeFormat(Number(new Date())).split("-")[0] + '/' + uni.$u.timeFormat(Number(
				new Date())).split("-")[1]
			// 当前年
			this.tallyyear = uni.$u.timeFormat(Number(new Date())).split("-")[0]
			// 当前年pie
			this.choosedatepie = uni.$u.timeFormat(Number(new Date())).split("-")[0] + '/' + uni.$u.timeFormat(Number(
				new Date())).split("-")[1]
				// 当前年pie1
			// this.choosedatepie1 = uni.$u.timeFormat(Number(new Date())).split("-")[0] + '/' + uni.$u.timeFormat(Number(
			// 	new Date())).split("-")[1]
		},
		onReady() {
			this.getServerData();
			this.getServerDatapie();
			this.getServerDatapie1();
		},
		data() {
			return {
				// 距离top高度
				topheight: "",
				// 原始数据
				tallydata: [],
				// 初始所有的数据
				initArrtally: [],
				// 年分类数据
				tallydatayear: [],
				// 指定年份
				tallyyear: "",
				// 指定年份的每月数据
				tallydatamonth: [],
				// pie图显示类别
				btnitem: 1,
				// 显示年月日历选择器
				showdate: false,
				// 显示年月日历选择器pie
				showdatepie: false,
				// 日期年月
				dateym: Number(new Date()),
				// 日期年月pie
				dateympie: Number(new Date()),
				// 选择的时间
				choosedate: "",
				choosedatey: "",
				choosedatem: "",
				// 选择的时间pie
				choosedatepie: "",
				choosedateypie: "",
				choosedatempie: "",
				// 支出、收入和结余
				innum: "",
				outnum: "",
				subnum: "",
				// 统计图配置
				chartData: {},
				chartDatapie: {},
				chartDatapie1: {},
				// 收入支出结余
				mondatain: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				mondataout: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				mondatainout: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				// 分类数组
				intypedata: [{name: '工资',value: 0},{name: '理财',value: 0},{name: '红包',value: 0},
				{name: '兼职',value: 0},{name: '现金',value: 0},{name: '收银',value: 0},{name: '其它',value: 0}],
				outtypedata:  [{name: '餐饮',value: 0},{name: '娱乐',value: 0},{name: '日用',value: 0},
				{name: '住房',value: 0},{name: '旅行',value: 0},{name: '医疗',value: 0},{name: '交通',value: 0}],
				// 统计每个分类num值的计算
				intypenum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				outtypenum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				opts: {
					dataPointShape: false,
					dataLabel: false,
					color: ["#518BF1", "#F06872", "#aaa"],
					padding: [30, 10, 0, 10],
					legend: {},
					xAxis: {
						axisLine: false,
						fontColor: "#e1e1e1",
						disableGrid: true,
						fontSize: 8
					},
					yAxis: {
						fontColor: "#e1e1e1",
						gridType: "dash",
						dashLength: 6,
						gridColor: '#ebebeb',
						data: [{
							axisLine: false,
							fontColor: "#e1e1e1",
							fontSize: 8
						}]
					},
					extra: {
						line: {
							type: "curve",
							width: 2
						}
					}
				},
				// pie
				optspie: {
					color: ["#518BF1", "#74C783", "#FA623D", "#F3B32B", "#798EBB", "#A97FE6", "#07BD73"],
					padding: [30, 10, 0, 10],
					extra: {
						pie: {
							activeOpacity: 0.5,
							activeRadius: 10,
							offsetAngle: 0,
							labelWidth: 15,
							border: true,
							borderWidth: 3,
							borderColor: "#FFFFFF",
							linearType: "custom"
						}
					}
				}
			}
		},
		methods: {
			// 返回
			backmycenter() {
				uni.navigateBack()
			},
			// 获取用户所有记账数据（筛选月份）及统计图的按年份筛选的数据
			async gettallyone() {
				const {
					data: res
				} = await this.$http({
					url: "tally/usertally",
					method: "POST"
				})
				// console.log(res.data)
				if (res.code == '200') {
					this.tallydata = res.data
					// 按日期筛选数据
					this.fundate()
					this.fundatetype()
				} else if (res.code == '201') {
					this.initArrtally = ""
				} else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "记账数据获取失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}
			},
			// 定义筛选函数(避免每次筛选数据都在gettallyone里面，减少网络请求)
			fundate() {
				this.innum = 0
				this.outnum = 0
				this.subnum = 0
				// 初始化
				this.initArrtally = []
				// console.log(this.tallydata)
				this.tallydata.forEach((item, i) => {
					let index = -1;
					let isExists = this.initArrtally.some((newItem, j) => {
						if (this.choosedate == newItem.datetime) {
							index = j;
							return true;
						}
					})
					if (!isExists) {
						this.initArrtally.push({
							datetime: item.datetime,
							subList: [item],
						})
					} else {
						this.initArrtally[index].subList.push(item);
					}
				})
				// console.log(this.initArrtally)
				// 统计支出和收入
				if (this.initArrtally.length == 0) {
					return
				} else {
					const timeFormat = uni.$u.timeFormat
					const newtallys = this.initArrtally.filter(item => {
						return item.datetime.substring(0, 7) == this.choosedate;
					})
					this.newArrtally = newtallys
					// console.log(this.newArrtally)
					// 统计每个月的支出收入结余数据
					this.newArrtally.forEach(item => {
						item.subList.forEach(items => {
							if (items.num.indexOf('-') >= 0) {
								this.outnum += items.num * (-1)
							} else {
								this.innum += items.num * 1
							}
						})
					})
					this.subnum = this.innum - this.outnum
					this.outnum = this.outnum.toString().indexOf('.') >= 0 ? this.outnum : this.outnum
						.toString() + '.00'
					this.innum = this.innum.toString().indexOf('.') >= 0 ? this.innum : this.innum
						.toString() + '.00'
					this.subnum = this.subnum.toString().indexOf(".") >= 0 ? this.subnum : this.subnum + '.00'

				}
			},

			// 定义筛选函数(每个月的每个分类数据)
			fundatetype() {
				// 初始化
				this.initArrtally = []
				this.intypenum = [0, 0, 0, 0, 0, 0, 0]
				this.outtypenum = [0, 0, 0, 0, 0, 0, 0]
				// console.log(this.tallydata)
				this.tallydata.forEach((item, i) => {
					let index = -1;
					let isExists = this.initArrtally.some((newItem, j) => {
						if (this.choosedatepie == newItem.datetime) {
							index = j;
							return true;
						}
					})
					if (!isExists) {
						this.initArrtally.push({
							datetime: item.datetime,
							subList: [item],
						})
					} else {
						this.initArrtally[index].subList.push(item);
					}
				})
				// 统计分类数据
				if (this.initArrtally.length == 0) {
					return
				} else {
					const timeFormat = uni.$u.timeFormat
					const newtallys = this.initArrtally.filter(item => {
						return item.datetime.substring(0, 7) == this.choosedatepie;
					})
					this.newArrtally = newtallys
					// console.log(this.newArrtally)
					// 统计每个月的支出收入结余数据
					this.newArrtally.forEach(item => {
						item.subList.forEach(items => {
							if (items.num.indexOf('-') >= 0) {
								switch (items.tallytype) {
									case '餐饮':
										this.outtypenum[0] += items.num * 1
										break;
									case '娱乐':
										this.outtypenum[1] += items.num * 1
										break;
									case '日用':
										this.outtypenum[2] += items.num * 1
										break;
									case '住房':
										this.outtypenum[3] += items.num * 1
										break;
									case '旅行':
										this.outtypenum[4] += items.num * 1
										break;
									case '医疗':
										this.outtypenum[5] += items.num * 1
										break;
									case '交通':
										this.outtypenum[6] += items.num * 1
										break;
								}
							} else {
								switch (items.tallytype) {
									case '工资':
										this.intypenum[0] += items.num * 1
										break;
									case '理财':
										this.intypenum[1] += items.num * 1
										break;
									case '红包':
										this.intypenum[2] += items.num * 1
										break;
									case '兼职':
										this.intypenum[3] += items.num * 1
										break;
									case '现金':
										this.intypenum[4] += items.num * 1
										break;
									case '收银':
										this.intypenum[5] += items.num * 1
										break;
									case '其它':
										this.intypenum[6] += items.num * 1
										break;
								}
							}
						})
					})
					this.intypenum.forEach((item,index) => {
						this.intypedata[index].value = item*1
					}) 
					this.outtypenum.forEach((item,index) => {
						this.outtypedata[index].value = item*1
					}) 
					// console.log(this.intypedata)
					// console.log(this.outtypedata)
					// console.log(this.intypenum)

				}
			},

			// 指定年月日期数据过滤
			confirmdate(e) {
				this.showdate = false
				const timeFormat = uni.$u.timeFormat
				this.choosedate = (timeFormat(e.value, 'yyyy-mm')).split('-')[0] + '/' + (timeFormat(e.value,
						'yyyy-mm'))
					.split('-')[1]
				this.fundate()
			},
			
			// 指定年月日期数据过滤pie
			confirmdatepie(e) {
				// console.log('123')
				this.showdatepie = false
				const timeFormat = uni.$u.timeFormat
				this.choosedatepie = (timeFormat(e.value, 'yyyy-mm')).split('-')[0] + '/' + (timeFormat(e.value,
						'yyyy-mm'))
					.split('-')[1]
					// console.log(this.choosedatepie)
				this.fundatetype()
				this.getServerDatapie()
				this.getServerDatapie1()
			},

			// 减月份
			leftdate() {
				this.choosedatey = this.choosedate.split('/')[0]
				switch (this.choosedate.split('/')[1]) {
					case '01':
						this.choosedatey = this.choosedate.split('/')[0] * 1 - 1;
						this.choosedatem = '12';
						break;
					case '02':
						this.choosedatem = '01';
						break;
					case '03':
						this.choosedatem = '02';
						break;
					case '04':
						this.choosedatem = '03';
						break;
					case '05':
						this.choosedatem = '04';
						break;
					case '06':
						this.choosedatem = '05';
						break;
					case '07':
						this.choosedatem = '06';
						break;
					case '08':
						this.choosedatem = '07';
						break;
					case '09':
						this.choosedatem = '08';
						break;
					case '10':
						this.choosedatem = '09';
						break;
					case '11':
						this.choosedatem = '10';
						break;
					case '12':
						this.choosedatem = '11';
						break;
					default:
						return;
				}
				this.choosedate = this.choosedatey + '/' + this.choosedatem
				this.fundate()

			},
			// 减月份pie
			leftdatepie() {
				this.choosedateypie = this.choosedatepie.split('/')[0]
				switch (this.choosedatepie.split('/')[1]) {
					case '01':
						this.choosedateypie = this.choosedatepie.split('/')[0] * 1 - 1;
						this.choosedatempie = '12';
						break;
					case '02':
						this.choosedatempie = '01';
						break;
					case '03':
						this.choosedatempie = '02';
						break;
					case '04':
						this.choosedatempie = '03';
						break;
					case '05':
						this.choosedatempie = '04';
						break;
					case '06':
						this.choosedatempie = '05';
						break;
					case '07':
						this.choosedatempie = '06';
						break;
					case '08':
						this.choosedatempie = '07';
						break;
					case '09':
						this.choosedatempie = '08';
						break;
					case '10':
						this.choosedatempie = '09';
						break;
					case '11':
						this.choosedatempie = '10';
						break;
					case '12':
						this.choosedatempie = '11';
						break;
					default:
						return;
				}
				this.choosedatepie = this.choosedateypie + '/' + this.choosedatempie
				this.fundatetype()
			    this.getServerDatapie()
				this.getServerDatapie1()
			},
			// 减年份
			leftdatey() {
				this.tallyyear = this.tallyyear * 1 - 1
				this.gettally()
				this.getServerData()
			},
			// 加月份
			rightdate() {
				this.choosedatey = this.choosedate.split('/')[0]
				switch (this.choosedate.split('/')[1]) {
					case '01':
						this.choosedatem = '02';
						break;
					case '02':
						this.choosedatem = '03';
						break;
					case '03':
						this.choosedatem = '04';
						break;
					case '04':
						this.choosedatem = '05';
						break;
					case '05':
						this.choosedatem = '06';
						break;
					case '06':
						this.choosedatem = '07';
						break;
					case '07':
						this.choosedatem = '08';
						break;
					case '08':
						this.choosedatem = '09';
						break;
					case '09':
						this.choosedatem = '10';
						break;
					case '10':
						this.choosedatem = '11';
						break;
					case '11':
						this.choosedatem = '12';
						break;
					case '12':
						this.choosedatey = this.choosedate.split('/')[0] * 1 + 1;
						this.choosedatem = '01';
						break;
					default:
						return;
				}
				this.choosedate = this.choosedatey + '/' + this.choosedatem
				this.fundate()
			},
			// 加月份pie
			rightdatepie() {
				this.choosedateypie = this.choosedatepie.split('/')[0]
				switch (this.choosedatepie.split('/')[1]) {
					case '01':
						this.choosedatempie = '02';
						break;
					case '02':
						this.choosedatempie = '03';
						break;
					case '03':
						this.choosedatempie = '04';
						break;
					case '04':
						this.choosedatempie = '05';
						break;
					case '05':
						this.choosedatempie = '06';
						break;
					case '06':
						this.choosedatempie = '07';
						break;
					case '07':
						this.choosedatempie = '08';
						break;
					case '08':
						this.choosedatempie = '09';
						break;
					case '09':
						this.choosedatempie = '10';
						break;
					case '10':
						this.choosedatempie = '11';
						break;
					case '11':
						this.choosedatempie = '12';
						break;
					case '12':
						this.choosedateypie = this.choosedatepie.split('/')[0] * 1 + 1;
						this.choosedatempie = '01';
						break;
					default:
						return;
				}
				this.choosedatepie = this.choosedateypie + '/' + this.choosedatempie
				this.fundatetype()
				this.getServerDatapie()
				this.getServerDatapie1()
			},
			// 加年份
			rightdatey() {
				this.tallyyear = this.tallyyear * 1 + 1
				this.gettally()
				this.getServerData()
			},
			// 统计图数据
			gettally() {
				// 初始化
				this.tallydatayear = []
				this.tallydatamonth = []
				// console.log(this.tallydata)
				// 先按年份筛选数据
				this.tallydata.forEach(item => {
					let index = -1;
					let isExists = this.tallydatayear.some((newItem, j) => {
						if (item.datetime.split('/')[0] == newItem.datetime.split('/')[0]) {
							index = j;
							return true;
						}
					})
					if (!isExists) {
						this.tallydatayear.push({
							datetime: item.datetime.split('/')[0],
							subList: [item],
						})
					} else {
						this.tallydatayear[index].subList.push(item);
					}
				})
				// 赋值指定年份的数据
				this.tallydatayear.forEach(item => {
					if (item.datetime == this.tallyyear) {
						item.subList.forEach(subitem => {
							this.tallydatamonth.push({
								datetime: subitem.datetime.split('/')[1],
								num: subitem.num
							})
						})
					}
				})
				//console.log(this.tallydatamonth)
				// 统计每个月的支出收入结余
				// 初始化
				this.mondatain = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				this.mondataout = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				this.mondatainout = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				this.tallydatamonth.forEach(item => {
					switch (item.datetime) {
						case '01':
							if (item.num * 1 > 0) {
								this.mondatain[0] += item.num * 1
							} else {
								this.mondataout[0] += item.num * 1
							}
							break;
						case '02':
							if (item.num * 1 > 0) {
								this.mondatain[1] += item.num * 1
							} else {
								this.mondataout[1] += item.num * 1
							}
							break;
						case '03':
							if (item.num * 1 > 0) {
								this.mondatain[2] += item.num * 1
							} else {
								this.mondataout[2] += item.num * 1
							}
							break;
						case '04':
							if (item.num * 1 > 0) {
								this.mondatain[3] += item.num * 1
							} else {
								this.mondataout[3] += item.num * 1
							}
							break;
						case '05':
							if (item.num * 1 > 0) {
								this.mondatain[4] += item.num * 1
							} else {
								this.mondataout[4] += item.num * 1
							}
							break;
						case '06':
							if (item.num * 1 > 0) {
								this.mondatain[5] += item.num * 1
							} else {
								this.mondataout[5] += item.num * 1
							}
							break;
						case '07':
							if (item.num * 1 > 0) {
								this.mondatain[6] += item.num * 1
							} else {
								this.mondataout[6] += item.num * 1
							}
							break;
						case '08':
							if (item.num * 1 > 0) {
								this.mondatain[7] += item.num * 1
							} else {
								this.mondataout[7] += item.num * 1
							}
							break;
						case '09':
							if (item.num * 1 > 0) {
								this.mondatain[8] += item.num * 1
							} else {
								this.mondataout[8] += item.num * 1
							}
							break;
						case '10':
							if (item.num * 1 > 0) {
								this.mondatain[9] += item.num * 1
							} else {
								this.mondataout[9] += item.num * 1
							}
							break;
						case '11':
							if (item.num * 1 > 0) {
								this.mondatain[10] += item.num * 1
							} else {
								this.mondataout[10] += item.num * 1
							}
							break;
						case '12':
							if (item.num * 1 > 0) {
								this.mondatain[11] += item.num * 1
							} else {
								this.mondataout[11] += item.num * 1
							}
							break;
						default:
							return;
					}
				})
				for (let i = 0; i < 12; i++) {
					this.mondatainout[i] = this.mondatain[i] * 1 + this.mondataout[i] * 1
				}
				// console.log(this.mondatain)
				// console.log(this.mondataout)
				// console.log(this.mondatainout)
			},
			// 统计图
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
						series: [{
								name: "收入",
								data: this.mondatain
							},
							{
								name: "支出",
								data: this.mondataout
							},
							{
								name: "结余",
								data: this.mondatainout
							}
						]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
			// pie统计图
			getServerDatapie() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						series: [{
							data: this.intypedata
							
						}]
					};
					this.chartDatapie = JSON.parse(JSON.stringify(res));
				}, 500);
			},
			// pie1统计图
			getServerDatapie1() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						series: [{
							data: this.outtypedata
							
						}]
					};
					this.chartDatapie1 = JSON.parse(JSON.stringify(res));
				}, 500);
			},
			inbtnitem() {
				this.btnitem=1
			},
			outbtnitem() {
				this.btnitem=0
				//this.getServerDatapie1()
			}
		}

	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #F4F4F8;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.topback {
		top: 60rpx;
		left: 40rpx;
		position: fixed;
	}

	.title {
		margin-top: 60rpx;
		text-align: center;
	}

	.datechoose {
		margin-top: 40rpx;
		width: 680rpx;
		border-radius: 15px;
		background-color: white;
	}

	.inoutsta {
		margin-top: 40rpx;
		width: 680rpx;
		height: 720rpx;
		border-radius: 15px;
		background-color: white;
	}

	.typesta {
		margin-top: 40rpx;
		width: 680rpx;
		height: 800rpx;
		border-radius: 15px;
		background-color: white;
		margin-bottom: 40rpx;
	}

	.datecontent {
		padding-top: 40rpx;
		padding-bottom: 40rpx;
		display: flex;
		justify-content: space-around;
	}

	.subitem {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.subtitle {
		font-size: 14px;
		padding: 0 0 10rpx 0;
		color: #aaa;
	}

	.inouttitle {
		padding: 40rpx 60rpx 0 60rpx;
		display: flex;
		justify-content: space-between;
	}

	.datetitle {
		width: 240rpx;
		display: flex;
		justify-content: space-between;
	}

	::v-deep .u-popup__content {
		border-top-right-radius: 15px !important;
		border-top-left-radius: 15px !important;
	}



	.charts-box {
		width: 100%;
		height: 300px;
	}
	
	.typebtn {
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.btnitem {
		color: #A7A7A9;
		margin: 0 20rpx;
		width: 140rpx;
		height: 60rpx;
		background-color: #F4F4F6;
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
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
							<u-icon name="arrow-left" color="#4F4F51" size="16" @click="leftdate"></u-icon>
							<view @click="showdate=true">
								{{choosedate}}
							</view>
							<u-icon name="arrow-right" color="#4F4F51" size="16" @click="rightdate"></u-icon>
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
							<u-icon name="arrow-left" color="#4F4F51" size="16" @click="leftdatey"></u-icon>
							<view>
								{{tallyyear}}
							</view>
							<u-icon name="arrow-right" color="#4F4F51" size="16" @click="rightdatey"></u-icon>
						</view>
					</view>
					<view class="charts-box">
						<qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
					</view>
				</view>

				<view class="typesta">

				</view>
			</view>
			<!-- 年月选择器 -->
			<u-datetime-picker :show="showdate" v-model="dateym" mode="year-month" closeOnClickOverlay
				@confirm="confirmdate" @cancel="showdate=false" @close="showdate=false"></u-datetime-picker>

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
		},
		onReady() {
			this.getServerData();
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
				// 显示年月日历选择器
				showdate: false,
				// 日期年月
				dateym: Number(new Date()),
				// 选择的时间
				choosedate: "",
				choosedatey: "",
				choosedatem: "",
				// 支出、收入和结余
				innum: "",
				outnum: "",
				subnum: "",
				// 统计图配置
				chartData: {},
				mondatain: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				mondataout: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				mondatainout: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
				console.log(res.data)
				if (res.code == '200') {
					this.tallydata = res.data
					// 按日期筛选数据
					this.fundate()
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
				// 统计支出和收入
				if (this.initArrtally.length == 0) {
					return
				} else {
					const timeFormat = uni.$u.timeFormat
					const newtallys = this.initArrtally.filter(item => {
						return item.datetime.substring(0, 7) == this.choosedate;
					})
					this.newArrtally = newtallys
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
			// 指定年月日期数据过滤
			confirmdate(e) {
				this.showdate = false
				const timeFormat = uni.$u.timeFormat
				this.choosedate = (timeFormat(e.value, 'yyyy-mm')).split('-')[0] + '/' + (timeFormat(e.value,
						'yyyy-mm'))
					.split('-')[1]
				this.fundate()
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
			// 减年份
			leftdatey() {
				this.tallyyear = this.tallyyear*1 - 1
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
			// 加年份
			rightdatey() {
				this.tallyyear = this.tallyyear*1 + 1
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
		width: 280rpx;
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
</style>

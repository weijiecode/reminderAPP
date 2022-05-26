<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<span @click="backmycenter" id="backtop" class="t-icon t-icon-fanhui2"></span>
				<view style="padding-right: 80rpx;margin: 0 auto;" class="title">
					数据报表
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="topback">
			<!-- <u-icon size="25" @click="backmycenter" name="arrow-left"></u-icon> -->
			<span @click="backmycenter" id="backtop" class="t-icon t-icon-fanhui2"></span>
		</view>
		<view class="title">
			数据报表
		</view>
		<!-- #endif -->
		
		<view class="inoutsta">
			<view class="inouttitle">
				<view class="linouttitle">
					报表统计
				</view>
				<view class="datetitle">
					<u-icon name="arrow-left" color="#4F4F51" size="13" @click="leftdatey"></u-icon>
					<view>
						{{tallyyear}}
					</view>
					<u-icon name="arrow-right" color="#4F4F51" size="13" @click="rightdatey"></u-icon>
				</view>
			</view>
			<view class="listbox">
				<view class="listtitle">
					<view class="subt">
						时间
					</view>
					<view class="subt">
						收入
					</view>
					<view class="subt">
						支出
					</view>
					<view class="subt">
						结余
					</view>
				</view>
				<view class="listcontent">
					<view class="subt">
						总计
					</view>
					<view class="subt">
						{{allmondatainout}}
					</view>
					<view class="subt">
						{{allmondatain}}
					</view>
					<view class="subt">
						{{allmondataout}}
					</view>
				</view>
				<view class="listcontent" v-if="!(mondatain[0]=='0' && mondataout[0]=='0' && mondatainout[0]=='0')">
					<view class="subt">
						一月
					</view>
					<view class="subt">
						{{mondatain[0]}}
					</view>
					<view class="subt">
						{{mondataout[0]}}
					</view>
					<view class="subt">
						{{mondatainout[0]}}
					</view>
				</view>
				<view class="listcontent" v-if="!(mondatain[1]=='0' && mondataout[1]=='0' && mondatainout[1]=='0')">
					<view class="subt">
						二月
					</view>
					<view class="subt">
						{{mondatain[1]}}
					</view>
					<view class="subt">
						{{mondataout[1]}}
					</view>
					<view class="subt">
						{{mondatainout[1]}}
					</view>
				</view>
				<view class="listcontent" v-if="!(mondatain[2]=='0' && mondataout[2]=='0' && mondatainout[2]=='0')">
					<view class="subt">
						三月
					</view>
					<view class="subt">
						{{mondatain[2]}}
					</view>
					<view class="subt">
						{{mondataout[2]}}
					</view>
					<view class="subt">
						{{mondatainout[2]}}
					</view>
				</view>
				<view class="listcontent" v-if="!(mondatain[3]=='0' && mondataout[3]=='0' && mondatainout[3]=='0')">
					<view class="subt">
						四月
					</view>
					<view class="subt">
						{{mondatain[3]}}
					</view>
					<view class="subt">
						{{mondataout[3]}}
					</view>
					<view class="subt">
						{{mondatainout[3]}}
					</view>
				</view>
				<view class="listcontent" v-if="!(mondatain[4]=='0' && mondataout[4]=='0' && mondatainout[4]=='0')">
					<view class="subt">
						五月
					</view>
					<view class="subt">
						{{mondatain[4]}}
					</view>
					<view class="subt">
						{{mondataout[4]}}
					</view>
					<view class="subt">
						{{mondatainout[4]}}
					</view>
				</view>
				<view class="listcontent" v-if="!(mondatain[5]=='0' && mondataout[5]=='0' && mondatainout[5]=='0')">
					<view class="subt">
						六月
					</view>
					<view class="subt">
						{{mondatain[5]}}
					</view>
					<view class="subt">
						{{mondataout[5]}}
					</view>
					<view class="subt">
						{{mondatainout[5]}}
					</view>
				</view>
				<view class="listcontent" v-if="!(mondatain[6]=='0' && mondataout[6]=='0' && mondatainout[6]=='0')">
					<view class="subt">
						七月
					</view>
					<view class="subt">
						{{mondatain[6]}}
					</view>
					<view class="subt">
						{{mondataout[6]}}
					</view>
					<view class="subt">
						{{mondatainout[6]}}
					</view>
				</view>
				<view class="listcontent" v-if="!(mondatain[7]=='0' && mondataout[7]=='0' && mondatainout[7]=='0')">
					<view class="subt">
						八月
					</view>
					<view class="subt">
						{{mondatain[7]}}
					</view>
					<view class="subt">
						{{mondataout[7]}}
					</view>
					<view class="subt">
						{{mondatainout[7]}}
					</view>
				</view>
				<view class="listcontent" v-if="!(mondatain[8]=='0' && mondataout[8]=='0' && mondatainout[8]=='0')">
					<view class="subt">
						九月
					</view>
					<view class="subt">
						{{mondatain[8]}}
					</view>
					<view class="subt">
						{{mondataout[8]}}
					</view>
					<view class="subt">
						{{mondatainout[8]}}
					</view>
				</view>
				<view class="listcontent" v-if="!(mondatain[9]=='0' && mondataout[9]=='0' && mondatainout[9]=='0')">
					<view class="subt">
						十月
					</view>
					<view class="subt">
						{{mondatain[9]}}
					</view>
					<view class="subt">
						{{mondataout[9]}}
					</view>
					<view class="subt">
						{{mondatainout[9]}}
					</view>
				</view>
				<view class="listcontent" v-if="!(mondatain[10]=='0' && mondataout[10]=='0' && mondatainout[10]=='0')">
					<view class="subt">
						十一月
					</view>
					<view class="subt">
						{{mondatain[10]}}
					</view>
					<view class="subt">
						{{mondataout[10]}}
					</view>
					<view class="subt">
						{{mondatainout[10]}}
					</view>
				</view>
				<view class="listcontent" v-if="!(mondatain[11]=='0' && mondataout[11]=='0' && mondatainout[11]=='0')">
					<view class="subt">
						十二月
					</view>
					<view class="subt">
						{{mondatain[11]}}
					</view>
					<view class="subt">
						{{mondataout[11]}}
					</view>
					<view class="subt">
						{{mondatainout[11]}}
					</view>
				</view>
			</view>
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
			// 当前年
			this.tallyyear = uni.$u.timeFormat(Number(new Date())).split("-")[0]
		},
		data() {
			return {
				// 距离top高度
				topheight: "",
				// 指定年份
				tallyyear: "",
				// 原始数据
				tallydata: [],
				// 指定年份
				tallyyear: "",
				// 指定年份的每月数据
				tallydatamonth: [],
				// 收入支出结余
				mondatain: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				mondataout: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				mondatainout: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				allmondatain: 0,
				allmondataout: 0,
				allmondatainout: 0,
			}
		},
		methods: {
			// 返回
			backmycenter() {
				uni.navigateBack()
			},
			// 减年份
			leftdatey() {
				this.tallyyear = this.tallyyear * 1 - 1
				this.gettally()
			},
			// 加年份
			rightdatey() {
				this.tallyyear = this.tallyyear * 1 + 1
				this.gettally()
			},
			// 获取用户所有记账数据
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
			// 过滤数据
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
				this.allmondatain = 0
				this.allmondataout = 0
				this.allmondatainout = 0
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
				for (let i = 0;i < 12; i++) {
					this.allmondatain += this.mondatain[i] * 1
					this.allmondataout += this.mondataout[i] * 1
					this.allmondatainout += this.mondatainout[i] * 1
				}
				console.log(this.mondatain)
				console.log(this.mondataout)
				console.log(this.mondatainout)
				console.log(this.allmondatain)
				console.log(this.allmondataout)
				console.log(this.allmondatainout)
			},
		}
	}
</script>

<style scoped lang="scss">
	.content {
		height: 100%;
		overflow: hidden;
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
	
	.inoutsta {
		margin: 60rpx auto;
		width: 680rpx;
		padding-bottom: 40rpx;
		border-radius: 15px;
		background-color: white;
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
	
	.listbox {
		display: flex;
		flex-direction: column;
		padding: 40rpx 60rpx 0 60rpx;
	}
	
	.listtitle {
		padding-top: 30rpx;
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		color: #aaa;
	}
	
	.listcontent {
		padding-top: 30rpx;
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		color: #202020;
	}
	

</style>

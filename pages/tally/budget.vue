<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<span @click="backmycenter" id="backtop" class="t-icon t-icon-fanhui2"></span>
				<view style="padding-right: 80rpx;margin: 0 auto;" class="title">
					月账单预算
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
			月账单预算
		</view>
		<!-- #endif -->
		<view class="titledate">
			<view class="choosedate" @click="showdate=true">
				{{choosedate}}
			</view>
			<u-icon name="arrow-down-fill" color="#aaa" size="14" @click="showdate=true"></u-icon>
		</view>
		<view class="boxview">
			<view class="oneitem" @click="showpop=true">
				<view class="budgetmon">
					月预算金额
				</view>
				<view class="budgetnum" v-if="budgetnum==0 || budgetnum=='' || budgetnum==null">
					点击设置预算金额
				</view>
				<view class="budgetnum" v-if="budgetnum!=0">
					总额：{{budgetnum}}
				</view>
				<u-line-progress v-if="vsnum<=100 || budgetnum==0" :percentage="vsnum" activeColor="#518BF1" :showText="false"></u-line-progress>
				<u-line-progress v-if="vsnum>100 && budgetnum!=0" :percentage="vsnum" activeColor="#f70000" :showText="false"></u-line-progress>
			</view>
		</view>
		<!-- 年月选择器 -->
		<u-datetime-picker :show="showdate" v-model="dateym" mode="year-month" closeOnClickOverlay
			@confirm="confirmdate" @cancel="showdate=false" @close="showdate=false"></u-datetime-picker>
			<!-- 消息提示 -->
			<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
			<!-- 输入金额弹窗 -->
			<u-popup :show="showpop" closeOnClickOverlay :round="10" mode="bottom" @close="showpop=false" @open="showpop=true">
					<view>
			           <view class="inputtitle">
							<view class="leftbtn" @click="showpop=false">
								取消
							</view>
							<view class="rightbtn" v-if="isdata==true" @click="updatebudget">
								修改
							</view>
							<view class="rightbtn" v-if="isdata==false" @click="addbudget">
								添加
							</view>
			           </view>
					   <view class="twoinput">
							  <u--input
							  maxlength="8"
							    placeholder="请输入预算金额"
							    border="bottom"
							    clearable
								v-model="budgetnum"
							  ></u--input>
					   </view>
					</view>
				</u-popup>
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
			this.getbudget()
			this.gettally().then(() => {
				this.vsnum = (this.outnum/this.budgetnum)*100
			})
			// 当前年-月
			this.choosedate = uni.$u.timeFormat(Number(new Date())).split("-")[0] + '/' + uni.$u.timeFormat(Number(
				new Date())).split("-")[1]
		},
		data() {
			return {
				// 距离top高度
				topheight: "",
				// 时间选择器
				showdate: false,
				// 日期年月
				dateym: Number(new Date()),
				// 选择的时间
				choosedate: "",
				// 支出金额
				outnum: 0,
				// 预算金额
				budgetnum: 0,
				// 数据库是否有数据
				isdata: false,
				// 显示输入金额弹窗
				showpop: false,
				// 占比
				vsnum: 0
			}
		},
		methods: {
			// 返回
			backmycenter() {
				uni.navigateBack()
			},
			// 指定年月日期数据过滤
			confirmdate(e) {
				this.showdate = false
				const timeFormat = uni.$u.timeFormat
				this.choosedate = (timeFormat(e.value, 'yyyy-mm')).split('-')[0] + '/' + (timeFormat(e.value,
						'yyyy-mm'))
					.split('-')[1]
				this.gettally()
			},
			//
			// 获取预算金额
			async getbudget() {
				const { data: res } = await this.$http({
					url: "tally/userbudget",
					method: "POST"
				})
				console.log(res)
				if(res.code == '200'){
					this.isdata = true
					this.budgetnum = res.data[0].budget
				} else if (res.code == '201') {
					this.isdata = false
					this.budgetnum = ""
				} else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "预算金额获取失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}
			},
			// 新增预算金额数据
			async addbudget() {
				this.showpop = false
				const { data: res } = await this.$http({
					url: "tally/addbudget",
					method: "POST",
					data: {
						budget: this.budgetnum
					}
				})
				if(res.code == '200'){
					this.vsnum = (this.outnum/this.budgetnum)*100
					this.isdata = true
					this.$refs.uToast.show({
						type: 'success',
						duration: 1000,
						message: "已成功添加预算金额",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				} else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "添加预算金额失败，请重试",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}
			},
			// 修改预算金额数据
			async updatebudget() {
				this.showpop = false
				const { data: res } = await this.$http({
					url: "tally/updatebudget",
					method: "POST",
					data: {
						budget: this.budgetnum
					}
				})
				if(res.code == '200'){
					this.vsnum = (this.outnum/this.budgetnum)*100
					console.log(this.vsnum)
					this.$refs.uToast.show({
						type: 'success',
						duration: 1000,
						message: "已成功修改预算金额",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				} else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "修改预算金额失败，请重试",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}
			},
			// 获取用户数据计算每月支出金额
			async gettally() {
				// 初始化
				this.initArrtally = []
				const {
					data: res
				} = await this.$http({
					url: "tally/usertally",
					method: "POST"
				})
				//console.log(res)
				if (res.code == '200') {
					console.log(res)
					// 按日期筛选数据
					res.data.forEach((item, i) => {
						let index = -1;
						let isExists = this.initArrtally.some((newItem, j) => {
							if (item.datetime == newItem.datetime) {
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
					// 初始化
					this.outnum = 0
					if (this.initArrtally.length == 0) {
						return
					} else {
						// console.log(this.initArrtally)
						const timeFormat = uni.$u.timeFormat
						const newtallys = this.initArrtally.filter(item => {
							return item.datetime.substring(0, 7) == timeFormat(this.dateym, 'yyyy/mm');
						})
						this.newArrtally = newtallys
						this.newArrtally.forEach(item => {
							item.subList.forEach(items => {
								if (items.num.indexOf('-') >= 0) {
									this.outnum += items.num * (-1)
								}
							})
						})
						this.outnum = this.outnum.toString().indexOf('.') >= 0 ? this.outnum : this.outnum
							.toString() + '.00'
					}
					console.log(this.outnum)



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

	.titledate {
		display: flex;
		margin: 40rpx;
		align-items: center;
	}

	.choosedate {
		color: #aaa;
		margin-right: 10rpx;
		font-size: 15px;
	}

	.boxview {
		margin-top: 40rpx;
		width: 680rpx;
		height: 720rpx;
		border-radius: 15px;
		background-color: white;
		margin: 0 auto;
	}

	.budgetmon {
		padding: 30rpx 0 10rpx 30rpx;
		font-size: 15px;
	}

	.budgetnum {
		padding-left: 30rpx;
		font-size: 12px;
		color: #aaa;
	}
	
	.inputtitle {
		display: flex;
		padding: 40rpx;
		justify-content: space-between;
	}
	
	.leftbtn {
		color: #aaa;
	}
	
	.rightbtn {
		color: #518BF1;
	}
	
	::v-deep .u-line-progress {
		margin: 10rpx 32rpx !important;
	}
</style>

<template>
	<view class="allcontent">
		<view class="content">
			<!-- #ifdef MP-WEIXIN -->
			<view :style="{paddingTop: statusBarHeight}">
				<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
					<span @click="backmycenter" class="t-icon t-icon-fanhui2-copy"></span>
					<view style="padding-right: 80rpx;margin: 0 auto;color:white;">
						记账
					</view>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="topback">
				<span @click="backmycenter" class="t-icon t-icon-fanhui2-copy"></span>
			</view>
			<view class="title">
				记账
			</view>
			<!-- #endif -->
			<view class="oneitem">
				<view class="subone">
					<view class="toptime" @click="showdate=true">
						{{datey}}年
					</view>
					<view class="bottime" @click="showdate=true">
						{{datem}}
						<view class="subbottime">
							月<u-icon name="arrow-down-fill" color="#ffffff" size="12"></u-icon>
						</view>
					</view>
				</view>
				<view class="bothtwo">
					<view class="subtwo">
						<view class="toptime">
							支出
						</view>
						<view class="bottime">
							{{outnum}}
						</view>
					</view>
					<view class="subthree">
						<view class="toptime">
							收入
						</view>
						<view class="bottime">
							{{innum}}
						</view>
					</view>
				</view>
			</view>
			<view class="zhanwei"></view>
			<view class="twoitem">
				<view class="icontype">
					<view class="icon">
						<span class="t-icon t-icon-zichan"></span>
					</view>
					<view class="icontitle">资产</view>
				</view>
				<view class="icontype">
					<view class="icon">
						<span class="t-icon t-icon-tongji"></span>
					</view>
					<view class="icontitle">统计</view>
				</view>
				<view class="icontype">
					<view class="icon">
						<span class="t-icon t-icon-yusuanguanli"></span>
					</view>
					<view class="icontitle">预算</view>
				</view>
				<view class="icontype">
					<view class="icon">
						<span class="t-icon t-icon-baobiao"></span>
					</view>
					<view class="icontitle">报表</view>
				</view>
			</view>
			<!-- 年月选择器 -->
			<u-datetime-picker :show="showdate" v-model="dateym" mode="year-month" closeOnClickOverlay
				@confirm="confirmdate" @cancel="showdate=false" @close="showdate=false"></u-datetime-picker>
		</view>

		<view class="listbox" :style="{overflow:'auto',height:topheight}">
			<view class="tallyitem" v-for="(item,index) in newArrtally" :key="index">
				<view class="subitemtitle">
					{{item.datetime}}
				</view>
				<view class="subitemcontent" v-for="subitem in item.subList" :key="subitem.id">
					<view class="subicon">
						<view class="iconsty1" v-if="subitem.tallytype=='工资'">
							<span class="t-icon t-icon-tallywaihui1"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='理财'">
							<span class="t-icon t-icon-tallygushi1"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='红包'">
							<span class="t-icon t-icon-tallyhongbao1"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='兼职'">
							<span class="t-icon t-icon-tallyjianzhi1"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='现金'">
							<span class="t-icon t-icon-tallyxianjin1-copy"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='收银'">
							<span class="t-icon t-icon-tallyjieru1"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='其它'">
							<span class="t-icon t-icon-tallyother1"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='餐饮'">
							<span class="t-icon t-icon-tally1foot1-copy"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='娱乐'">
							<span class="t-icon t-icon-tally1game1-copy"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='日用'">
							<span class="t-icon t-icon-tally1riyong1-copy"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='住房'">
							<span class="t-icon t-icon-tally1home1-copy"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='旅行'">
							<span class="t-icon t-icon-tally1lvxing1-copy"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='医疗'">
							<span class="t-icon t-icon-tally1yiliao1-copy"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='交通'">
							<span class="t-icon t-icon-tally1car1-copy1-copy"></span>
						</view>
						<view class="bothcontent">
							<view class="subtoptype">
								{{subitem.tallytype}}
							</view>
							<view class="subbotremark">
								{{subitem.remark}}
							</view>
						</view>
					</view>
					<view class="submoney" v-if="subitem.num.indexOf('-')>=0 && subitem.num.indexOf('.')>=0"
						style="color: #F06872;">
						{{subitem.num}}
						<view class="submoneytitle">
							支出
						</view>
					</view>
					<view class="submoney" v-if="subitem.num.indexOf('-')>=0 && subitem.num.indexOf('.')<0"
						style="color: #F06872;">
						{{subitem.num}}.00
						<view class="submoneytitle">
							支出
						</view>
					</view>
					<view class="submoney" v-if="subitem.num.indexOf('-')<0 && subitem.num.indexOf('.')>=0"
						style="color: #518BF1;">
						+{{subitem.num}}
						<view class="submoneytitle">
							收入
						</view>
					</view>
					<view class="submoney" v-if="subitem.num.indexOf('-')<0 && subitem.num.indexOf('.')<0"
						style="color: #518BF1;">
						+{{subitem.num}}.00
						<view class="submoneytitle">
							收入
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 消息提示 -->
		<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
		<!-- 新建按钮 -->
		<view @click="tonewtally" class="addbacklog t-icon t-icon-add-copy-copy"></view>
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
		data() {
			return {
				// 距离top高度
				topheight: "",
				// 初始所有的数据
				initArrtally: [],
				// 筛选后的数据
				newArrtally: [],
				// 显示日历选择器
				showdate: false,
				// 日期
				dateym: Number(new Date()),
				datey: "",
				datem: "",
				// 收入
				innum: 0,
				// 支出
				outnum: 0,
			}
		},
		onShow() {
			this.nowgettally()
			this.datey = uni.$u.timeFormat(Number(new Date())).split("-")[0]
			this.datem = uni.$u.timeFormat(Number(new Date())).split("-")[1]
		},
		// #ifdef MP-WEIXIN
		onReady() {
			uni.createSelectorQuery().in(this).select(".listbox").boundingClientRect((data) => {
					this.topheight = "calc(100% - (" + data.top + "px" + " + " + 90 + "px))";
				})
				.exec();

		},
		// #endif
		// #ifndef MP-WEIXIN
		onReady() {
			uni.createSelectorQuery().in(this).select(".listbox").boundingClientRect((data) => {
					this.topheight = "calc(100% - " + data.top + "px)";
				})
				.exec();

		},
		// #endif
		methods: {
			// 返回
			backmycenter() {
				uni.navigateBack()
			},
			// 获取用户所有记账数据
			async gettally() {
				// 初始化
				this.initArrtally=[]
				const {
					data: res
				} = await this.$http({
					url: "tally/usertally",
					method: "POST"
				})
				//console.log(res)
				if (res.code == '200') {
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
			// 跳转添加页面
			tonewtally() {
				uni.navigateTo({
					url: "./addtally"
				})
			},
			// 当前月份数据过滤
			async nowgettally() {
				// 初始化
				this.outnum = 0
				this.innum = 0
				this.gettally().then(()=>{
				console.log(this.initArrtally)
				const timeFormat = uni.$u.timeFormat
					const newtallys =  this.initArrtally.filter(item => {
						return item.datetime.substring(0,7) == timeFormat(this.dateym, 'yyyy/mm');
					})
					this.newArrtally = newtallys
					this.newArrtally.forEach(item => {
						item.subList.forEach(items => {
							if(items.num.indexOf('-')>=0){
								this.outnum += items.num*(-1)
							}else{
								this.innum += items.num*1
							}
						})
					})
					this.outnum = this.outnum.toString().indexOf('.')>=0?this.outnum:this.outnum.toString()+'.00'
					this.innum = this.innum.toString().indexOf('.')>=0?this.innum:this.innum.toString()+'.00'
					})
			},
			// 指定日期数据过滤
			async confirmdate(e) {
				// 初始化
				this.outnum = 0
				this.innum = 0
				this.showdate = false
				const timeFormat = uni.$u.timeFormat
				this.datey = (timeFormat(e.value, 'yyyy-mm')).split('-')[0]
				this.datem = (timeFormat(e.value, 'yyyy-mm')).split('-')[1]
				this.gettally().then(() => {
					const newtallys =  this.initArrtally.filter(item => {
						return item.datetime.substring(0,7) == timeFormat(e.value, 'yyyy/mm');
					})
					this.newArrtally = newtallys
					this.newArrtally.forEach(item => {
						item.subList.forEach(items => {
							if(items.num.indexOf('-')>=0){
								this.outnum += items.num*(-1)
							}else{
								this.innum += items.num*1
							}
						})
					})
					this.outnum = this.outnum.toString().indexOf('.')>=0?this.outnum:this.outnum.toString()+'.00'
					this.innum = this.innum.toString().indexOf('.')>=0?this.innum:this.innum.toString()+'.00'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.allcontent {
		height: 100%;
		overflow: hidden;
		background-color: #EFEFEF;
	}

	.content {
		overflow: initial;
		width: 100%;
		background-color: #518BF1;
		position: relative;
	}

	.topback {
		top: 60rpx;
		left: 40rpx;
		position: fixed;
	}

	.title {
		color: white;
		padding-top: 60rpx;
		text-align: center;
	}

	.listcontent {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.topcontent {
		width: 100%;
		height: 200rpx;
		background-color: #518BF1;
	}

	.oneitem {
		display: flex;
		align-items: center;
		color: white;
		margin: 40rpx 40rpx 0 40rpx;
	}

	.subone {
		display: flex;
		flex-direction: column;
	}

	.bottime {
		display: flex;
		align-items: center;
		margin-top: 16rpx;
		font-size: 18px;

	}

	.subbottime {
		display: flex;
		font-size: 12px;
		margin-left: 10rpx;
		margin-top: 8rpx;
	}

	.toptime {
		font-size: 12px;
		color: #f3f3f3;
	}

	.bothtwo {
		margin-left: 40rpx;
		border-left: 1px solid #f3f3f3;
		flex: 1;
		justify-content: space-around;
		display: flex;
	}
	
	.addbacklog {
		width: 120rpx;
		height: 120rpx;
		z-index: 99;
		position: fixed;
		bottom: 140rpx;
		right: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.zhanwei {
		width: 100%;
		height: 90rpx;
	}

	.twoitem {
		width: 90%;
		height: 150rpx;
		background-color: white;
		position: absolute;
		left: 0;
		right: 0;
		bottom: -80rpx;
		margin: 0 auto;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.icontype {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.icontitle {
		font-size: 13px;
	}

	.icon {
		.t-icon {
			width: 48rpx;
			height: 48rpx;
		}
	}

	.subbotremark {
		color: #A1A1A1;
		font-size: 12px;
	}

	.iconsty1 {
		background-color: #518BF1;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 75rpx;
		height: 75rpx;
		border-radius: 50%;
		margin-right: 40rpx;

		.t-icon {
			width: 48rpx;
			height: 48rpx;
		}
	}

	.listbox {
		position: absolute;
		margin-top: 80rpx;
		overflow: auto;
		width: 100%;
	}

	.tallyitem {
		margin: 0 auto;
		border-radius: 10px;
		margin-top: 20rpx;
		width: 680rpx;
		background-color: white;
	}

	.subitemtitle {
		height: 70rpx;
		background-color: #F9F9F9;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		display: flex;
		align-items: center;
		padding-left: 30rpx;
		color: #A1A1A1;
		font-size: 12px;
	}

	.subitemcontent {
		align-items: center;
		display: flex;
		height: 120rpx;
		justify-content: space-between;
	}

	.submoneytitle {}

	.subicon {
		margin-left: 30rpx;
		justify-content: center;
		display: flex;
		align-items: center;
		font-size: 15px;
	}

	.submoney {
		margin-right: 30rpx;
	}

	.submoneytitle {
		text-align: end;
		color: #A1A1A1;
		font-size: 12px;
	}
</style>

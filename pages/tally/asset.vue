<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<span @click="backmycenter" class="t-icon t-icon-fanhui2"></span>
				<view style="padding-right: 80rpx;margin: 0 auto;" class="title">
					资产
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="topback">
			<span @click="backmycenter" class="t-icon t-icon-fanhui2"></span>
		</view>
		<view class="title">
			资产
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="listcontent" :style="{height: unalltop,overflow: 'auto'}">
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="listcontent" style="height: calc(100% - 51px);overflow: auto;">
				<!-- #endif -->
				<view class="assetcard">
					<view class="onecard">
						净资产 <u-icon @click="isshownum=!isshownum" v-if="isshownum" style="margin-left: 15rpx;"
							name="eye-fill" color="#eaf1ff" size="18"></u-icon>
						<u-icon @click="isshownum=!isshownum" v-if="!isshownum" style="margin-left: 15rpx;"
							name="eye-off" color="#eaf1ff" size="18"></u-icon>
					</view>
					<view class="twocard" v-if="isshownum">
						{{subassetnum}}
					</view>
					<view class="twocard" v-if="!isshownum">
						***
					</view>
					<view class="threecard" v-if="isshownum">
						<view class="threeleft">
							总资产: {{subassetnum}}
						</view>
						<view class="threeright">
							总支出: {{alloutnum}}
						</view>
					</view>
					<view class="threecard" v-if="!isshownum">
						<view class="threeleft">
							总资产: ***
						</view>
						<view class="threeright">
							总支出: ***
						</view>
					</view>
				</view>
				
				
				<!-- 资产总览 -->
				<view class="allasset" v-if="isminallasset">
					<view @click="isminallasset=!isminallasset" class="alltitle">
						<view class="assettitle">
							资产总览
						</view>
						<view class="assettitle1" v-if="isshownum">
							{{allassetnum}}<u-icon name="arrow-up" color="#aaa" size="15"></u-icon>
						</view>
						<view class="assettitle1" v-if="!isshownum">
							***<u-icon name="arrow-up" color="#aaa" size="15"></u-icon>
						</view>
					</view>
				</view>
				<view class="allasset" v-if="!isminallasset">
					<view @click="isminallasset=!isminallasset" class="alltitle">
						<view class="assettitle">
							资产总览
						</view>
						<view class="assettitle1" v-if="isshownum">
							{{allassetnum}} <u-icon name="arrow-down" color="#aaa" size="15"></u-icon>
						</view>
						<view class="assettitle1" v-if="!isshownum">
							*** <u-icon name="arrow-down" color="#aaa" size="15"></u-icon>
						</view>
					</view>
					
					<view class="subitemcontent" v-for="subitem in assetdata" :key="subitem.id">
						<view class="subicon">
							<view class="iconsty1" v-if="subitem.tallytype=='工资'" style="background-color: #518BF1;">
								<span class="t-icon t-icon-tallywaihui1"></span>
							</view>
							<view class="iconsty1" v-if="subitem.tallytype=='理财'" style="background-color: #74C783;">
								<span class="t-icon t-icon-tallygushi1"></span>
							</view>
							<view class="iconsty1" v-if="subitem.tallytype=='红包'" style="background-color: #FA623D;">
								<span class="t-icon t-icon-tallyhongbao1"></span>
							</view>
							<view class="iconsty1" v-if="subitem.tallytype=='兼职'" style="background-color: #F3B32B;">
								<span class="t-icon t-icon-tallyjianzhi1"></span>
							</view>
							<view class="iconsty1" v-if="subitem.tallytype=='现金'" style="background-color: #798EBB;">
								<span class="t-icon t-icon-tallyxianjin1-copy"></span>
							</view>
							<view class="iconsty1" v-if="subitem.tallytype=='收银'" style="background-color: #A97FE6;">
								<span class="t-icon t-icon-tallyjieru1"></span>
							</view>
							<view class="iconsty1" v-if="subitem.tallytype=='其它'" style="background-color: #07BD73;">
								<span class="t-icon t-icon-tallyother1"></span>
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
						<view class="submoney" v-if="subitem.num.indexOf('-')<0 && subitem.num.indexOf('.')>=0"
							style="color: #518BF1;">
							+{{subitem.num}}
							<view class="submoneytitle">
								{{subitem.datetime}}
							</view>
						</view>
						<view class="submoney" v-if="subitem.num.indexOf('-')<0 && subitem.num.indexOf('.')<0"
							style="color: #518BF1;">
							+{{subitem.num}}.00
							<view class="submoneytitle">
								{{subitem.datetime}}
							</view>
						</view>
					</view>
						
				</view>
				
				<!-- 支出总览 -->
				<view class="allasset" v-if="isminallout">
					<view @click="isminallout=!isminallout" class="alltitle">
						<view class="assettitle">
							支出总览
						</view>
						<view class="assettitle1" v-if="isshownum">
							{{alloutnum}} <u-icon name="arrow-up" color="#aaa" size="15"></u-icon>
						</view>
						<view class="assettitle1" v-if="!isshownum">
							*** <u-icon name="arrow-up" color="#aaa" size="15"></u-icon>
						</view>
					</view>				
				</view>
				<view class="allasset" v-if="!isminallout">
					<view @click="isminallout=!isminallout" class="alltitle">
						<view class="assettitle">
							支出总览
						</view>
						<view class="assettitle1" v-if="isshownum">
							{{alloutnum}} <u-icon name="arrow-down" color="#aaa" size="15"></u-icon>
						</view>
						<view class="assettitle1" v-if="!isshownum">
							*** <u-icon name="arrow-down" color="#aaa" size="15"></u-icon>
						</view>
					</view>
								
					<view class="subitemcontent" v-for="subitem in outdata" :key="subitem.id">
						<view class="subicon">
						<view class="iconsty1" v-if="subitem.tallytype=='餐饮'" style="background-color: #518BF1;">
							<span class="t-icon t-icon-tally1foot1-copy"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='娱乐'" style="background-color: #74C783;">
							<span class="t-icon t-icon-tally1game1-copy"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='日用'" style="background-color: #F3B32B;">
							<span class="t-icon t-icon-tally1riyong1-copy"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='住房'" style="background-color: #FA623D;">
							<span class="t-icon t-icon-tally1home1-copy"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='旅行'" style="background-color: #798EBB;">
							<span class="t-icon t-icon-tally1lvxing1-copy"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='医疗'" style="background-color: #07BD73;">
							<span class="t-icon t-icon-tally1yiliao1-copy"></span>
						</view>
						<view class="iconsty1" v-if="subitem.tallytype=='交通'" style="background-color: #518BF1;">
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
								{{subitem.datetime}}
							</view>
						</view>
						<view class="submoney" v-if="subitem.num.indexOf('-')>=0 && subitem.num.indexOf('.')<0"
							style="color: #F06872;">
							{{subitem.num}}.00
							<view class="submoneytitle">
								{{subitem.datetime}}
							</view>
						</view>
					</view>
	
				</view>

			</view>
			<!-- 消息提示 -->
			<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
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

		onShow() {
			this.gettally()
		},

		data() {
			return {
				// 距离top高度
				topheight: "",
				// 是否可见
				isshownum: true,
				// 是否打开总览
				isminallasset: false,
				isminallout: false,
				// 资产数据
				assetdata: [],
				// 支出数据
				outdata: [],
				// 总资产
				allassetnum: 0,
				// 总支出
				alloutnum: 0,
				// 净资产
				subassetnum: 0,
			}
		},
		methods: {
			// 返回
			backmycenter() {
				uni.navigateBack()
			},
			// 获取用户所有记账数据
			async gettally() {
				// 初始化
				this.outdata=[]
				this.assetdata=[]
				this.allassetnum = 0
				this.alloutnum = 0
				this.subassetnum = 0
				const {
					data: res
				} = await this.$http({
					url: "tally/usertally",
					method: "POST"
				})
				//console.log(res)
				if (res.code == '200') {
					res.data.forEach((item) => {
						if(item.num.indexOf('-')>=0){
							this.alloutnum += (item.num.toString().slice(1))*1
							this.outdata.push(item)
						}else{
							this.allassetnum += item.num*1 
							this.assetdata.push(item)
						}
					})
					this.subassetnum = this.allassetnum - this.alloutnum
					this.allassetnum = this.allassetnum.toString().indexOf(".")>=0 ? this.allassetnum:this.allassetnum+'.00'
					this.alloutnum = this.alloutnum.toString().indexOf(".")>=0 ? this.alloutnum:this.alloutnum+'.00'
					this.subassetnum = this.subassetnum.toString().indexOf(".")>=0 ? this.subassetnum:this.subassetnum+'.00'
				} else if (res.code == '201') {
					this.outdata=[]
					this.assetdata=[]
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

	.assetcard {
		width: 680rpx;
		height: 300rpx;
		border-radius: 15px;
		margin: 0 auto;
		margin-top: 20rpx;
		background-color: #518bf1;
		background-image: linear-gradient(45deg, #518bf1 0%, #adc9f9 100%);
		box-shadow: 5px 5px 10px #efeded;
	}

	.onecard {
		display: flex;
		color: #eaf1ff;
		font-size: 14px;
		padding: 50rpx 0 0 40rpx;
	}

	.twocard {
		margin-left: 40rpx;
		margin-top: 20rpx;
		color: white;
		font-size: 25px;
	}

	.threecard {
		margin-left: 40rpx;
		display: flex;
		color: #eaf1ff;
		font-size: 14px;
		margin-top: 60rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.threeright {
		margin-right: 40rpx;
	}
	
	.allasset {
		background-color: white;
		border-radius: 15px;
		margin: 0 auto;
		margin-top: 40rpx;
		width: 680rpx;
		margin-bottom: 40rpx;
	}
	
	.alltitle {
		width: 680rpx;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.assettitle {
		margin-left: 40rpx;
		font-weight: bold;
	}
	
	.assettitle1 {
		color: #aaa;
		font-size: 15px;
		margin-right: 40rpx;
		display: flex;
		align-items: center;
		.u-icon {
			margin-left: 16rpx;
		}
	}
	
	.subitemcontent {
		align-items: center;
		display: flex;
		height: 120rpx;
		justify-content: space-between;
	}
	
	.subicon {
		margin-left: 30rpx;
		justify-content: center;
		display: flex;
		align-items: center;
		font-size: 15px;
	}
	
	.iconsty1 {
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
	
	.submoney {
		margin-right: 30rpx;
		text-align: end;
	}
	
	.subbotremark {
		color: #A1A1A1;
		font-size: 12px;
	}
	
	.submoneytitle {
		text-align: end;
		color: #A1A1A1;
		font-size: 12px;
	}
	
</style>

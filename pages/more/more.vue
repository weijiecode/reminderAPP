<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<view class="topback">
					<view class="allbtnsty" v-show="showtype==0">
						<view class="btnsty">
							<span id="typetop" class="t-icon t-icon-checkbox1-copy"></span>
						</view>
						<view class="btnsty1">
							<span @click="showtype=1" id="typetop" class="t-icon t-icon-checkbox"></span>
						</view>
					</view>
					<view class="allbtnsty" v-show="showtype==1">
						<view class="btnsty1">
							<span @click="showtype=0" id="typetop" class="t-icon t-icon-checkbox1"></span>
						</view>
						<view class="btnsty">
							<span id="typetop" class="t-icon t-icon-checkbox-copy"></span>
						</view>
					</view>
				</view>
				<view style="margin: 0 auto;padding-right: 40rpx;" class="title">
					应用
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="topback1">
			<view class="allbtnsty" v-show="showtype==0">
				<view class="btnsty">
					<span id="typetop" class="t-icon t-icon-checkbox1-copy"></span>
				</view>
				<view class="btnsty1">
					<span @click="showtype=1" id="typetop" class="t-icon t-icon-checkbox"></span>
				</view>
			</view>
			<view class="allbtnsty" v-show="showtype==1">
				<view class="btnsty1">
					<span @click="showtype=0" id="typetop" class="t-icon t-icon-checkbox1"></span>
				</view>
				<view class="btnsty">
					<span id="typetop" class="t-icon t-icon-checkbox-copy"></span>
				</view>
			</view>
		</view>
		<view class="title">
			应用
		</view>
		<!-- #endif -->
		<!-- 类型1 -->
		<view v-show="showtype==0" class="listcontent" :style="{height: topheight,overflow: 'auto'}">
			<view class="allitem">
				<!-- 纪念日 -->
				<Submemorial :memorialdata="memorialdata"></Submemorial>
			</view>
		</view>
		<!-- 类型2 -->
		<view v-show="showtype==1" class="listcontent" :style="{height: topheight,overflow: 'auto'}">
			<view class="allitem">
				<view style="text-align: center;">
					应用
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
	
	import Submemorial from '../../components/submemorial.vue'
	export default {
		// #ifdef MP-WEIXIN
		mixins: [getstatusBarHeight],
		// #endif
		components: {
			Submemorial
		},
		created() {},
		onShow() {
			this.getmemorial()
		},
		onReady() {
			uni.createSelectorQuery().in(this).select(".listcontent").boundingClientRect((data) => {
					this.topheight = "calc(100% - " + data.top + "px)";
				})
				.exec();
		},
		data() {
			return {
				// 类型显示
				showtype: 0,
				// 距离top高度
				topheight: "",
				// 用户纪念日数据
				memorialdata: []
			}
		},
		methods: {
			// 获取用户所有纪念日数据
			async getmemorial() {
				const { data:res } = await this.$http({
					url: "memorial/usermemorial",
					method: "POST"
				})
				// console.log(res)
				if(res.code == '200') {
					let nowTIme = new Date();
					this.memorialdata = res.data
					this.memorialdata.forEach((item,index) => {
						let setTime = new Date(item.datetime)
						this.memorialdata[index].nums = parseInt((setTime.getTime() - nowTIme.getTime()) / (60*60*24*1000))
					})
				}else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "纪念日数据获取失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}
			}
		}
	}
</script>

<style>
	.content {
		height: 100%;
		overflow: hidden;
	}
	.topback {
		left: 40rpx;
		position: fixed;
		width: 140rpx;
	}
	.topback1 {
		top: 60rpx;
		left: 40rpx;
		position: fixed;
		width: 140rpx;
	}

	.title {
		margin-top: 60rpx;
		text-align: center;
		font-size: larger;
	}

	#typetop {
		width: 38rpx;
		height: 38rpx;
	}

	.btnsty {
		background-color: rgb(119, 102, 231);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}
	
	.btnsty1 {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}
	
	.allbtnsty {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	.allitem {
		display: flex;
		flex-direction: column;
		align-items: center;
		
		
		height: 1800px;
		width: 100%;

	}
	
	
	
	
</style>

<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<span @click="backmycenter" class="t-icon t-icon-fanhui2"></span>
				<view style="padding-right: 80rpx;margin: 0 auto;" class="title">
					我的消息
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="topback">
			<!-- <u-icon size="25" @click="backmycenter" name="arrow-left"></u-icon> -->
			<span @click="backmycenter" class="t-icon t-icon-fanhui2"></span>
		</view>
		<view class="title">
			我的消息
		</view>
		<!-- #endif -->
		<view class="listcontent" :style="{height: topheight,overflow: 'auto'}">
			<view class="msgcontent">
				<view class="msgbox">
					
				</view>
				<view class="msgbox">
					
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
		onReady() {
			uni.createSelectorQuery().in(this).select(".listcontent").boundingClientRect((data) => {
					this.topheight = "calc(100% - " + data.top + "px)";
				})
				.exec();
		},
		onShow() {
			this.getUserMessage();
		},
		data() {
			return {
				// 距离top高度
				topheight: "",
				// 消息数据
				msgdata: []
			}
		},
		methods: {
			// 返回
			backmycenter() {
				uni.navigateBack()
			},
			// 获取消息列表
			async getUserMessage() {
				const { data: res } = await this.$http({
					url: 'message/usermessage',
					method: 'GET'
				});
				// console.log(res);
				if(res.code == '200'){
					this.msgdata = res.data
					console.log(this.msgdata)
				}
			}
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
	
	.msgcontent {
		height: 1500px;
		background-color: antiquewhite;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.msgbox {
		margin-top: 20rpx;
		width: 680rpx;
		height: 140rpx;
		background-color: white;
		border-radius: 15px;
	}
	
</style>

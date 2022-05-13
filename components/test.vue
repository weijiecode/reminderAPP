<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<span @click="backmycenter" id="backtop" class="t-icon t-icon-fanhui2"></span>
				<view style="padding-right: 80rpx;margin: 0 auto;" class="title">
					纪念日
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
			纪念日
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="listcontent" :style="{height: unalltop,overflow: 'hidden'}">
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="listcontent" style="height: calc(100% - 71px);overflow: hidden;">
		<!-- #endif -->
		<view class="allbar">
			<view class="subbar"></view>
			<view class="subbar"></view>
		</view>
		<view class="listbox">
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
		// onReady() {
		// 	uni.createSelectorQuery().in(this).select(".listcontent").boundingClientRect((data) => {
		// 			this.topheight = "calc(100% - " + data.top + "px)";
		// 		})
		// 		.exec();
		// },
		data() {
			return {
				// 距离top高度
				topheight: "",
			}
		},
		methods: {
			backmycenter() {
				uni.switchTab({
					url: "../more/more"
				})
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
	
	.listcontent {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.listbox {
		margin-top: -44rpx;
		overflow: auto;
		height: 90%;
		border-radius: 10px;
		width: 680rpx;
		background-color: white;
		box-shadow: 5px 5px 10px #efeded;
		display: flex;
		justify-content: center;
	}
	
	.allbar {
		margin-top: -40rpx;
		z-index: 2;
		display: flex;
		width: 400rpx;
		justify-content: space-between;
	}
	
	.subbar {
		width: 40rpx;
		height: 80rpx;
		background-color: #FFCBD4;
		border-radius: 20px;
		border: 5px solid #F8F8FB;
	}
	

</style>

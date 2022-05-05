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
		<view class="listcontent" :style="{height: topheight,overflow: 'auto'}">
			<view style="height: 1500px;background-color: aquamarine;">
				
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
		data() {
			return {
				// 距离top高度
				topheight: "",
			}
		},
		methods: {
			
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
</style>

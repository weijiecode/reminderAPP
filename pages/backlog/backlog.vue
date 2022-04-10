<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight + 'px'}">
			<view :style="{height: titleBarHeight + 'px', backgroundColor: 'red'}">
				<span @click="backmycenter" class="btnshow t-icon t-icon-fanhui2"></span>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="topback">
			<!-- <u-icon size="25" @click="backmycenter" name="arrow-left"></u-icon> -->
			<span @click="backmycenter" class="btnshow t-icon t-icon-fanhui2"></span>
		</view>
		<view class="title">
			学习
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	// #ifdef MP-WEIXIN
		import {getstatusBarHeight} from '../../components/mixins/mixin.js'
	// #endif
	export default {
		// #ifdef MP-WEIXIN
		mixins:[getstatusBarHeight],
		// #endif
		onLoad(option) {
			this.backlogtype = option.id
		},
		data() {
			return {
				// 类别
				backlogtype: "",
			}
		},
		methods: {
			// 返回首页
			backmycenter() {
				uni.switchTab({
					url: "index"
				})
			},

		}
	}
</script>

<style scoped lang="scss">
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

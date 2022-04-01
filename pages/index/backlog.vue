<template>
	<view class="content">
		<view class="topback">
			<u-icon size="25" @click="backmycenter" name="arrow-left"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 返回首页
				backmycenter() {
					uni.switchTab({
						url: "index"
					})
				},
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.topback {
		margin-top: 60rpx;
		margin-left: 40rpx;
		align-self: flex-start;
	}
</style>

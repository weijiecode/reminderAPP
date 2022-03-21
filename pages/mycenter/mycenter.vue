<template>
	<view class="content">
		<view class="navigate">
			<navigator url="/pages/login/login" hover-class="navigator-hover" class="account">
				<image src="../../static/t.jpeg" mode="">
				</image>
				<view class="online">
				</view>
				<text class="nickname">你吃晚饭了吗</text>
				<view class="t-icon t-icon-xiangyou1"></view>
			</navigator>
			<view class="setting">

			</view>
			<view class="others">

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			// login() {
			// 	console.log('123')
			// 	uni.navigateTo({
			// 		url:"/pages/login/login"
			// 	})
			// }
		}
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
		height: 100%;
		background-color: #F8F8FB;
		// background-image: linear-gradient(62deg, #f8f8fb 23%, #fae9ff 53%, #f8f8fb 95%) !important;
	}
	.navigate {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.account {
		margin-top: 160rpx;
		width: 640rpx;
		height: 180rpx;
		background-color: #ffffff;
		border-radius: 10px;
		box-shadow: 5px 5px 10px #efeded;
		position: relative;

		image {
			float: left;
			margin-left: 60rpx;
			margin-top: 35rpx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			box-shadow: 0 0 0 3px #f3efef;
		}

		.nickname {
			float: left;
			color: #6a6767;
			font-weight: 600;
			margin-top: 68rpx;
			margin-left: 40rpx;
			display: block;
		}

		.t-icon {
			float: right;
			margin-top: 76rpx;
			margin-right: 40rpx;
		}

		.online {
			background-color: #8bcf70;
			width: 18rpx;
			height: 18rpx;
			border-radius: 100%;
			position: absolute;
			top: 112rpx;
			left: 140rpx;
			border: 2rpx solid #FFFFFF;
		}
	}

	.setting {
		margin-top: 40rpx;
		border-radius: 10px;
		width: 640rpx;
		height: 400rpx;
		background-color: #ffffff;
		box-shadow: 5px 5px 10px #efeded;
	}

	.others {
		width: 640rpx;
		height: 120rpx;
		margin-top: 40rpx;
		border-radius: 10px;
		background-color: #ffffff;
		box-shadow: 5px 5px 10px #efeded;
	}
</style>

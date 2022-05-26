<template>
	<view>
		<view class="diary">
			<view class="oneblock" @click="diarypage">
				<view class="iconbg">
					<span class="typeicon t-icon t-icon-jishiben"></span>
				</view>
				<view class="diarytitle">
					<view class="onetitle">
						日记
					</view>
					<view class="twotitle">
						有{{diarydata.nums}}篇日记
					</view>
				</view>
				<view class="rightback">
					<span class="backicon t-icon t-icon-xiangyou1"></span>
				</view>
			</view>
			<view v-if="diarydata.nums > 0" class="twoblock">
				<view class="subtitle">
					<view class="subonetitle">{{diarydata.onedatetime}}</view>
					<view class="subtwotitle">{{diarydata.twodatetime}}</view>
				</view>
				<view class="line"></view>
				<view class="subcontent">
					{{diarydata.content}}
				</view>
			</view>
			<view v-if="diarydata.nums == 0" class="twoblock">
				<view class="subtitle1">暂无日记信息</view>
			</view>
			<!-- 消息提示 -->
			<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["diarydata"],
		name: "diary",
		data() {
			return {};
		},
		methods: {
			// 跳转纪念日详情页面
			diarypage() {
				uni.navigateTo({
					url: "../../pages/diary/diary"
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.diary {
		padding-top: 2rpx;
		margin-top: 40rpx;
		border-radius: 15px;
		width: 680rpx;
		height: 260rpx;
		background-color: #ffffff;
		box-shadow: 5px 5px 10px #efeded;
	}

	.diary1 {
		padding-top: 2rpx;
		margin-top: 40rpx;
		border-radius: 15px;
		width: 680rpx;
		height: 280rpx;
		background-color: #ffffff;
		box-shadow: 5px 5px 10px #efeded;
	}

	.iconbg {
		width: 100rpx;
		height: 100rpx;
		border-radius: 10px;
		background-color: #fff7d4;
		display: flex;
		justify-content: center;
		align-items: center;
		float: left;
	}

	.oneblock {
		display: flex;
		margin: 40rpx;
		align-items: center;
		justify-content: space-between;
	}

	.typeicon {
		width: 70rpx;
		height: 70rpx;
	}

	.diarytitle {
		float: left;
		margin-left: 28rpx;
		flex: 1;
	}

	.onetitle {
		font-size: 15px;
	}

	.subonetitle {
		color: #505050;
		font-size: 18px;
		font-weight: bold;
		text-align: center;
	}

	.subtwotitle {
		text-align: center;
		color: #aaa;
		font-size: 13px;
	}

	.twotitle {
		font-size: 12px;
		color: #aaa;
		margin-top: 14rpx;
	}

	.backicon {
		width: 40rpx;
		height: 40rpx;
	}

	.twoblock {
		margin-top: -20rpx;
		display: flex;
		overflow: auto;
		align-items: center;
	}

	.subtitle {
		font-size: 13px;
		color: #aaa;
		padding-left: 40rpx;
		padding-right: 40rpx;
		width: 90rpx;
		display: flex;
		flex-direction: column;
	}

	.subtitle1 {
		margin-top: 20rpx;
		font-size: 13px;
		color: #aaa;
		padding-left: 40rpx;
		width: 500rpx;
	}
	
	.line {
		height: 40px;
		border-right: 1px dashed #aaa;
	}

	.subcontent {
		font-size: 15px;
		color: #aaa;
		margin-top: 8rpx;
		padding-left: 40rpx;
		width: 420rpx;
		overflow: hidden;
		white-space: nowrap;
	}
</style>

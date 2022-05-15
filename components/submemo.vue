<template>
	<view>
		<view class="memo">
			<view class="oneblock"  @click="memopage">
				<view class="iconbg">
					<span class="typeicon t-icon t-icon-beiwanglu"></span>
				</view>
				<view class="memotitle">
					<view class="onetitle">
						备忘录
					</view>
					<view class="twotitle">
						有{{memodata.nums}}篇备忘录
					</view>
				</view>
				<view class="rightback">
					<span class="backicon t-icon t-icon-xiangyou1"></span>
				</view>
			</view>
			<view v-if="memodata.nums > 0" class="twoblock">
				<view class="subtitle">{{memodata.title}}</view>
				<view class="subcontent">
					{{memodata.datetime}} {{memodata.content}}
				</view>
			</view>
			<view v-if="memodata.nums == 0" class="twoblock">
				<view class="subtitle">暂无备忘录信息</view>
			</view>
			<!-- 消息提示 -->
			<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["memodata"],
		name: "submemo",
		data() {
			return {
			};
		},
		methods: {
			// 跳转纪念日详情页面
			memopage() {
				uni.navigateTo({
					url: "../../pages/memo/memo"
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.memo {
		padding-top: 2rpx;
		margin-top: 40rpx;
		border-radius: 15px;
		width: 680rpx;
		height: 260rpx;
		background-color: #ffffff;
		box-shadow: 5px 5px 10px #efeded;
	}
	.memo1 {
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
		background-color: #ded8f9;
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

	.memotitle {
		float: left;
		margin-left: 28rpx;
		flex: 1;
	}

	.onetitle {
		font-size: 16px;
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
		margin-top: -40rpx;
		overflow: auto;
	}
	
	.subtitle {
		font-size: 15px;
		color: #505050;
		padding-left: 40rpx;
		margin-top: 20rpx;
	}
	
	.subcontent {
		font-size: 12px;
		color: #aaa;
		margin-top: 8rpx;
		padding-left: 40rpx;
		width: 600rpx;
		overflow: hidden;
		white-space: nowrap;
	}

</style>

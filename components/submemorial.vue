<template>
	<view class="memorial">
		<view class="oneblock"  @click="memorialpage">
			<view class="iconbg">
				<span class="typeicon t-icon t-icon-jinianrix"></span>
			</view>
			<view class="memorialtitle">
				<view class="onetitle">
					纪念日
				</view>
				<view class="twotitle">
					有21个重要日子
				</view>
			</view>
			<view class="rightback">
				<span class="backicon t-icon t-icon-xiangyou1"></span>
			</view>
		</view>
		<view class="twoblock">
			<view class="subcontent">
				<view class="subcontentl">
					距&nbsp;测试测试1
				</view>
				<view class="subcontentr">
					还有<view class="subcontentrtext">25</view>天
				</view>
			</view>
			<view class="subcontent">
				<view class="subcontentl">
					距&nbsp;测试测试2
				</view>
				<view class="subcontentr">
					还有<view class="subcontentrtext">25</view>天
				</view>
			</view>
			<view class="subcontent">
				<view class="subcontentl">
					距&nbsp;测试测试3
				</view>
				<view class="subcontentr">
					还有<view class="subcontentrtext">25</view>天
				</view>
			</view>
			<view class="subcontent">
				<view class="subcontentl">
					距&nbsp;测试测试4
				</view>
				<view class="subcontentr">
					还有<view class="subcontentrtext">25</view>天
				</view>
			</view>
			<view class="subcontent">
				<view class="subcontentl">
					距&nbsp;测试测试5
				</view>
				<view class="subcontentr">
					还有<view class="subcontentrtext">25</view>天
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "submemorial",
		data() {
			return {

			};
		},
		methods: {
			memorialpage() {
				uni.navigateTo({
					url: "../../pages/memorial/memorial"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.memorial {
		padding-top: 2rpx;
		margin-top: 40rpx;
		border-radius: 10px;
		width: 640rpx;
		height: 420rpx;
		background-color: #ffffff;
		box-shadow: 5px 5px 10px #efeded;
	}

	.iconbg {
		width: 100rpx;
		height: 100rpx;
		border-radius: 10px;
		background-color: #FFCBD4;
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

	.memorialtitle {
		float: left;
		margin-left: 28rpx;
		flex: 1;
	}

	.onetitle {
		font-size: 18px;
	}

	.twotitle {
		font-size: 14px;
		color: #aaa;
		margin-top: 14rpx;
	}

	.backicon {
		width: 40rpx;
		height: 40rpx;
	}

	.twoblock {
		margin-top: -20rpx;
		height: 252rpx;
		overflow: auto;
	}

	.subcontent {
		display: flex;
		align-items: center;
		height: 80rpx;
		justify-content: space-between;
		margin: 0 40rpx;
		color: #505050;
	}

	.subcontentr {
		display: flex;
	}

	.subcontentrtext {
		margin: 0 20rpx;
		color: #FE738A;
		font-weight: bolder;
	}
</style>

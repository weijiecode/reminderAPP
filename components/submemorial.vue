<template>
	<view>
		<view v-if="memorialdata.length > 0" class="memorial" :style="{height: memorialdata.length==1 ? '240rpx' : memorialdata.length==2 ? '320rpx' : '420rpx'}">
			<view class="oneblock"  @click="memorialpage">
				<view class="iconbg">
					<span class="typeicon t-icon t-icon-jinianrix"></span>
				</view>
				<view class="memorialtitle">
					<view class="onetitle">
						纪念日
					</view>
					<view class="twotitle">
						有{{memorialdata.length}}个重要日子
					</view>
				</view>
				<view class="rightback">
					<span class="backicon t-icon t-icon-xiangyou1"></span>
				</view>
			</view>
			<view class="twoblock">
				<view v-for="item in memorialdata" :key="item.id" class="subcontent">
					<view class="subcontentl">
						距&nbsp;{{item.content}}
					</view>
					<view class="subcontentr">
						还有<view class="subcontentrtext">{{item.nums}}</view>天
					</view>
				</view>
			</view>
			<!-- 消息提示 -->
			<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
		</view>
		
		<view v-if="memorialdata.length == 0" class="memorial1">
			<view class="oneblock"  @click="memorialpage">
				<view class="iconbg">
					<span class="typeicon t-icon t-icon-jinianrix"></span>
				</view>
				<view class="memorialtitle">
					<view class="onetitle">
						纪念日
					</view>
					<view class="twotitle">
						有0个重要日子
					</view>
				</view>
				<view class="rightback">
					<span class="backicon t-icon t-icon-xiangyou1"></span>
				</view>
			</view>
			<view class="twoblock">
				<view class="subcontent">
					<view class="subcontentl">
						暂未添加纪念日，点击添加吧~
					</view>
				</view>
			</view>
			<!-- 消息提示 -->
			<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["memorialdata"],
		name: "submemorial",
		data() {
			return {
			};
		},
		methods: {
			// 跳转纪念日详情页面
			memorialpage() {
				uni.navigateTo({
					url: "../../pages/memorial/memorial"
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.memorial {
		padding-top: 2rpx;
		margin-top: 40rpx;
		border-radius: 15px;
		width: 640rpx;
		height: 420rpx;
		background-color: #ffffff;
		box-shadow: 5px 5px 10px #efeded;
	}
	.memorial1 {
		padding-top: 2rpx;
		margin-top: 40rpx;
		border-radius: 15px;
		width: 640rpx;
		height: 280rpx;
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
		margin-top: -20rpx;
		height: 252rpx;
		overflow: auto;
	}

	.subcontent {
		font-size: 15px;
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
